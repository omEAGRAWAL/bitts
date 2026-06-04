export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Bitts Tech",
  url: "https://bittstech.com",
  logo: "https://bittstech.com/BittsTechMark.png",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+917358550765",
      contactType: "customer support",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/bitts-tech",
    "https://www.instagram.com/bittstech",
    "https://x.com/bittstech",
  ],
};
