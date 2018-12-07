/***
The MIT License (MIT)

Copyright (c) 2015 Brian Seymour

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 ***/
;(function($) {
    mbox = {

        template: '' +
            '<div class="mbox-wrapper">' +
                '<div class="mbox z-depth-1">' +
                    '<h5>$$$_message_$$$</h5>' +
                    '$$$_input_$$$' +
                    '<div class="right-align">' +
                        '$$$_buttons_$$$' +
                    '</div>' +
                '</div>' +
            '</div>',

        alert: function(message, okText, cb) {
        	$(".mbox-wrapper").remove();
            this.open('alert', message, okText);
            $(".mbox-wrapper .light-blue").focus();

            $('.mbox-wrapper .mbox-ok-button').click(function() {
                mbox.close();
                cb && cb();
                $('input, a, th, button, ul, select, .ql-editor').removeAttr('tabindex'); //to remove tab index property from all fields in page after mbox alert removed
            });
            $('input, a, th, button:not(.mbox-button), ul, select, .ql-editor').attr('tabindex', "-1"); // to remove tab index property from background, when mbox alert present
        },

        confirm: function(message, okText, canceltext, cb, swapColors) {
        	$(".mbox-wrapper").remove();
            this.open('confirm', message, okText, canceltext, swapColors);
            $(".mbox-wrapper .light-blue").focus();

            $('.mbox-wrapper .mbox-ok-button').click(function() {
                mbox.close();
                cb && cb(true);
                $('input, a, th, button, ul, select, .ql-editor').removeAttr('tabindex'); //to remove tab index property from all fields in page after mbox alert removed
            });

            $('.mbox-wrapper .mbox-cancel-button').click(function() {
                mbox.close();
                cb && cb(false);
                $('input, a, th, button, ul, select, .ql-editor').removeAttr('tabindex'); //to remove tab index property from all fields in page after mbox alert removed
            });
            $('input, a, th, button:not(.mbox-button), ul, select, .ql-editor').attr('tabindex', "-1"); // to apply tabindex property in background elements, when mbox alert present
        },

        prompt: function(message, okText, canceltext, cb) {
        	$(".mbox-wrapper").remove();
            this.open('prompt', message, okText, canceltext);

            $('.mbox-wrapper .mbox-ok-button').click(function() {
                var entered_text = $('.mbox-wrapper input').val();

                mbox.close();
                cb && cb(entered_text);
            });

            $('.mbox-wrapper .mbox-cancel-button').click(function() {
                mbox.close();
                cb && cb(false);
            });
        },

        custom: function(options) {
            if (typeof options !== 'object') {
                throw 'Custom box requires argument 1 to be an object';
            }

            var template = this.template;
            template = template.replace(/\$\$\$_input_\$\$\$/gi, '<hr />');

            if (!options.buttons || options.buttons.length === 0) {
                throw 'You must provide at least 1 button';
            }

            var buttons = '';

            var i = 0;
            options.buttons.forEach(function(button) {
                var serialized_button = 'mbox-custom-button-' + i;

                buttons += mbox
                    .gen_button(
                        button.color || 'grey lighten-4',
                        button.label || '',
                        serialized_button
                    );

                ++i;
            });

            template = template.replace(/\$\$\$_message_\$\$\$/gi, options.message || '');
            template = template.replace(/\$\$\$_buttons_\$\$\$/gi, buttons);

            // prevent scrolling on the body
            $('body')
                .append(template)
                .addClass('mbox-open');

            i = 0;
            options.buttons.forEach(function(button) {
                var serialized_button = 'mbox-custom-button-' + i;

                $('.' + serialized_button).click(function() {
                    if (button.callback) {
                        button.callback();
                    } else {
                        mbox.close();
                    }
                });

                ++i;
            });

            // show the box
            $('.mbox-wrapper').show();
        },

        open: function(type, message, okText, cancelText, swapColors) {
            var template = this.template;
            var input = '<input type="text" />';
            var buttons;

            switch (type) {
                case 'alert':
                	if(okText) {
                		buttons = this.gen_button('light-blue darken-2', okText, 'mbox-ok-button');
                	} else {
                		buttons = this.gen_button('light-blue darken-2', 'Ok', 'mbox-ok-button');
                	}
                    template = template.replace(/\$\$\$_input_\$\$\$/gi, '<hr />');
                    break;

                case 'confirm':
                	if(okText) {
                		if(swapColors && swapColors === true){
                			buttons = this.gen_button('grey darken-2', okText, 'mbox-ok-button');
                		} else {
                			buttons = this.gen_button('light-blue darken-2', okText, 'mbox-ok-button');
                		}
                	} else {
                		if(swapColors && swapColors === true){
                			buttons = this.gen_button('grey darken-2', 'Ok', 'mbox-ok-button');
                		} else {
                			buttons = this.gen_button('light-blue darken-2', 'Ok', 'mbox-ok-button');
                		}
                	}
                	if(cancelText){
                		if(swapColors && swapColors === true){
                			buttons += this.gen_button('light-blue darken-2', cancelText, 'mbox-cancel-button');
                		} else {
                			buttons += this.gen_button('grey darken-2', cancelText, 'mbox-cancel-button');
                		}
                	} else {
                		if(swapColors && swapColors === true){
                			buttons += this.gen_button('light-blue darken-2', 'Cancel', 'mbox-cancel-button');
                		} else {
                			buttons += this.gen_button('grey darken-2', 'Cancel', 'mbox-cancel-button');
                		}
                	}
                    template = template.replace(/\$\$\$_input_\$\$\$/gi, '<hr />');
                    break;

                case 'prompt':
                	if(okText) {
                		buttons = this.gen_button('light-blue darken-2', okText, 'mbox-ok-button');
                	} else {
                		buttons = this.gen_button('light-blue darken-2', 'Ok', 'mbox-ok-button');
                	}
                	if(cancelText){
                		buttons += this.gen_button('grey darken-2', cancelText, 'mbox-cancel-button');
                	} else {
                		buttons += this.gen_button('grey darken-2', 'Cancel', 'mbox-cancel-button');
                	}
                    template = template.replace(/\$\$\$_input_\$\$\$/gi, input);
                    break;
            }

            if (message) template = template.replace(/\$\$\$_message_\$\$\$/gi, message);
            if (buttons) template = template.replace(/\$\$\$_buttons_\$\$\$/gi, buttons);

            // prevent scrolling on the body
            $('body')
                .append(template)
                .addClass('mbox-open');

            // show the box
            $('.mbox-wrapper').show();
        },

        close: function() {
            // hide the box
            $('.mbox')
                .hide(0, function() {
                    $(this).closest('.mbox-wrapper').remove();
                });

            // allow scrolling on body again
            $('body').removeClass('mbox-open');

            // unbind all the mbox buttons
            $('.mbox-button').unbind('click');
        },

        gen_button: function(color, text, type) {
            return '&nbsp;<button '+
                'type="button" '+
                'class="mbox-button ' + type + ' '+
                'waves-effect waves-light btn ' + color + '">' + text +
                '</button>';
        }

    };
})(jQuery);