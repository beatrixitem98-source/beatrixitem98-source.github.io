(function () {
  'use strict';
  const dialog = document.getElementById('workbook-dialog');
  const opener = document.querySelector('.workbook-open');
  if (!dialog || !opener) return;
  const close = dialog.querySelector('.workbook-close');
  const buttons = Array.from(dialog.querySelectorAll('.workbook-sheet-button'));
  const initialButton = document.getElementById(dialog.dataset.initialSheet) || buttons[0];
  let trigger;
  function selectSheet(button) {
    buttons.forEach(function (item) {
      const selected = item === button;
      item.setAttribute('aria-pressed', String(selected));
      const panel = document.getElementById(item.getAttribute('aria-controls'));
      panel.hidden = !selected;
      if (selected) {
        const scroll = panel.querySelector('.workbook-scroll');
        scroll.scrollLeft = 0;
        scroll.scrollTop = 0;
      }
    });
  }
  buttons.forEach(function (button) {
    button.addEventListener('click', function () { selectSheet(button); });
  });
  opener.addEventListener('click', function () {
    trigger = opener;
    selectSheet(initialButton);
    dialog.querySelector('.workbook-sheets').scrollLeft = 0;
    document.body.classList.add('lightbox-open');
    dialog.showModal();
    close.focus();
    initialButton.scrollIntoView({block:'nearest', inline:'nearest', behavior:'instant'});
  });
  close.addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('close', function () {
    document.body.classList.remove('lightbox-open');
    if (trigger) trigger.focus();
  });
}());
