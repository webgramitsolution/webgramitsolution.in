import { Link } from "@tanstack/react-router";
import { ChevronRight, type LucideIcon } from "lucide-react";

export function CardTitle({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <h2 className="flex items-center gap-3 text-lg font-extrabold text-navy">
      <span className="grid h-8 w-8 place-items-center rounded-md bg-primary-soft text-primary">
        <Icon className="h-4 w-4" />
      </span>
      {children}
    </h2>
  );
}

export function FormPageTitle({ title }: { title: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-extrabold text-navy sm:text-3xl">{title}</h1>
        <p className="text-sm text-muted-foreground">
          Share your knowledge and ideas with our community
        </p>
      </div>
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs text-muted-foreground"
      >
        <Link to="/">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <a href="/blog">Blog</a>
        <ChevronRight className="h-3 w-3" />
        <span className="text-navy">{title}</span>
      </nav>
    </div>
  );
}

export function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <p className="grid grid-cols-[110px_1fr] border-b border-border text-xs last:border-b-0">
      <strong className="border-r border-border p-2 text-navy">{label}</strong>
      <span className="p-2">{children}</span>
    </p>
  );
}

export const cardClass = "rounded-md border border-border bg-card p-4 shadow-card sm:p-5";
