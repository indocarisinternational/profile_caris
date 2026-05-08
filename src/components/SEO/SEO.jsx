import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = "Indo Caris International - IT Consultant & Digital Solutions Jakarta",
  description = "Leading IT consultant in Jakarta providing scalable digital solutions, software development, and innovative technology services for businesses across Indonesia.",
  keywords = "IT Consultant Jakarta, Jasa IT Support, Digital Solutions Indonesia, Software Development Jakarta, Technology Consultant Indonesia",
  image = "/og-image.jpg",
  url = "https://carisinternational.com",
  type = "website",
  author = "Indo Caris International",
  siteName = "Indo Caris International",
  locale = "id_ID",
  alternateLocale = "en_US"
}) => {
  const fullTitle = title.includes("Indo Caris International") ? title : `${title} | Indo Caris International`;
  const canonicalUrl = url.startsWith('http') ? url : `https://carisinternational.com${url}`;
  const imageUrl = image.startsWith('http') ? image : `https://carisinternational.com${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Indonesian" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={alternateLocale} />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:site" content="@carisinternational" />
      <meta name="twitter:creator" content="@carisinternational" />
      
      {/* Additional Meta Tags for Indonesian Market */}
      <meta name="geo.region" content="ID-JK" />
      <meta name="geo.placename" content="Jakarta" />
      <meta name="geo.position" content="-6.2088;106.8456" />
      <meta name="ICBM" content="-6.2088, 106.8456" />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#1f2937" />
      <meta name="msapplication-TileColor" content="#1f2937" />
    </Helmet>
  );
};

export default SEO;

