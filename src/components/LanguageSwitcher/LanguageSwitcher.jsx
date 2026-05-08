import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'id', name: 'ID', flag: 'circle-flags:id' },
        { code: 'en', name: 'EN', flag: 'circle-flags:gb' }
    ];

    const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

    const selectLanguage = (code) => {
        i18n.changeLanguage(code);
        localStorage.setItem('language', code);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
            >
                <Icon icon={currentLang.flag} className="w-4 h-4" />
                <span className="text-xs font-bold text-white/70 uppercase tracking-wider">{currentLang.name}</span>
                <Icon icon="tabler:chevron-down" className={`w-3 h-3 text-white/30 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-32 bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50"
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => selectLanguage(lang.code)}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium transition-colors ${
                                    i18n.language === lang.code ? 'bg-white/10 text-white' : 'text-white/40 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                <Icon icon={lang.flag} className="w-4 h-4" />
                                {lang.name === 'ID' ? 'Indonesia' : 'English'}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSwitcher;
