define( function( require ) {
	
	var $ = require('jquery'),
	_ = require('underscore'),
	Backbone = require('backbone'),
	Handlebars = require('handlebars'),
	HomeView = require('views/home');
	
	var AppRouter = Marionette.AppRouter.extend({
	
		routes: {
		//	'': 'home',
		},
		
		home: function() {
			window.casinoApp.nav.$el.find('li').removeClass('active');
			window.casinoApp.nav.$el.find('.home').addClass('active');
			window.casinoApp.main.show( new HomeView() );
			
		}
	});
	
	return AppRouter;
	
});