import { MetadataRoute } from "next";
import { API_URL } from "@/frontend/Path";
import { unstable_noStore as noStore } from "next/cache";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await fetch(`${API_URL}/api/blog`, {
    cache: "no-store",
  });

  noStore();

  const posts = await response.json();

  const postEntries: MetadataRoute.Sitemap = posts.map(
    ({ urlLink, updatedAt }: any) => ({
      url: `${API_URL}/${urlLink}`,
      lastModified: new Date(updatedAt),
    })
  );

  return [
    {
      url: `${API_URL}`,
      lastModified: new Date(),
    },
    {
      url: `${API_URL}/posts`,
      lastModified: new Date(),
    },
    {
      url: `${API_URL}/about`,
      lastModified: new Date(),
    },
    {
      url: `${API_URL}/disclaimer`,
      lastModified: new Date(),
    },
    {
      url: `${API_URL}/terms-privacy`,
      lastModified: new Date(),
    },
    ...postEntries,
  ];
}
