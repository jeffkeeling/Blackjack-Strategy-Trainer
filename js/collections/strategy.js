define( function( require ) {
    var Backbone = require('backbone'),
    StrategyModel = require('models/strategy');	


    StrategyCollection = Backbone.Collection.extend({
        model: StrategyModel,
        createStrategy: function (currentGame) {
            var i,
                situation;
            
            /*************Pairs***********/
            //ace
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'pair',
                    dealerCard: i,
                    playerCardValue: 1,
                    playerAction: 'split',
                    playerActionAlternate: 'stand'
                }; 
                this.add(situation);
            }
            //10 value
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'pair',
                    dealerCard: i,
                    playerCardValue: 10,
                    playerAction: 'stand'
                };
                this.add(situation);
            }
            //9 value
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'pair',
                    dealerCard: i,
                    playerCardValue: 9,
                    playerActionAlternate: 'stand'
                 };
                if (i === 7 || i === 10 || i === 1) {
                    situation.playerAction = 'stand';
                } else {
                    situation.playerAction = 'split';
                }
                this.add(situation);
            }
            //8 value
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'pair',
                    dealerCard: i,
                    playerCardValue: 8,
                    playerAction: 'split',
                 };
                if (i > 1 && i < 7) {
                    situation.playerActionAlternate = 'hit';
                }else{
                    situation.playerActionAlternate = 'stand';
                }
                this.add(situation);
            }
            //7 value
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'pair',
                    dealerCard: i,
                    playerCardValue: 7
                 };
                if(i > 1 && i < 7) {
                    situation.playerAction = 'split';
                    situation.playerActionAlternate = 'stand';
                } else if (i === 7) {
                    situation.playerAction = 'split';
                    situation.playerActionAlternate = 'hit';
                } else {
                    situation.playerAction = 'hit';
                    situation.playerActionAlternate =  null;
                }
                this.add(situation);
            }
            //6 value
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'pair',
                    dealerCard: i,
                    playerCardValue: 6
                 };
                if (i > 3 && i < 7) {
                    situation.playerAction = 'split';
                    situation.playerActionAlternate = 'stand';
                } else if (i > 1 && i < 4) {
                    situation.playerAction = 'split';
                    situation.playerActionAlternate = 'hit';
                } else {
                    situation.playerAction = 'hit';
                }
                this.add(situation);
            }
            //5 value
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'pair',
                    dealerCard: i,
                    playerCardValue: 5,
                 };
                if (i > 1 && i < 10) {
                    situation.playerAction = 'double';
                    situation.playerActionAlternate = 'hit';
                } else {
                    situation.playerAction = 'hit';
                }
                this.add(situation);
            }
            //4 value
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'pair',
                    dealerCard: i,
                    playerCardValue: 4,
                    playerActionAlternate: 'hit'
                 };
                if (i === 5 || i === 6) {
                    situation.playerAction = 'split';
                } else {
                    situation.playerAction = 'hit';
                }
                this.add(situation);
            }
            //3 value
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'pair',
                    dealerCard: i,
                    playerCardValue: 3,
                    playerActionAlternate: 'hit'
                 };
                if (i > 1 && i < 8) {
                    situation.playerAction = 'split';
                } else {
                    situation.playerAction = 'hit';
                }
                this.add(situation);
            }
            //2 value
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'pair',
                    dealerCard: i,
                    playerCardValue: 2,
                    playerActionAlternate: 'hit'
                 };
                if (i > 1 && i < 8) {
                    situation.playerAction = 'split';
                } else {
                    situation.playerAction = 'hit';
                }
                this.add(situation);
            }
            
            /*************Soft Totals***********/
            //20 total
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'soft',
                    dealerCard: i,
                    total: 20,
                    playerAction: 'stand' 
                 };
                this.add(situation);
            }
            //19 total
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'soft',
                    dealerCard: i,
                    total: 19,
                    playerAction: 'stand'
                 };
                this.add(situation);
            }
            //18 total
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'soft',
                    dealerCard: i,
                    total: 18
                 };
                if (i > 2 && i < 7) {
                    situation.playerAction = 'double';
                    situation.playerActionAlternate = 'stand';
                } else if (i > 8 || i === 1) {
                    situation.playerAction = 'hit';
                } else {
                    situation.playerAction = 'stand';
                }
                this.add(situation);
            }
            //17 total
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'soft',
                    dealerCard: i,
                    total: 17
                 };
                if (i > 2 && i < 7) {
                    situation.playerAction = 'double';
                    situation.playerActionAlternate = 'hit';
                } else {
                    situation.playerAction = 'hit';
                } 
                this.add(situation);
            }
            //16 total
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'soft',
                    dealerCard: i,
                    total: 16
                 };
                if (i > 3 && i < 7){
                    situation.playerAction = 'double';
                    situation.playerActionAlternate = 'hit';
                } else {
                    situation.playerAction = 'hit';
                } 
                this.add(situation);
            }
            //15 total
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'soft',
                    dealerCard: i,
                    total: 15
                 };
                if (i > 3 && i < 7){
                    situation.playerAction = 'double';
                    situation.playerActionAlternate = 'hit';
                } else {
                    situation.playerAction = 'hit';
                } 
                this.add(situation);
            }
            //14 total
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'soft',
                    dealerCard: i,
                    total: 14
                 };
                if (i === 5 || i === 6) {
                    situation.playerAction = 'double';
                    situation.playerActionAlternate = 'hit';
                } else {
                    situation.playerAction = 'hit';
                } 
                this.add(situation);
            }
            //13 total
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'soft',
                    dealerCard: i,
                    total: 13
                 };
                if(i === 5 || i === 6) {
                    situation.playerAction = 'double';
                    situation.playerActionAlternate = 'hit';
                } else {
                    situation.playerAction = 'hit';
                } 
                this.add(situation);
            }
            /*************hard Totals***********/
            //20 total
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'hard',
                    dealerCard: i,
                    total: 20,
                    playerAction: 'stand'
                 };
                this.add(situation);
            }
            //19 total
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'hard',
                    dealerCard: i,
                    total: 19,
                    playerAction: 'stand'
                 };
                this.add(situation);
            }
            //18 total
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'hard',
                    dealerCard: i,
                    total: 18,
                    playerAction: 'stand'
                 };
                this.add(situation);
            }
            //17 total
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'hard',
                    dealerCard: i,
                    total: 17,
                    playerAction: 'stand'
                 };
                this.add(situation);
            }
            //16 total
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'hard',
                    dealerCard: i,
                    total: 16
                 };
                if (i > 1 && i < 7) {
                    situation.playerAction = 'stand';
                } else if(i === 7 | i === 8){
                    situation.playerAction = 'hit';
                } else {
                    situation.playerAction = 'surrender';
                    situation.playerActionAlternate = 'hit';
                }
                this.add(situation);
            }
            //15 total
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'hard',
                    dealerCard: i,
                    total: 15
                 };
                if(i > 1 && i < 7){
                    situation.playerAction = 'stand';
                } else if (i === 10) {
                    situation.playerAction = 'surrender';
                    situation.playerActionAlternate = 'hit';
                } else {
                    situation.playerAction = 'hit';
                }
                this.add(situation);
            }
            //14 total
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'hard',
                    dealerCard: i,
                    total: 14
                 };
                if (i > 1 && i < 7) {
                    situation.playerAction = 'stand';
                } else {
                    situation.playerAction = 'hit';
                }
                this.add(situation);
            }
            //13 total
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'hard',
                    dealerCard: i,
                    total: 13
                 };
                if (i > 1 && i < 7) {
                    situation.playerAction = 'stand';
                } else {
                    situation.playerAction = 'hit';
                }
                this.add(situation);
            }
            //12 total
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'hard',
                    dealerCard: i,
                    total: 12
                 };
                if (i > 3 && i < 7){
                    situation.playerAction = 'stand';
                } else {
                    situation.playerAction = 'hit';
                }
                this.add(situation);
            }
            //11 total
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'hard',
                    dealerCard: i,
                    total: 11
                 };
                if (i === 1){
                    situation.playerAction = 'hit';
                }else{
                    situation.playerAction = 'double';
                    situation.playerActionAlternate = 'hit';
                }
                this.add(situation);
            }
            //10 total
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'hard',
                    dealerCard: i,
                    total: 10
                 };
                if(i === 1 || i === 10) {
                    situation.playerAction = 'hit';
                } else {
                    situation.playerAction = 'double';
                    situation.playerActionAlternate = 'hit';
                }
                this.add(situation);
            }
            //9 total
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'hard',
                    dealerCard: i,
                    total: 9
                 };
                if (i > 2 && i <7) {
                    situation.playerAction = 'double'
                    situation.playerActionAlternate = 'hit';
                } else {
                    situation.playerAction= 'hit';
                }
                this.add(situation);
            }
            //8 total
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'hard',
                    dealerCard: i,
                    total: 8,
                    playerAction: 'hit'
                 };
                this.add(situation);
            }
            //7 total
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'hard',
                    dealerCard: i,
                    total: 7,
                    playerAction: 'hit'
                 };
                this.add(situation);
            }
            //6 total
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'hard',
                    dealerCard: i,
                    total: 6,
                    playerAction: 'hit' 
                 };
                this.add(situation);
            }
            //5 total
            for (i = 1; i < 11; i++) {
                situation = {
                    handType : 'hard',
                    dealerCard: i,
                    total: 5,
                    playerAction: 'hit'
                 };
                this.add(situation);
            }
            
            return this;
        }
     });

    return StrategyCollection;
});