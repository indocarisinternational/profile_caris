import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';

const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'id' ? 'en' : 'id';
        i18n.changeLanguage(newLang);
        localStorage.setItem('language', newLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/80 hover:bg-white shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md"
            title={t('language.switch')}
            aria-label={t('language.switch')}
        >
            <Icon
                icon="circle-flags:id"
                className={`w-5 h-5 transition-opacity ${i18n.language === 'id' ? 'opacity-100' : 'opacity-40'}`}
            />
            <span className="text-sm font-medium text-gray-700">/</span>
            <Icon
                icon="circle-flags:gb"
                className={`w-5 h-5 transition-opacity ${i18n.language === 'en' ? 'opacity-100' : 'opacity-40'}`}
            />
        </button>
    );
};

export default LanguageSwitcher;
