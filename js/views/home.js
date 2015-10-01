define( function( require  ){
	var $ = require('jquery'),
	_ = require('underscore'),
	Backbone = require('backbone'),
	Handlebars = require('handlebars'),
	homeTemplate = require('text!templates/home.html');

	var HomeView = Marionette.ItemView.extend({
		template: homeTemplate
	});

	return HomeView;
});