import {useEffect, useState} from "react";
import {Theme} from "../types";

export function useTheme() {
    const getMatchMedia = () => window.matchMedia('(prefers-color-scheme: dark)')

    const getTheme = () => {
        return (getMatchMedia().matches ? 'dark' : 'light');
    }

    const [theme, setTheme] = useState<Theme>(getTheme);

    const updateTheme = (theme: Theme) => {
        setTheme(theme);
    }

    useEffect(() => {
        const matchMedia = getMatchMedia();
        const applyTheme = (theme: Theme) =>{
            document.body.classList.remove('light', 'dark');
            document.body.classList.add(theme);
        };

        applyTheme(theme);

        const mqListener = (e: MediaQueryListEvent) => {
                const theme = e.matches ? 'dark' : 'light';
                updateTheme(theme);
                applyTheme(theme);
        }

        matchMedia.addEventListener('change', mqListener);
        return () => matchMedia.removeEventListener('change', mqListener);
    }, [theme]);

    return {theme, setTheme: updateTheme};
}