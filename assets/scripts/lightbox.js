'use strict';

import $ from 'jquery';

export default class LightBox {
    constructor() {
        console.log('Lightbox module');

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
            const escapeKeyCode = 27;
            if (e.keyCode === escapeKeyCode && $('#lightbox-container').hasClass('open')) {
                this.closeModal(e);
            }
        });
    }

    addOpenEvent() {
        $('body').on('click', 'figure a', (e) => {
            this.cancelShowImage = false;

            let imageUrl = e.currentTarget.href;
            $('#page-wrapper').addClass('blur');
            $('#lightbox-overlay').removeClass('close').addClass('open');

            if ($('#lightbox img').attr('src') !== imageUrl) {
                $('#lightbox img').attr('src', '');
                $('#lightbox-loading').removeClass('close').show();
                let downloadingImage = new Image();
                downloadingImage.onload = () => {
                    if (!this.cancelShowImage) {
                        $('#lightbox-loading').hide();
                        $('#lightbox img').attr('src', imageUrl);
                        $('#lightbox-container, #lightbox').removeClass('close').addClass('open');
                    }
                };
                downloadingImage.src = imageUrl;
            }
            else {
                $('#lightbox-container, #lightbox').removeClass('close').addClass('open');
            }
            e.preventDefault();
        });
    }

    closeModal(e) {
        $('#lightbox-overlay, #lightbox-container, #lightbox, #lightbox-loading').removeClass('open').addClass('close');
        $('#page-wrapper').removeClass('blur');
        e.preventDefault();
    }
}