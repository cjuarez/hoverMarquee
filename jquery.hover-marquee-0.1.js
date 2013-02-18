/*global jQuery:false, global document: false*/
(function ($) {
    'use strict';
    var methods = {
        init: function (options) {
            var animation = false,
                element = this[0],
                keyframeprefix = '',
                domPrefixes = [
                    'Webkit',
                    'Moz',
                    'O',
                    'ms'
                ],
                prefix  = '',
                i = 0,
                l = 0,
                keyframes = '',
                styleElement = null;
            if (!element.style.animationName) {
                for (i = 0, l = domPrefixes.length; i < l; i++) {
                    if (element.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
                        prefix = domPrefixes[i];
                        keyframeprefix = '-' + prefix.toLowerCase() + '-';
                        animation = true;
                        break;
                    }
                }
            }
            if (animation) {
                keyframes = '@' + keyframeprefix + 'keyframes fadeIn { ' +
                    '0% {' + keyframeprefix + 'transform: translateX(10%); opacity: 0; }' +
                    '45%, 55% {' + keyframeprefix + 'transform: translateX(50%); opacity: 1; }' +
                    '100% {' + keyframeprefix + 'transform: translateX(90%); opacity: 0; }' +
                    '}';
                styleElement = document.createElement('style');
                styleElement.innerHTML = keyframes;
                document.getElementsByTagName('head')[0].appendChild(styleElement);
            }
            return this.each(function () {
                var $this = $(this),
                    settings = $.extend({
                        direction: $this.data('marquee-direction') || 'right',
                        target: $this.data('marquee-target') || '#marquee-target',
                        title: $this.data('title') || 'Message',
                        styled: true,
                        marqueeWidth: '200'
                    }, options),
                    data = $this.data('hover-marquee'),
                    marqueeCss = {},
                    marqueeTarget = $(settings.target),
                    marquee = $('<div class="marquee"><span>' + settings.title + '</span></div>');
                if (settings.direction === 'right') {
                    marquee.addClass('marquee-right');
                } else {
                    marquee.addClass('marquee-left');
                }
                if (settings.styled) {
                    marqueeCss['-webkit-animation-name'] = marqueeCss['-moz-animation-name'] =
                        marqueeCss['-o-animation-name'] = marqueeCss['animation-name'] = 'fadeIn';
                    marqueeCss['-webkit-animation-duration'] = marqueeCss['-moz-animation-duration'] =
                        marqueeCss['-o-animation-duration'] = marqueeCss['animation-duration'] = '2s';
                    marqueeCss['-webkit-animation-iteration-count'] = marqueeCss['-moz-animation-iteration-count'] =
                        marqueeCss['-o-animation-iteration-count'] = marqueeCss['animation-iteration-count'] = '2s';
                    marqueeCss['-webkit-animation-direction'] = marqueeCss['-moz-animation-direction'] =
                        marqueeCss['-o-animation-direction'] = marqueeCss['animation-direction'] =
                        marquee.hasClass('marquee-right') ? 'normal' : 'reverse';
                    marquee.css($.extend(marqueeCss, {
                        opacity: 0,
                        fontSize: '30px',
                        display: 'block'
                    })).find('span').css({
                        display: 'inline-block',
                        width: settings.marqueeWidth,
                        textAlign: 'center',
                        marginLeft: -(settings.marqueeWidth / 2)
                    });
                    marqueeTarget.css('overflow', 'hidden');
                }
                if (!data) {
                    $this.on('mouseover', function () {
                        marqueeTarget.empty().append(marquee);
                    });
                    $this.data('hover-marquee', {
                        'target': $this,
                        'marquee': marquee
                    });
                }
            });
        }
    };
    $.fn.hoverMarquee = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.hoverMarquee');
        }
    };
}(jQuery));