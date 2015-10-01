define( function( require ){
    var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    Handlebars = require('handlebars'),
    ChipView = require('views/chip'),
    ChipCollection = require('collections/chips');

    ChipCollectionView = Marionette.CollectionView.extend({
        itemView: ChipView,
        tagName: 'ul',
        className: 'insurance-list',

        initialize: function() {
            this.collection = new ChipCollection();
        }
            });
    // Our module now returns our view
    return ChipCollectionView;
});