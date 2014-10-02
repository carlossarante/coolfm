(function () {
	angular.module('nouvelles.controllers',[])
		.controller('MainController',['$scope','$location','$filter','$window','$routeParams','nouvelleService',function($scope,$location,$filter,$window,$routeParams,nouvelleService){
			$scope.search = false;
			$scope.menushow = false;
			$scope.prevUrl = "";
			$scope.nouvelles = {};
			$scope.portada = {};
			$scope.newsSingle={};
			$scope.sectionshow = false;

			$scope.alternouvelles = function(val) {
				$scope.nouvelles = val; 
			};
			$scope.alterportada = function(val) {
				$scope.portada = val;
			}
			$scope.alternewsingle = function(val) {
				$scope.newsSingle = val;
			}
			$scope.altersectionshow = function () {
				$scope.sectionshow = true;
			}
			$scope.alternewshow = function () {
				$scope.newshow = true;
			}

			nouvelleService.getMenu().then(function (data) {
          		$scope.item = data;
        	});

        	nouvelleService.getPrincipals().then(function (data) {
          		$scope.portada = data;
        	});

        	nouvelleService.getTopNouvelles().then(function (data) {
          		$scope.topnouvelles = data;
        	});

			//Mostrar Busqueda
			$scope.showSearch = function () {
				$scope.search = true;
			};
			//Muestra la noticia
			$scope.showNews = function (noticia) {	
				$scope.newshow = true;	
				$scope.prevUrl = $location.path();
				$scope.newsSingle = noticia;
				$location.path("/nouvelles/"+$filter('lowercase')(noticia.slug))			
			};
			//Ocult la noticia 
			$scope.hideNews = function () {
				$scope.newshow = false;
				$location.path($scope.prevUrl);
				$scope.newsSingle = "";
			};
			//Muestra la seccion clickeada
			$scope.showSection = function(tab) {	
				$scope.sectionshow = true;			
				
				$scope.hideNews();
				$scope.hideMenu();
				//$scope.sectionNew = "";
				//$scope.nouvelles = "";

				$location.path("/nouvelles/section/"+$filter('lowercase')(tab.section));
			};
			//Oculta la seccion clickeada
			$scope.hideSection = function() {
				$scope.sectionshow = false;
				$scope.sectionNew = $scope.nouvelles[0];
				
				$scope.hideNews();
				$scope.hideMenu();

				//$scope.nouvelles = "";

				$location.path("/nouvelles");

			};
			//Mostrar menu
			$scope.showMenu = function(){
				$scope.menushow = !$scope.menushow;
			};
			//Ocultar menu
			$scope.hideMenu = function(){
				$scope.menushow = false;
			};
		}])		
		.controller('NouvellesController',['$scope','$location','$filter','$window','$routeParams','nouvelleService',function($scope,$location,$filter,$window,$routeParams,nouvelleService){
			nouvelleService.getPrincipals().then(function (data) {
          		$scope.alterportada(data);
        	});

			nouvelleService.getNews('/nouvelles/?format=json').then(function (data) {
          		$scope.alternouvelles(data);
        	});
		}])


		.controller('SectionController',['$scope','$location','$filter','$window','$routeParams','nouvelleService',function($scope,$location,$filter,$window,$routeParams,nouvelleService){
			$scope.altersectionshow();
			nouvelleService.getSection($routeParams.section).then(function (data){
				$scope.alternouvelles(data);
			});
		}])


		.controller('NewsSingleController',['$scope','$location','$filter','$window','$routeParams','nouvelleService',function($scope,$location,$filter,$window,$routeParams,nouvelleService){

			if(!$scope.newshow){
				nouvelleService.getNewsSingle($routeParams.singleNew).then(function (data) {
						$scope.alternewshow(true);
						$scope.alternewsingle(data[0]);		
				});	
				if(!$scope.sectionshow)
				{
					nouvelleService.getNews('/nouvelles/?format=json').then(function (data) {
		          		$scope.alternouvelles(data);
		        	});
				}
			}		
		}])
})();