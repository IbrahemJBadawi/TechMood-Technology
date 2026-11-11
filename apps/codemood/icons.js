/* SVG icon set, in the line-icon style of the TechMood family. No external runtime. */
(function(){"use strict";
var shapes={
"house":'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21v-8h6v8"/>',
"route":'<circle cx="6" cy="19" r="2"/><path d="M9 19h7a4 4 0 0 0 0-8H9a4 4 0 0 1 0-8h7"/><circle cx="18" cy="3" r="2"/>',
"code-2":'<path d="m16 18 6-6-6-6M8 6l-6 6 6 6M14 4l-4 16"/>',
"trophy":'<path d="M8 21h8m-4-4v4M7 4h10v6a5 5 0 0 1-10 0V4ZM7 6H4v2a4 4 0 0 0 4 4M17 6h3v2a4 4 0 0 1-4 4"/>',
"settings":'<circle cx="12" cy="12" r="4"/><path d="m4 10-2 2 2 2 1 3 3 1 2 3h4l2-3 3-1 1-3 2-2-2-2-1-3-3-1-2-3h-4L8 6 5 7z"/>',
"user-round":'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
"zap":'<path d="m13 2-9 11h7l-1 9 10-12h-7z"/>',
"flame":'<path d="M12 22c5 0 8-3 8-8 0-4-2-7-4-9 0 4-2 5-3 5-1-4-3-6-5-8 1 5-1 7-2 9-4 7 0 11 6 11Z"/>',
"check-circle-2":'<circle cx="12" cy="12" r="10"/><path d="m7 12 3 3 7-7"/>',
"check":'<path d="m5 12 4 4L19 6"/>',
"arrow-left":'<path d="M19 12H5m7-7-7 7 7 7"/>',
"arrow-right":'<path d="M5 12h14m-7-7 7 7-7 7"/>',
"arrow-up-left":'<path d="M7 17 17 7M7 7h10v10"/>',
"play":'<path d="m8 5 12 7-12 7V5Z"/>',
"terminal":'<rect x="3" y="4" width="18" height="16" rx="3"/><path d="m7 9 3 3-3 3m5 0h5"/>',
"book-open":'<path d="M12 7c-3-2-7-2-10-1v13c4-1 7-1 10 1m0-13c3-2 7-2 10-1v13c-4-1-7-1-10 1V7Z"/>',
"star":'<path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>',
"sparkles":'<path d="m12 3 2 7 7 2-7 2-2 7-2-7-7-2 7-2 2-7ZM5 3v4m-2-2h4M19 17v4m-2-2h4"/>',
"clock":'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
"lock-keyhole":'<rect x="4" y="10" width="16" height="12" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v3"/>',
"chevron-left":'<path d="m15 18-6-6 6-6"/>',
"chevron-down":'<path d="m6 9 6 6 6-6"/>',
"menu":'<path d="M4 6h16M4 12h16M4 18h16"/>',
"x":'<path d="M18 6 6 18M6 6l12 12"/>',
"circle-help":'<circle cx="12" cy="12" r="10"/><path d="M9.5 9a3 3 0 1 1 5 2c-1.5 1-2.5 1.5-2.5 3M12 17h.01"/>',
"lightbulb":'<path d="M9 18h6m-5 3h4M8 15c-2-2-3-3-3-6a7 7 0 0 1 14 0c0 3-1 4-3 6l-1 3H9z"/>',
"heart":'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
"target":'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
"rocket":'<path d="M5 17c-2-4-2-6 2-9l9-4c2 2 2 5-1 9l-5 5-5-1Z"/><path d="m9 15-4 4m7-9 2 2M4 14l-2 3 5 2m8-14 3-3 4 5-3 2"/>',
"graduation-cap":'<path d="m2 9 10-5 10 5-10 5zM6 12v5c4 3 8 3 12 0v-5M22 9v7"/>',
"layers":'<path d="m12 2 10 6-10 6L2 8zM2 12l10 6 10-6M2 16l10 6 10-6"/>',
"refresh-ccw":'<path d="M3 12a9 9 0 0 1 15-6l3 3M21 3v6h-6M21 12a9 9 0 0 1-15 6l-3-3m6 0H3v6"/>',
"download":'<path d="M12 2v13m-5-5 5 5 5-5M4 17v4h16v-4"/>',
"trash-2":'<path d="M3 6h18M8 6V4h8v2m3 0-1 15H6L5 6m5 4v7m4-7v7"/>',
"info":'<circle cx="12" cy="12" r="10"/><path d="M12 11v6m0-10v.01"/>',
"keyboard":'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 13h.01M10 13h.01M14 13h.01M18 13h.01M7 16h10"/>',
"award":'<circle cx="12" cy="8" r="6"/><path d="m8 13-2 9 6-3 6 3-2-9"/>',
"search":'<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>',
"shield-check":'<path d="M12 2 4 6v6c0 5 3 8 8 10 5-2 8-5 8-10V6z"/><path d="m8 12 3 3 5-5"/>',
"moon":'<path d="M20 15a8 8 0 0 1-11-11 8 8 0 1 0 11 11Z"/>',
"sun":'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4m0-14.2-1.4 1.4M6.3 17.7l-1.4 1.4"/>'
};
function svg(name,cls){return '<svg viewBox="0 0 24 24" width="20" height="20" class="'+(cls||'')+'" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(shapes[name]||shapes.star)+'</svg>'}
function hydrate(root){(root||document).querySelectorAll("[data-icon]").forEach(function(el){el.innerHTML=svg(el.getAttribute("data-icon"));el.removeAttribute("data-icon")})}
window.CMIcons={svg:svg,hydrate:hydrate};
})();