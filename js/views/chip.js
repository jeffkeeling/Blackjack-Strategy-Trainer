define( function( require ) {
    var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    Handlebars = require('handlebars'),
    chipTemplate = require('text!templates/chip.html');	

    ChipView = Marionette.ItemView.extend({

        tagName: 'li',
        className: 'chip-container',
        template: Handlebars.compile(chipTemplate),

        initialize: function() {	
            this.listenTo(this.model, 'aboutToBeFlipped' , this.removeCard);
            _.bindAll(this, 'close');
        },

        onRender: function() {
            var position = this.model.get('position');
            this.animateChip();
        },

        removeChipWin: function() {
            TweenMax.to( this.$el, 1, {'margin-top': '250px', onComplete:this.close} );

        },
        
        removeChipLose: function() {
            TweenMax.to( this.$el, 1, {'margin-top': '-500px', onComplete:this.close} );
        },
        
        close: function() {
            this.remove();    
        },

        animateChip: function() {
            var randomRotate,
                randomTop,
                position = this.model.get('position'),
                offset = 0;
            
            if (this.model.get('dealer')){
                this.$el.addClass('from-dealer')
                position = 20;
                offset = this.model.get('offset');

            }
            

            if (this.model.get('changeColor')) {
               this.$el.find('.pokerchip').removeClass('red').addClass('gray') 
            }
            
            TweenMax.to( this.$el, 1, {marginTop: '-211px', marginLeft: position + offset + 'px'} );
        }
    });

    return ChipView;
});