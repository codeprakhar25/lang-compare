import type { APIRoute } from "astro";
import {
  getAllComparisonPairs,
  siteUrl,
} from "../lib/language-seo";

const staticPaths = ["/", "/playground", "/compare-programming-languages"];

export const GET: APIRoute = ({ site }) => {
  const origin = site?.toString().replace(/\/$/, "") ?? siteUrl;
  const urls = [
    ...staticPaths.map((path) => ({ path, priority: path === "/" ? "1.0" : "0.8" })),
    ...getAllComparisonPairs().map((pair) => ({
      path: `/compare/${pair.slug}`,
      priority: "0.7",
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ path, priority }) => `  <url>
    <loc>${new URL(path, origin).toString()}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};

