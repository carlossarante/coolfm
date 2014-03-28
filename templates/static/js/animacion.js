var x = $(document);
var cont1=0;
var cont2=1;
var sentido=true;
x.ready(preinicio);

function preinicio(){
	$.get('http://localhost/COOL/cinco.json',function(data){cargarApartado(data)});
	comunicacion($("header a"));
	botonmenu();
	redimencionar();
	inicio();	
}
function inicio(){
	$(window).resize(redimencionar);
	var x;
	var y;
	x=$("head");
	/*if(screen.width>920){*/
	if(window.innerWidth>=1024){
		x=$(".recientes1, .recientes2");	
		x.hover(showUp,showDown);
		x=$(".boton,.recientes1,.recientes2,#portada1");
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
	x=$("#buscar");
	x.click(buscar);
	
	
	/*REALIZAR BUSQUEDA*/
	x=$("#buscarInfo");
	x.keyup(busqueda);
	
	/*NAVEGACION ENTRE SECCIONES*/
	x=$("#menu nav ul li a");
	x.click(restaurarPagina);
	x=$("#noticias article a");
	x.click(restaurarPagina);
	x=$("header a");
	x.click(restaurarPagina);
	x=$("#siguiente");
	x.click(aumentarPagina);
	x=$("#anterior");
	x.click(disminuirPagina);
	
	
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
	
	var cuerpo= $("body");
	cuerpo.css("overflow","hidden");	
	
	
	setTimeout(function(e){
	cuerpo.scrollTop(0);
	
	if(window.innerWidth<=480){
		n.css("top","100px");
		$("#portada").css("top","100px");
		$("#noticias").css("top","100px");	
		k.css("top","50px");	
	}else{
		n.css("top","140px");
		$("#portada").css("top","140px");
		$("#noticias").css("top","140px");
		k.css("top","70px");
	}
	
	k.css("position","fixed");	
	n.css("position","fixed");
	$("#menuCool").css("position","fixed");
	},1000);
	
	
		
	
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

	z.height(window.innerHeight - k.height()-$("#menuCool").height());/*OJOJOJO*/
	y.height(window.innerHeight - k.height()-$("#menuCool").height());	
	y.append("<div id='botonr'>Ocultar</div>");
	
	x=$("#botonr");
	x.click(function(e) {	
		cuerpo.css("overflow","auto");		
		z.height("0vh");
		y.height("0vh");
		
		
		k.css("position","relative");
		k.css("top","0px");
		n.css("position","static");
		
		$("#menuCool").css("position","relative");
		
		$("#portada").css("top","0px");
		$("#noticias").css("top","0px");
				
		setTimeout(function(e){y.html("");	
		n.css("top","0px");
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
		
		if(window.innerWidth<=480){
			y.css("top",altura+100+"px");			
		}else{
			y.css("top",altura+140+"px");
		}
		
	}else{	
		x.css("background-color","white");	
		z.height(0+"px");
		
		if(window.innerWidth<=480){
			y.css("top",100+"px");			
		}else{
			y.css("top",140+"px");
		}
		/*
		z.animate({height:"0vw"},"slow");
		y.animate({top:8+"vw"},"slow");*/
	} 
	
	$("section").click(function(e){
		z.height(0);x.css("background-color","white");
		
		if(window.innerWidth<=480){
			y.css("top",100+"px");			
		}else{
			y.css("top",140+"px");
		}
	})
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
		y.children("p").height("75px");		
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
	elemento.css("left","100%");
	izquierdo.css("left","0px");	
	return;
}
function moverIzquierda(elemento,derecho){
	elemento.css("left","-100%");
	derecho.css("left","0px");
	return;
}

/*  MOSTRAR\OCULTAR NOTICIAS  DESKTOP */

function mostrarNoticiaDesktop(){
	var x = $(this);
	var y = $("#shown2");
	var z = $("#shown1");
	var k;
	var m;	
	
	ocultarBusqueda();
	
	$("body").css("overflow","hidden");
	
	if(x.is(".boton")){
		var noticia= x.parent();
	}
	else{
		var noticia= x;	
	}
	k = $("#shown3");
	k.prepend(noticia.html());
	/*y.prepend('<div id="shown3">'+noticia.html()+'</div>');*/		
		
	if(x.is(".boton")){
		m=k.children(".boton");
		m.remove();
		m=k.children("a");
		m.remove();
	}
	else if(x.is("#portada1")){
		m=k.children("h1");
		m.remove();
	}
	else{
		y.removeClass(this);
	}
	
	
	z.show(1000);	
	/*k.append('<div class="fb-comments" data-href="http://example.com/comments" data-numposts="5" data-colorscheme="light"></div>');*/
	
	x=$("#botonr");
	x.click(ocultar);
	
	return;
}

function ocultar(){
	var k= $("#shown3");
	var x= $("#shown2");
	var y = $("#shown1");
	var z = $("#principal");

	$("body").css("overflow","visible");
	
	y.hide(1000);	
	x.html('<div id="botonr"></div><ul><li><img src="../static/img/fb.png" /></li><li><img src="../static/img/tw.png" /></li><li><img src="../static/img/mail.png" /></li><li><img src="../static/img/print.png" /></li></ul><div id="shown3"><div class="fb-comments" data-href="http://example.com/comments" data-numposts="5" data-colorscheme="light"></div></div>');
		
	return;
} 

/*TEXTO DESPLEGABLE DE LAS NOTICIAS PRINCIPALES DESKTOP*/
function showUp() {
			if($(this).is(".recientes1")){
				$(this).children("p").height("87%");
				$(this).children("h2").css("bottom","87%");	
			}
			else if($(this).is(".recientes2")){
				$(this).children("p").height("84%");
				$(this).children("h2").css("bottom","84%");	
			}		
			return;
    }
	
function showDown() {
			$(this).children("p").height(0);
			$(this).children("h2").css("bottom","0px");	
			return;
}

function buscar(){
	var boton=$(this);
	var lupa1=$("#lupa1");
	var lupa2=$("#lupa2");
	var texto=$("#buscarInfo");
	var portada=$("#portada");
	
	
	if(window.innerWidth<=480){}
	else if(window.innerWidth<=1024){
		
	}else{
		if(texto.height()==0){
				lupa1.css("display","none");
				lupa2.css("display","block");
				boton.css("background-color","#EDEBE4");
				
				texto.height(100);
				texto.css("border","2px solid rgba(0,0,0,0.3)");
				portada.css("top",146);
				
			}
			else
			{
				ocultarBusqueda();
			}	
	}
}
function ocultarBusqueda(){
	var boton=$("#buscar");
	var lupa1=$("#lupa1");
	var lupa2=$("#lupa2");
	var texto=$("#buscarInfo");
	var portada=$("#portada");
	
	
	if(window.innerWidth<=480){}
	else if(window.innerWidth<=1024){
		
	}else{
		
				lupa1.css("display","block");
				lupa2.css("display","none");
				boton.css("background-color","black");
				
				texto.height(0);
				texto.css("border","0px solid rgba(0,0,0,0.3)");
				portada.css("top",42);	
	}
}

function botonmenu(){
	var menu=$("#menuCool");
	
	menu.animate({heigth:"400px"});
	/*-webkit-transform:scale(0.5,0.5);
	-moz-transform:scale(0.5,0.5);
	-o-transform:scale(0.5,0.5);
	-ms-transform:scale(0.5,0.5);});*/
	
	/*border-radius: 0vw 0vw 75px 75px;
	-webkit-border-radius:0vw 0vw 75px 75px;
	-moz-border-radius:0vw 0vw 75px 75px;
	-o-border-radius:0vw 0vw 75px 75px;
	-ms-border-radius:0vw 0vw 75px 75px;	*/
	
/*	transform:scale(0.5,0.5);
	-webkit-transform:scale(0.5,0.5);
	-moz-transform:scale(0.5,0.5);
	-o-transform:scale(0.5,0.5);
	-ms-transform:scale(0.5,0.5);
	
	
	
	/*animation: menuanimate 3s;	
	-webkit-animation: menuanimate 3s;
	
	animation-delay: 4s;
	-webkit-animation-delay:4s;*/
}

function redimencionar(){
		var relleno;
	if(window.innerWidth>1024){
		relleno=(window.innerWidth-1024)/2;
		$("header").css("padding-left",relleno);
		$("header").css("padding-right",relleno);
		$("header").css("left",-(relleno+9));
		$("header").css("background-position",(relleno+85) + "px," + (relleno+77.5) + "px");
		
		$("footer").css("padding-left",relleno);
		$("footer").css("padding-right",relleno);
		$("footer").css("left",-(relleno+9));
		
		
		$("#buscarInfo").css("left",-(relleno-7));	
		$("#buscarInfo").css("width",(window.innerWidth-18));		
	}	
}

function mostrarSecciones(){
	var recientes= $("#recientes");
	var portada=$("#portada1");	
	
	
	recientes.width(0);
	recientes.css("overflow","hidden");
	portada.css("overflow","hidden");
	portada.width("100%");
	setTimeout(function(e){portada.width("100%");portada.css("overflow","visible");},1000);
}
function mostrarPrincipales(){
	var recientes= $("#recientes");
	var portada=$("#portada1");	
	
	
	recientes.width("100%");
	recientes.css("overflow","hidden");
	portada.css("overflow","hidden");
	portada.width("0%");
}