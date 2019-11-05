'use strict';

import $ from 'jquery';

export default class LightBox {
    constructor() {
        console.log('%c 🖼️ Lightbox module loaded', 'font-size:1.5em');

        this.cancelShowImage = false;

        this.addOpenEvent();
        this.addCancelEvent();
        this.addCloseEvent();
        this.addCloseOnEscEvent();
    }

    addCancelEvent() {
        $('body').on('click touch', '#lightbox-loading', (e) => {
            this.cancelShowImage = true;
            this.closeModal(e);
        });
    }

    addCloseEvent() {
        $('body').on('click touchmove', '#lightbox img', (e) => {
            this.closeModal(e);
        });
    }

    addCloseOnEscEvent() {
        $(document).keyup((e) => {
            if (e.key === 'Escape' && $('#lightbox-container').hasClass('open')) {
                this.closeModal(e);
            }
        });
    }

    addOpenEvent() {
        $('body').on('click', 'figure > a', (e) => {
            e.preventDefault();
            this.cancelShowImage = false;
            const imageElement = $(e.currentTarget).find('img');
            const scrollTop = $(window).scrollTop();
            const topOffset = $(imageElement).offset().top + ($(imageElement).outerHeight() / 2) - scrollTop;
            const leftOffset = $(imageElement).offset().left + ($(imageElement).outerWidth() / 2);
            const imageUrl = e.currentTarget.href;

            $('#lightbox').css('transform-origin', leftOffset + 'px ' + topOffset + 'px');
            $('#lightbox-container').removeClass('close').addClass('open');

            if ($('#lightbox img').attr('src') !== imageUrl) {
                $('#lightbox-loading-container').show();
                $('#lightbox img').attr('src', '');
                let downloadingImage = new Image();
                downloadingImage.onload = () => {
                    if (!this.cancelShowImage) {
                        $('#lightbox-loading-container').hide();
                        $('#lightbox').append(downloadingImage);
                        $('#lightbox').removeClass('close').addClass('open');
                    }
                };
                downloadingImage.src = imageUrl;
            }
            else {
                $('#lightbox').removeClass('close').addClass('open');
            }
            $('body').addClass('modal-open');
        });
    }

    closeModal(e) {
        $('#lightbox-container, #lightbox, #lightbox-loading').removeClass('open').addClass('close');
        $('body').removeClass('modal-open');
        e.preventDefault();
    }
}