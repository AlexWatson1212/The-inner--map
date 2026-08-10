/* The Inner Map — local store.

   A very small wrapper around localStorage with one rule: nothing is written
   until the person turns saving on. Until then every write is a no-op, so a
   visitor who never opts in leaves no trace in the browser at all.

   Nothing here talks to a network. There is no account, no sync and no id.

   Public shape (window.TIM.store):
     available()        is localStorage usable in this browser at all
     enabled()          has the person turned saving on
     enable() / disable()
     read(name)         parsed object, or null
     write(name, value) returns true if it was actually written
     remove(name)
     clearAll()         removes every key this site owns, and the consent flag
     keys()             names of the saved records that currently exist
     subscribe(fn)      called whenever the on/off state changes
*/
(function (global) {
  'use strict';

  var PREFIX = 'innermap.v3.';
  var CONSENT = PREFIX + 'saving';
  var listeners = [];

  var supported = (function () {
    try {
      var probe = PREFIX + 'probe';
      global.localStorage.setItem(probe, '1');
      global.localStorage.removeItem(probe);
      return true;
    } catch (error) {
      // Private modes, disabled storage, or a full quota. All the same to us.
      return false;
    }
  })();

  function available() {
    return supported;
  }

  function enabled() {
    if (!supported) return false;
    try {
      return global.localStorage.getItem(CONSENT) === 'on';
    } catch (error) {
      return false;
    }
  }

  function notify() {
    var state = enabled();
    listeners.forEach(function (fn) {
      try { fn(state); } catch (error) { /* a broken listener must not break saving */ }
    });
  }

  function enable() {
    if (!supported) return false;
    try {
      global.localStorage.setItem(CONSENT, 'on');
      notify();
      return true;
    } catch (error) {
      return false;
    }
  }

  function disable() {
    // Turning saving off also removes what was already saved. Leaving records
    // behind after someone switches it off would be a surprise.
    clearAll();
    return true;
  }

  function read(name) {
    if (!supported) return null;
    try {
      var raw = global.localStorage.getItem(PREFIX + name);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function write(name, value) {
    if (!enabled()) return false;
    try {
      global.localStorage.setItem(PREFIX + name, JSON.stringify(value));
      return true;
    } catch (error) {
      // Quota or a locked-down browser. The flow carries on in memory.
      return false;
    }
  }

  function remove(name) {
    if (!supported) return;
    try { global.localStorage.removeItem(PREFIX + name); } catch (error) { /* nothing to do */ }
  }

  function keys() {
    if (!supported) return [];
    var found = [];
    try {
      for (var i = 0; i < global.localStorage.length; i++) {
        var key = global.localStorage.key(i);
        if (key && key.indexOf(PREFIX) === 0 && key !== CONSENT) {
          found.push(key.slice(PREFIX.length));
        }
      }
    } catch (error) { /* return what we have */ }
    return found;
  }

  function clearAll() {
    if (!supported) return;
    try {
      var doomed = [];
      for (var i = 0; i < global.localStorage.length; i++) {
        var key = global.localStorage.key(i);
        if (key && key.indexOf(PREFIX) === 0) doomed.push(key);
      }
      doomed.forEach(function (key) { global.localStorage.removeItem(key); });
    } catch (error) { /* nothing to do */ }
    notify();
  }

  function subscribe(fn) {
    if (typeof fn === 'function') listeners.push(fn);
  }

  // Another tab may turn saving off. Keep this one honest about it.
  global.addEventListener('storage', function (event) {
    if (!event.key || event.key === CONSENT || event.key.indexOf(PREFIX) === 0) notify();
  });

  global.TIM = global.TIM || {};
  global.TIM.store = {
    available: available,
    enabled: enabled,
    enable: enable,
    disable: disable,
    read: read,
    write: write,
    remove: remove,
    keys: keys,
    clearAll: clearAll,
    subscribe: subscribe
  };
})(window);
