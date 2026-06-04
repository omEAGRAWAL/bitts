const serviceNames = [
  "Custom Websites",
  "Web Applications",
  "Business Automation",
  "Website Revamps",
  "Business Management Systems",
  "API & Integrations",
];

export const servicesSchema = {
  "@context": "https://schema.org",
  "@graph": serviceNames.map((name) => ({
    "@type": "Service",
    name,
    provider: {
      "@type": "Organization",
      name: "Bitts Tech",
      url: "https://bittstech.com",
    },
    areaServed: "India",
    serviceType: name,
    url: "https://bittstech.com/services",
  })),
};
