(function($) {
    var methods = {
        'init': function(options) {
            var settings = $.extend({
                'direction': this.data('marquee-direction') || 'right',
                'target': this.data('marquee-target') || '#marquee-target'
            }, options);
            return this.each(function () {
                var $this = $(this),
                    data = $this.data('hover-marquee'),
                    marquee = $('<span />', {
                        'text': $this.attr('title')
                    });
                if (!data) {
                    $(settings.target).html(marquee);
                    $(this).data('hover-marquee', {
                        'target': $this,
                        'marquee': marquee
                    });
                }
            });
        }
    };
    $.fn.hoverMarquee = function(method) {
        if (methods[method]) {
            return methods[method].apply( his, Array.prototype.slice.call(arguments, 1));
        } else if ( typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.hoverMarquee');
        }
    };
})(jQuery);