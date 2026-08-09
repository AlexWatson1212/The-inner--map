/* The Inner Map — First Signal Map.

   Browser-only by design:
   - nothing is transmitted,
   - nothing is written to cookies, localStorage or sessionStorage,
   - all state lives in memory and disappears when the tab closes.

   The markup is a plain form. Without JavaScript every question is still
   readable and printable; this file turns it into a stepped experience and
   builds the summary. */
(function () {
  'use strict';

  var form = document.getElementById('signal-map');
  var full = document.getElementById('map-tool-full');
  var low = document.getElementById('map-tool-low');
  if (!form || !full || !low) return;

  var steps = Array.prototype.slice.call(form.querySelectorAll('.tool-step'));
  var progress = document.getElementById('tool-progress');
  var nav = document.getElementById('tool-navigation');
  var status = document.getElementById('tool-status');
  var backBtn = document.getElementById('tool-back');
  var nextBtn = document.getElementById('tool-next');
  var stopBtn = document.getElementById('tool-stop');
  var output = document.getElementById('summary-output');
  var SUMMARY_STEP = steps.length - 1; // index of the summary panel
  var current = 0;

  /* ---------------------------------------------------------------- helpers */

  function labelOf(name) {
    var el = form.querySelector('input[name="' + name + '"]:checked');
    return el ? (el.getAttribute('data-label') || el.value) : '';
  }

  function checkedLabels(name) {
    return Array.prototype.slice
      .call(form.querySelectorAll('input[name="' + name + '"]:checked'))
      .map(function (el) { return el.getAttribute('data-label') || el.value; });
  }

  function valueOf(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function announce(message) {
    if (status) status.textContent = message;
  }

  /* ------------------------------------------------------------ step engine */

  function show(index, options) {
    options = options || {};
    current = Math.max(0, Math.min(index, SUMMARY_STEP));

    steps.forEach(function (step, i) {
      step.hidden = i !== current;
    });

    if (progress) {
      Array.prototype.slice.call(progress.children).forEach(function (item, i) {
        item.classList.toggle('is-active', i <= Math.min(current, SUMMARY_STEP - 1));
        item.setAttribute('aria-current', i === current ? 'step' : 'false');
      });
      progress.hidden = false;
    }

    var atSummary = current === SUMMARY_STEP;
    nav.hidden = false;
    backBtn.hidden = current === 0;
    nextBtn.hidden = atSummary;
    stopBtn.hidden = atSummary;
    nextBtn.textContent = current === SUMMARY_STEP - 1 ? 'See my map' : 'Continue';

    if (atSummary) {
      buildSummary();
      announce('Your signal map is ready below. You can go back and change anything.');
    } else {
      announce('Step ' + (current + 1) + ' of ' + SUMMARY_STEP + '.');
    }

    if (options.focus !== false) {
      var target = steps[current].querySelector('legend .step-title, .map-summary__heading h3');
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
      var top = full.getBoundingClientRect().top + window.pageYOffset - 90;
      var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: top, behavior: reduced ? 'auto' : 'smooth' });
    }
  }

  // The Continue button is the form's submit control, so pressing Enter in a
  // field moves on. The form is never sent anywhere.
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (current < SUMMARY_STEP) show(current + 1);
  });
  backBtn.addEventListener('click', function () { show(current - 1); });
  stopBtn.addEventListener('click', function () { show(SUMMARY_STEP); });

  /* ------------------------------------------------- selected-state styling */

  form.addEventListener('change', function (event) {
    var input = event.target;
    if (input.type === 'radio') {
      var group = form.querySelectorAll('input[name="' + input.name + '"]');
      Array.prototype.forEach.call(group, function (el) {
        var card = el.closest('.choice-card');
        if (card) card.classList.toggle('is-selected', el.checked);
      });
    }
    if (input.type === 'checkbox') {
      var chip = input.closest('.condition-chip');
      if (chip) chip.classList.toggle('is-selected', input.checked);
    }
  });

  /* --------------------------------------------- borrowed reading sentences */

  Array.prototype.forEach.call(
    form.querySelectorAll('.reading-suggestion'),
    function (button) {
      button.addEventListener('click', function () {
        var one = document.getElementById('reading-one');
        var two = document.getElementById('reading-two');
        var text = button.getAttribute('data-text');
        var target = !one.value.trim() ? one : (!two.value.trim() ? two : null);
        if (!target) {
          announce('Both boxes already have wording in them. Edit or clear one first.');
          return;
        }
        target.value = text;
        target.focus();
        announce('Wording added. You can edit or delete it.');
      });
    }
  );

  /* -------------------------------------------------------------- summary */

  function buildSummary() {
    var lines = [];
    var date = new Date().toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric'
    });

    lines.push('MY SIGNAL MAP');
    lines.push(date);
    lines.push('');
    lines.push('This is a personal reflection I wrote myself.');
    lines.push('It is not an assessment, a screening result or a diagnosis.');
    lines.push('');
    lines.push('----------------------------------------');
    lines.push('');

    var area = labelOf('area');
    if (area) { lines.push('AREA I WAS LOOKING AT'); lines.push(area); lines.push(''); }

    var moment = valueOf('moment');
    if (moment) { lines.push('WHAT I OBSERVED'); lines.push(moment); lines.push(''); }

    var capacity = labelOf('capacity');
    if (capacity) { lines.push('HOW MY CAPACITY FELT AT THE TIME'); lines.push(capacity); lines.push(''); }

    var conditions = checkedLabels('conditions');
    var other = valueOf('condition-other');
    if (other) conditions.push(other);
    if (conditions.length) {
      lines.push('CONDITIONS PRESENT (present, not proven to be the cause)');
      conditions.forEach(function (c) { lines.push('- ' + c); });
      lines.push('');
    }

    var impact = labelOf('impact');
    if (impact) { lines.push('MY BEST CURRENT READING OF THE EFFECT'); lines.push(impact); lines.push(''); }

    var one = valueOf('reading-one');
    var two = valueOf('reading-two');
    if (one || two) {
      lines.push('POSSIBLE READINGS (working hypotheses, not conclusions)');
      if (one) lines.push('1. ' + one);
      if (two) lines.push('2. ' + two);
      if (one && !two) lines.push('2. (I only had one reading at the time.)');
      lines.push('');
    }

    var experiment = labelOf('experiment');
    if (experiment) { lines.push('ONE SMALL, REVERSIBLE EXPERIMENT'); lines.push(experiment); lines.push(''); }

    var watch = valueOf('watch');
    if (watch) { lines.push('WHAT I WILL LOOK FOR'); lines.push(watch); lines.push(''); }

    var review = labelOf('review');
    if (review) { lines.push('WHEN I MIGHT LOOK BACK'); lines.push(review); lines.push(''); }

    if (!area && !moment && !conditions.length && !one && !two && !experiment) {
      lines.push('I stopped before filling anything in. That is a complete outcome.');
      lines.push('');
    }

    lines.push('----------------------------------------');
    lines.push('');
    lines.push('Things worth remembering when I read this again:');
    lines.push('- An explanation that fits one moment may not fit the next.');
    lines.push('- Conditions being present does not prove they caused anything.');
    lines.push('- Neurodivergence will not explain everything that is hard.');
    lines.push('- My answers may change with context, health and capacity.');
    lines.push('- If something feels unmanageable rather than heavy, real-world');
    lines.push('  support is the right next step: in England, 111 online or call');
    lines.push('  111 and select the mental health option; 999 if life is at risk;');
    lines.push('  Samaritans free on 116 123, any time.');
    lines.push('');
    lines.push('From The Inner Map - theinnermap.co.uk');

    output.textContent = lines.join('\n');
  }

  /* ------------------------------------------------------ summary actions */

  var copyBtn = document.getElementById('copy-summary');
  var downloadBtn = document.getElementById('download-summary');
  var printBtn = document.getElementById('print-summary');

  copyBtn.addEventListener('click', function () {
    var text = output.textContent;
    var done = function () { announce('Summary copied to your clipboard.'); };
    var failed = function () {
      announce('Copying was blocked by the browser. Select the text below to copy it.');
      var range = document.createRange();
      range.selectNodeContents(output);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, failed);
    } else {
      failed();
    }
  });

  downloadBtn.addEventListener('click', function () {
    var blob = new Blob([output.textContent], { type: 'text/plain;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = 'my-signal-map.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    announce('A text file was saved to your device.');
  });

  printBtn.addEventListener('click', function () { window.print(); });

  /* --------------------------------------------------- low-capacity route */

  var lowButtons = Array.prototype.slice.call(low.querySelectorAll('[data-low]'));
  var lowEmpty = document.getElementById('low-empty');
  var lowNone = document.getElementById('low-result-none');

  function clearLow() {
    lowButtons.forEach(function (b) {
      b.classList.remove('is-selected');
      b.setAttribute('aria-pressed', 'false');
    });
    Array.prototype.forEach.call(
      low.querySelectorAll('.low-result-card'),
      function (card) { if (card !== lowNone) card.hidden = true; }
    );
  }

  lowButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var key = button.getAttribute('data-low');
      var alreadyOn = button.getAttribute('aria-pressed') === 'true';
      clearLow();
      if (alreadyOn) {
        lowEmpty.hidden = false;
        return;
      }
      button.classList.add('is-selected');
      button.setAttribute('aria-pressed', 'true');
      lowEmpty.hidden = true;
      var card = document.getElementById('low-result-' + key);
      if (card) card.hidden = false;
    });
  });

  /* ------------------------------------------------------------ mode switch */

  function setMode(mode, options) {
    options = options || {};
    var isLow = mode === 'low';
    low.hidden = !isLow;
    full.hidden = isLow;
    document.title = isLow
      ? 'A shorter version — The Inner Map'
      : 'Your first signal map — The Inner Map';
    if (options.focus) {
      var heading = (isLow ? low : full).querySelector('h2');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: false });
      }
    }
  }

  Array.prototype.forEach.call(
    document.querySelectorAll('.capacity-switch'),
    function (button) {
      button.addEventListener('click', function () {
        setMode(button.getAttribute('data-switch'), { focus: true });
      });
    }
  );

  /* ------------------------------------------------------------ entry state */

  var params = new URLSearchParams(window.location.search);
  setMode(params.get('mode') === 'low' ? 'low' : 'full');

  var area = params.get('area');
  if (area) {
    var preset = form.querySelector('input[name="area"][value="' + area.replace(/[^a-z]/gi, '') + '"]');
    if (preset) {
      preset.checked = true;
      preset.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  show(0, { focus: false });
})();
