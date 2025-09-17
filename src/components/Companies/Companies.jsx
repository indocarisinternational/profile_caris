import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { supabase } from "../../supabaseClient";

const Companies = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase.from("clients").select("*");
      if (error) {
        console.error(error);
        return;
      }

      // Generate public URL dari storage
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
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1280, // laptop
        settings: { slidesToShow: 4, slidesToScroll: 1 },
      },
      {
        breakpoint: 1024, // tablet landscape
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 768, // tablet portrait
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 480, // smartphone
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <section className="text-center">
      <div className="container mx-auto max-w-screen-xl px-4 mt-20 sm:mt-32 lg:mt-40">
        <h2 className="text-gray-800 text-xl sm:text-2xl font-semibold">
          Trusted by Innovators Everywhere
        </h2>
        <div className="py-10 sm:py-14 border-b border-gray-300">
          <Slider {...settings}>
            {clients.map((client) => (
              <div
                key={client.id}
                className="flex justify-center items-center px-2"
              >
                <img
                  src={client.logo_url}
                  alt={client.nama_client}
                  className="object-contain max-h-14 sm:max-h-16 md:max-h-20 lg:max-h-24 w-auto"
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
