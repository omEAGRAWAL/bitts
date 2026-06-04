export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Bitts Tech",
  url: "https://bittstech.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://bittstech.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};
