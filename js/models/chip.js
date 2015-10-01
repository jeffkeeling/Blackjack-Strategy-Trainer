define( function( require ) {
    var Backbone = require('backbone');
    ChipModel = Backbone.Model.extend({
        defaults: {
            position: 0,
            dealer: false,
            offset: 0,
            changeColor: false
        }
    });
    return ChipModel;
});