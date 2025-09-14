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
          logo_url: urlData.publicUrl, // ganti dengan public URL
        };
      });

      setClients(updatedClients);
    };

    fetchClients();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4, slidesToScroll: 1 },
      },
      {
        breakpoint: 700,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 500,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <section className="text-center">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 mt-40">
        <h2 className="text-gray-800 text-2xl font-semibold">
          Trusted by Innovators Everywhere
        </h2>
        <div className="py-14 border-b border-gray-300">
          <Slider {...settings}>
            {clients.map((client) => (
              <div key={client.id} className="flex justify-center">
                <img
                  src={client.logo_url}
                  alt={client.nama_client}
                  width={116}
                  height={36}
                  className="object-contain"
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
