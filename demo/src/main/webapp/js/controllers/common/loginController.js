define([ 'app', 'jsSHA'], function(app) {
	app.registerController('loginController', [ '$scope', '$state',
			function($scope, $state) {
		
				var hashObj = new jsSHA("Admin", "TEXT");
		
				$scope.test =  hashObj.getHash("SHA-256", 'B64', 1);
			} ]);
});