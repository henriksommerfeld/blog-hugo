'use strict';

import $ from 'jquery';
import lunr from 'lunr';

export default class Search {
    constructor() {
        console.log('%c 🔍 Search module loaded', 'font-size:1.5em');

        this.index = null;
        this.store = null;
        this.lastSearch = 0;
        this.indexLoadFailed = false;
        this.indexLoading = false;
        this.indexLoadingShowed = false;
        this.indexLoadedShowed = false;

        this.addOpenDialogEvent();
        this.addCloseDialogEvent();
        this.addSearchClickEvent();
        this.addKeyUpEvent();
        this.addEscKeyEvent();
    }

    addOpenDialogEvent() {
        $('body').on('click', 'a.search', (e) => {
            this.openSearchDialog();
            return false;
        });
    }

    addCloseDialogEvent() {
        $('body').on('click touchstart', '#searchbox .close-search', (e) => {
            this.closeModal();
            this.resetFocus();
        });
    }

    addSearchClickEvent() {
        $('body').on('click touchstart', '#searchbox .fa-search', (e) => {
            this.search($('#search-input').val());
        });
    }

    addKeyUpEvent() {
        $('body').on('keyup', '#search-input', (e) => {
            this.keyUpInSearchbox(e);
        });
    }

    addEscKeyEvent() {
        $(document).keyup((e) => {
            if (e.key === 'Escape' && $('#searchbox-container').hasClass('open')) {
                this.closeModal();
                this.resetFocus();
            }
        });
    }

    downloadIndex() {
        if (this.index) {
            return $.Deferred().resolve().promise();
        }
        else {
            this.indexLoading = true;
            return $.getJSON('/search-index.json', (response) => {
                this.index = lunr.Index.load(response.index);
                this.store = response.store;
            });
        }
    }

    ensureIndex() {
        this.downloadIndex().done(() => {
            if (this.indexLoadingShowed && !this.indexLoadedShowed) {
                this.indexLoadedShowed = true;
                this.showIndexLoadedMessage();
            }
        }).fail((error) => {
            this.indexLoadFailed = true;

        }).always(() => {
            this.indexLoading = false;
        });
    }

    showSearchError(errorText) {
        $('#search-output').removeClass('has-hits').addClass('has-error');
        const errorHtml = `<img class="bitmoji" src="/images/oops.png" alt="oops"><p>${errorText}</p>`;
        $('#no-results-message').html(errorHtml);
    }

    showIndexLoadFailed() {
        const sendTweetMessage = "I'm probably not even aware of this, so I'll appreciate if you <a href='https://twitter.com/p4lm' target='_blank'>send me a tweet to @p4lm</a> to let me know about it. Thank you.";
        const message = `Failed to load search index 😕 ${sendTweetMessage}`;
        this.showSearchError(message);
    }

    search(phrase) {
        const resultContainer = $('#search-output ol');
        $('#search-output .result-list li').remove();
        $('#search-output').removeClass('close').removeClass('has-hits')
        $('#search-output').removeClass('has-hits');

        if (this.indexLoading && !this.indexLoadingShowed) {
            this.showIndexLoadingMessage();
            return;
        }

        if (this.indexLoadFailed) {
            this.showIndexLoadFailed();
            return;
        }

        const result = this.index.search(phrase);

        $('#search-output').removeClass('index-not-loaded');
        $('#search-output').removeClass('index-loaded');
        $('#search-output').addClass('search-performed');

        if (result && result.length > 0) {
            console.log(`=== Search results for ${phrase} === \n\n`);
            try {
                $('#search-output').addClass('has-hits');
                $('#number-of-hits-message').text(`Search phrase matching ${result.length} pages`);
                $.each(result, (index, value) => {
                    console.log(value.ref);
                    let hit = this.store[value.ref];
                    let dateHtml = `<div class="entry-meta">
                    <time class="published" datetime='${hit.dateiso}'>${hit.dateformatted}</time>
                </div>`;
                    let hitHtml = `<li><h2><a href='${value.ref}'>${hit.title}</a></h2>${dateHtml}<p>${hit.summary}</p></li>`;
                    resultContainer.append(hitHtml);
                });
            }
            catch (error) {
                this.showIndexLoadFailed();
            }
            console.log(`=== End of search results for ${phrase} === \n\n`);
        }
    }

    showIndexLoadingMessage() {
        this.indexLoadingShowed = true;
        $('#search-output').addClass('index-loading');
    }

    showIndexLoadedMessage() {
        this.indexLoadedShowed = true;
        $('#search-output').removeClass('index-loading').addClass('index-loaded');
    };

    keyUpInSearchbox(e) {
        const currentTime = Date.now();
        if (currentTime - 100 > this.lastSearch) {
            this.lastSearch = currentTime;
            let phrase = $(e.target).val().trim();
            this.search(phrase);

            const enterKeyCode = 13;
            if (e.keyCode === enterKeyCode) {
                $('#search-output .result-list li a').first().focus();
            }
        }
    }

    resetFocus() {
        $('#search-input').blur();
        $('a.search').focus();
    }

    closeModal() {
        $('#searchbox, #searchbox-container')
            .removeClass('open').addClass('close');
        $('#search-output').removeClass('search-performed', 'has-hits', 'has-error', 'index-loading', 'index-loaded');
        $('body').removeClass('modal-open');

        return false;
    }

    openSearchDialog() {
        $('body').addClass('modal-open');
        $('#searchbox-container, #searchbox').removeClass('close').addClass('open');
        $('#search-input').val('');
        $('#search-input').focus();
        this.indexLoadFailed = false;
        this.ensureIndex();
    }
}