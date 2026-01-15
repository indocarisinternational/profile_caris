import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import SEO from "../SEO/SEO";
import Schema from "../SEO/Schema";

const About = () => {
    const { t } = useTranslation();

    return (
        <>
            <SEO
                title={`${t("about.title")} | Indo Caris International`}
                description={t("about.description")}
                keywords="About Indo Caris International, IT Consultant Jakarta, Digital Solutions Indonesia, Company Profile"
                url="/about"
            />
            <Schema type="organization" />

            <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-white">
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
                            <li className="text-gray-600">{t("about.title")}</li>
                        </ol>
                    </nav>

                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            {t("about.title")}
                        </h1>
                        <p className="text-xl text-blue-600 font-semibold mb-4">
                            {t("about.subtitle")}
                        </p>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            {t("about.description")}
                        </p>
                    </div>

                    {/* Mission & Vision */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                                <Icon icon="solar:target-bold" className="text-3xl text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                {t("about.mission_title")}
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {t("about.mission_text")}
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                                <Icon icon="solar:eye-bold" className="text-3xl text-purple-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                {t("about.vision_title")}
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {t("about.vision_text")}
                            </p>
                        </div>
                    </div>

                    {/* Values */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            {t("about.values_title")}
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: "solar:lightbulb-bolt-bold", color: "yellow", title: t("about.value1_title"), text: t("about.value1_text") },
                                { icon: "solar:medal-star-bold", color: "blue", title: t("about.value2_title"), text: t("about.value2_text") },
                                { icon: "solar:shield-check-bold", color: "green", title: t("about.value3_title"), text: t("about.value3_text") },
                                { icon: "solar:users-group-two-rounded-bold", color: "purple", title: t("about.value4_title"), text: t("about.value4_text") },
                            ].map((value, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
                                >
                                    <div className={`w-14 h-14 bg-${value.color}-100 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                                        <Icon icon={value.icon} className={`text-2xl text-${value.color}-600`} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                                    <p className="text-gray-600 text-sm">{value.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
                        <h2 className="text-3xl font-bold mb-4">
                            {t("contact.subtitle")}
                        </h2>
                        <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                            {t("contact.description")}
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
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

export default About;
