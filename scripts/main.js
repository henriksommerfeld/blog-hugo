'use strict';

import $ from 'jquery';
import 'lazysizes';
import ThemeSwitcher from './theme-switcher'
import Hamburger from './hamburger';
import LightBox from './lightbox';
import Search from './search';
import CodeExpanded from './code-expanded';
import EmailCaptcha from './e-mail'

$(() => {
  try {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (!isSafari) {
      const imageUrl = window.location.origin + '/images/you-are-the-best.png';
      const css = `padding:200px 0 0 0;text-align:bottom;font-size: 1.5rem;background:url(${imageUrl}) no-repeat left top;background-size:200px`;
      console.log("%c So, you're reading the console messages - how geeky! 🤓", css);
    }

  } catch (error) { }

  new ThemeSwitcher();
  new Hamburger();
  new LightBox();
  new Search();
  new CodeExpanded();
  new EmailCaptcha();
});
