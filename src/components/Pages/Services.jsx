import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import SEO from "../SEO/SEO";
import Schema from "../SEO/Schema";

const Services = () => {
    const { t } = useTranslation();

    const services = [
        {
            icon: "solar:code-square-bold",
            color: "blue",
            title: t("services.service1_title"),
            desc: t("services.service1_desc"),
        },
        {
            icon: "solar:chart-2-bold",
            color: "purple",
            title: t("services.service2_title"),
            desc: t("services.service2_desc"),
        },
        {
            icon: "solar:refresh-circle-bold",
            color: "green",
            title: t("services.service3_title"),
            desc: t("services.service3_desc"),
        },
        {
            icon: "solar:smartphone-bold",
            color: "orange",
            title: t("services.service4_title"),
            desc: t("services.service4_desc"),
        },
        {
            icon: "solar:cloud-bold",
            color: "cyan",
            title: t("services.service5_title"),
            desc: t("services.service5_desc"),
        },
        {
            icon: "solar:settings-bold",
            color: "pink",
            title: t("services.service6_title"),
            desc: t("services.service6_desc"),
        },
    ];

    return (
        <>
            <SEO
                title={`${t("services.title")} | Indo Caris International`}
                description={t("services.subtitle")}
                keywords="IT Services Jakarta, Software Development Indonesia, Digital Transformation, Cloud Solutions, Mobile Development"
                url="/services"
            />
            <Schema type="service" />

            <section className="pt-32 pb-20 bg-gradient-to-br from-purple-50 to-white">
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
                            <li className="text-gray-600">{t("services.title")}</li>
                        </ol>
                    </nav>

                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full mb-6">
                            <Icon icon="solar:star-bold" className="text-purple-600" />
                            <span className="text-purple-700 font-semibold text-sm">
                                {t("services.title")}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            {t("services.title")}
                        </h1>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            {t("services.subtitle")}
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                            >
                                <div
                                    className={`w-16 h-16 bg-${service.color}-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                                >
                                    <Icon
                                        icon={service.icon}
                                        className={`text-3xl text-${service.color}-600`}
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-white">
                        <h2 className="text-3xl font-bold mb-4">{t("contact.subtitle")}</h2>
                        <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                            {t("contact.description")}
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
                        >
                            {t("nav.contact")}
                            <Icon icon="solar:arrow-right-bold" />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Services;
