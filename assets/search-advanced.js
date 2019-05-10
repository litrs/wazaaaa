$(document).ready(function(){

	zoomType = 'window';
	//mm = window.matchMedia("only screen and (max-width: 760px)");

	setUpMobileSidebar();

	if(isMobile)
	{
		setUpMobileTips();
	}
	else
	{
		setUpDesktopStickySidebar();
	}

	setUpDesktopShareButtons();
	setUpCollapsibleMenus();

	setUpMobileResultsDescription();

	//Load product data into popup or slidein when product is clicked - popup for desktop, slidein for mobile
	//REMOVED FROM ONRENDERHANDLER so that event is delegated rather than direct
	/*
	$("#hits-container").on('click', '.result', function(){

		//Show loading indicator
		$('#' + displayMethod + '-img-indicator').show();

		//Update the popup main image
		$('#' + displayMethod + '-main-image-img').attr('src','');
		$('#' + displayMethod + '-main-image-img').off('error').on('error', function(){ imgError(this); });
		$('#' + displayMethod + '-main-image-img').attr('src',$(this).attr('data-img1'));

		//Hide the loading indicator once image loading is complete
		$('#' + displayMethod + '-main-image-img').on('load',function(){
			$('#' + displayMethod + '-img-indicator').hide();
		});


		if(isMobile)
		{
			$('#' + displayMethod + '-images').cycle('destroy');

			$('#' + displayMethod + '-images').empty();
			if($(this).attr('data-img1')){ $('#' + displayMethod + '-images').append('<img onerror="imgError(this);" class="manual-center" src="' + $(this).attr('data-img1') + '" />') };
			if($(this).attr('data-img2')){ $('#' + displayMethod + '-images').append('<img onerror="imgError(this);" class="manual-center" style="display: none" src="' + $(this).attr('data-img2') + '" />') };
			if($(this).attr('data-img3')){ $('#' + displayMethod + '-images').append('<img onerror="imgError(this);" class="manual-center" style="display: none" src="' + $(this).attr('data-img3') + '" />') };
			if($(this).attr('data-img4')){ $('#' + displayMethod + '-images').append('<img onerror="imgError(this);" class="manual-center" style="display: none" src="' + $(this).attr('data-img4') + '" />') };

//			if($('#' + displayMethod + '-images img').length == 1) $('#' + displayMethod + '-images img').addClass('manual-center');

			//Hide the loading indicator once first image is loaded
			$('#' + displayMethod + '-images img:nth-of-type(1)').on('load',function(){
				$('#' + displayMethod + '-img-indicator').hide();
			});

			//initialise slidein slideshow
			$('#' + displayMethod + '-images').cycle({
				speed: 300,
				timeout: 2000,
				"slide-active-class": "active-slide",
				"slide-class": "slide",
				"swipe": true,
				"paused": true,
				"pager": "#slidein-img-pager",
				"fx": "scrollHorz",
				"log": false,
				"centerHorz": true
			});

			//update wishlist icon in header of slidein
			$('#slidein-wishlist-heart').attr('data-productid', $(this).attr('data-productID'));
			setWishlistHeart('#slidein-wishlist-heart');


			toggleProductDetail();

		}
		else
		{
			//Prepare zoom-in functionality
			$('#' + displayMethod + '-main-image-img').data('zoom-image',$(this).attr('data-zoom1'));
			$('#' + displayMethod + '-main-image-img').elevateZoom(elevateZoomOptions);

			//Load thumbnail images
			$('#' + displayMethod + '-thumbnails').empty();
			if($(this).attr('data-img1')){ $('#' + displayMethod + '-thumbnails').append('<img onerror="imgError(this);" class="selected" id="' + displayMethod + '-thumbnail1" data-img="' + $(this).attr('data-img1') + '" data-zoom="' + $(this).attr('data-zoom1') + '" src="' + $(this).attr('data-thumb1') + '" />') };
			if($(this).attr('data-img2')){ $('#' + displayMethod + '-thumbnails').append('<img onerror="imgError(this);" id="' + displayMethod + '-thumbnail2" data-img="' + $(this).attr('data-img2') + '" data-zoom="' + $(this).attr('data-zoom2') + '" src="' + $(this).attr('data-thumb2') + '" />') };
			if($(this).attr('data-img3')){ $('#' + displayMethod + '-thumbnails').append('<img onerror="imgError(this);" id="' + displayMethod + '-thumbnail3" data-img="' + $(this).attr('data-img3') + '" data-zoom="' + $(this).attr('data-zoom3') + '" src="' + $(this).attr('data-thumb3') + '" />') };
			if($(this).attr('data-img4')){ $('#' + displayMethod + '-thumbnails').append('<img onerror="imgError(this);" id="' + displayMethod + '-thumbnail4" data-img="' + $(this).attr('data-img4') + '" data-zoom="' + $(this).attr('data-zoom4') + '" src="' + $(this).attr('data-thumb4') + '" />') };

			//Enable switch of main image on thumbnail click
			$('#' + displayMethod + '-thumbnails img').on('click', function(){ switchImage(this,'popup') });
		}


		//Load other product data
		$('#' + displayMethod + '-designer').html($(this).attr('data-designer'));
		$('#' + displayMethod + '-product-title').html($(this).attr('data-productTitle'));
		$('#' + displayMethod + '-rental-price span').html($(this).attr('data-rentalPrice'));
		$('#' + displayMethod + '-retail-price span').html($(this).attr('data-retailPrice'));
		$('.' + displayMethod + '-vendor-friendly').html($(this).attr('data-vendorFriendly'));
		$('#' + displayMethod + '-style-notes-content').html($(this).find('.result-description').html());
		showTab('#' + displayMethod + '-details-tabs > li:first-of-type > a',displayMethod + '-style-notes');
		$('#' + displayMethod + '-external-link-a').attr('href','/referral.php?pid=' + $(this).attr('data-productID'));

		//hide retail price if not available
		if($(this).attr('data-retailPrice') == 0) $('#' + displayMethod + '-retail-price').css('visibility','hidden');
		else $('#' + displayMethod + '-retail-price').css('visibility','visible');

		//hide product modal and display subscribe modal after user has been referred to vendor
		//changed this to timer for mobile and mouseleave for desktop
		//$('#' + displayMethod + '-external-link > a').click(function(e){
		//	displaySubscribe();
		//});

		//Load sizes
		$('#' + displayMethod + '-sizes').empty();
		var sizes;
		sizes = $(this).attr('data-actualSizes');
		sizes = sizes.split(',');
		for(i=0; i<sizes.length; i++)
		{
			$('#' + displayMethod + '-sizes').append('<div class="' + displayMethod + '-size">' + sizes[i] + '</div>');
		}

		//Load vendor logo
		$('#' + displayMethod + '-vendor-logo').attr('src','/images/vendor-logos/' + allVendors[$(this).attr('data-vendor')]['Logo']);

		//Load vendor info
		$('#' + displayMethod + '-about-vendor').html(allVendors[$(this).attr('data-vendor')]['VendorDescription']);
		$('#' + displayMethod + '-vendor-postage-content').html(allVendors[$(this).attr('data-vendor')]['PostageInfo']);

		//update sharing buttons
		baseURL = 'http://' + window.location.hostname;
		facebookShareURL = 'http://www.facebook.com/sharer.php?u=' + baseURL + $(this).parent().attr('href');
		emailURL = '/emailer.php?productId=' + $(this).attr('data-productid');
		smsURL = 'sms:?body=Hey, check out this item I found on All The Dresses.%0a%0a' + $(this).attr('data-designer') + ' - ' + $(this).attr('data-productTitle') + '%0a' + baseURL + $(this).parent().attr('href');

		$('#' + displayMethod + '-facebook-share').attr('href',facebookShareURL);
		$('#' + displayMethod + '-email-share').attr('href',emailURL);
		$('#' + displayMethod + '-sms-share').attr('href',smsURL);

		//set wishlist button
		setWishlistButton( parseInt( $(this).attr('data-productid') ) );

		SMSLink.link().replaceAll();

		updateURLBar($(this).parent().attr('href'));

	});
	*/

	//Re-calc sticky sidebar when 'Show More' is clicked, increasing the size of Designers filters
	/* moved to setUpDesktopStickSidebar()
	$('#facet-designers').on('click','a.ais-show-more',function(){
		setTimeout('stickyRecalc()',500);
	});
	*/



});

