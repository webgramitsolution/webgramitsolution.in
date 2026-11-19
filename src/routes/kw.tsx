import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/kw")({
  beforeLoad: () => { throw redirect({ to: "/", statusCode: 301 }); },
});
