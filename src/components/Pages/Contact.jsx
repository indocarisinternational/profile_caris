import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../SEO/SEO";
import Schema from "../SEO/Schema";
import toast from "react-hot-toast";
import useSiteContent from "../../hooks/useSiteContent";

const DEFAULTS = {
  page_title: "Let's Start a Conversation.",
  page_subtitle: "Whether you have a specific project in mind or just want to explore how we can help your business grow, we're here to listen.",
  phone: "+62 8139 3139 307",
  email: "admin@carisinternational.com",
  location: "Jakarta, Indonesia",
};

const Contact = () => {
  const { t } = useTranslation();
  const { content: c } = useSiteContent("contact", DEFAULTS);
  const v = (k) => c[k] || DEFAULTS[k] || "";

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    { icon: "solar:phone-bold", title: "Phone", value: v("phone"), href: `tel:${v("phone").replace(/\s/g, "")}` },
    { icon: "solar:letter-bold", title: "Email", value: v("email"), href: `mailto:${v("email")}` },
    { icon: "solar:map-point-bold", title: "Location", value: v("location"), href: "#" },
    { icon: "mdi:whatsapp", title: "WhatsApp", value: "Chat Langsung", href: "https://wa.me/6281393139307?text=Halo%2C%20saya%20ingin%20tanya%20layanan%20Indo%20Caris%20International" },
  ];

  return (
    <>
      <SEO title="Contact | Indo Caris International" description="Get in touch with our IT consulting experts." keywords="Contact Indo Caris International" url="/contact" />
      <Schema type="localbusiness" />
      <section className="pt-40 pb-32 bg-black min-h-screen relative overflow-hidden text-white">
        <div className="absolute inset-0 grid-background opacity-10 pointer-events-none" />
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
                {v("page_title").split(".")[0]} <br />
                <span className="text-white/40">{v("page_title").split(".").slice(1).join(".").trim()}</span>
              </motion.h1>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">{v("page_subtitle")}</p>

              {/* WhatsApp CTA Button */}
              <a
                href="https://wa.me/6281393139307?text=Halo%2C%20saya%20ingin%20tanya%20layanan%20Indo%20Caris%20International"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 mb-4"
                style={{
                  background: "#25D366",
                  color: "#fff",
                  boxShadow: "0 0 24px rgba(37, 211, 102, 0.3)",
                }}
              >
                <Icon icon="mdi:whatsapp" className="text-2xl" />
                Chat WhatsApp Sekarang
              </a>

              {/* Trust Badge */}
              <div className="flex items-center gap-2 mb-12 text-sm text-white/40">
                <Icon icon="solar:clock-circle-bold" className="text-base" />
                <span>Kami merespons dalam 24 jam — konsultasi gratis, tanpa komitmen</span>
              </div>

              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                      <Icon icon={info.icon} className="text-xl text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-1">{info.title}</h3>
                      <a href={info.href} target={info.title === "WhatsApp" ? "_blank" : undefined} rel={info.title === "WhatsApp" ? "noopener noreferrer" : undefined} className="text-xl font-bold hover:text-accent transition-colors">{info.value}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Your Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white transition-all resize-none" placeholder="Tell us about your project..." />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-white text-black py-5 rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
