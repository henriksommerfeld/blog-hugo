'use strict';

import 'lazysizes';
import 'alpinejs';
import ThemeSwitcher from './theme-switcher'
import Hamburger from './hamburger';
import SkipLink from './skip-link';
import LightBox from './lightbox';
import Search from './search';
import CodeExpanded from './code-expanded';

document.addEventListener("DOMContentLoaded", function() {
  try {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (!isSafari) {
      const imageUrl = window.location.origin + '/images/you-are-the-best.png';
      const css = `padding:200px 0 0 0;text-align:bottom;font-size: 1.5rem;background:url(${imageUrl}) no-repeat left top;background-size:200px`;
      console.log("%c So, you're reading the console messages - how geeky! 🤓", css);
    }

  } catch (error) { }

  new ThemeSwitcher();
  //new Hamburger();
  new SkipLink();
  new LightBox();
  new Search();
  new CodeExpanded();
});

window.blog = {
  state: {
    alpine: false,
    isModalOpen: false,
  }
}

window.menu = {
  states: {
      CLOSED: 'closed',
      CLOSING: 'closing',
      OPEN: 'open',
      OPENING: 'opening'
  },
  state: 'closed',
  isOpen: ()=> menu.state === menu.states.OPEN,
  isOpening: ()=> menu.state === menu.states.OPENING,
  isClosing: ()=> menu.state === menu.states.CLOSING,
  isClosed: ()=> menu.state === menu.states.CLOSED,
  hamburgerIsOpen: ()=> menu.isOpen() || menu.isOpening(),
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
