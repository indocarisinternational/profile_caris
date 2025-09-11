import Image from "next/image";

const Newsletter = () => {
  return (
    <section>
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 md:grid-cols-12 xl:gap-x-8">
          {/* Mobile */}
          <div
            className="col-span-12 bg-cover bg-no-repeat md:hidden"
            style={{
              backgroundImage: "url('/images/newsletter/bgg.png')",
              backgroundPosition: "center top",
              minHeight: "420px", // tinggi aman untuk mobile
              paddingTop: "4rem", // jarak atas konten
              paddingBottom: "2rem", // jarak bawah konten
            }}
          >
            <NewsletterContent isMobile />
          </div>

          {/* Desktop */}
          <div
            className="col-span-12 bg-cover bg-no-repeat hidden md:block"
            style={{
              backgroundImage: "url('/images/newsletter/bgFile.png')",
              backgroundPosition: "center top",
            }}
          >
            <NewsletterContent />
          </div>
        </div>
      </div>
    </section>
  );
};

const NewsletterContent = ({ isMobile }: { isMobile?: boolean }) => {
  return (
    <div className={`${isMobile ? "px-4" : "lg:mx-64 lg:my-24"} mb-10`}>
      <h3 className="text-4xl md:text-5xl text-center font-semibold text-white mb-3">
        Newsletter.
      </h3>
      <h3 className="text-base font-normal text-white/75 text-center mb-8">
        Subscribe our newsletter for discounts, <br /> promo and many more.
      </h3>
      <div>
        <div className="relative text-white flex flex-row-reverse rounded-full pt-5 lg:pt-0">
          <input
            type="email"
            name="q"
            className="py-6 lg:py-8 text-sm md:text-lg w-full mx-3 text-black rounded-full pl-8 focus:outline-none focus:text-black"
            placeholder="Enter your email address"
            autoComplete="off"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-6 pt-5 lg:pt-0">
            <button
              type="submit"
              className="p-3 lg:p-5 bg-ultramarine hover:bg-midnightblue duration-150 ease-in-out rounded-full"
            >
              <Image
                src="/images/newsletter/send.svg"
                alt="send-icon"
                width={30}
                height={30}
                className="invert"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
