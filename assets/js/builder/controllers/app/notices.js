/**
 * Add a jBox notice to the screen.
 * 
 * @package Ninja Forms builder
 * @subpackage Main App
 * @copyright (c) 2015 WP Ninjas
 * @since 3.0
 */
define( [], function() {
	var controller = Marionette.Object.extend( {
		initialize: function() {
			nfRadio.channel( 'notices' ).reply( 'add', this.addNotice, this );
			nfRadio.channel( 'notices' ).reply( 'close', this.closeNotice, this );
			this.notices = {};
		},

		addNotice: function( key, msg, options ) {

			var appDefaults = {
				content: msg,
				color: 'green',
				zIndex:12000
			};

			var mobileDefaults = {
				position: {
					x: 'center',
					y: 'top'
				},
				animation: {
					open:'slide:top',
					close:'move:left'
				},
				autoClose: 2000,
				offset: {
					x: 0,
					y: 55
				}
			};

			var desktopDefaults = {
				position: {},
				attributes: {
					x: 'left',
					y: 'bottom'
				},
				animation: {
					open:'slide:bottom',
					close:'move:left'
				},
				autoClose: 3000,
				offset: {
					x: 0,
					y: 0
				}
			};

			if ( nfRadio.channel( 'app' ).request( 'is:mobile' ) ) {
				var defaults = mobileDefaults;	
			} else {
				var defaults = desktopDefaults;
			}
			defaults = jQuery.extend( defaults, appDefaults );

			var options = jQuery.extend( defaults, options );
			this.notices[ key ] = new jBox( 'Notice', options );
		},

		closeNotice: function( key ) {
			if ( 'undefined' != typeof this.notices[ key ] ) {
				this.notices[ key ].close();
			}
		},

		openNotice: function( key ) {
			if ( 'undefined' != typeof this.notices[ key ] ) {
				this.notices[ key ].open();
			}
		}

	});

	return controller;
} );