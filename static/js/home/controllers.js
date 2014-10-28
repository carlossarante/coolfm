
(function () {
	angular.module('cool.controllers',[])
		.controller('MainController',['$http','ezfb','$scope','$location','$filter','$window','$animate','$timeout','$routeParams','coolService','nouvelleService',function($http,ezfb,$scope,$location,$filter,$window,$animate,$timeout,$routeParams,coolService,nouvelleService){
			$scope.view = '';
			$scope.animateurs = false;
			$scope.programmation = false;
			$scope.contact = false;
			
			$scope.currentProg= 2;
			$scope.program= {};
			$scope.programs=[];
			$scope.casters ={};
			$scope.casterActive= 0;
			$scope.direction= 0;
			$scope.scrolltop = 0;
			window.lugar = $location;
			window.http = $http;
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
			$scope.coolLive = function (){
				$window.open("/play/","COOL","Width=400, height=300, resizable=no, toolbar=no, menubar=no, status=yes,scrollbars=no");
			}
			$scope.animaciones = function () {
				if($scope.view === "nouvelles"){
					$animate.addClass(angular.element('.body-view')[0],'newsInAnim');
					$animate.addClass(angular.element('.body-view')[1],'newsInAnim');	
					$timeout(function(){
						//$animate.removeClass(angular.element('.body-view')[0],'viewAnim');
						//$animate.removeClass(angular.element('.body-view')[1],'viewAnim');
						//$animate.addClass(angular.element('.body-view')[0],'homeAnim');
						//$animate.addClass(angular.element('.body-view')[1],'homeAnim');	
					}, 1000);
				}
				else if($scope.view === "nouvellesOut"){
					$animate.removeClass(angular.element('.body-view')[0],'newsInAnim');
					$animate.removeClass(angular.element('.body-view')[1],'newsInAnim');	
					$animate.addClass(angular.element('.body-view')[0],'newsOutAnim');
					$animate.addClass(angular.element('.body-view')[1],'newsOutAnim');	
					$timeout(function(){
						//$animate.removeClass(angular.element('.body-view')[0],'viewAnim');
						//$animate.removeClass(angular.element('.body-view')[1],'viewAnim');
						//$animate.addClass(angular.element('.body-view')[0],'homeAnim');
						//$animate.addClass(angular.element('.body-view')[1],'homeAnim');	
					}, 1000);
				}
				else if($scope.view === "programmation"){
					if($scope.animateurs | $scope.contact){
						$animate.addClass(angular.element('.body-view')[0],'sectionRightAnim');
						$animate.addClass(angular.element('.body-view')[1],'sectionRightAnim');	
						$animate.removeClass(angular.element('.body-view')[0],'sectionLeftAnim');
						$animate.removeClass(angular.element('.body-view')[1],'sectionLeftAnim');
						$animate.removeClass(angular.element('.body-view')[0],'newsOutAnim');
						$animate.removeClass(angular.element('.body-view')[1],'newsOutAnim');

						$scope.contact = false;
						$scope.animateurs = false;
					}
					else{
						$animate.addClass(angular.element('.body-view')[0],'sectionLeftAnim');
						$animate.addClass(angular.element('.body-view')[1],'sectionLeftAnim');
						$animate.removeClass(angular.element('.body-view')[0],'sectionRightAnim');
						$animate.removeClass(angular.element('.body-view')[1],'sectionRightAnim');		
						$animate.removeClass(angular.element('.body-view')[0],'newsOutAnim');
						$animate.removeClass(angular.element('.body-view')[1],'newsOutAnim');
					}
				}
				else if($scope.view === "animateurs"){
					if($scope.contact){
						$animate.addClass(angular.element('.body-view')[0],'sectionRightAnim');
						$animate.addClass(angular.element('.body-view')[1],'sectionRightAnim');	
						$animate.removeClass(angular.element('.body-view')[0],'sectionLeftAnim');
						$animate.removeClass(angular.element('.body-view')[1],'sectionLeftAnim');
						$animate.removeClass(angular.element('.body-view')[0],'newsOutAnim');
						$animate.removeClass(angular.element('.body-view')[1],'newsOutAnim');

						$scope.contact = false;
						$scope.programmation = false;
					}
					else{
						$animate.addClass(angular.element('.body-view')[0],'sectionLeftAnim');
						$animate.addClass(angular.element('.body-view')[1],'sectionLeftAnim');	
						$animate.removeClass(angular.element('.body-view')[0],'sectionRightAnim');
						$animate.removeClass(angular.element('.body-view')[1],'sectionRightAnim');	
						$animate.removeClass(angular.element('.body-view')[0],'newsOutAnim');
						$animate.removeClass(angular.element('.body-view')[1],'newsOutAnim');
					}
				}
				else if($scope.view === "contact"){
					$animate.addClass(angular.element('.body-view')[0],'sectionLeftAnim');
					$animate.addClass(angular.element('.body-view')[1],'sectionLeftAnim');	
					$animate.removeClass(angular.element('.body-view')[0],'sectionRightAnim');
					$animate.removeClass(angular.element('.body-view')[1],'sectionRightAnim');		
					$animate.removeClass(angular.element('.body-view')[0],'newsOutAnim');
					$animate.removeClass(angular.element('.body-view')[1],'newsOutAnim');

					$scope.programmation = false;
					$scope.animateurs = false;
				}
				else if($scope.view === "entrée"){

					if ($scope.programmation | $scope.animateurs | $scope.contact) {
						$animate.addClass(angular.element('.body-view')[0],'sectionRightAnim');
						$animate.addClass(angular.element('.body-view')[1],'sectionRightAnim');	
						$animate.removeClass(angular.element('.body-view')[0],'sectionLeftAnim');
						$animate.removeClass(angular.element('.body-view')[1],'sectionLeftAnim');
						$animate.removeClass(angular.element('.body-view')[0],'newsOutAnim');
						$animate.removeClass(angular.element('.body-view')[1],'newsOutAnim');

						$scope.programmation= false;
						$scope.animateurs= false;
						$scope.contact = false;
					}
					else
					{
						$animate.addClass(angular.element('.body-view')[0],'sectionLeftAnim');
						$animate.addClass(angular.element('.body-view')[1],'sectionLeftAnim');
						$animate.removeClass(angular.element('.body-view')[0],'sectionRightAnim');
						$animate.removeClass(angular.element('.body-view')[1],'sectionRightAnim');	
						$animate.removeClass(angular.element('.body-view')[0],'newsOutAnim');
						$animate.removeClass(angular.element('.body-view')[1],'newsOutAnim');
					}
				}
				else
				{	
					if(typeof(angular.element('.body-view')[1]) === "undefined")
					{
						$animate.removeClass(angular.element('.body-view')[0],'newsInAnim');
					}
					else
					{
						$animate.removeClass(angular.element('.body-view')[0],'newsInAnim');
						$animate.removeClass(angular.element('.body-view')[1],'newsInAnim');
					}
				}
				//$animate.addClass(document.getElementsByClassName('.body-view'),'homeAnim');
			}
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
				$scope.view = 'nouvellesOut';

				$scope.hideSearch();
				$scope.hideMenu();

				$location.path("/");
				$location.search("page",null);
			} 

			$scope.showCoolSection = function(section){
				$scope.hideMenu();
				$scope.currentProg= 2;

				section = $filter('lowercase')(section);
				$scope.view = section;

				if(section === "entrée"){
					$scope.showHome();
					
					/*$scope.programmation= false;
					$scope.animateurs= false;
					$scope.contact = false;
*/
					$scope.view = 'entrée';
				}
				else
				{
					$location.path("/"+section);
					if(section === 'programmation'){

						$scope.programmation= true;
						//$scope.animateurs= false;
						//$scope.contact = false;

						coolService.getProgrammation().then(function (data) {
			          		$scope.programs = data;
			          		$scope.program = data[2];
			        	});	
					}
					else if(section === 'animateurs'){
						//$scope.programmation= false;
						$scope.animateurs= true;
						//$scope.contact = false;

						coolService.getCasters().then(function (data) {
							$scope.casters = data;
						});
					}
					else if(section === 'contact'){
						//$scope.programmation= false;
						//$scope.animateurs= false;
						$scope.contact = true;	
					}
					
				}
			} 

			$scope.showProgram = function(program,$index){
				$scope.program = program;
				$scope.currentProg= $index;
			}

			$scope.showNouvelles = function(){
				$scope.view = 'nouvelles';
				$location.path("/nouvelles");
			} 

			//////////////////////////////////////////////////////////////////////
			$scope.inter = false; //para determinar si se accedio a una url desde la app o desde afuera
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
				$scope.parser = new DOMParser();
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
				$scope.view = '';

				$timeout(function(){$location.search("page",page)}, 500);
				angular.element('.body-view').animate({scrollTop: 0}, 500,'easeOutCirc');				
			}
			
			$scope.alternewsingle = function(val) {
				$scope.newsSingle = val;
				$scope.newsSingle.url = $location.$$absUrl;
				console.log($scope.newsSingle.url)
			}
			$scope.alternewsingleURL = function() {
				$scope.newsSingleURL = $location.$$absUrl;
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
				$scope.view = '';
				$scope.inter=true;
				$scope.hideMenu();
				$scope.hideSearch();
				$scope.newshow = true;	
				$scope.prevUrl = $location.path();
				$scope.prevParam = $location.search();
				$scope.newsSingle = noticia;
				$location.path("/nouvelles/"+$filter('lowercase')(noticia.slug))
				$location.search('page',null);			
			};
			//Ocult la noticia 
			$scope.hideNews = function () {
				$scope.hideMenu();

				$scope.newshow = false;
				$location.search("page",$scope.prevParam.page);				
				$location.path($scope.prevUrl);
				$scope.newsSingle = "";
			};
			//Muestra la seccion clickeada
			$scope.showSection = function(tab) {	
				$scope.inter = true;
				$scope.view = '';
				$scope.sectionshow = true;			
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
				$scope.view = '';
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

			$scope.searchInfo = function ($event){
				var sval = angular.element('.buscarInfo').val();
				window.dato = $http.defaults.headers;

				if($event.charCode === 13)
				{
					var token = $scope.getCookie("csrftoken");

					angular.element('.buscarInfo').val("");
					$scope.hideSearch();

					$http.defaults.headers.common =  {"X-CSRFToken" : token};
					//$http.post('/nouvelles/search/?format=json', {"keyword" : sval})

					$.ajaxSetup({
					    beforeSend: function(xhr, settings) {
					        if (settings.type == 'POST' || settings.type == 'PUT' || settings.type == 'DELETE') {
					            function getCookie(name) {
					                var cookieValue = null;
					                if (document.cookie && document.cookie != '') {
					                    var cookies = document.cookie.split(';');
					                    for (var i = 0; i < cookies.length; i++) {
					                        var cookie = jQuery.trim(cookies[i]);
					                        // Does this cookie string begin with the name we want?
					                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
					                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					                            break;
					                        }
					                    }
					                }
					                return cookieValue;
					            }
					            if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
					                // Only send the token to relative URLs i.e. locally.
					                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
					            }
					        }
					    }
					});
					

					
					$.post('/nouvelles/search/?format=json', {keyword: sval} , function(data, textStatus, xhr) {
						/*optional stuff to do after success */
					});
					$http({ 
					    method: 'POST', 
					    url: '/nouvelles/search/?format=json', 
					    data: $.param({keyword: sval})
					})
					.success(function (data, status){
						console.log("Se realizo la busqueda");
					})
					.error(function (data,status){
						console.log("Error en la busqueda");
					})
				}				
			}

			$scope.getCookie =function (a)
			{
				var e = null;
				if (document.cookie && document.cookie != "")
				{
					var d = document.cookie.split(";");
					for (var c = 0; c < d.length; c++)
					{
						var b = jQuery.trim(d[c]);
						if (b.substring(0, a.length + 1) == (a + "="))
						{
							e = decodeURIComponent(b.substring(a.length + 1));
							break
						}
					}
				}
				return e
			}
		}])	


		.controller('CoolSectionController',['$scope','$location','$routeParams','coolService',function($scope,$location,$routeParams,coolService){
			$scope.showCoolSection($routeParams.coolsection);
		}])
		
		/////////////////////////////////////////////////////////////////////////////////////////////////////
		.controller('NouvellesController',['$scope','$location','$animate','$routeParams','nouvelleService',function($scope,$location,$animate,$routeParams,nouvelleService){
	
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


		.controller('SectionController',['$scope','$location','$animate','$routeParams','nouvelleService',function($scope,$location,$animate,$routeParams,nouvelleService){
			$scope.altersectionshow();
			//$animate.cancel;
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
			if(!$scope.inter)
			{
				nouvelleService.getPrincipals().then(function (data) {
	          		$scope.portada = data;
	        	});
			}			
        }])


		.controller('NewsSingleController',['$scope','$location','$routeParams','nouvelleService',function($scope,$location,$routeParams,nouvelleService){
			$scope.alternewsingleURL();
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
			if(!$scope.inter)
			{
				nouvelleService.getPrincipals().then(function (data) {
	          		$scope.portada = data;
	        	});
			}		
		}])	
})();