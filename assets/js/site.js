/* The Inner Map — site chrome.
   Handles the mobile navigation only. Every content page works without this file. */
(function () {
  'use strict';

  var button = document.getElementById('menu-button');
  var nav = document.getElementById('primary-navigation');
  if (!button || !nav) return;

  var lastFocus = null;

  function focusables() {
    return Array.prototype.slice.call(
      nav.querySelectorAll('a[href], button:not([disabled])')
    ).filter(function (el) {
      return el.offsetWidth > 0 || el.offsetHeight > 0;
    });
  }

  function isOpen() {
    return button.getAttribute('aria-expanded') === 'true';
  }

  function open() {
    lastFocus = document.activeElement;
    button.setAttribute('aria-expanded', 'true');
    nav.classList.add('site-nav--open');
    document.body.classList.add('menu-open');
    // The overlay transitions in, and browsers refuse to focus an element that
    // is still visibility:hidden, so retry briefly until it takes.
    var attempts = 0;
    (function tryFocus() {
      var items = focusables();
      if (items.length) {
        items[0].focus();
        if (document.activeElement === items[0]) return;
      }
      if (++attempts < 12) requestAnimationFrame(tryFocus);
    })();
  }

  function close(returnFocus) {
    button.setAttribute('aria-expanded', 'false');
    nav.classList.remove('site-nav--open');
    document.body.classList.remove('menu-open');
    if (returnFocus !== false) {
      (lastFocus && document.contains(lastFocus) ? lastFocus : button).focus();
    }
  }

  button.addEventListener('click', function () {
    isOpen() ? close() : open();
  });

  document.addEventListener('keydown', function (event) {
    if (!isOpen()) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }

    if (event.key !== 'Tab') return;

    // Keep keyboard focus inside the overlay while it is open.
    var items = focusables();
    items.unshift(button);
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  // Close when a link inside the overlay is followed.
  nav.addEventListener('click', function (event) {
    if (event.target.closest('a') && isOpen()) close(false);
  });

  // Reset if the viewport grows past the mobile breakpoint.
  var wide = window.matchMedia('(min-width: 981px)');
  var onChange = function (event) {
    if (event.matches && isOpen()) close(false);
  };
  if (wide.addEventListener) wide.addEventListener('change', onChange);
  else if (wide.addListener) wide.addListener(onChange);
})();
