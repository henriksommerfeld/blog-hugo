'use strict';

export default class ThemeSwitcher {
    constructor() {
        console.log('%c 🌗 Theme module loaded', 'font-size:1.5em');

        const darkModePreferredQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkModePreferredQuery.addEventListener("change", event => {

            const savedTheme = window.localStorage.getItem('theme');
            const isLight = !event.matches;
            const newOsTheme = isLight ? 'light' : 'dark';
            if (savedTheme !== newOsTheme) {
                window.updateTheme(newOsTheme);
                window.localStorage.setItem('theme', newOsTheme);
                document.getElementById('theme-switcer-indicator').checked = isLight;
                console.log(`🌗 Theme changed in Operating System to ${newOsTheme} mode`);
            }
        });

        window.addEventListener('storage', () => {
            const theme = window.localStorage.getItem('theme');
            if (theme !== 'dark')
                theme = 'light';
            window.updateTheme(theme);
            document.getElementById('theme-switcer-indicator').checked = theme === 'light';
        });
    }
}