import { Icon } from "@iconify/react";

const Hero = () => {
  return (
    <section id="home-section" style={{ backgroundColor: "#f6faff" }}>
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 pt-20 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 space-x-1 items-center">
          {/* Kiri */}
          <div className="col-span-6 flex flex-col gap-8">
            <div className="flex gap-2 mx-auto lg:mx-0">
              <Icon
                icon="solar:verified-check-bold"
                className="text-success text-xl inline-block me-2"
              />
              <p className="text-success text-sm font-semibold text-center lg:text-start">
                Indo Caris International
              </p>
            </div>

            <h1 className="text-midnight_text text-4xl sm:text-5xl font-semibold pt-5 lg:pt-0">
              We Create Scalable and Innovative Digital Solutions
            </h1>

            <h3 className="text-black/70 text-lg pt-5 lg:pt-0">
              Every project is a challenge we proudly embrace—driving us to
              deliver not only high-quality apps, software, and digital
              strategies, but also solutions that are scalable, innovative, and
              user-centered. With each collaboration, we aim to create
              measurable success, empowering businesses to grow, transform, and
              achieve sustainable impact in the digital era.
            </h3>

            {/* Fitur kecil */}
            <div className="flex items-center justify-between pt-10 lg:pt-4">
              <div className="flex gap-2">
                <img
                  src="/banner/check-circle.svg"
                  alt="check-image"
                  width={30}
                  height={30}
                  className="smallImage"
                />
                <p className="text-sm sm:text-lg font-normal text-black">
                  Innovation & Quality
                </p>
              </div>
              <div className="flex gap-2">
                <img
                  src="/banner/check-circle.svg"
                  alt="check-image"
                  width={30}
                  height={30}
                  className="smallImage"
                />
                <p className="text-sm sm:text-lg font-normal text-black">
                  Collaboration & Success
                </p>
              </div>
              <div className="flex gap-2">
                <img
                  src="/banner/check-circle.svg"
                  alt="check-image"
                  width={30}
                  height={30}
                  className="smallImage"
                />
                <p className="text-sm sm:text-lg font-normal text-black">
                  Growth & Impact
                </p>
              </div>
            </div>
          </div>

          {/* Kanan */}
          {/* <div className="col-span-6 flex justify-center">
            <img
              src="/banner/caris.png"
              alt="nothing"
              width={1000}
              height={805}
            />
          </div> */}
          <div className="col-span-6 flex justify-center">
            <img
              src="/banner/caris.png"
              alt="nothing"
              width={805}
              height={805}
              className="rounded-[48px] border border-black"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
