var x= $(document);
x.ready(inicio);

function inicio(){
	var x= $("#news");
	x.hover(function(e) {
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
    });
	x.click(mostrarPagina);
	
	x=$("#botonHdr");
	x.click(mostrarMenuMovil);	
	
}

function mostrarMenuMovil(){
	var x= $(this);
	var k= $("body nav ul");
	
	/*var altura = (100*k.height())/window.innerWidth;*/
	var altura = k.children("li").length;
	
	if(k.height()==0){
		x.css("background-color","orange");	
		k.height(160);
	}else{	
		x.css("background-color","white");
		k.height(0);
	}
	
	$("body nav ul li").click(function(e){k.height(0);x.css("background-color","white");})
	$("section").click(function(e){k.height(0);x.css("background-color","white");})
	
	return;
}

function mostrarPagina(){
	var x = $(this);
	
	if(x.height()<=1000){
		$("#noticias").height("100vh");
	}
	else{
		$("#noticias").height("0vh");
	}
	
}