import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { supabase } from "../../supabaseClient";
import { useTranslation } from "react-i18next";

const Companies = () => {
  const { t } = useTranslation();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase.from("clients").select("*");
      if (error) {
        console.error(error);
        return;
      }

      const updatedClients = data.map((client) => {
        const { data: urlData } = supabase.storage
          .from("clients")
          .getPublicUrl(client.logo_url);

        return {
          ...client,
          logo_url: urlData.publicUrl,
        };
      });

      setClients(updatedClients);
    };

    fetchClients();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  return (
    <section className="bg-black py-20 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto max-w-screen-xl px-4">
        <h2 className="text-white/30 text-xs font-bold uppercase tracking-[0.3em] text-center mb-16">
          {t("companies.title")}
        </h2>
        <div className="relative">
          {/* Fading Edges */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />
          
          <Slider {...settings} className="client-slider">
            {clients.map((client) => (
              <div
                key={client.id}
                className="flex justify-center items-center px-8 outline-none"
              >
                <img
                  src={client.logo_url}
                  alt={client.nama_client}
                  className="object-contain h-12 w-auto opacity-30 grayscale invert hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Companies;
