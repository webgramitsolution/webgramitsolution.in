import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Bell, CheckCircle2, FilePenLine, FileText, FolderOpen, LayoutDashboard, LogOut, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const LOGO_URL = "https://ik.imagekit.io/x3cipokny/webgram%20it%20solution?updatedAt=1790815003792";

export function BlogAuthorHeader({ admin = false, writing = false }: { admin?: boolean; writing?: boolean }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [user, setUser] = useState("");
  useEffect(() => { void supabase.auth.getUser().then(({ data }) => setUser(data.user?.email?.split("@")[0] ?? "")); }, []);
  const base = "/admin/blog";
  const items = [
    { to: "/admin/blog", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/blog", label: "My Posts", icon: FileText },
    { to: "/admin/blog/new", label: "Create New Post", icon: PlusCircle },
    { to: "/admin/blog", label: "Pending Review", icon: CheckCircle2 },
    { to: "/admin/blog", label: "Published", icon: CheckCircle2 },
    { to: "/admin/blog", label: "Drafts", icon: FilePenLine },
  ];

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    await navigate({ to: "/auth", replace: true });
  }

  return <header className="sticky top-0 z-50 border-b border-on-dark/15 bg-navy text-on-dark shadow-card">
    <div className="mx-auto grid min-h-16 w-[min(100%-1rem,1540px)] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-2">
      <Link to={base} className="shrink-0" aria-label="Webgram author dashboard"><img src={LOGO_URL} alt="Webgram IT Solution" className="h-7 w-auto brightness-0 invert" /></Link>
      <nav className="flex min-w-0 items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Author workspace">
        {items.filter((item) => !writing || item.label === "Dashboard").map(({ to, label, icon: Icon }, index) => <Button key={`${label}-${index}`} asChild variant="ghost" size={writing ? "icon" : "sm"} className={`shrink-0 text-[14px] text-on-dark hover:bg-on-dark/10 hover:text-on-dark ${label === "Create New Post" ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}`}><Link to={to} aria-label={label} title={label}><Icon className="h-3.5 w-3.5" />{!writing ? <span className="hidden lg:inline">{label}</span> : null}</Link></Button>)}
        {admin ? <Button asChild variant="ghost" size="sm" className="shrink-0 text-[14px] text-on-dark hover:bg-on-dark/10 hover:text-on-dark"><a href="/admin/blog#categories"><FolderOpen className="h-3.5 w-3.5" /><span className="hidden lg:inline">Categories</span></a></Button> : null}
      </nav>
      <div className="flex shrink-0 items-center gap-2">
        <Bell className="hidden h-5 w-5 sm:block" aria-hidden />
        <span className="grid h-8 w-8 place-items-center rounded-full bg-card text-sm font-bold text-primary" aria-hidden>{(user || "A").charAt(0).toUpperCase()}</span>
        <span className="hidden max-w-36 truncate text-xs font-semibold md:block">{admin ? "Admin" : user || "Author"}</span>
        <Button type="button" variant="ghost" size="icon" onClick={signOut} title="Sign out" aria-label="Sign out" className="text-on-dark hover:bg-on-dark/10 hover:text-on-dark"><LogOut /></Button>
      </div>
    </div>
  </header>;
}