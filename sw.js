/* The Inner Map — service worker.

   Its only jobs are to make the site open quickly, to keep working when the
   connection does not, and to make an installed copy behave sensibly on a
   home screen.

   It never touches what a person writes. Reflections and drafts live in the
   page, or in localStorage if the person switched saving on; neither passes
   through here, and nothing is ever sent to a server.

   Strategy:
   - HTML: network first, so corrections to the wording arrive. Falls back to
     the cached page, then to the offline page.
   - Everything else: cache first, refreshed quietly in the background.
*/

var VERSION = 'inner-map-v3-1';
var BASE = new URL('./', self.registration.scope).pathname;

var SHELL = [
  '',
  'index.html',
  'start/',
  'map/',
  'today/',
  'approach/',
  'evidence/',
  'about/',
  'privacy/',
  'accessibility/',
  'offline.html',
  '404.html',
  'assets/css/site.css',
  'assets/js/site.js',
  'assets/js/signal-map.js',
  'assets/js/local-store.js',
  'assets/js/export-prompt.js',
  'assets/js/today.js',
  'assets/js/register-sw.js',
  'manifest.webmanifest',
  'favicon.svg',
  'brand/logo-mark.svg',
  'brand/logo-mark-light.svg',
  'brand/icon-180.png',
  'brand/icon-192.png',
  'brand/icon-512.png',
  'brand/icon-maskable.png'
].map(function (path) { return BASE + path; });

var OFFLINE = BASE + 'offline.html';

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(VERSION).then(function (cache) {
      // One missing file should not stop the rest of the site working offline.
      return Promise.all(SHELL.map(function (url) {
        return cache.add(new Request(url, { cache: 'reload' })).catch(function () { return null; });
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(names.map(function (name) {
        return name === VERSION ? null : caches.delete(name);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

function isHtml(request) {
  return request.mode === 'navigate' ||
    (request.headers.get('accept') || '').indexOf('text/html') > -1;
}

self.addEventListener('fetch', function (event) {
  var request = event.request;

  if (request.method !== 'GET') return;
  if (new URL(request.url).origin !== self.location.origin) return;

  if (isHtml(request)) {
    event.respondWith(
      fetch(request)
        .then(function (response) {
          var copy = response.clone();
          caches.open(VERSION).then(function (cache) { cache.put(request, copy); });
          return response;
        })
        .catch(function () {
          return caches.match(request, { ignoreSearch: true })
            .then(function (cached) { return cached || caches.match(OFFLINE); });
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(function (cached) {
      var live = fetch(request).then(function (response) {
        if (response && response.status === 200 && response.type === 'basic') {
          var copy = response.clone();
          caches.open(VERSION).then(function (cache) { cache.put(request, copy); });
        }
        return response;
      }).catch(function () { return cached; });
      return cached || live;
    })
  );
});
