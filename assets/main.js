const base = {
  keyboardNavigation: false,
  isModalOpen: false,
  closeModals: function() {
    this.search.close();
    this.lightbox.close();
    this.code.close();
  }
};

const theme = {
  options: {
    LIGHT: 'light',
    DARK: 'dark'
  },
  setSwitch: function(isLight) {
    // Workaround for https://github.com/alpinejs/alpine/issues/459
    document.getElementById('theme-switcer-indicator').checked = isLight;
  },
  applyTheme: function(theme) {
    if (theme !== this.options.LIGHT && theme !== this.options.DARK)
      return;

    const darkStyles = document.querySelectorAll("link[data-theme=dark]");
    const lightStyles = document.querySelectorAll("link[data-theme=light]");

    const isDark = theme === this.options.DARK;
    if (isDark) {
      console.info('🌙 Setting dark mode');
      darkStyles.forEach(link => {
          link.media = 'all';
          link.disabled = false;
      });
      lightStyles.forEach(link => {
          link.media = 'not all';
          link.disabled = true;
      });
    }
    else {
      console.info('🌞 Setting light mode');

      darkStyles.forEach(link => {
          link.media = 'not all';
          link.disabled = true;
      });
      lightStyles.forEach(link => {
          link.media = 'all';
          link.disabled = false;
      });
    }
    this.setSwitch(!isDark);
  },
  saveSetting: function(theme) {
    window.localStorage.setItem('theme', theme);
  },
  readSavedSetting: function() {
    return window.localStorage.getItem('theme');
  },
  toggleChanged: function(element) {      
    const theme = element.checked ? this.options.LIGHT : this.options.DARK;
    this.saveSetting(theme);
    this.applyTheme(theme);
  },
  listenForExternalChange: function() {
    try {
      const darkModePreferredQuery = window.matchMedia('(prefers-color-scheme: dark)');
      if (!darkModePreferredQuery.addEventListener) return;

      darkModePreferredQuery.addEventListener("change", event => {
        const savedTheme = this.readSavedSetting();
        const isLight = !event.matches;
        const newOsTheme = isLight ? this.options.LIGHT : this.options.DARK;
        if (savedTheme !== newOsTheme) {
          this.applyTheme(newOsTheme);
          this.saveSetting(newOsTheme);
          console.log(`🌗 Theme changed in Operating System to ${newOsTheme} mode`);
        }
      });

      window.addEventListener('storage', ()=> {
        let theme = this.readSavedSetting();
        if (theme !== this.options.DARK)
          theme = this.options.LIGHT;
        this.applyTheme(theme);
      });
  } catch (error) { console.warn('Not listening to theme change events', error) }
  },
  onLoad: function() {
    const savedTheme = this.readSavedSetting();
    const darkModePreferredQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const osTheme = darkModePreferredQuery.matches ? this.options.DARK : this.options.LIGHT;
    const isSavedThemeValid = savedTheme === this.options.DARK || savedTheme === this.options.LIGHT;
    const themeToApply = isSavedThemeValid && savedTheme !== osTheme ? savedTheme : osTheme;
    this.applyTheme(themeToApply);
    this.listenForExternalChange();
  }
};

const lightbox = {
  isOpen: false,
  cancelShowImage: false,
  openImage: false,
  showLoading: false,
  close: function() {
    this.openImage = false;
    this.isOpen = false;
    blog.isModalOpen = false;
  },
  cancel: function() {
    this.cancelShowImage = true;
    this.close();
  },
  open: function(event, xRefs) {   
    this.openImage = false;
    this.showLoading = false;
    this.cancelShowImage = false;

    const imageElement = event.currentTarget.querySelector('img');
    const imageUrl = event.currentTarget.href;
    const topOffset = event.currentTarget.offsetTop + (imageElement.clientHeight / 2) - window.pageYOffset;
    const leftOffset = imageElement.offsetLeft + (imageElement.clientWidth / 2);
    xRefs.lightbox.style.cssText = `transform-origin: ${leftOffset}px ${topOffset}px`;
    this.isOpen = true;

    const img = xRefs.lightbox.querySelector('img');
    if (!img || img.getAttribute('src') !== imageUrl) {
      img && img.remove();
      setTimeout(() => {
        if (xRefs.lightbox.querySelectorAll('img').length === 0)
          this.showLoading  = true;          
      }, 300);
      let downloadingImage = new Image();
      downloadingImage.onload = () => {
        if (!this.cancelShowImage) {
          this.showLoading = false;
          xRefs.lightbox.append(downloadingImage);
          this.openImage = true
        }
      };
      downloadingImage.src = imageUrl;                
    }
    else {
      this.openImage = true;
    }
    blog.isModalOpen = true;
  }
};