//called when content size within sidebar changes - collapsible menus and show more buttons
function stickyRecalc(startPos)
{
	var prevTop = $('#sidebar').css('top');

	if(prevTop == '70px'){
		//console.log(prevTop);
		$('#sidebar').css('transition','none');
	}

	$(document.body).trigger("sticky_kit:recalc");

	//manually move sidebar back to top as sticky kit keeps it hidden
	if($('#sidebar').outerHeight() < window.innerHeight)
	{
		$('#sidebar').css('top','70px');
		//console.log($('#sidebar').css('top'));
	}

	$('#sidebar').css('transition','all .5s cubic-bezier(.46,.01,.32,1)');
}


function toggleSidebar()
{
	if($('#sidebar').hasClass('sidebar-active'))
	{
		$('#sidebar').removeClass('sidebar-active');
		$('#sidebar-button').removeClass('sidebar-button-active');
	}
	else
	{
		$('#sidebar').addClass('sidebar-active');
		$('#sidebar-button').addClass('sidebar-button-active');
		$('#sidebar-bottom').css('display','none');
		setTimeout("$('#sidebar-bottom').fadeIn('fast')",500);
	}
}

var docFrozen = false;
function freezeDocument()
{
	//do no options
	return true;

	//option 1 - overflow hidden - makes content jump to top though
	//('body, html').css('overflow','hidden')


	//option 2 - fix the page then set 'top' to negative position
	if(docFrozen == false)
	{
		prevScroll = {
			scrollTop  : $( window ).scrollTop()
		};

		lockStyles = {
			'overflow-y' : 'scroll',
			'position'   : 'fixed',
			'width'      : '100%',
			'top'        : - prevScroll.scrollTop
		}

		$('html').css(lockStyles);
//		$('html').css('top',- prevScroll.scrollTop);

		$( window )
			.scrollLeft( 0 )
			.scrollTop( 0 );

		docFrozen = true;
	}

}
function unfreezeDocument()
{
	return true;

	//$('body, html').css('overflow','visible');

	if(docFrozen == true)
	{
		unlockStyles = {
			'overflow-y' : 'auto',
			'position'   : 'static',
			'width': 'auto',
			'top': 0
		}

		prevScroll = {
			scrollTop : $('html').css('top').replace('px','')
		}

		$('html').css(unlockStyles);
		$(window).scrollTop(- prevScroll.scrollTop);

		docFrozen = false;
	}

}

