define( function( require ){
	var $ = require('jquery'),
	_ = require('underscore'),
	Backbone = require('backbone'),
	Handlebars = require('handlebars'),
	CardView = require('views/card'),
	CollectionHand = require('collections/hand');
	
	ParentHandView = Marionette.CollectionView.extend({
		itemView: CardView,
		tagName: 'ul',
		className: 'list-inline card-hand',
		
		initialize: function() {
			this.collection = new CollectionHand();
			this.listenTo(this.collection, 'add', this.calculateHand);
		},

		getTotal : function() {
			return this.total;
		},
		
		calculateHand: function() {
			var total = 0,
				aceCount = 0,
				value,
				possibleRemaining, 
				i;
			
			this.softAce = false;
			this.collection.each( function( card ) {
				value = card.get('value');
				if ( value > 1 ) {
					total += value;
				}
				else {
					aceCount++;
				}
			});
			
			if ( aceCount > 0 ) {
				for ( i = 0; i < aceCount; i++ ) {
					total++;	
				}
				possibleRemaining = 21 - total;
				if ( possibleRemaining > 9 ) {
					total += 10;
					this.softAce = true;
				}
			}
			this.total = total;
			
		}
	});
	// Our module now returns our view
	return ParentHandView;
});