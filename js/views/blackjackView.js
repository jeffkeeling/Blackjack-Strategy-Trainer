define(function(require){
	var $ = require('jquery'),
	_ = require('underscore'),
	Backbone = require('backbone'),
	Handlebars = require('handlebars'),
	util = require('util'),
	TweenMax = require('tween_max'),
	DeckCollection = require('collections/deck'),
	StrategyCollection = require('collections/strategy'),
	GameModel = require('models/game'),
	ParentHand = require('views/parentHand'),
	HandCollection = require('collections/hand'),
	blackjackLayoutTemplate = require('text!templates/blackjackLayout.html'),
	endGameMessageTemplate = require('text!templates/endGameMessage.html'),
	statsTemplate = require('text!templates/statsTemplate.html'),
	ChipCollectionView = require('views/chipCollectionView'),
	InsuranceCollectionView = require('views/insuranceCollectionView'),
	ChipCollection = require('collections/chips'),
	ChipModel = require('models/chip');
	var BlackjackTable = Marionette.Layout.extend({
		template: blackjackLayoutTemplate,
		regions: {
			dealerHand : '#dealer-hand',
			playerHand: '#player-hand',
			playerActions: '#player-actions',
			stats: '#stats',
			mainBet: '#main-bet',
			insuranceBet: '#insurance-bet'
		},
		ui: {
			split: '.split',
			doubleDown: '.doubleDown',
			surrender: '.surrender',
			hit: '.hit',
			insurance: '.insurance',
			standDeal: '.standDeal',
			deal: '.deal',
			stand: '.stand',
			stats: '#stats',
			endGameMessage: '#endGameMessage'
		},
		events: {
			'click .playerAction': 'actionSelected',
			'click .deal': 'deal',
			'click .insurance': 'insurance',
			'click .js-hint': 'showHint'
		},
	
		on_keypress: function(e) {
			e.preventDefault();
			var keyPressed = e.keyCode;
			
			//press 'a'
			if (keyPressed === 97) {
				this.ui.split.click();
			//press 's'
			} else if(keyPressed === 115) {
				this.ui.doubleDown.click();
			//press 'd'
			} else if(keyPressed === 100) {
				this.ui.surrender.click();
			//press 'f'
			} else if(keyPressed === 102) {
				this.ui.hit.click();
			//press 'g'
			} else if(keyPressed === 103) {
				this.ui.insurance.click();
			//press 'space'
			} else if(keyPressed === 32) {
				this.ui.standDeal.click();
			} else {
				return;
			}
		},
		initialize: function() {
			var i;

			this.masterDeck = new DeckCollection;
			for(i = 0; i < 4; i++) {
				this.masterDeck.createDeck();
			}
			
			//generate strategy from util
			this.gameStrategy =	new StrategyCollection;
			this.gameStrategy.createStrategy();
			
			this.currentGame = new GameModel();
			//set scope for keypress
			_.bindAll(this, 'on_keypress');
			$(document).bind('keypress', this.on_keypress);
		},
		
		onRender: function() {
			
			this.createNewGame();
		},
		
		createNewGame: function() {
			var playerCard1,
				playerCard2,
				dealerCard1,
				dealerCard2;
				
			//get new deck and shuffle
			this.deck =	this.masterDeck.clone();
			this.deck.reset(this.deck.shuffle());
			
			//reset game model
			this.currentGame.clear().set(this.currentGame.defaults);
			this.currentGame.set('strategyErrors', []);

			//reset UI
			this.ui.endGameMessage.html('');
			this.ui.standDeal.removeClass('deal').data('action', 'stand').addClass('stand playerAction').html('Stand').attr('disabled', 'disabled');
			this.ui.standDeal.attr('disabled', 'disabled');
			this.ui.split.attr('disabled', 'disabled');
			this.ui.insurance.attr('disabled', 'disabled');

			//get score from localstorage
			this.updateScore();

			//create dealer and player views
			this.dealerView = new ParentHand();
			this.playerView = new ParentHand();
			this.dealerHand.show(this.dealerView);
			this.playerHand.show(this.playerView);
		
			this.mainChips = new ChipCollectionView();
			this.mainBet.show(this.mainChips);
		
			//draw player card and store in game model
			playerCard1 = this.drawCard('playerHandPosition');

			this.currentGame.set('playerCard1', playerCard1);
			playerCard2 = this.drawCard('playerHandPosition');	

			this.currentGame.set('playerCard2', playerCard2);
			dealerCard1 = this.drawCard('dealerHandPosition');
			
			this.currentGame.set('dealerCard1', dealerCard1);
			dealerCard2 = this.drawCard('dealerHandPosition', 'hidden');
			
			this.currentGame.set('dealerCard2', dealerCard2);
			
			
			var that = this;
			setTimeout(function() {
				//place bet on table
				that.addPlayerChip();
				setTimeout(function() {
					that.playerView.collection.add(playerCard1);
					setTimeout(function() {
						that.playerView.collection.add(playerCard2);
						setTimeout(function(){
							that.dealerView.collection.add(dealerCard1);
							setTimeout(function(){
								that.dealerView.collection.add(dealerCard2);
								that.afterDeal();
							}, 400)
						}, 400)
					}, 400)
				}, 400)
			}, 400)
		},

		addPlayerChip: function(offset){
			var chip = new ChipModel();
			if(offset) {
				chip.set('position', -40);
			}
			this.mainChips.collection.add(chip);
		},

		updateScore: function() {
			var stats, 
				compiledStats,
				completeStats;
			
			if (localStorage.getItem('count') !== null) {
				var tempCount = $.parseJSON(localStorage.count);
			} else {
				tempCount =	{
					wins: 0,
					totalHands: 0,
					errors: 0,
					earnings: 0
				}
				localStorage.count = JSON.stringify(tempCount);
			}
			
			stats = $.parseJSON(localStorage.count);
			compiledStats = Handlebars.compile(statsTemplate);
			completeStats =	compiledStats(stats);
			this.ui.stats.html(completeStats);		
		},
		
		drawCard: function(handPosition, options) {
			var selectedCard,
				position;
				
			//select card from collection
			selectedCard = this.deck.models[0];
			//remove selected card from collection once cached
			this.deck.remove(this.deck.at(0));
			
			//check if dealer's option passed
			if (options === 'hidden') {
				selectedCard.set('visible', false);
			} else {	
				selectedCard.set('visible', true);
			}
			
			//determine how much card position offset is
			position = this.currentGame.get(handPosition);
			selectedCard.set('position', position);
			//increment offset for next drawn card in hand
			this.currentGame.set(handPosition, position + 75);
			
			return selectedCard;
		},

		afterDeal: function() {
			var playerCard1 = this.currentGame.get('playerCard1'),
				playerCard2 = this.currentGame.get('playerCard2'),
				dealerCard1 = this.currentGame.get('dealerCard1'),
				dealerCard2 = this.currentGame.get('dealerCard2');
				
			if ((dealerCard1.get('value') === 1 && dealerCard2.get('value') === 10) || (	dealerCard1.get('value') === 10	 && dealerCard2.get('value') === 1)) {
				//determine if dealer has blackjack
				this.currentGame.set('dealerBlackjack', true);
			}
			
			if ((playerCard1.get('value') === 1 && playerCard2.get('value') === 10) || (playerCard1.get('value') === 10 && playerCard2.get('value') === 1)) {
				//determine if player has blackjack
				this.currentGame.set('playerBlackjack', true);
				
				//automatically select stand if player has blackjack
				this.ui.standDeal.removeAttr('disabled');
				
				//set correctAction since not running determineStrategy function
				this.correctAction = 'stand';
				
				//select stand
				this.ui.stand.trigger('click');
			}
			
			if (playerCard1.get('value') === playerCard2.get('value')) {
				//determine if player a pair
				//allow player to select split
				this.currentGame.set('handType', 'pair');
				this.ui.split.removeAttr('disabled');
			} else if (this.playerView.softAce === true) {
				//determine if player's hand is soft
				this.currentGame.set('handType', 'soft');
			} else {
				//determine if player's hand is hard
				this.currentGame.set('handType', 'hard');
			}
			
			if (dealerCard1.get('value') === 1) {
				//allow player to choose insurance if visible dealer card is ace
				this.ui.insurance.removeAttr('disabled');
			}
			
			if(!(this.currentGame.get('playerBlackjack'))) {
				//if game can continue, determine player's correct action to take	
				//activate buttons
				this.ui.doubleDown.removeAttr('disabled');
				this.ui.surrender.removeAttr('disabled');	
				this.ui.standDeal.removeAttr('disabled');
				this.ui.hit.removeAttr('disabled');
				
				//determine what next action player should take
				this.determineStrategy();
			}
		},
		
		determineStrategy: function() {
			var gameObject = {},
				currentHandType = this.currentGame.get('handType'),
				dealerCard1 = this.currentGame.get('dealerCard1'),
				playerCard1 = this.currentGame.get('playerCard1'),
				playerTotal = this.playerView.total,
				playerCardValue = playerCard1.get('value'),
				dealerCardValue = dealerCard1.get('value'),
				strategyObj;
			
			//create correctly formatted object for finding the hand in the strategy collection
			if (currentHandType === 'pair') {
				gameObject = {
					handType : 'pair',
					dealerCard : dealerCardValue	,
					playerCardValue : playerCardValue
				};
			} else if (currentHandType === 'soft') {
				gameObject = {
					handType : 'soft',
					dealerCard : dealerCardValue,
					total : playerTotal
				};
			} else {
				gameObject = {
					handType : 'hard',
					dealerCard : dealerCardValue,
					total : playerTotal
				};
			}

			if (playerTotal < 21) {
				strategyObj = this.gameStrategy.findWhere(gameObject);	
				if (this.currentGame.get('firstAction') === false && (strategyObj.get('playerActionAlternate') !== null)) {
					this.correctAction = strategyObj.get('playerActionAlternate'); 
				} else {
					this.correctAction = strategyObj.get('playerAction');	
				}
			}
		},
		
		actionSelected: function(e) {
			var currentGameActions,
				errorMsg,
				action = $(e.currentTarget).data('action'),
				endGame,
				callEndGame,
				fetchedHandType = this.currentGame.get('handType');
				
			if (this.currentGame.get('firstAction')) {
				this.currentGame.set('firstAction', false);
			}
			
			//deactivate first round buttons
			this.ui.split.attr('disabled', 'disabled');
			this.ui.doubleDown.attr('disabled', 'disabled');
			this.ui.surrender.attr('disabled', 'disabled');
			
			//generate error message if player played incorrectly
			//add message to array
			if (this.playerView.total < 21 && action !== this.correctAction) {

				currentGameActions = this.currentGame.get('strategyErrors');
				errorMsg = 'You selected ' + action + ' when you should have selected ' +	this.correctAction;
				errorMsg += ' with a ';
				
				if (fetchedHandType === 'pair') {
					errorMsg += 'pair';
				} else if (fetchedHandType === 'soft') {
					errorMsg += 'softtotal of ' + this.playerView.total;
				} else {
					errorMsg += 'hard total of ' + this.playerView.total;
				}

				currentGameActions.push(errorMsg);
				this.currentGame.set('strategyErrors', currentGameActions);
			}
	
			if (action === 'hit') {
				this.playerView.collection.add(this.drawCard('playerHandPosition'));
				if(this.playerView.total > 20){
					this.endGame();
				}
			} else if (action === 'stand') {
				this.endGame();
			} else if (action === 'split') {
				this.currentGame.set('splitSelected', true);
			} else if (action === 'surrender') {
				this.currentGame.set('surrender', true);	
				this.endGame();
			} else if (action === 'double') {
				var that = this;
					//place bet on table
					this.addPlayerChip(true);
					setTimeout(function() {
						that.playerView.collection.add(that.drawCard('playerHandPosition'));
						setTimeout(function() {
							that.endGame();
						}, 800)
					}, 700)
			}
	
			playerCard1 = this.playerView.collection.at(0).get('value');
			playerCard2 = this.playerView.collection.at(1).get('value');	
	
			if (this.playerView.collection.length === 2 && playerCard1 === playerCard2 && this.currentGame.get('splitSelected') === false){	
				this.currentGame.set('handType', 'pair');
			} else if (this.playerView.softAce === true){
				this.currentGame.set('handType', 'soft');
			}else{
				this.currentGame.set('handType', 'hard');
			}
			this.determineStrategy();
		},

		showHint: function() {
			var $correctButton = this.$el.find('button[data-action="' + this.correctAction + '"]');

			//this.$el.find('button').removeClass('hint');
			$correctButton.addClass('hint');

			setTimeout(function() {
				$correctButton.removeClass('hint');
			}, 600);
		},
		
		endGame: function() {
			//deactivate buttons
			this.ui.insurance.attr('disabled', 'disabled');	
			this.deactivateHit();
			this.ui.standDeal.removeClass('stand playerAction').data('action', 'deal').addClass('deal').html('Deal New Deck');	
			this.showScore();
		},
		
		insurance: function() {
			this.insuranceChips = new InsuranceCollectionView();
			this.insuranceBet.show(this.insuranceChips);
			var chip = new ChipModel();
			this.insuranceChips.collection.add(chip);

			this.currentGame.set('insurance', true);
			this.ui.insurance.attr('disabled', 'disabled');		
		},

		deactivateHit: function() {	
			this.ui.hit.attr('disabled', 'disabled');
		},
		
		dealerShow: function() {
			var hiddenCardModel  = this.dealerView.collection.findWhere({'visible': false}),
				that;
			
			//animate removing corresponding card
			hiddenCardModel.trigger('aboutToBeFlipped');
			
			that = this;
			
			setTimeout(function(e){	
				//remove model from collection
				that.dealerView.collection.remove(hiddenCardModel);
				//change model attribute
				hiddenCardModel.set('visible', true);
				//add model back to collection
				that.addCardToCollection(that.dealerView, hiddenCardModel, that.dealerDraw, that);
			}, 400);
		},

		dealerDraw: function() {
			var dealerTotal = this.dealerView.total,
				playerTotal = this.playerView.total,
				newCard,
				that = this;
			
			//dealer draws until hits 17 or is higher than player and not over 17
			if (dealerTotal < 17 && dealerTotal < playerTotal){
				newCard = this.drawCard('dealerHandPosition');
				this.addCardToCollection(this.dealerView, newCard, this.dealerDraw, this);
			} else {
				setTimeout(function() {
					that.generateMessage();
				}, 800);
			}
		},
		
		addCardToCollection: function(view, card, callback, scope) {
			//set delay so one card at a time is drawn and animated
			setTimeout(function() {
				//add card to collection
				view.collection.add(card);
				//call next action
				callback.call(scope);			
			}, 400);
		},
	
		showScore: function() {
			var playerScore = this.playerView.total;
			//don't show dealer cards if player busts or chooses surrender but did not choose insurance
			if (!(playerScore > 21 || this.currentGame.get('surrender') === true) || this.currentGame.get('insurance') === true) {
				this.dealerShow();	
			} else {
				this.generateMessage();
			}
		},
		
		generateMessage: function() {
			var playerScore = this.playerView.total,
				dealerScore,
				tempCount,
				errorArray,
				compiledMessage,
				completeMessage,
				playerWins = false,
				push = false,
				that = this;
			
			//prepare stats table
			if(localStorage.getItem('count') !== null) {
				tempCount = $.parseJSON(localStorage.count);
			} else {
				tempCount =	{
					wins: 0,
					totalHands: 0,
					errors: 0,
					earnings: 0
				}
			}
			dealerScore = this.dealerView.total;
			tempCount.totalHands += 1; 
		
			//messaging
			var message = '';
			
			if(this.currentGame.get('surrender') === true) {
				message = 'You surrendered.';
			} else if (this.currentGame.get('playerBlackjack') === true && this.currentGame.get('dealerBlackjack') === false) {
				message = 'You win with blackjack compared to the dealer\'s ' +	 dealerScore + '.';
				playerWins = true;
				tempCount.wins += 1;
			} else if (playerScore > 21) {
				message = 'Bust. You lose with a score of ' + playerScore + ' .';
			} else if (this.currentGame.get('playerBlackjack') === false && this.currentGame.get('dealerBlackjack') === true) {
				message = 'You lose with a score of ' + playerScore + 	' compared 	to the dealer\'s blackjack.';
			} else if (playerScore === dealerScore) {
				push = true;
				message = 'Push. You both got ' + playerScore + '.';
			} else if (playerScore < 22 && playerScore > dealerScore) {
				message = 'You win with a score of ' + playerScore + ' compared to the dealer\'s ' +	 dealerScore + '.';
				playerWins = true;
				tempCount.wins += 1;
			} else if (dealerScore > 21 && playerScore < 22) {
				message = 'You win with a score of ' + playerScore + ' compared to the dealer\'s ' + dealerScore + '.';
				playerWins = true;
				tempCount.wins += 1;
			} else {
				message = 'You lose with a score of ' +	 playerScore + ' compared to the dealer\'s ' + dealerScore +	'.';
			}
			
			errorArray = this.currentGame.get('strategyErrors');
			tempCount.errors += errorArray.length;
				
			this.currentGame.set('message', message);
			
			if (this.currentGame.get('insurance') == true) {
				if (this.currentGame.get('dealerBlackjack') === true) {
					this.currentGame.set('insuranceWon', true);
					chip = new ChipModel({
						dealer: true
					});
					this.insuranceChips.collection.add(chip);
					chip2 = new ChipModel({
						dealer: true,
						offset: 20
					});
					this.insuranceChips.collection.add(chip2);
					setTimeout(function() {	
						that.insuranceChips.children.each( function(chip) {
							chip.removeChipWin();
						});
					}, 700);

				} else {
					this.insuranceChips.children.each( function(chip) {
						chip.removeChipLose();
					});
				}
			}

			compiledMessage = Handlebars.compile(endGameMessageTemplate);
			completeMessage = compiledMessage(this.currentGame.toJSON());
			
			//poker chip animation
			if(push) {
				this.mainChips.children.each( function(chip) {
					chip.removeChipWin();
				});
			}
			else if (playerWins === true){
				this.dealerPay();
			} else {
				this.mainChips.children.each( function(chip) {
					chip.removeChipLose();
				});
			}
			
			this.ui.endGameMessage.html(completeMessage);	
			
			localStorage.count = JSON.stringify(tempCount);
			
			this.updateScore();
			
		},
		
		dealerPay: function () {
			var that = this,
				chip,
				chip2; 
			
			if (!this.currentGame.get('playerBlackjack') ) {
				chip = new ChipModel({
					dealer: true
				});
				this.mainChips.collection.add(chip);
			}else {
				chip = new ChipModel({
					dealer: true,
					offset: -20,
				});
				this.mainChips.collection.add(chip);
				chip2 = new ChipModel({
					dealer: true,
					offset: -40,
					changeColor: true
				});
				this.mainChips.collection.add(chip2);
				chip3 = new ChipModel({
					dealer: true,
					offset: -60,
					changeColor: true
				});
				this.mainChips.collection.add(chip3);
			}
			setTimeout(function() {	
				that.mainChips.children.each( function(chip) {
					chip.removeChipWin();
				});
			}, 700);
		},
		
		deal: function() {
			var that = this;
			
			this.playerView.children.each(function(view){	
				view.removeCard();
			});
			
			this.dealerView.children.each(function(view){
				view.removeCard();
			});

			setTimeout(function() {	
				that.playerView.remove();
				that.dealerView.remove();
				that.dealerHand.reset();
				that.playerHand.reset();
				that.createNewGame();
			}, 500);
		},
		showCheatSheet: function() {

		},
		showStrategy: function() {

		},
		close: function() {
			this.remove();
		}
	});
	// Our module now returns our view
	return BlackjackTable;
});
