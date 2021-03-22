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

		init = function() {

			initEvents();

		},
		initEvents = function() {
			$covercontent.on( 'click', function( event ) {
        var target = event.target ? event.target : event.srcElement;
        if(target.id == 'cv-frontopen' || target.id == 'cv-frontclose') {
          if($container.hasClass('cv-open')) {
            closeMenu();
          } else {
            openMenu();
          }
  				return false;
        }
			} );

			$right.on( 'click', function( event ) {
        if($container.hasClass('cv-flip')) {
          unflipMenu();
        } else {
  				flipMenu();
        }
				return false;

			} );


			$close.on( 'click', function( event ) {

				closeMenu();
				return false;

			} );

			$details.on( 'click', function( event ) {

				$container.removeClass( 'rm-in' ).children( 'div.cv-modal' ).remove();
				viewDetails( $( this ) );
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
		viewDetails = function( recipe ) {

			var title = recipe.text(),
				img = recipe.data( 'thumb' ),
				description = recipe.parent().next().text(),
				url = recipe.attr( 'href' );

			var $modal = $( '<div class="rm-modal"><div class="rm-thumb" style="background-image: url(' + img + ')"></div><h5>' + title + '</h5><p>' + description + '</p><a href="' + url + '">See the recipe</a><span class="rm-close-modal">x</span></div>' );

			$modal.appendTo( $container );

			var h = $modal.outerHeight( true );
			$modal.css( 'margin-top', -h / 2 );

			setTimeout( function() {

				$container.addClass( 'rm-in rm-nodelay' );

				$modal.find( 'span.cv-close-modal' ).on( 'click', function() {

					$container.removeClass( 'rm-in' );

				} );
			
			}, 0 );

		};

	return { init : init };

})();
