define( function( require ) {
	var $ = require('jquery'),
	_ = require('underscore'),
	Backbone = require('backbone'),
	Handlebars = require('handlebars'),
	cardTemplate = require('text!templates/card.html');	
	
	CardView = Marionette.ItemView.extend({
		
		tagName: 'li',
		className: 'card-container',
		template: Handlebars.compile( cardTemplate ),
		
		initialize: function() {	
			this.listenTo(this.model, 'aboutToBeFlipped' , this.removeCard);
			_.bindAll(this, 'close');
		},
		
		onRender: function() {
			var position = this.model.get('position');
			this.animateCard();
		},
	
		removeCard: function() {
			TweenMax.to( this.$el, 1, {top: '-500px', left: '0px', right: 0, rotation:'-10deg', onComplete:this.close} );
		},
		close: function() {
			this.remove();	
		},
		animateCard: function() {
			var position,
				randomRotate,
				randomTop;
			
			position = this.model.get('position');
			randomRotate = Math.floor( ( Math.random() < 0.5 ? -1 : 1 ) * (3 - 1 + 1)) + 1;
			randomTop = Math.floor(Math.random() * (15 - 1 + 1)) + 1;
			TweenMax.to( this.$el, 1, {top: randomTop + 'px', left: position + 'px', right: 0, rotation: randomRotate + 'deg'} );
		}
	});

	return CardView;
});