function slideInTip(direction)
{
	if(direction == 'in')
		$('#slide-in-tip').animate({bottom: '0'},1000);
	if(direction == 'out')
		$('#slide-in-tip').animate({bottom: '-35px'},1000);
}

function setUpMobileTips()
{
	setTimeout('slideInTip("in")',4000);
	setTimeout('slideInTip("out")',12000);
}

function setUpMobileSidebar()
{
	$('#sidebar-button').on('click', function(){
		toggleSidebar();
	});

	$('#sidebar-close').on('click', function(){
		toggleSidebar()
	});
}


function setUpDesktopStickySidebar()
{
	//sticky sidebar
	$('#sidebar').stick_in_parent({offset_top:70,parent:'#container2',spacer:'#sidebar-spacer'});

	$('#facet-designers').on('click','a.ais-show-more',function(){
		setTimeout('stickyRecalc()',500);
	});
}


/******
 * setUpCollapsibleMenus() - Makes filters collapse/retract on heading click
 */
function setUpCollapsibleMenus()
{
	// Collapsible Sidebar Menus
	$('.heading-collapsible').on('click', function(){

		var startPos = $('#sidebar').css('top');

		if($(this).hasClass('heading-collapsible-open'))
		{
			$(this).removeClass('heading-collapsible-open').addClass('heading-collapsible-closed');
			collapseTarget = '#' + $(this).data('collapse-target');
			$(collapseTarget).animate({height: 0},300,'swing',function(){
				$(this).css('overflow','hidden');
				if(!isMobile) stickyRecalc(startPos);
			});
		}
		else if($(this).hasClass('heading-collapsible-closed'))
		{
			$(this).removeClass('heading-collapsible-closed').addClass('heading-collapsible-open');
			collapseTarget = '#' + $(this).data('collapse-target');
			$(collapseTarget).css({height: 'auto','overflow':''});
			if(!isMobile) stickyRecalc(startPos);
		}
	});
}

var firstSearchCall = true;
/****
 * searchFunction() - Run prior to instantsearch running a query
 * 					- Used to hide title/short desc based on filter changes
 * 					- Moves user to top of results when filters are changed
 */
function searchFunction(helper)
{

	//hide homepage big banner
	if(!firstSearchCall)
	{
		hideBanner();
	}

	// grab title type and title value from the DOM
	titleType = $('#results-title').attr('data-titleType');
	titleValue = $('#results-title').html();

	// if the page currently has a title
	if(titleType)
	{
		// if the title is based on a predefined search
		if(titleType == 'query')
		{
			// check if the current search query is the same as the page title
			// if it isn't, hide the heading (heading is page title + results intro description)
			currentQuery = helper.state.query;
			if(titleValue != currentQuery) $('#results-heading').hide();
		}
		// if the user arrived via the homepage - default listing is 'Our Favourites'
		else if(titleType == 'favourite' || titleType == 'City')
		{
			// calculate how many filters are currently applied
			var filterCount = Object.keys(helper.state.disjunctiveFacetsRefinements).length + Object.keys(helper.state.numericRefinements).length;
			// if the user has initiated a search or if there are filters applied, hide the heading
			if(helper.state.query || filterCount > 0)
			{
				$('#results-heading').hide();
			}
		}
		// titles based on city - does not need to be hidden when filters change
		else if(titleType == 'City')
		{
			//do nothing
		}
		// applies to all titles based on refinements - only currently used by 'designer' refinement
		else
		{
			// grab refinements for the refinement that page title is based on
			string = 'helper.state.disjunctiveFacetsRefinements.' + titleType;
			facetRefinements = eval(string);
			if (typeof facetRefinements !== 'undefined')
			{
				// if there is more than 1 item selected for the refinement, or the refinement has been deselected - hide the heading
				if(facetRefinements.length > 1 || facetRefinements.length == 0)
				{
					$('#results-heading').hide();
				}
			}
			else {
				$('#results-heading').hide();
			}
		}

	}


	var searchResults = $('.search-results');
	if (helper.state.query === '') {
		//searchResults.hide();
		//return;
	}
	helper.search();
	window.scrollTo(0,0);
	searchResults.show();

	//tracking
	if(!firstSearchCall)
	{
		eventProperties = generateEventPropertiesFromHelper(helper);
		trackEvent('Filter/Search Triggered',eventProperties);
	}

	firstSearchCall = false;
}

function setUpMobileResultsDescription()
{
	$('#results-intro .read-more').on('click', function(){
		$(this).remove();
		$('#results-intro span').css('display','inline');
	});
}