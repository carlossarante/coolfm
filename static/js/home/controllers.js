
(function () {
	angular.module('cool.controllers',[])
		.controller('MainController',['$scope','$location','$filter','$window','$timeout','$routeParams','coolService','nouvelleService',function($scope,$location,$filter,$window,$timeout,$routeParams,coolService,nouvelleService){
			//$scope.home = true;
			//$scope.caster= false;
			//$scope.contact = false;
			$scope.currentProg= 2;
			$scope.program= {};
			$scope.programs=[];
			$scope.casters ={};
			$scope.casterActive= 0;
			$scope.direction= 0;
			$scope.scrolltop = 0;

			angular.element($window).bind('resize',function(){
				$scope.redimention();
				$scope.$apply();
			});

			/*angular.element(document.getElementById("loco")).bind('scroll',function(){
				alert();
			});*/

			/*window.onrezie = function(){
				alert();
				redimention();
			}*/

			///PETICIONES INICIALES JSON
			

			//LOGIA DE ANIMADORES
			$scope.getFinalCaster = function (last) {

				$scope.lastCaster = last;
				$scope.redimention();
			}
			$scope.nextCaster = function (){
				
				if($scope.casterActive < $scope.lastCaster){
					$scope.casterActive ++;	
					$scope.direction-=100;
				}
			}
			$scope.previousCaster = function (){
				
				if($scope.casterActive > 0)
				{
					$scope.casterActive --;
					$scope.direction+=100;
				}
			}

			$scope.redimention = function (){
				/*if(screen.width >624){
					$scope.winW = $window.innerWidth; //window width
					$scope.liW = $scope.winW * 0.20; //max-width li
					$scope.liP = $scope.winW * 0.025; //padding 
					$scope.ulW = $scope.winW * ($scope.lastCaster + 1) / 4; //ul width
					$scope.contW = 25 ;
				}*/
				if(screen.width > screen.height){
					$scope.winW = $window.innerWidth; //window width
					$scope.liW = $scope.winW * 0.20; //max-width li
					$scope.liP = $scope.winW * 0.025; //padding 
					$scope.ulW = $scope.winW * ($scope.lastCaster + 1) / 4; //ul width
					$scope.contW = 25 ;
				}
				/*else if($window.innerWidth >624){
					$scope.winW = $window.innerWidth; //window width
					$scope.liW = $scope.winW * 0.20; //max-width li
					$scope.liP = $scope.winW * 0.025; //padding 
					$scope.ulW = $scope.winW * ($scope.lastCaster + 1) / 4; //ul width
					$scope.contW = $scope.liW + ($scope.liP * 2);
				}*/
				else{
					$scope.winW = $window.innerWidth; //window width
					$scope.liW = $scope.winW * 0.5; //max-width li
					$scope.liP = $scope.winW * 0.25; //padding 
					$scope.ulW = $scope.winW * ($scope.lastCaster + 1) / 1; 
					$scope.contW = 100 ;
				}
			}
			$scope.contStyle = function (){
				var style ={"width" : $scope.contW+"%"};

				return style;
			}
			$scope.ulStyle = function (){
				var w = $scope.ulW;
				var style = {"width" : w+"px","left":$scope.direction+"%"};
				
				return style;
			}
			
			$scope.liStyle = function(){
				var liW	= $scope.liW;
				var liP = $scope.liP;
				var style = {"max-width" : liW+"px","padding" : "20px "+liP+"px"}

				return style;
			}

			//MOSTRAR Y OCULTAR SECCIONES DEL HOME DE COOL
			$scope.showHome = function(){
				$scope.hideSearch();
				$scope.hideMenu();

				$location.path("/");
				$location.search("page",null);

				$scope.program= false;
				$scope.caster= false;
				$scope.contact = false;
			} 

			$scope.showCoolSection = function(section){
				$scope.hideMenu();

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
						coolService.getProgrammation().then(function (data) {
			          		$scope.programs = data;
			          		$scope.program = data[2];
			        	});	

					}
					else if(section === 'Animateurs'){
						$scope.program= true;
						$scope.caster= true;
						$scope.contact = false;	
						coolService.getCasters().then(function (data) {
							$scope.casters = data;
						});
					}
					else if(section === 'Contact'){
						$scope.program= true;
						$scope.caster= true;
						$scope.contact = true;	
					}
					
				}
			} 

			$scope.showProgram = function(program,$index){
				$scope.program = program;
				$scope.currentProg= $index;
			}

			$scope.showNouvelles = function(){
				$scope.home = false;
				$location.path("/nouvelles");
			} 

			//////////////////////////////////////////////////////////////////////

			$scope.search = false;
			$scope.menushow = false;
			$scope.prevUrl = "/nouvelles";
			$scope.prevParam = {"page":"1"};
			$scope.nouvelles = {};
			$scope.portada = {};
			$scope.newsSingle={};
			$scope.next = null;
			$scope.prev = null;
			$scope.count= null;
			$scope.date = "25/05/2014 5:00";
			$scope.sectionshow = false;

			$scope.alterportada = function(val) {
				$scope.portada = val;
			}

			$scope.alternouvelles = function(val,url) {
				$scope.nouvelles = val.nouvelles;
				$scope.next = val.next;
				$scope.prev = val.previous;
				$scope.count = val.count;
				//$scope.nextJSON = url+"/?forma=json&query=nouvelles&page="+$scope.next; 
				//$scope.previousJSON = url+"/?forma=json&query=nouvelles&page="+$scope.previous;
				//$scope.nextURL = url;
				//$scope.previousURL = url;
			};

			$scope.showPage = function (page){
				$timeout(function(){$location.search("page",page)}, 500);
				angular.element('.body-view').animate({scrollTop: 0}, 500,'easeOutCirc');				
			}
			
			$scope.alternewsingle = function(val) {
				$scope.newsSingle = val;
			}

			$scope.altersectionnew = function (val) {
				$scope.sectionNew = val;
			}
			
			$scope.altersectionshow = function () {
				$scope.sectionshow = true;
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
			$scope.searchToggle = function(){
				$scope.search = !$scope.search;
			}
			$scope.hideSearch = function(){
				$scope.search = false;
			}
			//Muestra la noticia
			$scope.showNews = function (noticia) {	
				$scope.hideSearch();
				$scope.newshow = true;	
				$scope.prevUrl = $location.path();
				$scope.prevParam = $location.search();
				console.log($scope.prevParam);
				$scope.newsSingle = noticia;
				$location.path("/nouvelles/"+$filter('lowercase')(noticia.slug))
				$location.search('page',null);			
			};
			//Ocult la noticia 
			$scope.hideNews = function () {
				console.log($scope.prevParam);
				$scope.newshow = false;
				$location.search("page",$scope.prevParam.page);				
				$location.path($scope.prevUrl);
				$scope.newsSingle = "";
			};
			//Muestra la seccion clickeada
			$scope.showSection = function(tab) {	
				$scope.sectionshow = true;			
				console.log($scope.prevParam);
				$scope.hideSearch();
				$scope.hideNews();
				$scope.hideMenu();
				//$scope.sectionNew = "";
				//$scope.nouvelles = "";

				$location.path("/nouvelles/section/"+$filter('lowercase')(tab.section));
				$location.search("page","1");
			};
			//Oculta la seccion clickeada
			$scope.hideSection = function() {
				$scope.sectionshow = false;
				//$scope.sectionNew = $scope.nouvelles[0];
				
				$scope.hideSearch();
				$scope.hideNews();
				$scope.hideMenu();

				//$scope.nouvelles = "";

				$location.path("/nouvelles");
				$location.search("page","1");

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
			
			if($routeParams.page)
			{
				nouvelleService.getNews('/nouvelles/?format=json&query=nouvelles&page='+$routeParams.page).then(function (data) {
          			$scope.alternouvelles(data,$location.path());
        		});				
			}
			else
			{
				nouvelleService.getNews('/nouvelles/?format=json&query=nouvelles').then(function (data) {
					$scope.alternouvelles(data,$location.path());
        		});
			}

		}])


		.controller('SectionController',['$scope','$location','$filter','$window','$routeParams','nouvelleService',function($scope,$location,$filter,$window,$routeParams,nouvelleService){
			$scope.altersectionshow();
			$scope.alternewshow(false);

			nouvelleService.getSection($routeParams.section).then(function (data){
				$scope.altersectionnew([data]);
			});

			if($routeParams.page){
				nouvelleService.getNews('/nouvelles/section/'+$routeParams.section+'/?format=json&query=nouvelles&page='+$routeParams.page).then(function (data){
					$scope.alternouvelles(data,$location.path());
				});
			}
			else
			{
				nouvelleService.getNews('/nouvelles/section/'+$routeParams.section+'/?format=json&query=nouvelles').then(function (data) {
	          		$scope.alternouvelles(data,$location.path());
	        	});				
			}
			
        }])


		.controller('NewsSingleController',['$scope','$location','$filter','$window','$routeParams','nouvelleService',function($scope,$location,$filter,$window,$routeParams,nouvelleService){
			if(!$scope.newshow){
				nouvelleService.getNewsSingle($routeParams.singleNew).then(function (data) {
						$scope.alternewshow(true);
						$scope.alternewsingle(data[0]);		
				});	
				if(!$scope.sectionshow)
				{
					nouvelleService.getNews('/nouvelles/?format=json&query=nouvelles').then(function (data) {
		          		$scope.alternouvelles(data,$location.path());
		        	});
				}
			}		
		}])	
})();