$(document).ready(function () {

	/* Anchor smoothscroll *////
	$('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top
	        }, 500, 'easeInOutQuint');
	        return false;
	      }
	    }
	});

	/* Onscroll enable 60fps */
	if (!Modernizr.touchevents) {
	     window.addEventListener('scroll', function() {
		  		clearTimeout(timer);
				if(!body.classList.contains('disable-hover')) {
				    body.classList.add('disable-hover');
				}

			  	timer = setTimeout(function(){
				    body.classList.remove('disable-hover');
				    $(body).trigger('mousemove');
		        },300);

		}, false);
	}

  var body = document.body,
  		timer;

	var $window = $(window);

	/* Fix for foundation stylesheets being picked up as "null" or "not an object",
	   implementation from here: http://foundation.zurb.com/forum/posts/3189-foundation-5-orbit-slider-ie8-issue */
	if (!Foundation.stylesheet) {
		Foundation._style_element = $('<style></style>').appendTo('head')[0];
		Foundation.stylesheet     = Foundation._style_element.styleSheet;

		if (Foundation.stylesheet) {
			Foundation.stylesheet.cssRules = {
				length: 0
			};

			Foundation.stylesheet.insertRule = function(rule, index) {
				var media, mediaMatch, mediaRegex, namespace, ruleMatch, ruleRegex;
				mediaRegex = /^\s*@media\s*(.*?)\s*\{\s*(.*?)\s*\}\s*$/;
				mediaMatch = mediaRegex.exec(rule);
				media      = '';

				if (mediaMatch) {
					media = '@media ' + mediaMatch[1] + ' ';
					rule  = mediaMatch[2];
				}

				ruleRegex = /^\s*(.*?)\s*\{\s*(.*?)\s*\}\s*$/;
				ruleMatch = ruleRegex.exec(rule);
				namespace = '' + media + ruleMatch[1];
				rule      = ruleMatch[2];

				return this.addRule(namespace, rule);
			};
		} else if (window.console) {
			console.log('Could not fix Foundation CSS rules...');
		}
	}

	//IE9 placeholder fallback
	//credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
	if(!Modernizr.input.placeholder){
		$('[placeholder]').focus(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
		  	}
		}).blur(function() {
		 	var input = $(this);
		  	if (input.val() === '' || input.val() === input.attr('placeholder')) {
				input.val(input.attr('placeholder'));
		  	}
		}).blur();
		$('[placeholder]').parents('form').submit(function() {
		  	$(this).find('[placeholder]').each(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
			 		input.val('');
				}
		  	});
		});
	}

});

function moveBg(){
	 if ($(window).width() > 1024) {
		 var scrollTop = document.body.scrollTop;
		 var st = scrollTop / 3;
		 var st_adjust = st;
		 var px = st_adjust+'px';
	 	$('.banner .background').css({
	 		'transform':'translate3d(0px, '+px+', 0px)',
	 		'opacity' : 1 - (scrollTop/700)
	 	});
	 }
}

/* Initiate Foundation */
$(document).foundation();
