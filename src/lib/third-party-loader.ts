/**
 * Google Tag Manager (analytics, pixels, heatmaps) starts on the first visitor
 * interaction or a few seconds after the page has loaded, whichever is first.
 */
export const DEFERRED_GTM_SNIPPET = `(function(w,d,id){w.dataLayer=w.dataLayer||[];var done=false,ev=['pointerdown','keydown','touchstart','scroll'];function load(){if(done)return;done=true;ev.forEach(function(e){w.removeEventListener(e,load)});w.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});var j=d.createElement('script');j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+id;d.head.appendChild(j);}ev.forEach(function(e){w.addEventListener(e,load,{passive:true})});function later(){setTimeout(load,3500)}if(d.readyState==='complete')later();else w.addEventListener('load',later);})(window,document,'GTM-TWNQJB9');`;
