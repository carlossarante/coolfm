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
        templateUrl: '/static/views/news.html',
        controller: 'NouvellesController'
      })
      .when('/nouvelles/:singleNew', {
        templateUrl: '/static/views/single.html',
        controller: 'NewsSingleController'
      })
      .when('/nouvelles/section/:section', {
        templateUrl: '/static/views/section.html',
        controller: 'SectionController'
      })
      .otherwise({
        redirectTo: '/nouvelles'
      });
  	}]);
})();