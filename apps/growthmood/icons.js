/* GrowthMood icon system — self-hosted, uniform outline SVGs (24x24). */
(function () {
  "use strict";
  var paths = {
    "layout-dashboard": '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
    "book-open": '<path d="M12 7.5c-2.2-1.8-5.2-2-9-1.8v13c3.6-.3 6.6.1 9 2 2.4-1.9 5.4-2.3 9-2v-13c-3.8-.2-6.8 0-9 1.8Z"/><path d="M12 7.5v13"/>',
    "users": '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    "presentation": '<path d="M3 3h18v13H3zM8 21l4-5 4 5M12 16v5"/><path d="m7.5 12 3-3 2.5 2 3.5-4"/>',
    "calendar-days": '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>',
    "clipboard-check": '<rect x="5" y="4" width="14" height="17" rx="2"/><rect x="9" y="2" width="6" height="4" rx="1"/><path d="m9 14 2.2 2.2L16 11"/>',
    "building-2": '<rect x="4" y="3" width="12" height="18" rx="1.5"/><path d="M16 8h4v13H3M8 7h.01M12 7h.01M8 11h.01M12 11h.01M8 15h.01M12 15h.01M8 21v-3h4v3"/>',
    "award": '<circle cx="12" cy="8" r="5"/><path d="m8.3 12-1.8 9L12 18l5.5 3-1.8-9"/><path d="m10.5 8 1 1 2-2"/>',
    "chart-column-increasing": '<path d="M3 3v18h18"/><rect x="6" y="13" width="3" height="5" rx="1"/><rect x="11" y="9" width="3" height="9" rx="1"/><rect x="16" y="5" width="3" height="13" rx="1"/>',
    "credit-card": '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
    "settings-2": '<path d="M3 6h18M3 12h18M3 18h18"/><circle cx="8" cy="6" r="2" fill="currentColor" stroke="none"/><circle cx="16" cy="12" r="2" fill="currentColor" stroke="none"/><circle cx="9" cy="18" r="2" fill="currentColor" stroke="none"/>',
    "sparkles": '<path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3ZM5 17l.8 2.2L8 20l-2.2.8L5 23l-.8-2.2L2 20l2.2-.8L5 17ZM20 2l.7 1.3L22 4l-1.3.7L20 6l-.7-1.3L18 4l1.3-.7L20 2Z"/>',
    "check": '<path d="m4 12 5 5L20 6"/>',
    "arrow-left": '<path d="M20 12H4m0 0 7-7m-7 7 7 7"/>',
    "arrow-up-right": '<path d="M7 17 17 7M7 7h10v10"/>',
    "arrow-down": '<path d="M12 4v16m0 0 7-7m-7 7-7-7"/>',
    "chevron-down": '<path d="m6 9 6 6 6-6"/>',
    "bell": '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4"/>',
    "menu": '<path d="M4 6h16M4 12h16M4 18h16"/>',
    "x": '<path d="m5 5 14 14M19 5 5 19"/>',
    "graduation-cap": '<path d="m2 10 10-6 10 6-10 6-10-6ZM6 13v4c3.6 2.7 8.4 2.7 12 0v-4M22 10v7"/>',
    "clock-3": '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    "calendar-check-2": '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18m-12 6 2 2 4-4"/>',
    "wallet": '<rect x="3" y="6" width="18" height="15" rx="2"/><path d="M5 6V4h13M16 13h6v5h-6a2.5 2.5 0 0 1 0-5Z"/>',
    "plus": '<path d="M12 5v14M5 12h14"/>',
    "search": '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
    "file-down": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"/><path d="M14 2v6h6m-8 4v7m0 0 3-3m-3 3-3-3"/>',
    "layers-3": '<path d="m12 2 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 17l9 5 9-5"/>',
    "shield-check": '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
    "badge-check": '<path d="m9 4 3-2 3 2 4 1 1 4 2 3-2 3-1 4-4 1-3 2-3-2-4-1-1-4-2-3 2-3 1-4 4-1Z"/><path d="m8 12 2.5 2.5L16 9"/>',
    "trending-up": '<path d="m3 17 7-7 4 4 7-7M15 7h6v6"/>',
    "user-round": '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    "briefcase-business": '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18m-11 0v2h4v-2"/>',
    "circle-help": '<circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.5 2.5 0 1 1 4.4 1.6C13 12 12 12.2 12 14m0 3h.01"/>',
    "book-user": '<rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="9" r="3"/><path d="M7.5 17a4.5 4.5 0 0 1 9 0"/>',
    "school": '<path d="m3 10 9-7 9 7v11H3V10ZM8 21v-7h8v7M7 10h.01M12 10h.01M17 10h.01"/>',
    "download": '<path d="M12 3v12m0 0 5-5m-5 5-5-5M4 17v4h16v-4"/>',
    "ellipsis": '<circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none"/>',
    "info": '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
    "refresh-cw": '<path d="M20 11a8 8 0 0 0-14-5L3 9m0-5v5h5M4 13a8 8 0 0 0 14 5l3-3m0 5v-5h-5"/>'
  };
  function svg(name, extra) {
    var shape = paths[name] || paths.sparkles;
    var cls = extra ? ' class="' + String(extra).replace(/[^a-zA-Z0-9 _-]/g, '') + '"' : '';
    return '<svg' + cls + ' viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + shape + '</svg>';
  }
  function hydrate(root) {
    (root || document).querySelectorAll("[data-icon]").forEach(function (node) {
      var name = node.getAttribute("data-icon");
      if (paths[name]) node.innerHTML = svg(name);
    });
  }
  window.GMIcons = { svg: svg, hydrate: hydrate };
  hydrate(document);
})();