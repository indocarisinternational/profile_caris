# Caris International SEO Optimization Todo

## [ ] Preparation (COMPLETED)
- [x] Extract project
- [x] Enter project folder and install dependencies (npm i)
- [x] Project is Vite + React (not CRA or Next.js)

## [ ] Initial audit (COMPLETED)
- [x] Audit structure & deps: Vite + React + Tailwind CSS
- [x] Run dev server (localhost:5173) and observe baseline
- [x] Note current performance and structure

## [x] Rendering strategy decision
- [x] Since not Next.js, evaluate migration vs pre-rendering options
- [x] Document migration plan in RENDERING_STRATEGY.md with changed files and risks
- [x] Decision: Optimize current Vite setup with SEO enhancements

## [~] Meta tags & SEO essentials (IN PROGRESS)
- [x] Install react-helmet-async: npm i react-helmet-async
- [x] Create SEO component for managing meta tags
- [x] Add SEO component to main routes
- [ ] Debug title update issue (react-helmet-async not updating title)
- [x] Add Open Graph & Twitter meta: og:title, og:description, og:image, twitter:card

## [x] Schema Markup (Structured Data)
- [x] Create JSON-LD for Organization schema
- [x] Add LocalBusiness schema (address, phone, hours)
- [x] Add Service schema for IT consulting services
- [x] Add Person schema for team member pages
- [x] Validate JSON-LD structure locally (to be tested in QA phase)

## [x] Content & Keywords
- [x] Research primary keywords: "IT Consultant Jakarta", "Jasa IT Support", "Digital Solutions Indonesia"
- [x] Optimize headings: H1 now includes "IT Consultant Jakarta" keyword
- [x] Update hero content to include relevant IT consulting keywords
- [x] Optimize features section with "Software Development", "Digital Transformation", "IT Support"
- [x] Update meta descriptions to naturally include keywords (done in SEO component)

## [x] Images & media optimization
- [x] Audit current images in public/ folder
- [x] Create OG image for social media sharing (og-image.jpg)
- [x] Add descriptive alt text for all images including keywords
- [x] Add lazy loading to non-critical images (projects, team members)
- [x] Keep hero image eager loading for LCP optimization
- [x] Update logo alt text with SEO-friendly description
- [x] Set width & height attributes for key images to reduce CLS

## [x] Core Web Vitals & performance
- [x] Implement code-splitting and dynamic imports for non-critical components
- [x] Add bundle analyzer (rollup-plugin-visualizer) to monitor bundle size
- [x] Configure manual chunks for better code splitting (vendor, router, ui, carousel, seo)
- [x] Enable Terser minification with console/debugger removal
- [x] Lazy-load non-critical components (Projects, Teams, Testimonials)
- [x] Keep hero image eager loading for LCP optimization
- [x] Add loading spinners for lazy-loaded components

## [x] Internal linking & UX
- [x] Navigation links are working properly
- [x] Add clear CTAs (Get Started, Learn More buttons)
- [x] Implement proper internal linking structure
- [x] Add main content landmark for accessibility

## [x] Accessibility & print friendliness
- [x] Add skip links for keyboard navigation
- [x] Add proper navigation landmarks with aria-labels
- [x] Ensure all images have descriptive alt text
- [x] Add proper focus management and keyboard navigation
- [x] Add print CSS (@media print) for better print experience
- [x] Implement semantic HTML structure with main, nav landmarks

## [x] Testing & QA
- [x] Verify SEO elements on each page (homepage and team member pages)
- [x] Test team member detail pages functionality
- [x] Verify responsive design works properly
- [x] Test navigation and internal linking
- [x] Verify lazy loading components work correctly
- [x] Test accessibility features (skip links, navigation landmarks)
- [x] Verify print CSS implementation
- [x] Document findings in QA_TEST_REPORT.md

## [ ] Finalize & package
- [x] Update README with optimization details
- [x] Document all changes made

