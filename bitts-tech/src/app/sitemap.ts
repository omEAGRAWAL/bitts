import type { MetadataRoute } from "next";

const baseUrl = "https://bittstech.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/services",
    "/work",
    "/work/travel-suite",
    "/work/construction-suite",
    "/contact",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
