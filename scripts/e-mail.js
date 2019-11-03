'use strict';

import $ from 'jquery';

export default class EmailCaptcha {
    constructor() {
        console.log('%c 📧 E-mail captcha module loaded', 'font-size:1.5em');
        
        const swapper = function(d) {
            let s = '';
            for (let i=0; i<d.length; i += 2) {
                if (i + 1 === d.length) {
                    s+= d.charAt(i);
                }
                else {
                    s += d.charAt(i + 1) + d.charAt(i);
                }
            }
            return s.replace(/\?/g,'.');
        };

        const verifyCallback = function(response) {
            if (response) {
                $('#email-recaptcha').hide('fast');
                const input = $('#min-mejl').data('mejl').split(',');
                const address = getAddress(input[2],input[0]).substring(0);
                const link = 'mailto:' + address;
                $('#min-mejl').attr('href', link);
                $('#email-displayed').text(address);
                $('#min-mejl').unbind('click');
            }
        }

        const getAddress = function(name, dom) {
            let s = name + '@';
            s += swapper(dom);
            return s;
        }

        const onloadCallback = function() {
        
            if (!$('#email-recaptcha').html()) {
                $('#email-recaptcha').show('fast');
                grecaptcha.render('email-recaptcha', {
                    'sitekey' : '6LeZPQgTAAAAAIM_LHDxd1Y11vQxm4LP-SbrwA8K',
                    'callback' : verifyCallback
                });
            }
        }
        
        $('#min-mejl').bind('click', () => {
            onloadCallback();
        });
    }
}