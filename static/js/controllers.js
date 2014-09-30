(function () {
	angular.module('nouvelles.controllers',[])
		.controller('MainController',['$scope','$location','$filter','$window','$routeParams','nouvelleService',function($scope,$location,$filter,$window,$routeParams,nouvelleService){
			$scope.newshow = false;
			$scope.sectionshow = false;
			$scope.search=false;
			$scope.menushow=false;
			$scope.prevUrl="";

			nouvelleService.getMenu().then(function (data) {
          		$scope.item=data;
        	});
			nouvelleService.getNews().then(function (data) {
          		$scope.nouvelles=data;
        	});
        	nouvelleService.getPrincipals().then(function (data) {
          		$scope.portada=data;
        	});
        	nouvelleService.getTopNouvelles().then(function (data) {
          		$scope.topnouvelles=data;
        	});


			//Mostrar Busqueda
			$scope.showSearch=function () {
				$scope.search = true;
			};
			//Muestra la noticia
			$scope.showNews=function (noticia) {
				$scope.newshow=true;
				$scope.prevUrl=$location.path();
				$location.path("/nouvelles/"+noticia.slug)

				nouvelleService.getNewsSingle(noticia.slug).then(function (data) {
					$scope.newsSingle = data;
				});
			};
			//Ocult la noticia 
			$scope.hideNews=function () {
				$scope.newshow=false;
				$location.path($scope.prevUrl);
			};
			//Muestra la seccion clickeada
			$scope.showSection=function(tab) {
				$scope.sectionshow = true;

				$scope.hideNews();
				$scope.hideMenu();
				
				$location.path("/nouvelles/section/"+$filter('lowercase')(tab.section));
				nouvelleService.getSection($filter('lowercase')(tab.section)).then(function (data){
					$scope.section = data;
				});
			};
			//Oculta la seccion clickeada
			$scope.hideSection=function() {
				$scope.sectionshow = false;
				
				$scope.hideNews();
				$scope.hideMenu();

				$location.path("/nouvelles");
			};
			//Mostrar menu
			$scope.showMenu=function(){
				$scope.menushow=!$scope.menushow;
			};
			//Ocultar menu
			$scope.hideMenu=function(){
				$scope.menushow=false;
			};
		}])		
})();