
define(function (require){
	
	var $ = require('jquery'),
	_ = require('underscore'),
	util = {},
	DeckCollection = require('collections/deck'),
	CardModel = require('models/card'),
	StrategyCollection = require('collections/strategy'),
	StrategyModel = require('models/strategy');
	
	util.createDeck = function () {
		var sourceDeck,
			counter = 1,
			i,
			CurrentCard,
			currentCard;
		
		sourceDeck = new DeckCollection();

		for (i = 0; i < 52; i++) {
			if (counter > 13) {
				counter = 1;
			}
			
			currentCard = new CardModel();
			
			if (i < 13) {
				currentCard.set('suit', 'spades');
			} else if (i >= 13 && i < 26) {
				currentCard.set('suit', 'clubs');
			} else if (i >= 26 && i < 40) {
				currentCard.set('suit', 'diamonds');
			} else {
				currentCard.set('suit', 'hearts');
			}

			if (counter > 1 && counter < 11) {
				currentCard.set('value', counter);
			} else {
				if(counter === 1) {
					currentCard.set('value', 1);
				} else if (counter === 11) {
					currentCard.set('value', 10);
				} else if (counter === 12) {
					currentCard.set('value', 10);
				} else if (counter === 13) {
					currentCard.set('value', 10);
				}
			}
			
			currentCard.set({'numId': counter, 'visible': true});
			counter++;
			sourceDeck.add(currentCard);
		};
		return sourceDeck;
	};
	
	util.createStrategy = function (currentGame) {
		var strategyCollection,
			i,
			situation;
		
		strategyCollection = new StrategyCollection();
		
		/*************Pairs***********/
		//ace
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'pair',
				dealerCard: i,
				playerCardValue: 1,
				playerAction: 'split',
				playerActionAlternate: 'stand'
			});
			
			strategyCollection.add(situation);
		}
		//10 value
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'pair',
				dealerCard: i,
				playerCardValue: 10,
				playerAction: 'stand',
				playerActionAlternate: null
			});
			strategyCollection.add(situation);
		}
		//9 value
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'pair',
				dealerCard: i,
				playerCardValue: 9,
				playerActionAlternate: 'stand'
			});
			if (i === 7 || i === 10 || i === 1) {
				situation.set('playerAction', 'stand');
			} else {
				situation.set('playerAction', 'split');
			}
			strategyCollection.add(situation);
		}
		//8 value
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'pair',
				dealerCard: i,
				playerCardValue: 8,
				playerAction: 'split',
			});
			if (i > 1 && i < 7) {
				situation.set('playerActionAlternate', 'hit');
			}else{
				situation.set('playerActionAlternate', 'stand');
			}
			strategyCollection.add(situation);
		}
		//7 value
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'pair',
				dealerCard: i,
				playerCardValue: 7
			});
			if(i > 1 && i < 7) {
				situation.set({'playerAction': 'split',
				playerActionAlternate: 'stand'});
			} else if (i === 7) {
				situation.set({'playerAction': 'split',
				playerActionAlternate: 'hit'});
			} else {
				situation.set({'playerAction': 'hit', 
				playerActionAlternate: null});
			}
			strategyCollection.add(situation);
		}
		//6 value
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'pair',
				dealerCard: i,
				playerCardValue: 6
			});
			if (i > 3 && i < 7) {
				situation.set({'playerAction': 'split',
				playerActionAlternate: 'stand'});
			} else if (i > 1 && i < 4) {
				situation.set({'playerAction': 'split',
				playerActionAlternate: 'hit'});
			} else {
				situation.set({'playerAction': 'hit',
				playerActionAlternate: null});
			}
			strategyCollection.add(situation);
		}
		//5 value
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'pair',
				dealerCard: i,
				playerCardValue: 5,
			});
			if (i > 1 && i < 10) {
				situation.set({playerAction: 'double',
					playerActionAlternate: 'hit'});
			} else {
				situation.set({'playerAction': 'hit',
				playerActionAlternate: null});
			}
			strategyCollection.add(situation);
		}
		//4 value
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'pair',
				dealerCard: i,
				playerCardValue: 4,
				playerActionAlternate: 'hit'
			});
			if (i === 5 || i === 6) {
				situation.set('playerAction', 'split');
			} else {
				situation.set('playerAction', 'hit');
			}
			strategyCollection.add(situation);
		}
		//3 value
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'pair',
				dealerCard: i,
				playerCardValue: 3,
				playerActionAlternate: 'hit'
			});
			if (i > 1 && i < 8) {
				situation.set('playerAction', 'split');
			} else {
				situation.set('playerAction', 'hit');
			}
			strategyCollection.add(situation);
		}
		//2 value
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'pair',
				dealerCard: i,
				playerCardValue: 2,
				playerActionAlternate: 'hit'
			});
			if (i > 1 && i < 8) {
				situation.set('playerAction', 'split');
			} else {
				situation.set('playerAction', 'hit');
			}
			strategyCollection.add(situation);
		}
		
		/*************Soft Totals***********/
		//20 total
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'soft',
				dealerCard: i,
				total: 20,
				playerAction: 'stand',
				playerActionAlternate: null
			});
			strategyCollection.add(situation);
		}
		//19 total
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'soft',
				dealerCard: i,
				total: 19,
				playerAction: 'stand',
				playerActionAlternate: null
			});
			strategyCollection.add(situation);
		}
		//18 total
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'soft',
				dealerCard: i,
				total: 18
			});
			if (i > 2 && i < 7) {
				situation.set({playerAction: 'double',
					playerActionAlternate: 'stand'});
			} else if (i > 8 || i === 1) {
				situation.set({'playerAction': 'hit',
				playerActionAlternate: null});
			} else {
				situation.set({'playerAction': 'stand',
				playerActionAlternate: null});
			}
			strategyCollection.add(situation);
		}
		//17 total
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'soft',
				dealerCard: i,
				total: 17
			});
			if (i > 2 && i < 7) {
				situation.set({playerAction: 'double',
					playerActionAlternate: 'hit'});
			} else {
				situation.set({'playerAction': 'hit',
				playerActionAlternate: null});
			} 
			strategyCollection.add(situation);
		}
		//16 total
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'soft',
				dealerCard: i,
				total: 16
			});
			if (i > 3 && i < 7){
				situation.set({playerAction: 'double',
					playerActionAlternate: 'hit'});
			} else {
				situation.set({'playerAction': 'hit',
				playerActionAlternate: null});
			} 
			strategyCollection.add(situation);
		}
		//15 total
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'soft',
				dealerCard: i,
				total: 15
			});
			if (i > 3 && i < 7){
				situation.set({playerAction: 'double',
					playerActionAlternate: 'hit'});
			} else {
				situation.set({'playerAction': 'hit',
				playerActionAlternate: null});
			} 
			strategyCollection.add(situation);
		}
		//14 total
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'soft',
				dealerCard: i,
				total: 14
			});
			if (i === 5 || i === 6) {
				situation.set({playerAction: 'double',
					playerActionAlternate: 'hit'});
			} else {
				situation.set({'playerAction': 'hit',
				playerActionAlternate: null});
			} 
			strategyCollection.add(situation);
		}
		//13 total
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'soft',
				dealerCard: i,
				total: 13
			});
			if(i === 5 || i === 6) {
				situation.set({playerAction: 'double',
					playerActionAlternate: 'hit'});
			} else {
				situation.set({'playerAction': 'hit',
				playerActionAlternate: null});
			} 
			strategyCollection.add(situation);
		}
		/*************hard Totals***********/
		//20 total
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'hard',
				dealerCard: i,
				total: 20,
				playerAction: 'stand',
				playerActionAlternate: null
			});
			strategyCollection.add(situation);
		}
		//19 total
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'hard',
				dealerCard: i,
				total: 19,
				playerAction: 'stand',
				playerActionAlternate: null
			});
			strategyCollection.add(situation);
		}
		//18 total
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'hard',
				dealerCard: i,
				total: 18,
				playerAction: 'stand',
				playerActionAlternate: null
			});
			strategyCollection.add(situation);
		}
		//17 total
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'hard',
				dealerCard: i,
				total: 17,
				playerAction: 'stand',
				playerActionAlternate: null
			});
			strategyCollection.add(situation);
		}
		//16 total
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'hard',
				dealerCard: i,
				total: 16
			});
			if (i > 1 && i < 7) {
				situation.set({'playerAction': 'stand',
				playerActionAlternate: null});
			} else if(i === 7 | i === 8){
				situation.set({'playerAction': 'hit',
				playerActionAlternate: null});
			} else {
				situation.set({playerAction: 'surrender',
				playerActionAlternate: 'hit'});
			}
			strategyCollection.add(situation);
		}
		//15 total
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'hard',
				dealerCard: i,
				total: 15
			});
			if(i > 1 && i < 7){
				situation.set({'playerAction': 'stand',
				playerActionAlternate: null});
			} else if (i === 10) {
				situation.set({playerAction: 'surrender',
				playerActionAlternate: 'hit'});
			} else {
				situation.set({'playerAction': 'hit',
				playerActionAlternate: null});
			}
			strategyCollection.add(situation);
		}
		//14 total
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'hard',
				dealerCard: i,
				total: 14,
				playerActionAlternate: null
			});
			if (i > 1 && i < 7) {
				situation.set('playerAction', 'stand');
			} else {
				situation.set('playerAction', 'hit');
			}
			strategyCollection.add(situation);
		}
		//13 total
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'hard',
				dealerCard: i,
				total: 13,
				playerActionAlternate: null
			});
			if (i > 1 && i < 7) {
				situation.set('playerAction', 'stand');
			} else {
				situation.set('playerAction', 'hit');
			}
			strategyCollection.add(situation);
		}
		//12 total
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'hard',
				dealerCard: i,
				total: 12,
				playerActionAlternate: null
			});
			if (i > 3 && i < 7){
				situation.set('playerAction', 'stand');
			} else {
				situation.set('playerAction', 'hit');
			}
			strategyCollection.add(situation);
		}
		//11 total
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'hard',
				dealerCard: i,
				total: 11
			});
			if (i === 1){
				situation.set({'playerAction': 'hit',
				playerActionAlternate: null});
			}else{
				situation.set({playerAction: 'double', 
				playerActionAlternate: 'hit'});
			}
			strategyCollection.add(situation);
		}
		//10 total
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'hard',
				dealerCard: i,
				total: 10
			});
			if(i === 1 || i === 10) {
				situation.set({'playerAction': 'hit',
				playerActionAlternate: null});
			} else {
				situation.set({playerAction: 'double', 
				playerActionAlternate: 'hit'});
			}
			strategyCollection.add(situation);
		}
		//9 total
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'hard',
				dealerCard: i,
				total: 9
			});
			if (i > 2 && i <7) {
				situation.set({playerAction: 'double', 
				playerActionAlternate: 'hit'});
			} else {
				situation.set({'playerAction': 'hit',
				playerActionAlternate: null});
			}
			strategyCollection.add(situation);
		}
		//8 total
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'hard',
				dealerCard: i,
				total: 8,
				playerAction: 'hit',
				playerActionAlternate: null
			});
			strategyCollection.add(situation);
		}
		//7 total
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'hard',
				dealerCard: i,
				total: 7,
				playerAction: 'hit',
				playerActionAlternate: null
			});
			strategyCollection.add(situation);
		}
		//6 total
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'hard',
				dealerCard: i,
				total: 6,
				playerAction: 'hit',
				playerActionAlternate: null
			});
			strategyCollection.add(situation);
		}
		//5 total
		for (i = 1; i < 11; i++) {
			situation = new StrategyModel({
				handType : 'hard',
				dealerCard: i,
				total: 5,
				playerAction: 'hit',
				playerActionAlternate: null
			});
			strategyCollection.add(situation);
		}
		
		return strategyCollection;
	}

	return util;
});