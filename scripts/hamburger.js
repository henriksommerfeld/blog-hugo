'use strict';

export default class Hamburger {
    constructor() {
        console.log('%c 🍔 Hamburger module loaded', 'font-size:1.5em');

        this.addCloseOnTouchEvent();
        this.addCloseOnEscEvent();
    }

    addCloseOnEscEvent() {
        document.addEventListener('keyup', (e) => {
            if (e.key === 'Escape') {
                const activeElement = e.target;
                if (activeElement.classList.contains('hamburger-trigger') || activeElement.length) {
                    this.closeMenu();
                }
            }
        });
    }

    addCloseOnTouchEvent() {
        const closeMenu = () => {
            document.querySelector('.hamburger-menu .bar').classList.toggle('animate');
            let navElement = document.querySelector('nav');
            if (navElement.classList.contains('open') && navElement.classList.contains('close')) {
                navElement.classList.remove('close');
                this.removeOpenCloseClassesDelayed(navElement);
            }
            else if (navElement.classList.contains('open')) {
                navElement.classList.add('close');
                this.removeOpenCloseClassesDelayed(navElement);
            }
            else {
                navElement.classList.add('open');
            }

            if (navElement.classList.contains("open")) {
                navElement.querySelectorAll("a").forEach(element => {
                    element.addEventListener('click', this.closeMenu);
                    element.addEventListener('touchmove', this.closeMenu, {passive: true});
                });
            }
        };
        document.querySelector('.hamburger-trigger').addEventListener('click', closeMenu);
        document.querySelector('.hamburger-trigger').addEventListener('touch', closeMenu, {passive: true});
    }

    closeMenu() {
        if (document.querySelector('.hamburger-menu .bar').classList.contains('animate')) {
            document.querySelector('.hamburger-menu .bar').classList.toggle('animate');
            let navElement = document.querySelector('nav');
            navElement.classList.add('close');
            this.removeOpenCloseClassesDelayed(navElement);
        }
    }

    removeOpenCloseClassesDelayed(element) {
        // This is to avoid the menu from opening and immediately closing when resizing
        const timeToWait = 500;
        let closedTime = new Date().getTime();
        setTimeout(() => {
            let currentTime = new Date().getTime();
            if (element && element.classList.contains('open') && element.classList.contains('close')
                && currentTime - timeToWait >= closedTime) {
                element.classList.remove('open');
                element.classList.remove('close');
            }
        }, timeToWait);
    }
}