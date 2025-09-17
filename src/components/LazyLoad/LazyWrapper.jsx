import { lazy, Suspense } from 'react';

// Lazy load components
const LazyProjects = lazy(() => import('../Projects/Projects'));
const LazyTeams = lazy(() => import('../Team/Teams'));
const LazyTestimonial = lazy(() => import('../Testimonials/Testimonials'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

// Wrapper components with Suspense
export const ProjectsLazy = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <LazyProjects />
  </Suspense>
);

export const TeamsLazy = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <LazyTeams />
  </Suspense>
);

export const TestimonialLazy = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <LazyTestimonial />
  </Suspense>
);

