define(function (require) {
    var Backbone = require('backbone'),
    ChipModel = require('models/chip');

    ChipCollection = Backbone.Collection.extend({
        model: ChipModel
    });

    return ChipCollection;
});


