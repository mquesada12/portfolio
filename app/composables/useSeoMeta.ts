interface SeoOptions {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export function usePageSeo(options: SeoOptions) {
  const { title, description, image, url } = options;

  useHead({
    title,
    meta: [{ name: "description", content: description }],
  });

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: image || "/images/og-default.jpg",
    ogUrl: url,
    twitterCard: "summary_large_image",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image || "/images/og-default.jpg",
  });
}