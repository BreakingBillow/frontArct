define(['app'], function(app) {
  app.registerService(
    'baseService',
    function() {    	
    	this.serverUrl = '/v9/mobile';
    	this.secureServerUrl = '/v9/mobile';  	
    }
  );
});
