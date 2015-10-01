define( function( require ) {
    var Backbone = require('backbone');
    CardModel = Backbone.Model.extend({
        defaults: {
            suit: null,
            value: null,
            numId: null,
            visible: null
        }
    });
    return CardModel;
});