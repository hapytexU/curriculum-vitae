const monthabbrev = [
  'Jan.',
  'Feb.',
  'Mar.',
  'Apr.',
  'May',
  'June',
  'July',
  'Aug.',
  'Sep.',
  'Oct.',
  'Nov.',
  'Dec.'
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const yearAp = '&rsquo;';
const durmid = '&#8211';

var Curriculum = (function() {
	var $container = $( '#cv-leaflet' ),
		$cover = $container.find( 'div.cv-cover' ),
    $coverclick = $cover.find('.cv-overlay'),
    $coverfront = $cover.find('.cv-front'),
    $covercontent = $cover.find('.cv-openclose'),
		$middle = $container.find( 'div.cv-middle' ),
		$right = $container.find( 'div.cv-right' ),
		$open = $cover.find('a.cv-button-open'),
		$close = $right.find('span.cv-close'),
		$details = $container.find( 'a.cv-viewdetails' ),
    $businesscard = $('#businesscard');
    $businesscardtitle = $('#businesscard-title');
    $businesscardcontent = $('#businesscard-content');
    $businesscardicon = $('#businesscard-icon');
    state = false,

    moveCoffee = function () {
      $('.coffee').removeClass('imgloading');
    }

		init = function() {
			initEvents();
      readHash();
      var coff = $('.coffee img')[0];
      coff.addEventListener("load", moveCoffee);
		},
		initEvents = function() {
			$covercontent.on( 'click', function( event ) {
        var target = event.target ? event.target : event.srcElement;
        if(target.id == 'cv-frontopen' || target.id == 'cv-frontclose') {
          if($container.hasClass('cv-open')) {
            window.location.hash = "";
          } else {
            window.location.hash = "#open";
          }
  				return false;
        }
			} );

			$right.on( 'click', function( event ) {
        var target = event.target ? event.target : event.srcElement;
        if(target.id == 'cv-rightopen' || target.id == 'cv-rightclose') {
          if($container.hasClass('cv-flip')) {
            // unflipMenu();
            window.location.hash = "#open";
          } else {
  			  	// flipMenu();
            window.location.hash = "#flipped";
          }
				  return false;
        }
			} );

      $businesscard.find('.cv-close-modal').on('click', function () {
        $container.removeClass('cv-in');
      });
			$close.on( 'click', function( event ) {

				closeMenu();
				return false;

			} );

			$details.on( 'click', function( event ) {

				// $container.removeClass( 'rm-in' ).children( 'div.cv-modal' ).remove();
				viewDetails($(this));
				return false;

			} );
			
		},
		openMenu = function() {

			$container.addClass( 'cv-open' );

		},
		flipMenu = function() {

			$container.addClass( 'cv-flip' );

		},

    unflipMenu = function() {

			$container.removeClass( 'cv-flip' );

		},

		closeMenu = function() {
			$container.removeClass( 'cv-open cv-nodelay cv-in cv-close' );

		},
		viewDetails = function(cvitem) {
      var title = $('<i></i>').append(cvitem.text());
      var datas = cvitem.parent().next();
      var firm = $('<i></i>').append(datas.attr('data-firm'));
      // title = cvitem.attr('data-title');
      $businesscardtitle.empty();
      $businesscardtitle.append(title);
      $businesscardtitle.append(' at ');
      $businesscardtitle.append(firm);
      $businesscardcontent.empty();
      // $businesscardcontent.append(data.html());
      $businesscardcontent.html(datas.find('.buz').html());
      $businesscardicon.html(datas.find('.biz').html());

			/* var title = recipe.text(),
				img = recipe.data('thumb'),
				description = recipe.parent().next().text(),
				url = recipe.attr('href');

			var $modal = $('<div class="rm-modal"><div class="rm-thumb" style="background-image: url(' + img + ')"></div><h5>' + title + '</h5><p>' + description + '</p><a href="' + url + '">See the recipe</a><span class="rm-close-modal">x</span></div>');

			$modal.appendTo( $container );

			var h = $modal.outerHeight( true );
			$modal.css( 'margin-top', -h / 2 );

			setTimeout( function() {*/

				$container.addClass('cv-in' );
      /*

				$modal.find( 'span.cv-close-modal' ).on( 'click', function() {

					$container.removeClass( 'rm-in' );

				} );
			
			}, 0 ); */

		},
    readHash = function () {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      var hash = window.location.hash;
      if(hash === "#" || hash === "") {
        // closed
        unflipMenu();
        closeMenu();
      } else if(hash.startsWith("#flipped")) {
        openMenu();
        flipMenu();
      }else {
        // open
        unflipMenu();
        openMenu();
      }
      return false;
    },
    makeSpan = function (name, cls) {
      return $('<span></span>').addClass(cls).append(name);
    },
    formatMonth = function(obj, pref) {
        const frmyy=obj.attr('data-' + pref + '-yy');
        const frmmm=obj.attr('data-' + pref + '-mm');
        if(frmyy === undefined) {
          return '&hellip;'
        } else if(frmmm == undefined) {
          return yearAp + frmyy;
        } else {
          return monthabbrev[parseInt(frmmm)-1] + ' ' + yearAp + frmyy;
        }
    },
    makeFullLink = function (target, name, cls) {
      return $('<a></a>').attr('href', target).attr('target', '_blank').addClass(cls).append(name);
    },
    descItem = function (that, firm, tags) {
        var ths=$(that);
        var frm=ths.attr('data-firm');
        var frmurl=ths.attr('data-firm-href');
        var loc=ths.attr('data-loc');
        var locurl=ths.attr('data-loc-href');
        var dura = formatMonth(ths, 'from');
        var durb = formatMonth(ths, 'to');
        ths.append(makeFullLink(frmurl, frm, firm));
        ths.append(makeFullLink(locurl, loc, 'location'));
        ths.append($('<br>'));
        ths.append(makeSpan(dura + ' ' + durmid + ' ' + durb, 'duration'));
        ths.append(makeSpan(ths.attr('data-tags'), tags));
    },
    fillData = function () {
      $('div.skill').each(function () {
        var ths=$(this);
        var dv=ths.attr('data-val');
        var nw=$('<div class="skillwrap"></div>')
        nw.append($('<div class="skillitem" style="width:'+ dv + '%;"></div>'));
        ths.append(nw);
        var link=$('<a></a>').attr('href', "#" + ths.attr('id')).append(ths.attr('data-name'));
        ths.append(link);
      });
      $('dd.workdesc').each(function () {
        descItem(this, 'firm', 'tags');
      });
      $('dd.edudesc').each(function () {
        descItem(this, 'univ', 'grade');
      });
    };

	return { init : init, readHash: readHash, fillData: fillData };

})();
