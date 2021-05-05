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


			$close.on( 'click', function( event ) {

				closeMenu();
				return false;

			} );

			$details.on( 'click', function( event ) {

				// $container.removeClass( 'rm-in' ).children( 'div.cv-modal' ).remove();
				// viewDetails( $( this ) );
				// return false;

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
		/* viewDetails = function(cvitem) {

			var title = recipe.text(),
				img = recipe.data('thumb'),
				description = recipe.parent().next().text(),
				url = recipe.attr('href');

			var $modal = $('<div class="rm-modal"><div class="rm-thumb" style="background-image: url(' + img + ')"></div><h5>' + title + '</h5><p>' + description + '</p><a href="' + url + '">See the recipe</a><span class="rm-close-modal">x</span></div>');

			$modal.appendTo( $container );

			var h = $modal.outerHeight( true );
			$modal.css( 'margin-top', -h / 2 );

			setTimeout( function() {

				$container.addClass( 'rm-in rm-nodelay' );

				$modal.find( 'span.cv-close-modal' ).on( 'click', function() {

					$container.removeClass( 'rm-in' );

				} );
			
			}, 0 );

		},*/
    readHash = function () {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      var hash = window.location.hash;
      if(hash === "#" || hash === "") {
        // closed
        unflipMenu();
        closeMenu();
      } else if(hash == "#flipped") {
        openMenu();
        flipMenu();
      }else {
        // open
        unflipMenu();
        openMenu();
      }
    },
    fillSkills = function () {
      console.log('FOOBAR');
      $('div.skill').each(function () {
        ths=$(this);
        dv=ths.attr('data-val');
        nw=$('<div class="skillwrap"></div>')
        nw.append($('<div class="skillitem" style="width:'+ dv + '%;"></div>'));
        ths.append(nw);
        link=$('<a></a>').attr('href', "#" + ths.attr('id')).append(ths.attr('data-name'));

        ths.append(link);
      });
    };

	return { init : init, readHash: readHash, fillSkills: fillSkills };

})();
