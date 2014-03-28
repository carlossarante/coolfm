var x= $(document);
x.ready(inicio);

function inicio(){

	iniciarHome();

    maquetacion();
    $(window).resize(maquetacion);
	
	// (function() {

    // })();
	/*$(function() {
    $("#map").figMap();
});*/
	
	
	var x= $("#news");
	/*x.hover(function(e) {
        switch (x.height()){
			case 15:
				x.height(30);
			break;
			case 30:
				x.height(15);
			break
			default:
			break
		}
    });*/
	
	x.click(mostrarPagina);	
	
	x=$("#botonHdr");
	x.click(mostrarMenuMovil);	

	x=$("#play1");
	x.click(function(){
		window.open("/reproductor/reproductor.html","COOL","Width=400, height=300, resizable=no, toolbar=no, menubar=no, status=yes,scrollbars=no");
	});
	x.hover(
	function(e){
		$("#listen").css("visibility","visible");
		/*x.css("background","url('../img/cool-play-parall-1.png')-350px -270px  no-repeat
");
		x.css("background-size","550%");*/
	},function(e){

		$("#listen").css("visibility","hidden");
		//x.css("visibility","visible");
	});

	x=$("#facebook-share");
	x.click(function(){window.open('https://www.facebook.com/sharer/sharer.php?app_id=309437425817038 &amp;sdk=joey &amp;u=http%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F &amp;display=popup','','top=300,left=300,width=800,height=400');});

	x=$("#twitter-share");
	x.click(function(){window.open('https://twitter.com/intent/tweet?hashtags=RadioCoolHaiti%2C &amp;original_referer=http%3A%2F%2Flocalhost%2FCOOL%2Ftemplates%2520-%2520done%2Findex.html &amp;text=Estoy%20escuchando%20buena%20musica%20en%20esta%20emisora &amp;tw_p=tweetbutton','','top=300,left=300,width=800,height=400');});
	
	x=$("#logo");
	x.click(function(){goToSection(document.getElementById("hogar").dataset.page.toLowerCase())});
}

function mostrarMenuMovil(){
	var x= $(this);
	var k= $("body nav ul");
	
	/*var altura = (100*k.height())/window.innerWidth;*/
	var altura = k.children("li").length;
	
	if(k.height()==0){
		x.css("background-color","orange");	
		k.height(170);
	}else{	
		x.css("background-color","white");
		k.height(0);
	}
	
	$("body nav ul li").click(function(e){k.height(0);x.css("background-color","white");})
	$("section").click(function(e){k.height(0);x.css("background-color","white");})
	
	return;
}

function mostrarPagina(){
	var x = $("#noticias");
	if(x.height()<=0){
		x.height("100%");
		$("#news").height("100%");
		
	}
	else{
		x.height("0%");
		$("#news").height("30px");
	}
	
}

function maquetacion(){
    var x=$("#play1");
    x.height(x.width());
    x.css("bottom",$("#play-img").width()*0.12);
}