'use strict';

import lunr from 'lunr';

export default class Search {
    constructor() {

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
        this.addKeyDownEvent();
        this.addEscKeyEvent();
    }

    addOpenDialogEvent() {
        const searchLink = document.querySelector('a.search');
        searchLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.openSearchDialog();
        });
    }

    addCloseDialogEvent() {
        const closeEvent = (e) => {
            this.closeModal();
            this.resetFocus();
        };
        const closeButton = document.querySelector('#searchbox .close-search');

        closeButton.addEventListener('click', closeEvent);
        closeButton.addEventListener('touchstart', closeEvent, {passive: true});
    }

    addSearchClickEvent() {
        const doSearch = (e) => {
            const searchPhrase = document.getElementById('search-input').value;
            this.search(searchPhrase);
        };
        const searchButton = document.querySelector('#searchbox .icon-search');
        searchButton.addEventListener('click', doSearch);
        searchButton.addEventListener('touchstart', doSearch, {passive: true});
    }

    addKeyDownEvent() {
        const searchbox = document.getElementById('search-input');
        searchbox.addEventListener('keyup', e => this.keyPressedInSearchbox(e));
    }

    addEscKeyEvent() {
        document.addEventListener('keydown', e => {
            if (e.key !== 'Escape') return;

            if (!document.getElementById('searchbox-container').classList.contains('open'))
                return;

            this.closeModal();
            this.resetFocus();
        }); 44444448
    }

    handleFetchResponse(response) {
        this.indexLoadFailed = !response.ok;
        this.indexLoading = false;
        return response.ok && response.json ? response.json() : this.index;
    }

    fetchIndex() {
        return fetch('/search-index.json')
            .then(res => this.handleFetchResponse(res))
            .catch(res => this.handleFetchResponse(res));
    }

    downloadIndex() {
        if (this.index) return;

        this.indexLoading = true;
        this.fetchIndex().then(response => {
            this.index = lunr.Index.load(response.index);
            this.store = response.store;
        });
    }

    showSearchError(errorText) {
        const searchOutput = document.getElementById('search-output');
        searchOutput.classList.remove('has-hits');
        searchOutput.classList.add('has-error');
        const errorHtml = `<img class="bitmoji" src="/images/oops.png" alt="oops"><p>${errorText}</p>`;
        document.getElementById('no-results-message').innerHTML = errorHtml;
    }

    showIndexLoadFailed() {
        const sendTweetMessage = "I'm probably not even aware of this, so I'll appreciate if you <a href='https://twitter.com/p4lm' target='_blank'>send me a tweet to @p4lm</a> to let me know about it. Thank you.";
        const message = `Failed to load search index 😕 ${sendTweetMessage}`;
        this.showSearchError(message);
    }

    search(phrase) {
        const resultContainer = document.querySelector('#search-output ol');
        document.querySelector('#search-output .result-list').innerHTML = '';
        const searchOutput = document.getElementById('search-output');
        searchOutput.classList.remove('close');
        searchOutput.classList.remove('has-hits');

        if (this.indexLoading && !this.indexLoadingShowed) {
            this.showIndexLoadingMessage();
            return;
        }

        if (this.indexLoadFailed) {
            this.showIndexLoadFailed();
            return;
        }

        const result = this.index.search(phrase);

        searchOutput.classList.remove('index-not-loaded');
        searchOutput.classList.remove('index-loaded');
        searchOutput.classList.add('search-performed');

        if (result && result.length > 0) {
            try {
                searchOutput.classList.add('has-hits');
                const numberOfHits = document.getElementById('number-of-hits-message');
                numberOfHits.textContent = `Search phrase matching ${result.length} pages`;
                result.forEach(value => {
                    const hit = this.store[value.ref];
                    const dateHtml = `<div class="entry-meta">
                        <time class="published" datetime='${hit.dateiso}'><svg class="icon icon-calendar"><use xlink:href="#icon-calendar"></use></svg>${hit.dateformatted}</time>
                    </div>`;

                    const li = document.createElement('li');
                    li.innerHTML = `<h2><a href='${value.ref}'>${hit.title}</a></h2>${dateHtml}<p>${hit.summary}</p>`;
                    resultContainer.appendChild(li);
                });
            }
            catch (error) {
                this.showIndexLoadFailed();
            }
        }
    }

    showIndexLoadingMessage() {
        this.indexLoadingShowed = true;
        document.getElementById('search-output').classList.add('index-loading');
    }

    showIndexLoadedMessage() {
        this.indexLoadedShowed = true;
        document.getElementById('search-output').classList.remove('index-loading');
        document.getElementById('search-output').classList.add('index-loaded');
    };

    keyPressedInSearchbox(e) {
        const currentTime = Date.now();
        if (currentTime - 100 > this.lastSearch) {
            this.lastSearch = currentTime;
            const phrase = e.target.value.trim();

            if (phrase.length > 1 || phrase === '*')
                this.search(phrase);
            else {
                document.querySelector('.result-list').innerHTML = '';
            }

            if (e.key === 'Enter' || e.key === 'DownArrow') {
                const hits = document.querySelectorAll('#search-output .result-list li a');
                hits && hits.length > 0 && hits[0].focus();
            }
        }
    }

    resetFocus() {
        document.getElementById('search-input').blur();
        document.querySelector('a.search').focus();
    }

    closeModal() {
        const containers = document.querySelectorAll('#searchbox, #searchbox-container');
        containers.forEach(element => {
            element.classList.remove('open');
            element.classList.add('close');
        });
        const searchResultsElement = document.getElementById('search-output');
        ['search-performed', 'has-hits', 'has-error', 'index-loading', 'index-loaded'].forEach(className => {
            searchResultsElement.classList.remove(className);
        });
        document.querySelector('body').classList.remove('modal-open');

        return false;
    }

    openSearchDialog() {
        document.querySelector('body').classList.add('modal-open');
        const searchElements = document.querySelectorAll('#searchbox-container, #searchbox');
        searchElements.forEach(element => {
            element.classList.remove('close');
            element.classList.add('open');
        });
        const searchInput = document.getElementById('search-input');
        searchInput.value = '';
        searchInput.focus();
        this.indexLoadFailed = false;
        this.downloadIndex();
    }
}