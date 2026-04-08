import type { APIRoute } from "astro";
import { siteUrl } from "../lib/language-seo";

export const GET: APIRoute = ({ site }) => {
  const origin = site?.toString().replace(/\/$/, "") ?? siteUrl;

  return new Response(
    [
      "User-agent: *",
      "Allow: /",
      "",
      `Sitemap: ${origin}/sitemap.xml`,
      `Host: ${new URL(origin).host}`,
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    },
  );
};

