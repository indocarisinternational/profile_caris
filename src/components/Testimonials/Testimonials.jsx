import { useState, useEffect } from "react";
import {
  Star,
  MessageSquare,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

export const TestimonialData = [
  {
    name: "Robert Fox",
    profession: "CEO, Parkview Int. Ltd",
    comment: "Indo Caris International helped streamline our digital infrastructure. Their innovative solutions saved us both time and resources.",
    imgSrc: "/testimonial/user.svg",
    rating: 5,
  },
  {
    name: "Leslie Alexander",
    profession: "Head of Marketing, BrightWave Media",
    comment: "The professionalism and attention to detail were outstanding. They understood our needs and delivered beyond expectations.",
    imgSrc: "/testimonial/userone.png",
    rating: 5,
  },
  {
    name: "Cody Fisher",
    profession: "Founder, NovaTech Solutions",
    comment: "Working with Indo Caris International has been a game-changer. Their scalable systems allowed us to expand rapidly without issues.",
    imgSrc: "/testimonial/usertwo.png",
    rating: 5,
  },
  {
    name: "Esther Howard",
    profession: "Operations Manager, GreenLeaf Co.",
    comment: "They delivered the project ahead of schedule with impeccable quality. Truly a partner we can rely on for the long term.",
    imgSrc: "/testimonial/userthree.png",
    rating: 5,
  },
];

const Testimonial = () => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === TestimonialData.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonial" className="py-32 bg-black overflow-hidden relative">
      <div className="absolute inset-0 grid-background opacity-5" />
      
      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Content Left */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8">
              <MessageSquare className="text-white/60 w-4 h-4" />
              <span className="text-white/60 font-bold text-xs uppercase tracking-widest">
                Success Stories
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-white mb-8">
              What our <span className="text-white/40">partners say.</span>
            </h2>
            <div className="flex gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => setCurrent(current === 0 ? TestimonialData.length - 1 : current - 1)}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
              >
                <ChevronLeft className="text-white" />
              </button>
              <button 
                onClick={() => setCurrent(current === TestimonialData.length - 1 ? 0 : current + 1)}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
              >
                <ChevronRight className="text-white" />
              </button>
            </div>
          </div>

          {/* Card Right */}
          <div className="flex-1 w-full max-w-xl">
            <div className="relative h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-10 lg:p-14 flex flex-col justify-between"
                >
                  <Quote className="text-white/10 w-16 h-16 absolute top-8 right-8" />
                  
                  <div className="relative z-10">
                    <div className="flex gap-1 mb-8">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-white fill-white" />
                      ))}
                    </div>
                    <blockquote className="text-xl lg:text-2xl text-white font-medium leading-relaxed italic">
                      "{TestimonialData[current].comment}"
                    </blockquote>
                  </div>

                  <div className="flex items-center gap-4 mt-8 pt-8 border-t border-white/5">
                    <img 
                      src={TestimonialData[current].imgSrc} 
                      alt={TestimonialData[current].name}
                      className="w-12 h-12 rounded-full border border-white/10"
                    />
                    <div>
                      <h4 className="text-white font-bold text-lg">{TestimonialData[current].name}</h4>
                      <p className="text-white/40 text-sm font-medium">{TestimonialData[current].profession}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonial;
