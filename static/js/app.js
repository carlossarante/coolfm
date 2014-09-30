(function(){

	var app = angular.module('nouvelles',[
		'ngRoute',
		'nouvelles.controllers',
		'nouvelles.services'
	]);

	app.config(['$locationProvider', function ($locationProvider) {

    	$locationProvider.html5Mode(true).hashPrefix('!');

  	}]);

	app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
      .when('/nouvelles', {
        templateUrl: '/static/views/nouvelles.html',
        //controller: 'MainController'
      })
      .when('/nouvelles/:noticia', {
        templateUrl: '/static/views/nouvelles.html',
        //controller: 'MainController'
      })
      .when('/nouvelles/section/:section', {
        templateUrl: '/static/views/nouvelles.html',
        //controller: 'MainController'
      })
      .otherwise({
        redirectTo: '/nouvelles'
      });

  	}]);
})();