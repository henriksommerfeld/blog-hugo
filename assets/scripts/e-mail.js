'use strict';

import $ from 'jquery';

export default class EmailCaptcha {
    constructor() {
        console.log('%c 📧 E-mail captcha module loaded', 'font-size:1.5em');
        
        var swapper = function(d) {
            var s = '';
            for (var i=0; i<d.length; i += 2) {
                if (i + 1 === d.length) {
                    s+= d.charAt(i);
                }
                else {
                    s += d.charAt(i + 1) + d.charAt(i);
                }
            }
            return s.replace(/\?/g,'.');
        };

        var verifyCallback = function(response) {
            if (response) {
                $('#email-recaptcha').hide('fast');
                let input = $('#min-mejl').data('mejl').split(',');
                let address = getAddress(input[2],input[0]).substring(0);
                let link = 'mailto:' + address;
                $('#min-mejl').attr('href', link);
                $('#email-displayed').text(address);
                $('#min-mejl').unbind('click');
            }
        }

        var getAddress = function(name, dom) {
            var s = name + '@';
            s += swapper(dom);
            return s;
        }

        var onloadCallback = function() {
        
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