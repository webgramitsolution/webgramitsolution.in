import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "webgram-ad-consent";
const AD_GUARD_KEY = "webgram-ad-guard";
const AD_CLICK_WINDOW_MS = 60_000;
const AD_CLICK_LIMIT = 3;
type Consent = "accepted" | "rejected" | null;
const CONSENT_REGIONS = new Set(["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IS", "IE", "IT", "LV", "LI", "LT", "LU", "MT", "NL", "NO", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "GB", "CH"]);
const PUBLISHER_ID = "ca-pub-5971464853495085";

export const BLOG_AD_SLOTS = {
  top: "9892982015",
  category: "9892982015",
  detailLeft: "6145308694",
  detailRight: "6145308694",
  detailContent: "",
  articleFeed: "6449997818",
  articleContent: "4831443201",
  afterComments: "9845020174",
  afterPreview: "9845020174",
} as const;

export type BlogAdPosition = keyof typeof BLOG_AD_SLOTS;

function loadAds() {
  if (document.querySelector('script[data-webgram-ads="true"]')) return;
  const script = document.createElement("script");
  script.async = true;
  script.crossOrigin = "anonymous";
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}`;
  script.dataset["webgramAds"] = "true";
  document.head.appendChild(script);
}

export function BlogAdsConsent({ context = "blog" }: { context?: "blog" | "game" }) {
  const [consent, setConsent] = useState<Consent>(null);
  useEffect(() => {
    const saved = window.localStorage.getItem(CONSENT_KEY) as Consent;
    if (saved === "accepted") { setConsent(saved); loadAds(); }
    else if (saved === "rejected") setConsent(saved);
    else if (window.location.hostname === "localhost") setConsent(null);
    else {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 2000);
      fetch("/cdn-cgi/trace", { signal: controller.signal }).then((response) => response.ok ? response.text() : Promise.reject()).then((text) => {
        const country = text.match(/^loc=([^\r\n]+)/m)?.[1] ?? "XX";
        if (country !== "XX" && country !== "T1" && !CONSENT_REGIONS.has(country)) { window.localStorage.setItem(CONSENT_KEY, "accepted"); setConsent("accepted"); window.dispatchEvent(new CustomEvent("webgram:ad-consent", { detail: "accepted" })); loadAds(); }
        else setConsent(null);
      }).catch(() => setConsent(null)).finally(() => window.clearTimeout(timeout));
    }
    const open = () => setConsent(null);
    window.addEventListener("webgram:cookie-settings", open);
    return () => { window.removeEventListener("webgram:cookie-settings", open); };
  }, []);
  function choose(value: Exclude<Consent, null>) { window.localStorage.setItem(CONSENT_KEY, value); setConsent(value); window.dispatchEvent(new CustomEvent("webgram:ad-consent", { detail: value })); if (value === "accepted") loadAds(); }
  if (consent) return null;
  return <aside className="fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-3xl rounded-md border border-border bg-card p-4 shadow-xl" aria-label="Advertising cookie choices"><div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center"><div><h2 className="text-base font-extrabold text-navy">Your advertising choice</h2><p className="mt-1 text-xs text-muted-foreground">{context === "game" ? "Ads help support the free game." : "Blog ads help support our journal."} Allow advertising cookies for delivery and measurement, or reject them and continue.</p></div><div className="flex gap-2"><Button variant="outline" onClick={() => choose("rejected")}>Reject</Button><Button onClick={() => choose("accepted")}>Accept</Button></div></div></aside>;
}

export function BlogAdBand({ label = "Advertisement", position = "category", rail = false, compactRail = false }: { label?: string; position?: BlogAdPosition; rail?: boolean; compactRail?: boolean }) {
  const slot = BLOG_AD_SLOTS[position];
  const adRef = useRef<HTMLModElement>(null);
  const [accepted, setAccepted] = useState(false);
  const [guarded, setGuarded] = useState(false);
  const [delivery, setDelivery] = useState<"loading" | "unfilled" | "failed">("loading");
  useEffect(() => {
    const syncConsent = () => { setAccepted(window.localStorage.getItem(CONSENT_KEY) === "accepted"); setGuarded(window.sessionStorage.getItem(AD_GUARD_KEY) === "blocked"); };
    syncConsent();
    window.addEventListener("webgram:ad-consent", syncConsent);
    window.addEventListener("webgram:ad-guard", syncConsent);
    return () => { window.removeEventListener("webgram:ad-consent", syncConsent); window.removeEventListener("webgram:ad-guard", syncConsent); };
  }, []);
  function registerAdInteraction() {
    const now = Date.now();
    const raw = window.sessionStorage.getItem(AD_GUARD_KEY);
    let parsed = { startedAt: now, count: 0 };
    if (raw && raw !== "blocked") {
      try {
        const stored = JSON.parse(raw) as { startedAt?: unknown; count?: unknown };
        if (typeof stored.startedAt === "number" && typeof stored.count === "number") parsed = { startedAt: stored.startedAt, count: stored.count };
      } catch { window.sessionStorage.removeItem(AD_GUARD_KEY); }
    }
    const state = now - parsed.startedAt > AD_CLICK_WINDOW_MS ? { startedAt: now, count: 1 } : { startedAt: parsed.startedAt, count: parsed.count + 1 };
    if (state.count >= AD_CLICK_LIMIT) { window.sessionStorage.setItem(AD_GUARD_KEY, "blocked"); setGuarded(true); window.dispatchEvent(new Event("webgram:ad-guard")); }
    else window.sessionStorage.setItem(AD_GUARD_KEY, JSON.stringify(state));
  }
  useEffect(() => {
    if (!slot || !accepted || guarded || !adRef.current) return;
    loadAds();
    const element = adRef.current;
    let retry: number | undefined;
    const initialize = () => {
      if (element.dataset["adStatus"] || element.dataset["webgramQueued"]) return;
      if (element.getBoundingClientRect().width === 0) return;
      try {
        const adsWindow = window as Window & { adsbygoogle?: unknown[] };
        adsWindow.adsbygoogle = adsWindow.adsbygoogle ?? [];
        adsWindow.adsbygoogle.push({});
        element.dataset["webgramQueued"] = "true";
      } catch { retry = window.setTimeout(initialize, 1000); }
    };
    const resize = new ResizeObserver(initialize);
    resize.observe(element);
    const status = new MutationObserver(() => { if (element.dataset["adStatus"] === "unfilled") setDelivery("unfilled"); });
    status.observe(element, { attributes: true, attributeFilter: ["data-ad-status"] });
    const script = document.querySelector<HTMLScriptElement>('script[data-webgram-ads="true"]');
    const fail = () => setDelivery("failed");
    script?.addEventListener("error", fail);
    initialize();
    return () => { resize.disconnect(); status.disconnect(); if (retry !== undefined) window.clearTimeout(retry); script?.removeEventListener("error", fail); };
  }, [accepted, guarded, slot]);
  const fluid = position === "articleFeed" || position === "articleContent";
  const multiplex = position === "afterComments" || position === "afterPreview";
  return <aside className={rail ? compactRail ? "mx-auto w-full max-w-[160px]" : "mx-auto w-[160px]" : "w-full py-4"} aria-label={label} onPointerDownCapture={registerAdInteraction}><div className={`grid place-items-center border border-border bg-muted/35 ${rail ? "min-h-[600px] rounded-md" : "min-h-[110px] overflow-hidden"}`}><span className="sr-only">Advertisement</span>{slot && accepted && !guarded ? <><ins key={slot} ref={adRef} className={`adsbygoogle block w-full ${rail ? "min-h-[600px]" : "min-h-[110px]"} ${position === "articleContent" ? "text-center" : ""}`} data-ad-client={PUBLISHER_ID} data-ad-slot={slot} data-ad-format={fluid ? "fluid" : multiplex ? "autorelaxed" : rail ? "vertical" : "auto"} data-ad-layout={position === "articleContent" ? "in-article" : undefined} data-ad-layout-key={position === "articleFeed" ? "-gw-3+1f-3d+2z" : undefined} data-full-width-responsive={fluid || multiplex ? undefined : "true"} />{delivery !== "loading" ? <p className="px-3 py-2 text-center text-[13px] text-muted-foreground">{delivery === "unfilled" ? "No advertisement available right now" : "Advertisement could not load"}</p> : null}</> : <span className="px-3 text-center text-[13px] font-semibold uppercase text-muted-foreground">{guarded ? "Advertisements paused" : label}<small className="mt-1 block text-[13px] normal-case">{guarded ? "Unusual rapid activity was detected for this session" : slot ? "Accept advertising cookies to load this ad" : "Reserved ad position"}</small></span>}</div></aside>;
}

export function openCookieSettings() { if (typeof window !== "undefined") window.dispatchEvent(new Event("webgram:cookie-settings")); }