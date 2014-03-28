var x = $(document);
var cont1=0;
var cont2=1;
var sentido=true;
x.ready(preinicio);

function preinicio(){
	inicio();
}
function inicio(){
	var x;
	var y;
	x=$("head");
	/*if(screen.width>920){*/
	if(window.innerWidth>=920){
		x=$(".recientes1, .recientes2");	
		x.hover(showUp,showDown);
		x=$(".boton,.recientes1,.recientes2");
		x.click(mostrarNoticiaDesktop);	
	}else{	
		x=$("#botonMenu");
		x.click(mostrarMenuMovil);
		
		x=$(".boton");
		x.click(mostrarNoticiaMovil);
		
		x=$(".recientes1, .recientes2");
		x.click(mostrarPricipalesMovil);
		
		/*INICIALIAR SLIDE Y HACER LLAMADA A FUNCION SLIDE*/
		$("#portada article:first-child").css("left","0vw");
		setInterval("slide()",3000);
	}
	return;
}

/*  MOSTRAR\OCULTAR NOTICIAS MOVIL*/

function mostrarPricipalesMovil(){
	var x = $(this);
	var y = $("#shown2");
	var z = $("#shown1");
	var m;	
	var k=$("header");
	var n=$("#menu");
	
	var cuerpo= $("#principal");
	cuerpo.css("overflow","hidden");
	
	
	setTimeout(function(e){
	k.css("position","fixed");
	n.css("position","fixed");},1000);
	
	if(window.innerWidth<=480){
		n.css("top","80px");		
	}else{
		n.css("top","80px");
	}
		
	
	if(x.is(".boton")){
		var noticia= x.parent();
	}
	else{
		var noticia= x;	
	}
	y.prepend(noticia.html());
	
	if(x.is(".boton")){
		m=y.children(".boton");
		m.remove();
	}
	else{
		y.removeClass(this);
	}

	z.height(window.innerHeight - k.height());
	y.height(window.innerHeight - k.height());	
	y.append("<div id='botonr'>Ocultar</div>");
	
	x=$("#botonr");
	x.click(function(e) {	
		cuerpo.css("overflow","auto");		
		z.height("0vh");
		y.height("0vh");
		
		
		k.css("position","relative");
		n.css("position","static");
				
		setTimeout(function(e){y.html("");	
		n.css("top","0vw");
		},1000);
		
	});
	
	return;
}

/*MUESTRA MENU DE HEADER PARA DISPOSITIVOS MOVILES*/
function mostrarMenuMovil(){
	var x= $(this);
	var z= $("#menu");
	var k= $("#menu nav ul");
	var y= $("#shown1");
	
	/*var altura = (100*k.height())/window.innerWidth;*/
	var altura = k.height();
	
	if(z.height()==0){
		x.css("background-color","orange");	
		z.height(altura+"px");
		y.css("top",altura+80+"px");
	}else{	
		x.css("background-color","white");	
		z.height(0+"px");
		y.css("top",80+"px");/*
		z.animate({height:"0vw"},"slow");
		y.animate({top:8+"vw"},"slow");*/
	} 
	
	$("section").click(function(e){z.height(0);x.css("background-color","white"); y.css("top",80+"px");})
	return;
}

/*MOSTAR\OCULTAR NOTICIAS EN DISPOSITIVOS MOVILES*/
function mostrarNoticiaMovil(){
	var x=$(this);
	var y=x.parent();
	
	
	if(cont1==0){	
		y.children("p").height("auto");
		y.children("p").css("white-space","normal");
		y.children("p").css("text-overflow","clip");
	
		x.html("Ocultar");
		cont1=1;
		
	}else{
		y.children("p").height("10vw");		
		y.children("p").css("white-space","normal");
		
		x.html("Leer mas");
		cont1=0;
	}
	return;	
}

/*SLIDE SHOW*/
	function slide(){
		var primer= 1;
		var ultimo=$("#portada article").length;
		var elemento=$("#portada article:nth-child("+cont2+")");
		var izquierdo=$("#portada article:nth-child("+(cont2+1)+")");
		var derecho=$("#portada article:nth-child("+(cont2-1)+")");
		
		
		if(cont2 == primer){
			sentido=true;
			cont2++;
			moverDerecha(elemento,izquierdo);			
		}else if(cont2 == ultimo){
			sentido=false;
			cont2--;
			moverIzquierda(elemento,derecho);			
		}else{
			if(sentido){				
				cont2++;
				moverDerecha(elemento,izquierdo);
			}
			else{
				cont2--;
				moverIzquierda(elemento,derecho);	
			}
		}
		return;
	}
function moverDerecha(elemento,izquierdo){
	elemento.css("left","100vw");
	izquierdo.css("left","0vw");	
	return;
}
function moverIzquierda(elemento,derecho){
	elemento.css("left","-100vw");
	derecho.css("left","0vw");
	return;
}

/*  MOSTRAR\OCULTAR NOTICIAS  DESKTOP */

function mostrarNoticiaDesktop(){
	var x = $(this);
	var y = $("#shown2");
	var z = $("#shown1");
	var k;
	var m;	
	
	if(x.is(".boton")){
		var noticia= x.parent();
	}
	else{
		var noticia= x;	
	}
	y.prepend('<div id="shown3">'+noticia.html()+'</div>');		
	k = $("#shown3");
	
	if(x.is(".boton")){
		m=k.children(".boton");
		m.remove();
	}
	else{
		y.removeClass(this);
	}
	
	
	z.show(1000);	
	y.append("<div id='caja'><div id='botonr'>Regresar</div></div>");
	
	x=$("#botonr");
	x.click(ocultar);
	
	return;
}

function ocultar(){
	var x= $("#shown2");
	var y = $("#shown1");
	var z = $("#principal");


	y.hide(1000);	
	x.html("");
	
	return;
} 

/*TEXTO DESPLEGABLE DE LAS NOTICIAS PRINCIPALES DESKTOP*/
function showUp() {
			if($(this).is(".recientes1")){
				$(this).children("p").height("13vw");
				$(this).children("h2").css("bottom","13.25vw");	
			}
			else if($(this).is(".recientes2")){
				$(this).children("p").height("10.5vw");
				$(this).children("h2").css("bottom","10.75vw");	
			}		
			return;
    }
	
function showDown() {
			$(this).children("p").height(0);
			$(this).children("h2").css("bottom","0.25vw");	
			return;
}
// Chrome 26 needs this
    // Safari 6 needs this

    // Firefox 19 doesn't need it
    // IE 10 doesn't need it

$(function() {

	causeRepaintsOn = $("h1, h2, h3, h4, h5, h6, p, a,footer,img,.boton,#botonr");

	$(window).resize(function() {
		causeRepaintsOn.css("z-index", 1);
	});

});
