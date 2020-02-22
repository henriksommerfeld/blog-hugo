'use strict';

export default class SkipLink {
    constructor() {
        console.log('%c 🔗 Skip link module loaded', 'font-size:1.5em');

        try {
            document.getElementById('skip-link').addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.getElementById('content');
                target.setAttribute('tabindex', '-1');
                target.focus();
              });
            
        } catch (error) { console.warn('Not improving skip links on mobile', error) }
    }
}