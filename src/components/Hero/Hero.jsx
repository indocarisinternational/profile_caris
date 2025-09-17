import { Icon } from "@iconify/react";

const Hero = () => {
  return (
    <section id="home-section" style={{ backgroundColor: "#f6faff" }}>
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Content Section - Left */}
          <div className="order-2 lg:order-1 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <Icon
                icon="solar:verified-check-bold"
                className="text-success text-lg sm:text-xl"
              />
              <p className="text-success text-sm sm:text-base font-semibold">
                Indo Caris International
              </p>
            </div>

            {/* Main Heading */}
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-midnight_text text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Leading <span className="text-primary">IT Consultant Jakarta</span> - Creating{" "}
                <span className="text-primary">Scalable</span> Digital Solutions
              </h1>

              <p className="text-black/70 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Transform your business with Indo Caris International's expert IT consulting services. 
                We deliver innovative software development, digital transformation strategies, and 
                comprehensive technology solutions for companies across Jakarta and Indonesia.
              </p>
            </div>

            {/* Features */}
            <div className="pt-4 sm:pt-6 lg:pt-8">
              {/* Mobile - Stacked Layout */}
              <div className="flex flex-col sm:hidden space-y-4">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="flex-shrink-0">
                    <Icon
                      icon="solar:check-circle-bold"
                      className="text-success text-2xl"
                    />
                  </div>
                  <p className="text-base font-medium text-black">
                    Software Development & Innovation
                  </p>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="flex-shrink-0">
                    <Icon
                      icon="solar:check-circle-bold"
                      className="text-success text-2xl"
                    />
                  </div>
                  <p className="text-base font-medium text-black">
                    Digital Transformation Consulting
                  </p>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="flex-shrink-0">
                    <Icon
                      icon="solar:check-circle-bold"
                      className="text-success text-2xl"
                    />
                  </div>
                  <p className="text-base font-medium text-black">
                    IT Support & Technology Solutions
                  </p>
                </div>
              </div>

              {/* Tablet & Desktop - Grid Layout */}
              <div className="hidden sm:grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="flex-shrink-0">
                    <Icon
                      icon="solar:check-circle-bold"
                      className="text-success text-xl lg:text-2xl"
                    />
                  </div>
                  <p className="text-sm lg:text-base xl:text-lg font-medium text-black">
                    Software Development & Innovation
                  </p>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="flex-shrink-0">
                    <Icon
                      icon="solar:check-circle-bold"
                      className="text-success text-xl lg:text-2xl"
                    />
                  </div>
                  <p className="text-sm lg:text-base xl:text-lg font-medium text-black">
                    Digital Transformation Consulting
                  </p>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="flex-shrink-0">
                    <Icon
                      icon="solar:check-circle-bold"
                      className="text-success text-xl lg:text-2xl"
                    />
                  </div>
                  <p className="text-sm lg:text-base xl:text-lg font-medium text-black">
                    IT Support & Technology Solutions
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons - Optional */}
            <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-primary hover:bg-primary/90 text-black px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl">
                Get Started
              </button>
              <button className="border-2 border-primary text-primary hover:bg-primary hover:text-gray-400 px-8 py-3 rounded-lg font-semibold transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>

          {/* Image Section - Right */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-none">
              <img
                src="/banner.png"
                alt="Indo Caris International IT Consultant Jakarta - Professional team providing digital solutions and software development services"
                className="w-full h-auto rounded-2xl sm:rounded-3xl lg:rounded-[48px] border border-gray-200 shadow-2xl transform hover:scale-105 transition-transform duration-300"
                style={{
                  aspectRatio: "1/1",
                  objectFit: "cover",
                }}
              />
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full opacity-20 animate-pulse hidden sm:block"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-success rounded-full opacity-30 animate-pulse hidden sm:block"></div>
            </div>
          </div>
        </div>

        {/* Bottom Stats or Additional Info - Optional */}
        <div className="mt-16 sm:mt-20 lg:mt-24 pt-8 border-t border-gray-200/50">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-bold text-primary">
                100+
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Projects Completed
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-bold text-primary">
                50+
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Happy Clients
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-bold text-primary">
                5+
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Years Experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
