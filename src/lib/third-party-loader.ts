export const GTM_ID = "GTM-N394F8FJ";

export const GTM_INITIALIZATION = `
window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }
gtag('js', new Date());
window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

window.addEventListener('load', function () {
  var start = function () {
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtm.js?id=${GTM_ID}';
    document.head.appendChild(script);
  };
  if ('requestIdleCallback' in window) window.requestIdleCallback(start, { timeout: 1200 });
  else setTimeout(start, 0);
}, { once: true });
`;
