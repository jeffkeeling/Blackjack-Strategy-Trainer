define( function( require ) {
	
	var BlackjackController = require('blackjackController'),
	Router = require('router');	
	
	var BlackjackRouter = Router.extend({
		controller: BlackjackController,
		appRoutes: {
			'': 'startBlackjack',
			'blackjack': 'startBlackjack',
		},
		
	});

	return BlackjackRouter;
	
});
