'use strict';

import $ from 'jquery';

export default class EmailCaptcha {
    constructor() {
        console.log('E-mail captcha module');
        
        this.atSign = '@';
        let self = this;

        $('#min-mejl').bind('click', () => {
            self.onloadCallback(self);
        });
    }

    swapper(d) {
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
    }

    getAddress(name, dom) {
        let s = name + this.atSign;
        s += this.swapper(dom);
        return s;
    }

    verifyCallback(response) {
        console.log('Callback response: ' + response);
        if (response) {
            $('#email-recaptcha').hide('fast');
            let input = $('#min-mejl').data('mejl').split(',');
            let address = this.getAddress(input[2],input[0]).substring(0);
            let link = 'mailto:' + address;
            $('#min-mejl').attr('href', link);
            $('#email-displayed').text(address);
            $('#min-mejl').unbind('click');
        }
    }

    onloadCallback(self) {
        
        if (!$('#email-recaptcha').html()) {
            $('#email-recaptcha').show('fast');
            grecaptcha.render('email-recaptcha', {
                'sitekey' : '6LeZPQgTAAAAAIM_LHDxd1Y11vQxm4LP-SbrwA8K',
                'callback' : self.verifyCallback
            });
        }
    }
}