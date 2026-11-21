import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { locationGroups } from "@/lib/locations";

export function AreasWeServe() {
  return (
    <nav aria-label="Areas we serve" className="border-y border-border bg-sky-soft text-navy">
      <div className="page-shell py-2">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-border pb-1">
          <h2 className="text-base font-extrabold">Areas We Serve</h2>
          <Link to="/locations" className="inline-flex items-center gap-1.5 py-0.5 text-xs font-bold leading-5 text-primary hover:underline">
            All service areas <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-1 space-y-1">
          {locationGroups.map((group) => (
            <div key={group.title} className="grid gap-0.5 md:grid-cols-[8.25rem_minmax(0,1fr)] md:gap-2">
              <h3 className="py-0.5 text-sm font-extrabold leading-5">{group.title}</h3>
              <ul className="flex flex-wrap gap-x-1.5 gap-y-0.5">
                {group.locations.map(({ city, slug }) => (
                  <li key={slug} className="border-l border-border pl-1.5">
                    <Link to="/locations/$city" params={{ city: slug }} className="inline-block py-0.5 text-[13px] leading-5 text-muted-foreground hover:text-primary hover:underline">
                      {city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
