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
				$(window).scrollTop($('ul.tabs').offset().top-10);
				$('ul.tabs a[href=' + $(this).attr('href') + ']').trigger('click');	
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
				var scrollPos = $(window).scrollTop();
				window.location.hash = contentLocation;
				$(window).scrollTop(scrollPos);
			}
		});
	});

	// Switch to tab in address hash tag
	var hash = window.location.hash;
	$('ul.tabs a[href=' + hash + ']').trigger('click');
});
