import type { MetadataRoute } from "next";

/**
 * Keep the invitation out of search results. This is honoured by the major
 * crawlers; it is not access control — anyone with the link still sees it.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
