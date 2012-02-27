/*
* Skeleton V1.1
* Copyright 2011, Dave Gamache
* www.getskeleton.com
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
* 8/17/2011
*/


$(document).ready(function() {

	/* Tabs Activiation
	================================================== */

	var tabs = $('ul.tabs');


	tabs.each(function() {

		//Get all tabs
		var tab = $(this).find('> li > a');
		//console.log($('a[href=' + $(this).attr('href') + ']').not($(this)));
		tab.each(function(index) {
			$('a[href=' + $(this).attr('href') + ']').not($(this)).click(function(e) {
				e.preventDefault();
				scrollPos = $('ul.tabs').offset().top - 10;
				//$('html, body').scrollTop(scrollPos);
				var tab_this = $(this);
				$('html, body').animate({scrollTop: scrollPos}, 500);
				$('ul.tabs > li > a[href=' + $(tab_this).attr('href') + ']').trigger('click');
			});
		});

		tab.click(function(e) {

			//Get Location of tab's content
			var contentLocation = $(this).attr('href');

			//Let go if not a hashed one
			if(contentLocation.charAt(0)=="#") {

				e.preventDefault();

				//Make Tab Active
				tab.removeClass('active');
				$(this).addClass('active');

				//Show Tab Content & add active class
				$(contentLocation).show().addClass('active').siblings().hide().removeClass('active');

				//Change hash
				window.location.hash = ('tab=' + contentLocation.replace('#','')).replace(/\s/g,'');

			}
		});

		// Switch to tab in address hash tag
		var hash = window.location.hash.replace("tab=","").replace(/\s/g, '');
		$('ul.tabs > li > a[href=' + hash + ']').trigger('click');
		$('html, body').scrollTop(0);
	});


});
