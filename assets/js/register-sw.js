/* The Inner Map — service-worker registration.

   The worker has to live at the site root so it covers every page. The site is
   built with relative links so it works at a domain root and at a project
   subpath, so the root is worked out from this script's own URL rather than
   assumed to be "/".

   Registration is skipped on file:// and on anything that is not a secure
   context. Nothing here depends on it: every page works without a worker. */
(function () {
  'use strict';

  if (!('serviceWorker' in navigator)) return;
  if (!window.isSecureContext) return;

  var self = document.currentScript ||
    document.querySelector('script[src$="register-sw.js"]');
  if (!self || !self.src) return;

  var root = self.src.replace(/assets\/js\/register-sw\.js.*$/, '');
  if (root === self.src) return;

  window.addEventListener('load', function () {
    navigator.serviceWorker.register(root + 'sw.js', { scope: root })
      .catch(function () {
        // Offline support is a convenience. If it cannot be set up, the site
        // carries on exactly as it would have done.
      });
  });
})();
