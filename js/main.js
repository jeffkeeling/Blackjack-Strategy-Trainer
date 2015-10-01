require.config({
	paths: {
		jquery: 'libs/jquery-1.10.2.min',
		underscore: 'libs/underscore-min',
		backbone: 'libs/backbone-min',
		text: 'libs/text',
		templates: '../templates',
		marionette: 'libs/backbone.marionette.min',
		handlebars: 'libs/handlebars',
		bootstrap: 'libs/bootstrap.min',
		tween_max: 'libs/gsap/TweenMax.min'
	},
	shim: {
		marionette: {
			deps: ['jquery', 'underscore', 'backbone'],
			exports: 'Marionette'
		},
		handlebars: {
			exports: 'Handlebars'
		},
		bootstrap:{
			deps: ['jquery']
		},
		tween_max: {
			exports: 'TweenMax'
		}
	}
});

define( function( require ) {
	
	var Marionette = require('marionette'),
	Handlebars = require('handlebars'),
	Bootstrap = require('bootstrap');
	
	//Allow Marionette to use Handlebars for template rendering
	Marionette.TemplateCache.prototype.compileTemplate = function( rawTemplate ) {
		return Handlebars.compile( rawTemplate );
	};	
		
	//Handlebars function to display correct suit character for each card
	Handlebars.registerHelper( 'displaySuit', function( suit ) {
		
		if ( suit === 'hearts' ) {
			return '&hearts;';
		} else if ( suit === 'spades' ) {
			return '&spades;';
		} else if ( suit === 'diamonds' ) {
			return '&diams;';
		} else {
			return '&clubs;';
		}
	});
	
	//Handlebars function to display correct color for each card
	Handlebars.registerHelper( 'displayColor', function( suit ) {

		if( suit === 'hearts' || suit === 'diamonds' ) {
			return 'card-red';	
		} else {
			return 'card-black';	
		}
	});
	
	//Handlebars function to display correct name for each card
	Handlebars.registerHelper( 'displayName', function( cardId ){
		
		if ( cardId === 1 ) {
			return "A";
		} else if ( cardId === 11 ) {
			return 'J';
		} else if ( cardId === 12 ) {
			return 'Q';
		} else if ( cardId === 13 ) {
			return 'K';
		} else {
			return cardId;
		}
	});
	
	//create new Marionette application
	var casinoApp = new Marionette.Application();
	
	//set app-level regions
	casinoApp.addRegions({
		nav : '#nav',
		main: '#main'
	});
	
	//app initializer to insert nav
	casinoApp.addInitializer( function() {
	
		require([
			'text!templates/nav.html'
		], function( NavTemplate ) {
			
			var NavView = Marionette.ItemView.extend({
				template: NavTemplate
			});
			
			casinoApp.nav.show( new NavView() );
		});
	});
	
	//app initializer to start blackjack router
	casinoApp.addInitializer( function() {

		require([
			'router_blackjack'
		], function ( BlackjackRouter ) {
			this.blackjackRouter = new BlackjackRouter();
			Backbone.history.start();
		});
		
	});
		
	//start app	
	casinoApp.start();
	
	//set global variable for app
	window.casinoApp = casinoApp;

});