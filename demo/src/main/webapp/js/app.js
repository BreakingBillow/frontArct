define(
  ['angular', 'angular-couch-potato', 'angular-ui-router', 'kendo', 'angular-cookies'],
  function(angular, couchPotato) {

    var app = angular.module('app', ['kendo.directives', 'scs.couch-potato', 'ui.router', 'ngCookies']);

    // have Couch Potato set up the registerXXX functions on the app so that
    // registration of components is as easy as can be
    couchPotato.configureApp(app);

    return app;

  }

);
