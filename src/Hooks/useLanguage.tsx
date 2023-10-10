import { useEffect, useState } from "react";

const DEFAULT_LANGUAGE = "en"

// let lang = DEFAULT_LANGUAGE
export function useLanguage() {
    const [lang, setLang] = useState(DEFAULT_LANGUAGE)

    useEffect(() => {
        const validLanguages = {
            en: true,
            es: true,
        };

        const navlang = navigator.language.slice(0, 2)

        if (validLanguages[navlang as keyof typeof validLanguages]) {
            // setLang(navlang as keyof typeof validLanguages)
            setLang(navlang as keyof typeof validLanguages)
        }
    }, [])


    return lang
}