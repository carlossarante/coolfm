var pag=1;
var enlace=$("header a");
var longitud;
function aumentarPagina(){
	if(pag<longitud){/*OJOJOJOJO*/
		pag++;	
	}	
	comunicacion(enlace);
}
function disminuirPagina(){
	if(pag>1){
		pag--;	
	}
	comunicacion(enlace);
}
function restaurarPagina(){
	enlace=$(this);
	pag=1;
	comunicacion(enlace);
}
function showSigAnt(){
	
		if(pag==1){
			$("#anterior").css("display","none");
		}else{
			$("#anterior").css("display","inline-block");
			$("#siguiente").css("display","inline-block");
		}
}

function comunicacion(enlace){
	/*var enlace=$(this);*/
	var query="";
	ocultarBusqueda();

	if(enlace.is("header a")){
		query='http://localhost/COOL/principales.json';
		$.get(query, function(data){cargarPrincipales(data)});
		mostrarPrincipales();
	}else{
		switch(enlace.html())
		{
			case "Deportes":
				mostrarSecciones();
				query='http://localhost/COOL/cinco.json';
			break;
			case "Tecnologia":
				mostrarSecciones();
				query='http://localhost/COOL/politica.json';
			break;
			case "Economia":
				mostrarSecciones();
				query='http://localhost/COOL/principales.json';
			break;
			case "Internacionales":
				mostrarSecciones();
				query='http://localhost/COOL/cinco.json';
			break;
			case "Sociales":
				mostrarSecciones();
				query='http://localhost/COOL/politica.json';
			break; 
			default:			  
		}		
		
		$.get(query, function(data){cargarSecciones(data)});	
	}
	
	
	
}

function cargarSecciones(data) {
				var noticias = $("#noticias");
				var portada = $("#portada1");
				var len = noticias.children("article").length;	
				
				noticias.children("article").css("display","none");
						
				for (i = 0; i < len+1; i++) {
					
					if(i==0){
						portada.children("h1").html(data[i]["categories"]);
						portada.children("h2").html(data[i]["title"]);
						portada.children("img").attr("src",data[0]["picture"][i]);
						portada.children("p").html(data[i]["content"]);	
					}else{
						if(i < data.length){
							noticias.children("article:nth-child("+ i +")").css("display","block");
						   
							noticias.children("article:nth-child("+ i +")").children("h3").html(data[i]["title"]);
							noticias.children("article:nth-child("+ i +")").children("img").attr("src",data[0]["picture"][i]);
							noticias.children("article:nth-child("+ i +")").children("p").html(data[i]["content"]);
							noticias.children("article:nth-child("+ i +")").children("a").html(data[i]["categories"]);
						}
					}
				}
	showSigAnt(data.length);
}
	
function cargarPrincipales(data){
	var noticias = $("#noticias");
	var len = noticias.children("article").length;	
	
	noticias.children("article").css("display","none");
		 
  	for (i = 0; i <=len+5; i++) {		
		if(i<=4){
			/*portada.children("h1").html(data[i]["categories"]);*/
			$("#portada article:nth-child("+ (i+1) +")").children("h2").html(data[i]["title"]);
			$("#portada article:nth-child("+ (i+1) +")").children("img").attr("src",data[0]["picture"][i]);
			$("#portada article:nth-child("+ (i+1) +")").children("p").html(data[i]["content"]);	
		}else{
			if(i < data.length){
				noticias.children("article:nth-child("+ (i-4) +")").css("display","block");
			 
			noticias.children("article:nth-child("+ (i-4) +")").children("h3").html(data[i]["title"]);
			noticias.children("article:nth-child("+ (i-4) +")").children("img").attr("src",data[0]["picture"][i]);
			noticias.children("article:nth-child("+ (i-4) +")").children("p").html(data[i]["content"]);
			noticias.children("article:nth-child("+ (i-4) +")").children("a").html(data[i]["categories"]);
			}
		}
	}	
	showSigAnt();
	longitud=data.length;
}

function cargarApartado(data) {
				var apartado = $("#apartado");
				var len = apartado.children("article").length;	
						
				for (i = 0; i < len; i++) {
													 
							apartado.children("article:nth-child("+ (i+1) +")").children("h4").html(data[i]["title"]);
							apartado.children("article:nth-child("+ (i+1) +")").children("p").html(data[i]["content"]);
								
				}
				showSigAnt(data.length);
}
function busqueda(e){
	var x=$(this); 
	var tecla = (document.all) ? e.keyCode : e.which;
  	if (tecla==13){
		x.val("");
		$.post("http://localhost/COOL/busqueda.json","lajksdf",function(datos){resultados(datos)});
	}	
}
function resultados(data){
	/*comunicacion($("header a"));*//*MUCHO OJO*/
	
	var noticias = $("#noticias");
	var portada = $("#portada1");
	var len = noticias.children("article").length;	
				
	noticias.children("article").css("display","none");
						
	for (i = 0; i < len+1; i++) {
					
		if(i==0){
			portada.children("h1").html(data[i]["categories"]);
			portada.children("h2").html(data[i]["title"]);
			portada.children("img").attr("src",data[0]["picture"][i]);
			portada.children("p").html(data[i]["content"]);	
		}else{
			if(i < data.length){
				noticias.children("article:nth-child("+ i +")").css("display","block");
			   
				noticias.children("article:nth-child("+ i +")").children("h3").html(data[i]["title"]);
				noticias.children("article:nth-child("+ i +")").children("img").attr("src",data[0]["picture"][i]);
				noticias.children("article:nth-child("+ i +")").children("p").html(data[i]["content"]);
				noticias.children("article:nth-child("+ i +")").children("a").html(data[i]["categories"]);
			}
		}
	}
	showSigAnt(data.length);
	ocultarBusqueda();
}