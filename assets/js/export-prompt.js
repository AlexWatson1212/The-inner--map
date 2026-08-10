/* The Inner Map — export helpers.

   Builds the optional "continue this with ChatGPT" prompt, and wires up the
   copy / download controls that appear under it.

   Nothing here sends anything anywhere. The prompt is assembled in the browser
   from what the person entered in this session, and it only leaves the page if
   they choose to copy or download it.

   Public shape (window.TIM.prompt):
     compose(options)        -> the prompt text
     wire(root, options)     -> hooks up [data-export-copy] / [data-export-download]
*/
(function (global) {
  'use strict';

  var RULE = '----------------------------------------';

  var INTRO = 'I am using a reflective planning framework. Please help me think with me, not take over.';

  var BOUNDARY = [
    'Please treat everything above as my own notes about my own life, not as an assessment,',
    'a screening result or a diagnosis. Do not tell me what I am, and do not offer a diagnosis.',
    'Treat every suggestion as an optional experiment I can decline.'
  ];

  /* ------------------------------------------------------------- composing */

  function block(title, body) {
    // body may be a string, or an array of lines. Empty blocks are dropped by
    // compose() so the prompt never contains a heading with nothing under it.
    var lines = [];
    if (typeof body === 'string') {
      if (!body.trim()) return null;
      lines = body.trim().split('\n');
    } else if (Array.isArray(body)) {
      lines = body.filter(function (line) { return line && String(line).trim(); });
      if (!lines.length) return null;
    } else {
      return null;
    }
    return { title: title, lines: lines };
  }

  function compose(options) {
    options = options || {};
    var out = [];

    out.push(options.intro || INTRO);
    out.push('');

    (options.blocks || []).forEach(function (item) {
      if (!item) return;
      out.push(item.title + ':');
      item.lines.forEach(function (line) { out.push(line); });
      out.push('');
    });

    if (options.ask) {
      out.push('What I would like help with:');
      out.push(options.ask);
      out.push('');
    }

    out.push(RULE);
    out.push('');
    BOUNDARY.forEach(function (line) { out.push(line); });
    out.push('');
    out.push('Written with The Inner Map - theinnermap.co.uk');

    return out.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
  }

  /* --------------------------------------------------------------- actions */

  function copyText(text, onDone, onFail) {
    if (global.navigator.clipboard && global.navigator.clipboard.writeText) {
      global.navigator.clipboard.writeText(text).then(onDone, onFail);
    } else {
      onFail();
    }
  }

  function downloadText(filename, text) {
    var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function selectNode(node) {
    var range = document.createRange();
    range.selectNodeContents(node);
    var selection = global.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  /* ----------------------------------------------------------------- wiring */

  function wire(root, options) {
    if (!root) return;
    options = options || {};

    var target = root.querySelector('[data-export-text]');
    var copyBtn = root.querySelector('[data-export-copy]');
    var downloadBtn = root.querySelector('[data-export-download]');
    var announce = options.announce || function () {};
    var filename = options.filename || 'inner-map.txt';

    function text() {
      return target ? target.textContent : '';
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        copyText(
          text(),
          function () { announce('Prompt copied to your clipboard. Read it before you paste it anywhere.'); },
          function () {
            announce('Copying was blocked by the browser. The text is selected below so you can copy it yourself.');
            if (target) selectNode(target);
          }
        );
      });
    }

    if (downloadBtn) {
      downloadBtn.addEventListener('click', function () {
        downloadText(filename, text());
        announce('A text file was saved to your device.');
      });
    }
  }

  global.TIM = global.TIM || {};
  global.TIM.prompt = {
    block: block,
    compose: compose,
    wire: wire,
    copyText: copyText,
    downloadText: downloadText
  };
})(window);
