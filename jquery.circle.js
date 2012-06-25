/** @license
 *
 * Circle: Simple rotational loader
 * ---------------------------------------------------------
 *
 * Copyright (c) 2012, Chris Valleskey. All rights reserved.
 * Code provided under the following license:
 * http://creativecommons.org/licenses/by-nc-sa/3.0/
 *
 * V0.1
 */
(function ($) {
	defaults = {
		fillStyle: "#FFF",
		strokeStyle: "#444",
		lineWidth: 10,
		value: 0,
		fade: false
	}
	var methods = {
		init: function (options) {
			var o = $.extend(defaults, options);
			return this.each(function () {
			
				if($.browser.msie && $.browser.version < 9)
					return;
				
				var size = $(this).height() + o.lineWidth * 2;
				
				$(this).after($("<canvas></canvas>")
					.attr("width", size)
					.attr("height", size)
				);

				canvas = $(this).parent().find("canvas")[0];
				var ctx = canvas.getContext('2d');

				// Background circle
				ctx.beginPath();
				ctx.arc(size / 2, size / 2, $(this).height() / 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = o.background;
				ctx.fill();
				
				if(o.fade) {
					var that = $(this);					
					var v = 1;
					
					for(var i = 1; i <= o.lineWidth; i++) {
						setTimeout(function() {
							var canvas = that.parent().find("canvas")[0];
							var ctx = canvas.getContext('2d');	
								
							ctx.beginPath();
							ctx.arc(size / 2, size / 2, 30 + v++, 0, 2 * Math.PI, false);
							ctx.fillStyle = o.fillStyle;
							ctx.fill();
						}, (5 + v * 2) * i);
					}
				}
			});
		},
		update: function (options) {
			var o = $.extend(defaults, options);
			
			return this.each(function () {
			
				canvas = $(this).parent().find("canvas")[0];
				var ctx = canvas.getContext('2d');

				var size = canvas.width;
				
				canvas.width = canvas.width;

				// Background circle
				ctx.beginPath();
				ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = o.fillStyle;
				ctx.fill();
					
				// Value
				ctx.beginPath();
				ctx.arc(size / 2, size / 2, size / 2 - o.lineWidth / 2 - 1, Math.PI * -0.5, Math.PI * o.value * 2 + (Math.PI * -0.5), false);
				ctx.strokeStyle = o.strokeStyle;
				ctx.lineWidth = o.lineWidth + 2; // To hide bleed/clipping
				ctx.stroke();
				
				
			});
		},
		destroy: function (options) {
			var o = $.extend(defaults, options);
			
			return this.each(function () {
				$(this).parent().find("canvas").remove();
			});
		}
	};
	$.fn.circle = function (method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.equalizr');
		}
	};
})(jQuery);