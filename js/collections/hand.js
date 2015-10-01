define(function (require) {
    var Backbone = require('backbone'),
    CardModel = require('models/card');
    	
    HandCollection = Backbone.Collection.extend({
        model: CardModel
    });
    
    return HandCollection;
});


