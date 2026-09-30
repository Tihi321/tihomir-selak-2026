// Runs synchronously in <head> before first paint, so the stored theme and
// field choice apply with no flash. External file because CSP forbids inline.
// The ts-theme cookie is shared with the blog and wins over localStorage.
(function () {
  var root = document.documentElement;
  var theme = null;
  var field = 'on';
  try {
    var match = document.cookie.match(/(?:^|;\s*)ts-theme=(light|dark)(?:;|$)/);
    theme = match ? match[1] : localStorage.getItem('ts-theme');
    field = localStorage.getItem('ts-field') === 'off' ? 'off' : 'on';
  } catch (error) {
    // Storage can be blocked. Fall back to OS theme and field on.
  }
  if (theme === 'light' || theme === 'dark') {
    root.setAttribute('data-theme', theme);
  }
  root.setAttribute('data-field', field);
  root.setAttribute('data-js', '');
})();
