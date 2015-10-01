define( function( require ) {
    var Backbone = require('backbone');	


    Game = Backbone.Model.extend({
        defaults: {
            'strategyErrors': [],
            'firstAction': true,
            'surrender': false,
            'insurance': false,
            'insuranceWon': false,
            'splitSelected': false,	
            'dealerBlackjack': 	false,
            'playerBlackjack': false,
            'handType': null,
            'dealerHandPosition': -40,
            'playerHandPosition': -40,
            'playerCard1': null,
            'playerCard2': null,
            'dealerCard1': null,
            'dealerCard2': null,
            'playerChips': 1,
            'insuranceChips': 0,
            'message': null,
            'push': false
        }
    });

    return Game;
});