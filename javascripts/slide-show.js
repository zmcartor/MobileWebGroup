/*
 	Script to run slideshow on the Honors home page and the Scholars home page.
	Copy and paste the following, then modify
	
	=================================================================================================================
	<div id="animation" class="sixteen columns">
		<div id="gray-overlay"></div>
	</div>
	<div id="slides">
		<div id="title-slide">
			<img src="images/honors-animation/honor.png" alt="Honors" id="anim-honor-logo" />
			<img src="images/honors-animation/the-osu.png" alt="The Ohio State University" id="anim-the-osu" />
		</div>
		
		<div id="slide1">
			<img src="images/honors-animation/img1.jpg"alt=""/>
		</div>
		
		<div id="slide2">
			<img src="images/honors-animation/img2.jpg" alt=""/>
			<p>Rigorous</p><p>Academic Curriculum</p>
		</div>
		
		<div id="slide3">
			<img src="images/honors-animation/img3.jpg" alt=""/>
			<p>Strong</p><p>Peer Community</p>
		</div>
		
		<div id="slide4">
			<img src="images/honors-animation/img4.jpg" alt=""/>
			<p>Research</p><br /><p>Opportunities</p>
		</div>
	</div>
	==========================================================================================================================
*/
$(document).ready(function() {
		var slides = $('#slides').children();
		var currentSlide = 0;
		var previousDuration = 8000;
		DoAnimation();
			
			function DoAnimation() {
				for (currentSlide = 0; currentSlide < slides.length; currentSlide++)
				{
					if (currentSlide == 0) 
					{
						DoTitle();
						previousDuration = 8000;
					} else 
					{
						previousDuration = DoSlides(currentSlide, previousDuration);
					}
				}
				loop = setTimeout(DoAnimation, previousDuration);
			}
			
			function DoTitle() {
				$('#title-slide').clone().appendTo($('#animation'));
				$('#title-slide').children().hide(0);
				$('#animation').css("background-color", "white");
				setTimeout(function () {$('#animation #title-slide').remove()}, 8000);
				$('#title-slide').children().each(
					function(index)
					{
						//Show
						setTimeout(
							function() {
									$('#title-slide').children().eq(index).fadeIn(4000/$('#title-slide').children().length);
							},
							(3000/$('#title-slide').children().length * index + 100)
						);
						CenterHor($('#title-slide').children().eq(index));
						//Hide
						setTimeout(
							function() {
								$('#title-slide').children().eq(index).fadeOut(4000/$('#title-slide').children().length);
								$('#animation').css("background-color", "#999999");
							},
							(3000/$('#title-slide').children().length * index) + 4000   
						);
					}
				);
			}
			
			function DoSlides(thisSlide, previousDuration) {

				slide= $("#slides #slide" + thisSlide);
				if (slide.children('p').length<1)
				{
					setTimeout(function () {
						$('#slides').children().eq(thisSlide).clone().prependTo($('#animation'));
						animatingSlide = $('#animation #slide' + thisSlide);
						animatingSlide.css({'height':'100%', 'width':'100%'});
						animatingSlide.children().css({'position':'absolute', 'opacity':'0'});
						var direction=Math.floor(Math.random()*4);
						//0 = from left, 1 = from right, 2 = from top, 3 = from bottom
						SlideImg(animatingSlide.children('img'),direction);
					}, previousDuration);
					return previousDuration + 6000;
				} else {
					setTimeout(function () {
						$('#slides').children().eq(thisSlide).clone().prependTo($('#animation'));
						animatingSlide = $('#animation #slide' + thisSlide);
						animatingSlide.css({'height':'100%', 'width':'100%'});
						animatingSlide.children().css({'position':'absolute', 'opacity':'0'});
						//Slides with text
						var direction=Math.floor(Math.random()*2);
						//0 = from left, 1 = from right
						SlideImg(animatingSlide.children('img'),direction);
						SlideText(animatingSlide.children('p'));
						
						$('#gray-overlay').css({'opacity':'0', 'z-index':'200'});
						
						animatingSlide.children('p').css('z-index','201');
					}, previousDuration);
					return previousDuration + 8000;
				}
				/*
				setTimeout(function() {
					$('#slides').children().eq(thisSlide).clone().prependTo($('#animation'));
					animatingSlide = $('#animation #slide' + thisSlide);
					animatingSlide.css({'height':'100%', 'width':'100%'});
					animatingSlide.children().css({'position':'absolute', 'opacity':'0'});
					if (animatingSlide.children('p').length<1)
					{
						//Slides without text
						var direction=Math.floor(Math.random()*4);
						//0 = from left, 1 = from right, 2 = from top, 3 = from bottom
						SlideImg(animatingSlide.children('img'),direction);
					}
					else
					{
						//Slides with text
						var direction=Math.floor(Math.random()*2);
						//0 = from left, 1 = from right
						SlideImg(animatingSlide.children('img'),direction);
						SlideText(animatingSlide.children('p'));
						
						$('#gray-overlay').css({'opacity':'0', 'z-index':'200'});
						
						animatingSlide.children('p').css('z-index','201');
					}
									
				}, thisSlide * 8000);
				*/
			}
			
			function SlideText(text) {
				var totalHeight =  0;
				text.each(function (index) {
					totalHeight = totalHeight + text.eq(index).height();			
				});
				//Set vertical position
				var posTop = (text.eq(0).parent().parent().height() - totalHeight) / 2;
				text.eq(0).css({'top':posTop});
				
				text.each(function (index) {
					if (index > 0) {
						oldTop = parseInt(text.eq(index - 1).css('top').substring(0, text.eq(index - 1).css('top').length - 2));
						newPosTop = oldTop + text.eq(index - 1).height();
						text.eq(index).css({'top': newPosTop});
					}
					
					if ((index % 2) == 0) {
						text.eq(index).css({'left':'72px'});
					} else {
						text.eq(index).css({'left':'-72px'})
					}
				});
				
				text.each(function (index) {
				setTimeout(function() {	
						if ((index % 2) ==0) {
							text.eq(index).animate(
								{	opacity: '1',
									left: '-=72'
								}, {
									duration: 2500,
									easing: 'easeOutQuad'
								}
							);
						} else {
							text.eq(index).animate(
								{	opacity: '1',
									left: '+=72'
								}, {
									duration: 2500,
									easing: 'easeOutQuad'
								});
						}
					setTimeout(function () {
						if ((index % 2) ==0) {
							text.eq(index).animate(
								{	opacity: '0',
									left: '-=72'
								}, {
									duration: 2500,
									easing: 'easeInQuad'
								}
							);
						} else {
							text.eq(index).animate(
								{	opacity: '0',
									left: '+=72'
								}, {
									duration: 2500,
									easing: 'easeInQuad'
								});
						}
					}, 2000);
					}, 3000);
							$('#gray-overlay').css('top',0);				
						setTimeout(function() {
							$('#gray-overlay').animate({opacity: 0.5},500);
							}, 2000);
						setTimeout(function() {
							$('#gray-overlay').animate({opacity: 0},500);
							}, 7500);
				});
				
				
			}
			
			function SlideImg(img, direction) {

				switch (direction)
				{

					case 0:
						img.css('right','0');
						CenterVer(img); 
						img.animate({
							opacity: '1',
							left: '+=48'
						},{
							duration: 3000,
							easing: 'linear',
							complete: function() {
								img.animate(
									{
										opacity: '0',
										left: '+=48'
									},
									{ 
										duration: 2999,
										easing: 'linear'
									}
									);
							}});
						break;
					case 1:
						img.css('left','0');
						CenterVer(img);

						img.animate(
								{
									opacity: '1',
							left: '-=48'
								},	{
									duration: 3000,
							easing: 'linear',
							complete: function() {
								img.animate(
									{
										opacity:'0',
								left: '-=48'
									}, {
										duration: 2999,
								easing: 'linear'
									}
									);
							}});
						break;
					case 2:
						img.css('top','0');
						CenterHor(img);
						img.animate(
								{
									opacity: '1',
									'top': '-=48'
								},	{
									duration: 3000,
							easing: 'linear',
							complete: function() {
								img.animate(
									{
										opacity: '0',
										'top': '-=48'
									},	{
										queue: false,
										duration: 2999,
										easing: 'linear'
									});
							}});
						break;
					case 3:
						img.css('bottom','0');
						CenterHor(img);
						img.animate(
								{
									opacity: '1',
							top: '+=48'
								},	{
									duration: 3000,
							easing: 'linear',
							complete: function() {
								img.animate(
									{
										opacity: '0',
								top: '+=48'
									},	{
										duration: 2999,
								easing: 'linear'
									});
							}});
						break;
				}
				setTimeout(function() {img.parent().remove()},8000);
		}
			
			function CenterHor(obj) {
				posLeft = (obj.parent().width() - obj.width())/2;
				obj.css({'left':posLeft});
			}
			
			function CenterVer(obj) {
				posTop = (obj.parent().height() - obj.height())/2;
				obj.css({'top':posTop});
			}

			$(window).resize(
				function() {
					CenterHor($('#title-slide *'));
				}
			);
});