const search = {
  isOpen: false,
  textInSearchBox: '',
  index: null,
  store: null,
  indexLoadFailed: false,
  indexLoading: false,
  hits: [],
  getHitsText: function() {
    return `Search phrase matching ${this.hits.length} pages`;
  },
  open: function() {
    blog.isModalOpen = true;
    this.isOpen = true;
    this.textInSearchBox = '';
    this.indexLoadFailed = false;
    this.downloadIndex();
  },
  close: function() {
    this.isOpen = false;
    blog.isModalOpen = false;
  },
  downloadIndex: function() {
    if (this.index) return;

    this.indexLoading = true;
    this.fetchIndex().then(response => {
      this.index = window.lunr.Index.load(response.index);
      this.store = response.store; 
      this.indexLoading = false;
      this.searchBoxChanged(this.textInSearchBox);
      console.log("🔍 Search index downloaded")
    });
  },
  fetchIndex: function() {
    return fetch('/search-index.json')
      .then(res => this.handleFetchResponse(res))
      .catch(res => this.handleFetchResponse(res));
  },
  handleFetchResponse: function(response) {
    this.indexLoadFailed = !response.ok;
    return response.ok && response.json ? response.json() : this.index;
  },
  searchBoxChanged: function(phrase) {
    const trimmedPhrase = (phrase || '').trim();
    if (trimmedPhrase.length < 2 && trimmedPhrase !== '*')
      return;
  
    this.find(trimmedPhrase);
  },
  find: function(phrase) {
    this.hits = this.index.search(phrase);
  },
  fromStore: function(hit) {
    return this.store[hit.ref] || {};
  },
  focusFirstAnchor: function(event, element) {
    try {
      element.querySelector('a').focus();
      event.preventDefault();

    } catch(error) {}
  }
};

const menu = {
  states: {
    CLOSED: 'closed',
    CLOSING: 'closing',
    OPEN: 'open',
    OPENING: 'opening'
  },
  state: 'closed',
  isOpen: function() { return this.state === this.states.OPEN },
  isOpening: function() { return this.state === this.states.OPENING },
  isClosing: function () { return this.state === this.states.CLOSING },
  isClosed: function() { return this.state === this.states.CLOSED },
  hamburgerIsOpen: function() { this.isOpen() || this.isOpening() },
  close: function() {
    if (this.state === this.states.CLOSED || this.state === this.states.CLOSING)
      return;

    this.state = this.states.CLOSING;
      setTimeout(()=> {
        this.state = this.states.CLOSED;
      }, 300)
  },
  open: function() {
    if (this.state === this.states.OPEN || this.state === this.states.OPENING)
      return;

    this.state = this.states.OPENING;
      setTimeout(()=> {
        this.state = this.states.OPEN;
      }, 300)
  },
  toggle: function() {      
    if (this.isOpen()) {
      this.close();
    }
    
    else if (this.isClosed()) {
      this.open();
    }
  }
};

const skipLink = {
  skipToContent: function(contentElement) {
    contentElement.setAttribute('tabindex', '-1');
    contentElement.focus();
  }
};

const code = {
  isOpening: false,
  isVisible: false,
  close: function() {
    if (this.isVisible) {
      this.isOpening = false;
      blog.isModalOpen = false;
      this.isVisible = false;
    }
  },
  open: function(event) {
    this.isVisible = false;
    const codeToExpand = event.target.closest('.code-expandable').querySelector('.code');
    const topOffset = codeToExpand.offsetTop + (codeToExpand.clientHeight / 2) - window.pageYOffset;
    const leftOffset = codeToExpand.offsetLeft + (codeToExpand.clientWidth / 2);
    const clonedElement = codeToExpand.cloneNode(true);

    blog.isModalOpen = true;
    this.isOpening = true;
    
    const codePlaceholder = document.getElementById("code-placeholder");
    codePlaceholder.innerHTML = "";
    codePlaceholder.appendChild(clonedElement);
    codePlaceholder.querySelector('code').focus();
    const codeContainerInner = document.getElementById("code-container-inner");
    codeContainerInner.style.cssText = `transform-origin: ${leftOffset}px ${topOffset}px`;
    
    setTimeout(() => {
      /*  This is needed for @click.away to work, since the expander is outside ("away" from) 
          the modal element (#code-container). @click.away should only run once the modal is
          fully open and animations are completed.
      */
      this.isVisible = true;
    }, 500);
  }
};

window.blog = { ...base, theme, lightbox, search, menu, skipLink, code };
window.blog.theme.onLoad();

document.addEventListener("DOMContentLoaded", function() {
  try {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (!isSafari) {
      const imageUrl = window.location.origin + '/images/you-are-the-best.png';
      const css = `padding:200px 0 0 0;text-align:bottom;font-size: 1.5rem;background:url(${imageUrl}) no-repeat left top;background-size:200px`;
      console.log("%c So, you're reading the console messages - how geeky! 🤓", css);
    }

  } catch (error) { }  
});