import { useState, useEffect } from "react";
import {
  Star,
  MessageSquare,
  Quote,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export const TestimonialData = [
  {
    name: "Robert Fox",
    profession: "CEO, Parkview Int. Ltd",
    comment:
      "Indo Caris International helped streamline our digital infrastructure. Their innovative solutions saved us both time and resources.",
    imgSrc: "/testimonial/user.svg",
    rating: 5,
  },
  {
    name: "Leslie Alexander",
    profession: "Head of Marketing, BrightWave Media",
    comment:
      "The professionalism and attention to detail were outstanding. They understood our needs and delivered beyond expectations.",
    imgSrc: "/testimonial/userone.png",
    rating: 5,
  },
  {
    name: "Cody Fisher",
    profession: "Founder, NovaTech Solutions",
    comment:
      "Working with Indo Caris International has been a game-changer. Their scalable systems allowed us to expand rapidly without issues.",
    imgSrc: "/testimonial/usertwo.png",
    rating: 5,
  },
  {
    name: "Esther Howard",
    profession: "Operations Manager, GreenLeaf Co.",
    comment:
      "They delivered the project ahead of schedule with impeccable quality. Truly a partner we can rely on for the long term.",
    imgSrc: "/testimonial/userthree.png",
    rating: 5,
  },
  {
    name: "Courtney Henry",
    profession: "Product Manager, Visionary Apps",
    comment:
      "From start to finish, the team was responsive and insightful. Their innovative ideas made our platform far more engaging.",
    imgSrc: "/testimonial/user.svg",
    rating: 5,
  },
  {
    name: "Darlene Robertson",
    profession: "CTO, Silverline Global",
    comment:
      "Their technical expertise and dedication are unmatched. Every challenge was met with a smart, future-proof solution.",
    imgSrc: "/testimonial/userone.png",
    rating: 5,
  },
];

const Testimonial = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const getSlidesToShow = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }
    return 3;
  };

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(getSlidesToShow());
      setCurrentSlide(0);
    };

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const maxSlides = Math.max(0, TestimonialData.length - slidesToShow);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlides ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlides : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(Math.min(index, maxSlides));
  };

  // === Auto Slide ===
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // 3 detik
    return () => clearInterval(interval);
  }, [isAutoPlaying, maxSlides, slidesToShow]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <div className="flex items-center gap-0.5 sm:gap-1">
        {Array(fullStars)
          .fill(null)
          .map((_, i) => (
            <Star
              key={`full-${i}`}
              className="text-yellow-500 fill-yellow-500 w-4 h-4 sm:w-5 sm:h-5"
            />
          ))}
        {halfStars > 0 && (
          <Star className="text-yellow-500 fill-yellow-500/50 w-4 h-4 sm:w-5 sm:h-5" />
        )}
        {Array(emptyStars)
          .fill(null)
          .map((_, i) => (
            <Star
              key={`empty-${i}`}
              className="text-gray-300 w-4 h-4 sm:w-5 sm:h-5"
            />
          ))}
      </div>
    );
  };

  return (
    <section
      id="testimonial"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50/30"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 px-3 sm:px-4 py-2 rounded-full mb-4">
            <MessageSquare className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-blue-700 font-semibold text-xs sm:text-sm">
              {t("testimonials.badge")}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">
            {t("testimonials.title")} <span className="text-blue-600">{t("testimonials.title_highlight")}</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
            {t("testimonials.description")}
          </p>
        </div>

        {/* Cards */}
        <div className="relative">
          {/* Arrows (desktop) */}
          <div className="hidden md:block">
            <button
              onClick={prevSlide}
              className="absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" />
            </button>
          </div>

          {/* Cards container */}
          <div
            className="overflow-hidden px-2 sm:px-4"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out gap-4 sm:gap-6 py-4 sm:py-6"
              style={{
                transform: `translateX(-${currentSlide * (100 / slidesToShow)
                  }%)`,
              }}
            >
              {TestimonialData.map((item, i) => (
                <div
                  key={i}
                  className={`flex-shrink-0 ${slidesToShow === 1
                    ? "w-full"
                    : slidesToShow === 2
                      ? "w-1/2"
                      : "w-1/3"
                    }`}
                >
                  <div className="bg-white rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 group relative min-h-[280px] sm:min-h-[320px] flex flex-col mt-4 sm:mt-6">
                    {/* Quote */}
                    <div className="absolute -top-2 sm:-top-3 left-4 sm:left-6 bg-blue-600 rounded-full p-2 sm:p-3 shadow-lg">
                      <Quote className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                    </div>

                    {/* Photo */}
                    <div className="absolute -top-2 sm:-top-3 right-4 sm:right-6">
                      <div className="relative">
                        <img
                          src={item.imgSrc}
                          alt={`${item.name} - ${item.profession}`}
                          className="w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-full object-cover border-3 sm:border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 rounded-full p-0.5 sm:p-1">
                          <Check className="text-white w-2 h-2 sm:w-3 sm:h-3" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pt-8 sm:pt-10 flex flex-col flex-grow">
                      <div className="mb-3 sm:mb-4">
                        {renderStars(item.rating)}
                      </div>
                      <blockquote className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6 font-medium italic flex-grow">
                        "{item.comment}"
                      </blockquote>
                      <div className="border-t border-gray-100 pt-3 sm:pt-4 mt-auto">
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-xs sm:text-sm lg:text-base text-gray-500 font-medium">
                          {item.profession}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-6 sm:mt-8 lg:mt-12 gap-2">
            {Array(maxSlides + 1)
              .fill(null)
              .map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${currentSlide === index
                    ? "bg-blue-600 scale-125"
                    : "bg-gray-300 hover:bg-blue-400"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
          </div>

          {/* Mobile Arrows */}
          <div className="flex justify-center gap-4 mt-4 md:hidden">
            <button
              onClick={prevSlide}
              className="w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-blue-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-blue-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
