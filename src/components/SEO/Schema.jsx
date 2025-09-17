import { Helmet } from 'react-helmet-async';

const Schema = ({ type = "organization", data = {} }) => {
  const getOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Indo Caris International",
    "alternateName": "Caris International",
    "url": "https://caris.web.id",
    "logo": "https://caris.web.id/logo.png",
    "description": "Leading IT consultant in Jakarta providing scalable digital solutions, software development, and innovative technology services for businesses across Indonesia.",
    "foundingDate": "2019",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jakarta Business District",
      "addressLocality": "Jakarta",
      "addressRegion": "DKI Jakarta",
      "postalCode": "12345",
      "addressCountry": "ID"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+62-21-1234-5678",
      "contactType": "customer service",
      "areaServed": "ID",
      "availableLanguage": ["Indonesian", "English"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/indo-caris-international",
      "https://www.instagram.com/carisinternational"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "IT Consulting Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Software Development",
            "description": "Custom software development solutions for businesses"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Digital Transformation",
            "description": "Complete digital transformation consulting and implementation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "IT Support Services",
            "description": "Comprehensive IT support and maintenance services"
          }
        }
      ]
    },
    ...data
  });

  const getLocalBusinessSchema = () => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://caris.web.id/#localbusiness",
    "name": "Indo Caris International",
    "image": "https://caris.web.id/logo.png",
    "description": "Professional IT consulting and digital solutions provider in Jakarta, Indonesia. Specializing in software development, digital transformation, and technology consulting services.",
    "url": "https://caris.web.id",
    "telephone": "+62-21-1234-5678",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jakarta Business District",
      "addressLocality": "Jakarta",
      "addressRegion": "DKI Jakarta",
      "postalCode": "12345",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -6.2088,
      "longitude": 106.8456
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "50"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Robert Fox"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Excellent IT consulting services. They delivered our project on time and exceeded our expectations."
      }
    ],
    ...data
  });

  const getServiceSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": data.name || "IT Consulting Services",
    "description": data.description || "Professional IT consulting and digital solutions for businesses in Jakarta and across Indonesia.",
    "provider": {
      "@type": "Organization",
      "name": "Indo Caris International",
      "url": "https://caris.web.id"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Indonesia"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "IT Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Software Development",
            "description": "Custom web and mobile application development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Digital Transformation",
            "description": "Business process digitization and automation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "IT Consulting",
            "description": "Strategic technology consulting and planning"
          }
        }
      ]
    },
    ...data
  });

  const getPersonSchema = (person) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": person.name,
    "jobTitle": person.jobTitle,
    "worksFor": {
      "@type": "Organization",
      "name": "Indo Caris International",
      "url": "https://caris.web.id"
    },
    "url": person.url || `https://caris.web.id/${person.slug}`,
    "image": person.image,
    "description": person.description,
    "sameAs": person.socialLinks || [],
    ...data
  });

  const getBreadcrumbSchema = (breadcrumbs) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  });

  const getSchema = () => {
    switch (type) {
      case 'organization':
        return getOrganizationSchema();
      case 'localbusiness':
        return getLocalBusinessSchema();
      case 'service':
        return getServiceSchema();
      case 'person':
        return getPersonSchema(data);
      case 'breadcrumb':
        return getBreadcrumbSchema(data);
      default:
        return getOrganizationSchema();
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(getSchema())}
      </script>
    </Helmet>
  );
};

export default Schema;

