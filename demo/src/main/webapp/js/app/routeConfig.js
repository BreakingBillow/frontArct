define(['app'], function(app) {
  app.registerProvider(
    'routeConfig',
    [
      '$stateProvider',
      '$urlRouterProvider',
      '$couchPotatoProvider',
      function (
        $stateProvider,
        $urlRouterProvider,
        $couchPotatoProvider
      ) {

        this.$get = function() {
        	// this is a config-time-only provider
        	// in a future sample it will expose runtime information to the app
        	return {};
        };    	  
    	  
        $stateProvider        
		.state('app', {
			url: '',
			abstract: true,
			template: '<ui-view></ui-view>',
		    resolve: {
		        'login': function (authService, $q, $http) {
		            var roleDefined = $q.defer();

		            /**
			             * In case there is a pendingStateChange means the user requested a $state,
		             * but we don't know yet user's userRole.
		             *
		             * Calling resolvePendingState makes the loginService retrieve his userRole remotely.
		             */
		            if (authService.pendingStateChange) {
		                return authService.resolvePendingState($http.get('/user'));
		            } else {
		                roleDefined.resolve();
		            }
		            return roleDefined.promise;
		        }
		    }
		})        
 
	 	/****
	 	 ************************* Common ****************************
	 	 */
		.state('app.login', {
			url: '/login',
			templateUrl: 'pages/common/login.html',
	        accessLevel: accessLevels.anon,
         	controller: 'loginController',
            resolve: {
                 dummy: $couchPotatoProvider.resolveDependencies(['controllers/common/loginController'])
             },
	        title: 'Celltraq - Login'
		})
		
		.state('app.error', {
			url: '/error',
			templateUrl: 'pages/common/error.html',
	        accessLevel: accessLevels.anon,
	        title: 'Celltraq - Error'
		})
		
		
		/****
	 	 *************************** Admin *********************************
	 	 */	       
        .state('app.admin', {
        	  url: '/kendotree',
        	  templateUrl: 'pages/admin/index.html',	
        	  controller: 'mainAdminController',
        	  accessLevel: accessLevels.admin,
              resolve: {
                  dummy: $couchPotatoProvider.resolveDependencies(['controllers/admin/mainAdminController'])
              }
        })
		
	 	/****
	 	 ****************************** Main *********************************
	 	 */
			
        .state('app.main', {
      	  url: '/main',
      	  templateUrl: 'pages/main/index.html',	
      	  controller: 'mainController',
      	  accessLevel: accessLevels.user,
            resolve: {
                dummy: $couchPotatoProvider.resolveDependencies(['controllers/main/mainController'])
            }
        });
        
        $urlRouterProvider.otherwise('/login');
      }
    ]
  );
});
