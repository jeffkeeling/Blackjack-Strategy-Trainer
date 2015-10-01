define( function( require ) {
    var Backbone = require('backbone');	


    StrategyModel = Backbone.Model.extend({
        defaults: {
            handType : null,
            dealerCard: null,
            playerCardValue: null,
            playerAction: null,
            playerActionAlternate: null
        
        }
    });

    return StrategyModel;
});