define( function( require ) {
	var BlackjackTable = require('views/blackjackView' )	
	
	var BlackjackController = {
		
		startBlackjack: function() {
			window.casinoApp.nav.$el.find('li').removeClass('active');
			window.casinoApp.nav.$el.find('.blackjack').addClass('active');
			window.casinoApp.main.show( new BlackjackTable() );
			
		}
	};

	return BlackjackController;
});
