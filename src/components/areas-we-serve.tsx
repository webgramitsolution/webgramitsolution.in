import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { locationGroups } from "@/lib/locations";

export function AreasWeServe() {
  return (
    <nav aria-label="Areas we serve" className="border-y border-border bg-sky-soft text-navy">
      <div className="page-shell py-7">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <h2 className="text-xl font-extrabold">Areas We Serve</h2>
          <Link to="/locations" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
            All service areas <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-4 space-y-4">
          {locationGroups.map((group) => (
            <div key={group.title} className="grid gap-1.5 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-4">
              <h3 className="py-1 text-sm font-extrabold">{group.title}</h3>
              <ul className="flex flex-wrap gap-x-3 gap-y-1">
                {group.locations.map(({ city, slug }) => (
                  <li key={slug} className="border-l border-border pl-3">
                    <Link to="/locations/$city" params={{ city: slug }} className="inline-block py-1 text-sm text-muted-foreground hover:text-primary hover:underline">
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
