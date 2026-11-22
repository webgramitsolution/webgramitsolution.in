import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  beforeLoad: ({ location }) => {
    throw redirect({
      href: `/about-us${location.searchStr}${location.hash ? `#${location.hash}` : ""}`,
      statusCode: 301,
      replace: true,
    });
  },
});
