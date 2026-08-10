/* The Inner Map — My day.

   An optional, staged, mobile-first flow that ends in an editable draft shape
   for today. It is not a schedule and not a task manager: every card can be
   made smaller, moved, replaced with recovery or removed, and abandoning the
   whole thing is a normal outcome.

   Privacy: nothing is transmitted. State lives in memory. It is written to
   localStorage only after the person switches saving on, through TIM.store.

   The markup is a plain form. Without JavaScript every question is still
   readable and printable; this file turns it into a stepped experience and
   builds the draft. */
(function () {
  'use strict';

  var form = document.getElementById('day-form');
  var tool = document.getElementById('day-tool');
  if (!form || !tool) return;

  var store = (window.TIM && window.TIM.store) || null;
  var promptKit = (window.TIM && window.TIM.prompt) || null;

  var RECORD = 'today';

  var steps = Array.prototype.slice.call(form.querySelectorAll('.tool-step'));
  var progress = document.getElementById('day-progress');
  var nav = document.getElementById('day-navigation');
  var status = document.getElementById('day-status');
  var backBtn = document.getElementById('day-back');
  var nextBtn = document.getElementById('day-next');
  var stopBtn = document.getElementById('day-stop');
  var DRAFT_STEP = steps.length - 1;
  var current = 0;

  var cardHost = document.getElementById('draft-cards');
  var draftHeading = document.getElementById('draft-heading');
  var draftIntro = document.getElementById('draft-intro');
  var goodEnough = document.getElementById('good-enough');
  var fallback = document.getElementById('fallback-version');

  /* --------------------------------------------------------------- the day */

  function blankDay() {
    return {
      v: 3,
      matters: [],
      meaningful: '',
      commitments: '',
      cannotWait: '',
      responsibilities: '',
      capacity: '',
      costs: [],
      costOther: '',
      cards: [],
      experiment: '',
      stopped: false,
      step: 0,
      updated: '',
      // A rendered copy of the draft, so the offline page can show a saved day
      // without having to rebuild it from the form.
      summary: ''
    };
  }

  var day = blankDay();

  /* --------------------------------------------------------------- helpers */

  function announce(message) {
    if (status) status.textContent = message;
  }

  function byId(id) { return document.getElementById(id); }

  function valueOf(id) {
    var el = byId(id);
    return el ? el.value.trim() : '';
  }

  function labelOf(name) {
    var el = form.querySelector('input[name="' + name + '"]:checked');
    return el ? (el.getAttribute('data-label') || el.value) : '';
  }

  function checkedValues(name) {
    return Array.prototype.slice
      .call(form.querySelectorAll('input[name="' + name + '"]:checked'))
      .map(function (el) { return el.value; });
  }

  function labelForValue(name, value) {
    var el = form.querySelector('input[name="' + name + '"][value="' + value + '"]');
    return el ? (el.getAttribute('data-label') || value) : value;
  }

  function lines(text) {
    return String(text || '')
      .split('\n')
      .map(function (line) { return line.trim(); })
      .filter(Boolean);
  }

  function firstLine(text) {
    var found = lines(text);
    return found.length ? found[0] : '';
  }

  function reducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ------------------------------------------------------- reading the form */

  function readForm() {
    day.matters = checkedValues('matters');
    day.meaningful = valueOf('meaningful-thing');
    day.commitments = valueOf('commitments');
    day.cannotWait = valueOf('cannot-wait');
    day.responsibilities = valueOf('responsibilities');
    day.capacity = (form.querySelector('input[name="capacity"]:checked') || {}).value || '';
    day.costs = checkedValues('costs');
    day.costOther = valueOf('cost-other');
    day.experiment = (form.querySelector('input[name="experiment"]:checked') || {}).value || '';
  }

  function writeForm() {
    Array.prototype.forEach.call(form.querySelectorAll('input[type="checkbox"]'), function (el) {
      var group = el.name === 'matters' ? day.matters : (el.name === 'costs' ? day.costs : null);
      if (!group) return;
      el.checked = group.indexOf(el.value) > -1;
      var chip = el.closest('.condition-chip');
      if (chip) chip.classList.toggle('is-selected', el.checked);
    });

    Array.prototype.forEach.call(form.querySelectorAll('input[type="radio"]'), function (el) {
      var value = el.name === 'capacity' ? day.capacity : (el.name === 'experiment' ? day.experiment : null);
      if (value === null) return;
      el.checked = el.value === value;
      var card = el.closest('.choice-card');
      if (card) card.classList.toggle('is-selected', el.checked);
    });

    if (byId('meaningful-thing')) byId('meaningful-thing').value = day.meaningful;
    if (byId('commitments')) byId('commitments').value = day.commitments;
    if (byId('cannot-wait')) byId('cannot-wait').value = day.cannotWait;
    if (byId('responsibilities')) byId('responsibilities').value = day.responsibilities;
    if (byId('cost-other')) byId('cost-other').value = day.costOther;

    syncCapacityNote();
  }

  /* ----------------------------------------------------------- step engine */

  function show(index, options) {
    options = options || {};
    current = Math.max(0, Math.min(index, DRAFT_STEP));
    day.step = current;

    steps.forEach(function (step, i) { step.hidden = i !== current; });

    if (progress) {
      Array.prototype.slice.call(progress.children).forEach(function (item, i) {
        item.classList.toggle('is-active', i <= Math.min(current, DRAFT_STEP - 1));
        item.setAttribute('aria-current', i === current ? 'step' : 'false');
      });
      progress.hidden = false;
    }

    var atDraft = current === DRAFT_STEP;
    nav.hidden = false;
    backBtn.hidden = current === 0;
    nextBtn.hidden = atDraft;
    stopBtn.hidden = atDraft;
    nextBtn.innerHTML = current === DRAFT_STEP - 1
      ? 'See a rough shape for today'
      : 'Continue <span aria-hidden="true">&#8594;</span>';

    if (atDraft) {
      buildDraft();
      announce('Your draft for today is ready below. You can change any part of it, or go back.');
    } else {
      announce('Step ' + (current + 1) + ' of ' + DRAFT_STEP + '. You can stop at any point.');
    }

    save();

    if (options.focus !== false) {
      var target = steps[current].querySelector('legend .step-title, #draft-heading');
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
      var top = tool.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: top, behavior: reducedMotion() ? 'auto' : 'smooth' });
    }
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    readForm();
    if (current < DRAFT_STEP) show(current + 1);
  });

  backBtn.addEventListener('click', function () { readForm(); show(current - 1); });
  stopBtn.addEventListener('click', function () { readForm(); show(DRAFT_STEP); });

  /* -------------------------------------------------- selection behaviours */

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

      // "None of these need to happen today" is an answer on its own.
      if (input.name === 'matters') {
        if (input.value === 'none' && input.checked) {
          Array.prototype.forEach.call(
            form.querySelectorAll('input[name="matters"]'),
            function (el) {
              if (el === input) return;
              el.checked = false;
              var other = el.closest('.condition-chip');
              if (other) other.classList.remove('is-selected');
            }
          );
        } else if (input.value !== 'none' && input.checked) {
          var none = byId('matters-none');
          if (none && none.checked) {
            none.checked = false;
            var noneChip = none.closest('.condition-chip');
            if (noneChip) noneChip.classList.remove('is-selected');
          }
        }
      }
    }

    readForm();
    if (input.name === 'capacity') syncCapacityNote();
    if (input.name === 'experiment' && current === DRAFT_STEP) refreshOutputs();
    save();
  });

  form.addEventListener('input', function (event) {
    if (event.target.matches('[data-card-text]')) return; // handled by the card editor
    readForm();
    save();
  });

  function syncCapacityNote() {
    var note = byId('capacity-low-note');
    if (note) note.hidden = day.capacity !== 'very-little';
  }

  var jump = byId('jump-to-draft');
  if (jump) {
    jump.addEventListener('click', function () { readForm(); show(DRAFT_STEP); });
  }

  /* ------------------------------------------------------------ seeding */

  var RECOVERY_BY_COST = {
    sensory: 'Twenty minutes with less input: lower light, fewer screens, a quieter room.',
    social: 'A stretch of the day with nobody to reply to.',
    decisions: 'A period where nothing has to be decided.',
    switching: 'One block on a single thing, without moving between tasks.',
    recovery: 'Protected time after the most demanding part, not only before it.',
    starting: 'A pause before the hardest start rather than after it.',
    monitored: 'Some part of the day where nobody is watching how it looks.',
    unpredictable: 'One part of the day kept familiar and unchanged.'
  };

  var RECOVERY_DEFAULT = 'One stretch with lower demand and lower input.';

  function recoverySuggestion() {
    for (var i = 0; i < day.costs.length; i++) {
      if (RECOVERY_BY_COST[day.costs[i]]) return RECOVERY_BY_COST[day.costs[i]];
    }
    return RECOVERY_DEFAULT;
  }

  function seedCards() {
    var anchor = firstLine(day.cannotWait) || firstLine(day.commitments) ||
      firstLine(day.responsibilities) || 'Something to eat, something to drink.';

    var connection = '';
    if (day.matters.indexOf('people') > -1) connection = 'One short message to one person.';
    else if (day.matters.indexOf('enjoy') > -1) connection = 'Ten minutes of something you actually like.';

    var low = day.capacity === 'very-little';

    day.cards = [
      {
        id: 'anchor',
        role: 'One anchor',
        note: 'A commitment that is already real, or one basic-care step.',
        placeholder: 'The one thing that holds the day together.',
        text: anchor,
        scale: 0,
        state: 'today'
      },
      {
        id: 'meaningful',
        role: 'One meaningful possibility',
        note: 'A possibility, not a requirement.',
        placeholder: 'The thing that would make today feel like mine.',
        text: day.meaningful,
        scale: low ? 1 : 0,
        state: low ? 'later' : 'today'
      },
      {
        id: 'recovery',
        role: 'One form of recovery',
        note: 'Protection, not a reward for finishing the rest.',
        placeholder: 'Something that lowers demand or input.',
        text: recoverySuggestion(),
        scale: 0,
        state: 'today'
      },
      {
        id: 'connection',
        role: 'One small life-giving thing',
        note: 'Only if there is room. Leaving it out costs nothing.',
        placeholder: 'A message, a walk, a page of something good.',
        text: connection,
        scale: 0,
        state: (low || day.capacity === 'some') ? 'later' : 'today'
      }
    ];
  }

  /* ------------------------------------------------------- the draft cards */

  var SCALE_NOTES = [
    '',
    'Smaller: just the first two minutes of this.',
    'Smaller still: just the first visible step.'
  ];

  function scaledText(card) {
    var text = (card.text || '').trim();
    if (!text) return '';
    if (card.scale === 1) return 'The first two minutes of: ' + text;
    if (card.scale === 2) return 'The first visible step of: ' + text;
    return text;
  }

  function cardById(id) {
    for (var i = 0; i < day.cards.length; i++) {
      if (day.cards[i].id === id) return day.cards[i];
    }
    return null;
  }

  function makeButton(label, action, id, classes) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = classes || 'draft-card__action';
    button.textContent = label;
    button.setAttribute('data-card-action', action);
    button.setAttribute('data-card-id', id);
    return button;
  }

  function grow(field) {
    if (!field) return;
    field.style.height = 'auto';
    field.style.height = field.scrollHeight + 'px';
  }

  function renderCards(focus) {
    if (!cardHost) return;
    cardHost.textContent = '';

    var visible = day.cards.filter(function (card) {
      if (day.stopped) return card.id === 'anchor';
      return true;
    });

    visible.forEach(function (card) {
      var article = document.createElement('article');
      article.className = 'draft-card draft-card--' + card.state;
      article.setAttribute('data-card', card.id);

      var head = document.createElement('div');
      head.className = 'draft-card__head';

      var role = document.createElement('p');
      role.className = 'mini-label';
      role.textContent = card.role;
      head.appendChild(role);

      if (card.state !== 'today') {
        var tag = document.createElement('span');
        tag.className = 'draft-card__tag';
        tag.textContent = card.state === 'later' ? 'Not today' : 'Removed';
        head.appendChild(tag);
      }
      article.appendChild(head);

      if (card.state === 'today') {
        var fieldId = 'card-' + card.id;
        var label = document.createElement('label');
        label.className = 'visually-hidden';
        label.setAttribute('for', fieldId);
        label.textContent = card.role + '. ' + card.note;
        article.appendChild(label);

        var input = document.createElement('textarea');
        input.id = fieldId;
        input.rows = 2;
        input.className = 'draft-card__text';
        input.value = card.text;
        input.placeholder = card.placeholder;
        input.setAttribute('data-card-text', card.id);
        article.appendChild(input);

        var note = document.createElement('p');
        note.className = 'draft-card__note';
        note.textContent = card.scale ? SCALE_NOTES[card.scale] : card.note;
        article.appendChild(note);

        var actions = document.createElement('div');
        actions.className = 'draft-card__actions';
        actions.appendChild(makeButton('Make this smaller', 'smaller', card.id));
        actions.appendChild(makeButton('Move to another day', 'later', card.id));
        if (card.id !== 'recovery') {
          actions.appendChild(makeButton('Replace with recovery', 'recovery', card.id));
        }
        actions.appendChild(makeButton('Remove', 'remove', card.id));
        article.appendChild(actions);
      } else {
        var resting = document.createElement('p');
        resting.className = 'draft-card__resting';
        resting.textContent = (card.text || card.placeholder) +
          (card.state === 'later'
            ? ' — kept for another day.'
            : ' — taken out of today’s draft.');
        article.appendChild(resting);

        var back = document.createElement('div');
        back.className = 'draft-card__actions';
        back.appendChild(makeButton('Bring this back to today', 'restore', card.id));
        article.appendChild(back);
      }

      cardHost.appendChild(article);
    });

    // A card should show all of its text without an inner scrollbar; a hidden
    // last line is exactly the kind of small friction this page exists to avoid.
    Array.prototype.forEach.call(
      cardHost.querySelectorAll('.draft-card__text'),
      grow
    );

    if (focus) {
      var restored = cardHost.querySelector(
        '[data-card="' + focus.id + '"] [data-card-action="' + focus.action + '"]'
      ) || cardHost.querySelector('[data-card="' + focus.id + '"] button');
      if (restored) restored.focus();
    }
  }

  if (cardHost) {
    cardHost.addEventListener('input', function (event) {
      var id = event.target.getAttribute && event.target.getAttribute('data-card-text');
      if (!id) return;
      var card = cardById(id);
      if (!card) return;
      card.text = event.target.value;
      grow(event.target);
      refreshOutputs();
      save();
    });

    cardHost.addEventListener('click', function (event) {
      var button = event.target.closest('[data-card-action]');
      if (!button) return;
      var card = cardById(button.getAttribute('data-card-id'));
      if (!card) return;
      var action = button.getAttribute('data-card-action');

      if (action === 'smaller') {
        card.scale = (card.scale + 1) % 3;
        announce(card.scale
          ? card.role + ': ' + SCALE_NOTES[card.scale]
          : card.role + ' is back to its full size.');
      } else if (action === 'later') {
        card.state = 'later';
        announce(card.role + ' moved to another day. You can bring it back.');
      } else if (action === 'remove') {
        card.state = 'removed';
        announce(card.role + ' removed from today. You can bring it back.');
      } else if (action === 'restore') {
        card.state = 'today';
        announce(card.role + ' is back in today.');
      } else if (action === 'recovery') {
        card.text = recoverySuggestion();
        card.scale = 0;
        card.role = 'Recovery instead';
        card.note = 'Swapped for something that lowers demand.';
        announce(card.role + ': ' + card.text);
      }

      renderCards({ id: card.id, action: action === 'later' || action === 'remove' ? 'restore' : action });
      refreshOutputs();
      save();
    });
  }

  /* ------------------------------------------------------------- the draft */

  function activeCards() {
    return day.cards.filter(function (card) {
      return card.state === 'today' && (card.text || '').trim();
    });
  }

  function anchorCard() {
    var card = cardById('anchor');
    return card && card.state === 'today' ? card : null;
  }

  function buildGoodEnough() {
    var anchor = anchorCard();
    if (day.stopped) {
      return 'Today is finished as a plan. Whatever happens now is the day, not a result.';
    }
    if (anchor && (anchor.text || '').trim()) {
      return 'Just this: ' + scaledText(anchor).replace(/\.$/, '') +
        '. Then whatever recovery you can get. Everything else is extra, not the standard.';
    }
    return 'Just this: something to eat, something to drink, and the rest of the day left undecided.';
  }

  function buildFallback() {
    var costLabel = day.costs.length ? labelForValue('costs', day.costs[0]).toLowerCase() : '';
    var opening = costLabel
      ? 'If ' + costLabel + ' turns out to cost more than expected: '
      : 'If capacity drops further: ';
    return opening +
      'reduce one demand, reduce one input, or ask for one specific thing—and let the rest of ' +
      'this draft go. Nothing here has to survive the afternoon.';
  }

  function buildIntro() {
    if (day.stopped) {
      return 'You stopped here. What is left is the anchor and a way down. That is a complete ' +
        'outcome, and the rest of the draft is still there if you want it back.';
    }
    if (day.capacity === 'very-little') {
      return 'Because capacity is very little, this starts with an anchor and some recovery. The ' +
        'other cards are held for another day; bring them back only if that is true.';
    }
    if (day.capacity === 'unclear') {
      return 'Capacity is not readable yet, so treat every card as provisional. Make things smaller ' +
        'as the day tells you more.';
    }
    return 'Change anything that does not fit. Moving something to another day, making it smaller, ' +
      'or removing it are all normal outcomes—not signs that the day has gone wrong.';
  }

  function refreshOutputs() {
    if (draftIntro) draftIntro.textContent = buildIntro();
    if (goodEnough) goodEnough.textContent = buildGoodEnough();
    if (fallback) fallback.textContent = buildFallback();
    if (draftHeading) {
      draftHeading.textContent = day.stopped
        ? 'Enough for today.'
        : 'This is a draft, not a promise.';
    }
    buildExport();
  }

  function buildDraft() {
    if (!day.cards.length) seedCards();
    renderCards();
    refreshOutputs();
    syncSaveUi();
  }

  /* ------------------------------------------------------ the plain summary */

  function summaryText() {
    var out = [];
    var date = new Date().toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric'
    });

    out.push('MY DAY — A DRAFT');
    out.push(date);
    out.push('');
    out.push('This is a draft I wrote myself, not a schedule and not a commitment.');
    out.push('');
    out.push('----------------------------------------');
    out.push('');

    if (day.capacity) {
      out.push('CAPACITY I READ TODAY');
      out.push(labelForValue('capacity', day.capacity));
      out.push('');
    }

    var matters = day.matters.map(function (value) { return labelForValue('matters', value); });
    if (day.meaningful) matters.push('The one thing: ' + day.meaningful);
    if (matters.length) {
      out.push('WHAT MATTERS TODAY');
      matters.forEach(function (item) { out.push('- ' + item); });
      out.push('');
    }

    var real = lines(day.commitments)
      .concat(lines(day.cannotWait))
      .concat(lines(day.responsibilities));
    if (real.length) {
      out.push('WHAT IS ALREADY REAL');
      real.forEach(function (item) { out.push('- ' + item); });
      out.push('');
    }

    var costs = day.costs.map(function (value) { return labelForValue('costs', value); });
    if (day.costOther) costs.push(day.costOther);
    if (costs.length) {
      out.push('WHAT MAY COST MORE THAN IT LOOKS');
      costs.forEach(function (item) { out.push('- ' + item); });
      out.push('');
    }

    var active = activeCards();
    if (active.length) {
      out.push('THE ROUGH SHAPE');
      active.forEach(function (card) {
        out.push('- ' + card.role + ': ' + scaledText(card));
      });
      out.push('');
    }

    var held = day.cards.filter(function (card) {
      return card.state !== 'today' && (card.text || '').trim();
    });
    if (held.length && !day.stopped) {
      out.push('HELD FOR ANOTHER DAY');
      held.forEach(function (card) { out.push('- ' + card.text); });
      out.push('');
    }

    out.push('A GOOD-ENOUGH VERSION');
    out.push(buildGoodEnough());
    out.push('');
    out.push('IF CAPACITY DROPS');
    out.push(buildFallback());
    out.push('');

    if (day.experiment) {
      out.push('ONE SMALL EXPERIMENT');
      out.push(labelForValue('experiment', day.experiment));
      out.push('');
    }

    out.push('----------------------------------------');
    out.push('');
    out.push('Worth remembering:');
    out.push('- A draft that changes is doing its job.');
    out.push('- Capacity is a reading of today, not a measurement of me.');
    out.push('- Not finishing this is a normal outcome, not a failure.');
    out.push('- If things feel unmanageable rather than heavy, real-world support is');
    out.push('  the right next step: in England, 111 online or call 111 and select the');
    out.push('  mental health option; 999 if life is at risk; Samaritans free on');
    out.push('  116 123, any time.');
    out.push('');
    out.push('From The Inner Map - theinnermap.co.uk');

    return out.join('\n');
  }

  /* ------------------------------------------------------- the export prompt */

  function buildExport() {
    var target = byId('export-text');
    if (!target || !promptKit) return;

    var matters = day.matters.map(function (value) {
      return '- ' + labelForValue('matters', value);
    });
    if (day.meaningful) matters.push('- The one thing that would count: ' + day.meaningful);

    var real = lines(day.commitments).map(function (l) { return '- ' + l; })
      .concat(lines(day.cannotWait).map(function (l) { return '- ' + l + ' (cannot wait)'; }))
      .concat(lines(day.responsibilities).map(function (l) { return '- ' + l + ' (caring or practical)'; }));

    var costs = day.costs.map(function (value) { return '- ' + labelForValue('costs', value); });
    if (day.costOther) costs.push('- ' + day.costOther);

    var shape = activeCards().map(function (card) {
      return '- ' + card.role + ': ' + scaledText(card);
    });

    var blocks = [
      promptKit.block('What matters to me today', matters),
      promptKit.block('My actual capacity', day.capacity ? labelForValue('capacity', day.capacity) : ''),
      promptKit.block('Fixed commitments', real),
      promptKit.block('What may cost more than it looks', costs),
      promptKit.block('The rough shape I have drafted so far', shape),
      promptKit.block('A good-enough version of today', buildGoodEnough())
    ];

    target.textContent = promptKit.compose({
      blocks: blocks,
      ask: [
        'Help me create a flexible, compassionate plan for today. Prioritise capacity, recovery and',
        'one meaningful action. Do not turn this into a productivity schedule. Treat all suggestions',
        'as optional experiments. If my capacity is very low, help me reduce demands rather than',
        'optimise them.'
      ].join('\n')
    });
  }

  var exportToggle = byId('export-toggle');
  var exportBody = byId('export-body');
  if (exportToggle && exportBody) {
    exportToggle.addEventListener('click', function () {
      var open = exportBody.hidden;
      exportBody.hidden = !open;
      exportToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      exportToggle.textContent = open ? 'Hide the prompt' : 'Show the prompt';
      if (open) {
        buildExport();
        announce('The prompt is shown below. Read it before copying it anywhere.');
      }
    });
  }

  if (promptKit) {
    promptKit.wire(byId('export-panel'), {
      filename: 'my-day-prompt.txt',
      announce: announce
    });
  }

  /* --------------------------------------------------------- draft actions */

  var experimentToggle = byId('experiment-toggle');
  var experimentPanel = byId('experiment-panel');
  if (experimentToggle && experimentPanel) {
    experimentToggle.addEventListener('click', function () {
      var open = experimentPanel.hidden;
      experimentPanel.hidden = !open;
      experimentToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      experimentToggle.textContent = open ? 'Hide the experiment options' : 'Try one small experiment';
    });
  }

  var copyDay = byId('copy-day');
  var downloadDay = byId('download-day');
  var printDay = byId('print-day');

  if (copyDay && promptKit) {
    copyDay.addEventListener('click', function () {
      promptKit.copyText(
        summaryText(),
        function () { announce('Your day was copied to the clipboard.'); },
        function () { announce('Copying was blocked by the browser. Use the download button instead.'); }
      );
    });
  }

  if (downloadDay && promptKit) {
    downloadDay.addEventListener('click', function () {
      promptKit.downloadText('my-day.txt', summaryText());
      announce('A text file was saved to your device.');
    });
  }

  if (printDay) {
    printDay.addEventListener('click', function () { window.print(); });
  }

  var stopHere = byId('stop-here');
  if (stopHere) {
    stopHere.addEventListener('click', function () {
      day.stopped = !day.stopped;
      stopHere.textContent = day.stopped ? 'Show the whole draft again' : 'I am stopping here';
      renderCards();
      refreshOutputs();
      save();
      announce(day.stopped
        ? 'Stopped. Only the anchor and the way down are shown.'
        : 'The whole draft is shown again.');
    });
  }

  var restart = byId('restart-day');
  if (restart) {
    restart.addEventListener('click', function () {
      day = blankDay();
      form.reset();
      Array.prototype.forEach.call(
        form.querySelectorAll('.is-selected'),
        function (el) { el.classList.remove('is-selected'); }
      );
      if (store) store.remove(RECORD);
      writeForm();
      show(0);
      announce('Started again. Nothing from the previous draft was kept.');
    });
  }

  /* ---------------------------------------------------------------- saving */

  var saveToggle = byId('save-toggle');
  var saveState = byId('save-state');
  var clearBtn = byId('clear-device');
  var confirmBox = byId('clear-confirm');
  var confirmYes = byId('clear-confirm-yes');
  var confirmNo = byId('clear-confirm-no');
  var savePanel = byId('save-panel');
  var confirmMode = 'clear';
  var saveTimer = null;

  function save() {
    if (!store || !store.enabled()) return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      day.updated = new Date().toISOString();
      day.summary = day.cards.length ? summaryText() : '';
      store.write(RECORD, day);
      syncSaveUi();
    }, 400);
  }

  function syncSaveUi() {
    if (!savePanel) return;

    if (!store || !store.available()) {
      if (saveToggle) saveToggle.hidden = true;
      if (clearBtn) clearBtn.hidden = true;
      if (saveState) {
        saveState.textContent = 'This browser does not allow local saving, so nothing can be kept ' +
          'here. Copy, download or print instead.';
      }
      return;
    }

    var on = store.enabled();
    if (saveToggle) {
      saveToggle.setAttribute('aria-checked', on ? 'true' : 'false');
      saveToggle.classList.toggle('is-on', on);
    }
    if (saveState) {
      saveState.textContent = on
        ? 'Saving is on. This day is kept in this browser only—not on a server, and not in an account.'
        : 'Saving is off. Closing this tab will clear what you have written.';
    }
    if (clearBtn) clearBtn.hidden = !(store.keys().length || on);
  }

  if (saveToggle) {
    saveToggle.addEventListener('click', function () {
      if (!store || !store.available()) return;
      if (store.enabled()) {
        showConfirm('off');
      } else {
        store.enable();
        day.updated = new Date().toISOString();
        day.summary = day.cards.length ? summaryText() : '';
        store.write(RECORD, day);
        syncSaveUi();
        announce('Saving is on. This day is kept in this browser only.');
      }
    });
  }

  function showConfirm(mode) {
    confirmMode = mode;
    if (!confirmBox) return;
    confirmBox.hidden = false;
    var text = confirmBox.querySelector('p');
    if (text) {
      text.innerHTML = mode === 'off'
        ? '<strong>Switch saving off and delete what is saved in this browser?</strong> This cannot ' +
          'be undone, and it does not affect anything you have copied, downloaded or printed.'
        : '<strong>Delete the day and any drafts saved in this browser?</strong> This cannot be ' +
          'undone, and it does not affect anything you have copied, downloaded or printed.';
    }
    if (confirmYes) {
      confirmYes.textContent = mode === 'off' ? 'Yes, switch off and delete' : 'Yes, clear this device';
      confirmYes.focus();
    }
  }

  function hideConfirm() {
    if (confirmBox) confirmBox.hidden = true;
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', function () { showConfirm('clear'); });
  }

  if (confirmYes) {
    confirmYes.addEventListener('click', function () {
      if (!store) return;
      if (confirmMode === 'off') {
        store.disable();
        announce('Saving is off and this browser’s saved days were deleted. What is on screen is still here.');
      } else {
        store.clearAll();
        announce('This browser’s saved days were deleted. What is on screen is still here.');
      }
      hideConfirm();
      syncSaveUi();
      if (clearBtn) clearBtn.focus();
    });
  }

  if (confirmNo) {
    confirmNo.addEventListener('click', function () {
      hideConfirm();
      syncSaveUi();
      if (saveToggle) saveToggle.focus();
    });
  }

  if (store) store.subscribe(syncSaveUi);

  /* --------------------------------------------------------------- resuming */

  var banner = byId('resume-banner');
  var resumeYes = byId('resume-yes');
  var resumeNo = byId('resume-no');
  var resumeDetail = byId('resume-detail');

  function hydrate(saved) {
    Object.keys(blankDay()).forEach(function (key) {
      if (saved[key] !== undefined && saved[key] !== null) day[key] = saved[key];
    });
    writeForm();
  }

  function offerResume() {
    if (!store || !store.enabled() || !banner) return false;
    var saved = store.read(RECORD);
    if (!saved || saved.v !== 3) return false;

    var hasContent = (saved.matters && saved.matters.length) || saved.meaningful ||
      saved.commitments || saved.cannotWait || saved.responsibilities || saved.capacity ||
      (saved.cards && saved.cards.length);
    if (!hasContent) return false;

    if (resumeDetail && saved.updated) {
      var when = new Date(saved.updated);
      var sameDay = when.toDateString() === new Date().toDateString();
      resumeDetail.textContent = sameDay
        ? 'Saved earlier today. You can pick it up, or start a new one. Nothing is lost either way.'
        : 'Saved on ' + when.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) +
          '. It may not fit today, and starting again is no loss.';
    }

    banner.hidden = false;

    resumeYes.addEventListener('click', function () {
      hydrate(saved);
      banner.hidden = true;
      show(Math.min(saved.step || 0, DRAFT_STEP));
      announce('Your saved day is open. You can change any part of it.');
    });

    resumeNo.addEventListener('click', function () {
      store.remove(RECORD);
      banner.hidden = true;
      show(0);
      announce('Started a new day. The saved one was removed from this browser.');
    });

    return true;
  }

  /* ------------------------------------------------------------ entry state */

  writeForm();
  syncSaveUi();

  var resumed = offerResume();
  show(0, { focus: false });
  if (resumed && banner) banner.hidden = false;
})();
