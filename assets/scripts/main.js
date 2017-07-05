// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';
import Hamburger from './hamburger';
import LightBox from './lightbox';
import Search from './search';
import CodeExpanded from './code-expanded';
import EmailCaptcha from './e-mail'

$(() => {
  new Hamburger();
  new LightBox();
  new Search();
  new CodeExpanded();
  new EmailCaptcha();
});
