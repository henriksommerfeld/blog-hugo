'use strict';

import $ from 'jquery';

export default class Hamburger {
    constructor() {
        console.log('%c 🍔 Hamburger module loaded', 'font-size:1.5em');
        
        this.addCloseOnTouchEvent();
        this.addCloseOnEscEvent();
        this.addCloseOnTouchMoveEvent();     
    }

    addCloseOnEscEvent() {
        $(document).keyup((e) => {
            const escapeKeyCode = 27;
            if (e.keyCode === escapeKeyCode) {
                const activeElement = $(e.target);
                if (activeElement.hasClass('hamburger-trigger') || activeElement.length) {
                    this.closeMenu();
                }
            }
        });
    }

    addCloseOnTouchEvent() {
        $('body').on('click touch', '.hamburger-trigger', () => {
            $('.hamburger-menu .bar').toggleClass('animate');
            let navElement = $('nav');
            if (navElement.hasClass('open') && navElement.hasClass('close')) {
                navElement.removeClass('close');
                this.removeOpenCloseClassesDelayed(navElement);
            }
            else if (navElement.hasClass('open')) {
                navElement.addClass('close');
                this.removeOpenCloseClassesDelayed(navElement);
            }
            else {
                navElement.addClass('open');
            }
        });
    }

    addCloseOnTouchMoveEvent() {
        $('body').on('click touchmove', '.body, nav.open>a', () => {
            this.closeMenu();
        });
    }

    closeMenu () {
        if ($('.hamburger-menu .bar').hasClass('animate')) {
            $('.hamburger-menu .bar').toggleClass('animate');
            let navElement = $('nav');
            navElement.addClass('close');
            this.removeOpenCloseClassesDelayed(navElement);
        }
    }

    removeOpenCloseClassesDelayed(element) {
        // This is to avoid the menu from opening and immediately closing when resizing
        const timeToWait = 500;
        let closedTime = new Date().getTime();
        setTimeout(() => {
            let currentTime = new Date().getTime();
            if (element && element.hasClass('open') && element.hasClass('close') 
                && currentTime-timeToWait >= closedTime) {
                element.removeClass('open');
                element.removeClass('close');
            }
        }, timeToWait);
    }
}