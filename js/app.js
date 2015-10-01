define( function( require ) {
	
	var Router = require('router');	

	var initialize = function() {
		
		//initialize router
		Router.initialize();
		
	};

	return {
		
		initialize: initialize
	
	};
});