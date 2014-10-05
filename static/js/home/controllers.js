(function () {
	angular.module('cool.controllers',[])
		.controller('MainController',['$scope','$location','$filter','$window','$routeParams','coolService','nouvelleService',function($scope,$location,$filter,$window,$routeParams,coolService,nouvelleService){
			$scope.home = true;
			$scope.program= false;
			$scope.caster= false;
			$scope.contact = false;

			//MOSTRAR Y OCULTAR SECCIONES DEL HOME DE COOL
			$scope.showHome = function(){
				$location.path("/");
				$scope.program= false;
				$scope.caster= false;
				$scope.contact = false;
			} 

			$scope.showCoolSection = function(section){
				if(section === "Entrée"){
					$scope.showHome();
				}
				else
				{
					$location.path("/"+$filter('lowercase')(section));
					if(section === 'Programmation'){
						$scope.program= true;
						$scope.caster= false;
						$scope.contact = false;	
					}
					else if(section === 'Animateurs'){
						$scope.program= true;
						$scope.caster= true;
						$scope.contact = false;	
					}
					else if(section === 'Contact'){
						$scope.program= true;
						$scope.caster= true;
						$scope.contact = true;	
					}
					
				}
			} 

			$scope.showNouvelles = function(){
				$location.path("/nouvelles");
			} 

			//////////////////////////////////////////////////////////////////////

			$scope.search = false;
			$scope.menushow = false;
			$scope.prevUrl = "";
			$scope.nouvelles = {};
			$scope.portada = {};
			$scope.newsSingle={};
			$scope.next = "";
			$scope.prev = "";
			$scope.date = "25/05/2014 5:00";
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
			$scope.altersectionnew = function (val) {
				$scope.sectionNew = val;
			}
			$scope.alternewshow = function (val) {
				$scope.newshow = val;
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
        	//Mostrar HOME COOL
        	/*$scope.showHome = function(){
        		console.log(typeof window.angular);
        		//if (typeof window.angular === "undefined"){
        			//window.parent.mostrarPagina();
        		//}
        			
        		//else{
        		//	window.location="/";
        		//}			
        		
        	}*/

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


		.controller('CoolSectionController',['$scope','$location','$filter','$window','$routeParams','coolService',function($scope,$location,$filter,$window,$routeParams,coolService){
			$scope.showCoolSection($routeParams.coolsection);
		}])
		/////////////////////////////////////////////////////////////////////////////////////////////////////
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
			$scope.alternewshow(false);
			nouvelleService.getSection($routeParams.section).then(function (data){
				$scope.alternouvelles(data);
				$scope.altersectionnew([data[0]]);
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