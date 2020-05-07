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
 
window.blog = {
  isModalOpen: false,
  search: {
    isOpen: false,
    textInSearchBox: '',
    index: null,
    store: null,
    indexLoadFailed: false,
    indexLoading: false,
    showOutput: function() {
      return this.textInSearchBox;
    },
    openSearchDialog: function() {
      blog.isModalOpen = true;
      this.isOpen = true;
      this.textInSearchBox = '';
      this.indexLoadFailed = false;
      this.downloadIndex();
    },
    closeSearchDialog: function() {
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
    }
  },
  menu: {
    states: {
        CLOSED: 'closed',
        CLOSING: 'closing',
        OPEN: 'open',
        OPENING: 'opening'
    },
    state: 'closed',
    isOpen: ()=> blog.menu.state === blog.menu.states.OPEN,
    isOpening: ()=> blog.menu.state === blog.menu.states.OPENING,
    isClosing: ()=> blog.menu.state === blog.menu.states.CLOSING,
    isClosed: ()=> blog.menu.state === blog.menu.states.CLOSED,
    hamburgerIsOpen: ()=> blog.menu.isOpen() || blog.menu.isOpening(),
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
  }
}