import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://theinnermap.co.uk";
  const routes = ["", "/start", "/map", "/approach", "/evidence", "/about", "/privacy", "/accessibility"];
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date("2026-08-09"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/start" || route === "/map" ? 0.9 : 0.7,
  }));
}
