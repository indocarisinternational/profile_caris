import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import SEO from "../SEO/SEO";
import Schema from "../SEO/Schema";
import toast from "react-hot-toast";

const Contact = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            toast.success("Message sent successfully!");
            setFormData({ name: "", email: "", phone: "", message: "" });
            setIsSubmitting(false);
        }, 1500);
    };

    const contactInfo = [
        {
            icon: "solar:map-point-bold",
            title: t("detail.address"),
            value: t("contact.address"),
            href: "https://maps.google.com/?q=Bandung,Indonesia",
        },
        {
            icon: "solar:phone-bold",
            title: t("contact.phone"),
            value: t("contact.phone_number"),
            href: `tel:${t("contact.phone_number")}`,
        },
        {
            icon: "solar:letter-bold",
            title: t("contact.email"),
            value: t("contact.email_address"),
            href: `mailto:${t("contact.email_address")}`,
        },
    ];

    const socialLinks = [
        {
            icon: "tabler:brand-linkedin",
            href: "https://www.linkedin.com/company/indo-caris-international",
            label: "LinkedIn",
        },
        {
            icon: "tabler:brand-instagram",
            href: "https://www.instagram.com/carisinternational",
            label: "Instagram",
        },
    ];

    return (
        <>
            <SEO
                title={`${t("contact.title")} | Indo Caris International`}
                description={t("contact.description")}
                keywords="Contact Indo Caris International, IT Consultant Jakarta Contact, Digital Solutions Indonesia Contact"
                url="/contact"
            />
            <Schema type="localbusiness" />

            <section className="pt-32 pb-20 bg-gradient-to-br from-green-50 to-white">
                <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="mb-8">
                        <ol className="flex items-center space-x-2 text-sm">
                            <li>
                                <Link to="/" className="text-blue-600 hover:text-blue-800">
                                    {t("nav.home")}
                                </Link>
                            </li>
                            <li className="text-gray-400">/</li>
                            <li className="text-gray-600">{t("contact.title")}</li>
                        </ol>
                    </nav>

                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            {t("contact.title")}
                        </h1>
                        <p className="text-xl text-green-600 font-semibold mb-4">
                            {t("contact.subtitle")}
                        </p>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            {t("contact.description")}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                {t("contact.send")}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t("contact.name")} *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                        placeholder={t("contact.name")}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t("contact.email")} *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                        placeholder={t("contact.email")}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t("contact.phone")}
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                        placeholder={t("contact.phone")}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t("contact.message")} *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                                        placeholder={t("contact.message")}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Icon icon="solar:send-bold" />
                                            {t("contact.send")}
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    {t("contact.info_title")}
                                </h2>
                                <div className="space-y-6">
                                    {contactInfo.map((info, index) => (
                                        <a
                                            key={index}
                                            href={info.href}
                                            target={info.href.startsWith("http") ? "_blank" : undefined}
                                            rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                            className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
                                        >
                                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                                                <Icon icon={info.icon} className="text-2xl text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">{info.title}</p>
                                                <p className="text-gray-900 font-medium">{info.value}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">
                                    Follow Us
                                </h3>
                                <div className="flex gap-4">
                                    {socialLinks.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-green-100 transition-colors duration-200 group"
                                            title={social.label}
                                        >
                                            <Icon
                                                icon={social.icon}
                                                className="text-2xl text-gray-600 group-hover:text-green-600 transition-colors duration-200"
                                            />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                                <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                                    <div className="text-center">
                                        <Icon icon="solar:map-bold" className="text-6xl text-green-600 mb-4" />
                                        <p className="text-gray-600">Bandung, Indonesia</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
