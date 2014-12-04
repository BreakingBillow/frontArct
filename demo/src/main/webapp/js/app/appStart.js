require.config({

  baseUrl: 'js',

  paths: {
    'angular'               : '../vendor/angular/angular.min',
    'angular-ui-router'     : '../vendor/angular/angular-ui-router',
    'angular-couch-potato'  : '../vendor/angular/angular-couch-potato',
    'angular-cookies'       : '../vendor/angular/angular-cookies.min',
	'jquery': '../vendor/jquery/jquery.min',
    'kendo': '../vendor/kendo/js/kendo.all.min',
    'jsSHA': 'sha'

  },

  shim: {
    'angular': {
      exports   : 'angular'
    },
    'angular-ui-router': {
      deps      : ['angular']
    },     
    'angular-cookies' : {
    	deps      : ['angular']
    },
    'kendo': {
        deps: ['jquery',  'angular']
    }, 
    urlArgs:'v=1.0'
  }

});

// run is required to force the app to run, not because we need to interact
// with it.  Anything required here will by default be combined/minified by
// r.js if you use it.
require([ 'app', 'angular', 'app/appInit', 'jquery', 'jsSHA', 'app/authConfig'], function(app, angular) {

  angular.element(document).ready(function() {

    angular.bootstrap(document, [app['name'], function() {

      // for good measure, put ng-app on the html element
      // studiously avoiding jQuery because angularjs.org says we shouldn't
      // use it.  In real life, there are a ton of reasons to use it.
      // karma likes to have ng-app on the html element when using requirejs.
      angular.element(document).find('html').addClass('ng-app');

    }]);

  });

});