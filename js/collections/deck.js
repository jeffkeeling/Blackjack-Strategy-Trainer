define( function( require ) {
    var Backbone = require('backbone'),
    CardModel = require('models/card');	
    DeckCollection = Backbone.Collection.extend({
        model: CardModel,
        createDeck: function () {
            var counter = 1,
                currentCard = {},
                i;
        
            for (i = 0; i < 52; i++) {
                if (counter > 13) {
                    counter = 1;
                }
                
                if (i < 13) {
                    currentCard.suit = 'spades';
                } else if (i >= 13 && i < 26) {
                    currentCard.suit = 'clubs';
                } else if (i >= 26 && i < 40) {
                    currentCard.suit = 'diamonds';
                } else {
                    currentCard.suit = 'hearts';
                }
        
                if (counter > 1 && counter < 11) {
                    currentCard.value = counter;
                } else {
                    if(counter === 1) {
                        currentCard.value = 1;
                    } else if (counter === 11) {
                        currentCard.value = 10;
                    } else if (counter === 12) {
                        currentCard.value = 10;
                    } else if (counter === 13) {
                        currentCard.value = 10;
                    }
                }
                
                currentCard.numId = counter;
                currentCard.visible = true;
                
                this.add(currentCard);
                
                counter++;
            }
            return this;
        }
    });
	
	return DeckCollection;
});