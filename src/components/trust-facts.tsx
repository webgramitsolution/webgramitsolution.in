import { CalendarCheck, Globe2, Headphones, KeyRound, type LucideIcon } from "lucide-react";

import { trustFacts } from "@/lib/trust-facts";

const icons: Record<(typeof trustFacts)[number]["id"], LucideIcon> = {
  since: CalendarCheck,
  reach: Globe2,
  ownership: KeyRound,
  support: Headphones,
};

/** Dark CTA band facts shared by service pages. */
export function TrustFacts() {
  return (
    <div className="grid grid-cols-2 gap-y-6 rounded-xl border border-on-dark/15 bg-on-dark/5 py-6 sm:grid-cols-4 sm:divide-x sm:divide-on-dark/20">
      {trustFacts.map(({ id, value, label }) => {
        const Icon = icons[id];
        return (
          <div key={id} className="px-3 text-center">
            <span className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-on-dark/50">
              <Icon className="h-5 w-5" />
            </span>
            <strong className="mt-2 block text-[17px] leading-none">{value}</strong>
            <span className="mt-1 block text-[13px] text-on-dark/75">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
