(function(){

	var app = angular.module('cool',[
		'ngRoute',
    'ngAnimate',
		'cool.controllers',
		'cool.services'
	]);

	app.config(['$locationProvider', function ($locationProvider) {

    	$locationProvider.html5Mode(true).hashPrefix('!');

  	}]);

	app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: '/static/views/home.html',
        //controller: 'NouvellesController'
      })
      .when('/nouvelles', {
        templateUrl: '/static/views/news.html',
        controller: 'NouvellesController'
      })
      .when('/nouvelles/:singleNew', {
        templateUrl: '/static/views/news.html',
        controller: 'NewsSingleController'
      })
      .when('/nouvelles/section/:section', {
        templateUrl: '/static/views/news.html',
        controller: 'SectionController'
      })
      .when('/:coolsection', {
        templateUrl: '/static/views/home.html',
        //controller: 'CoolSectionController'
      })      
      .otherwise({
        redirectTo: '/'
      });
  	}]);
})();