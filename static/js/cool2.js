var x = $(document);
x.ready(inicio);

function inicio() {
	iniciarHome();
	maquetacion();
	$(window).resize(maquetacion);
	var a = $("#news");
	a.click(mostrarPagina);
	a = $("#botonHdr");
	a.click(mostrarMenuMovil);
	a = $("#play1");
	a.click(function () {
		window.open("/play/", "COOL", "Width=400, height=300, resizable=no, toolbar=no, menubar=no, status=yes,scrollbars=no")
	});
	a.hover(function (b) {
		$("#listen").css("visibility", "visible")
	}, function (b) {
		$("#listen").css("visibility", "hidden")
	});
	a = $("#facebook-share");
	a.click(function () {
		window.open("https://www.facebook.com/sharer/sharer.php?app_id=113869198637480&sdk=joey&u=https%3A%2F%2Fwww.cool.conuco.do%2F&display=popup", "", "top=300,left=300,width=800,height=400")
	});
	a = $("#twitter-share");
	a.click(function () {
		window.open("https://twitter.com/intent/tweet?button_hashtag=RadioCoolHaiti&text=Je%20suis%20%C3%A0%20l'%C3%A9coute%20de%20ma%20musique%20dans%20le%20programme%20" + $("#is-playing").html() + "", "", "top=300,left=300,width=800,height=400")
	});
	a = $("#logo");
	a.click(function () {
		goToSection(document.getElementById("hogar").dataset.page.toLowerCase())
	});
	$(window).resize(function () {
		$(".hour").css("line-height", "" + $(".schedule").height() / 1 + "px");
		$(".program-name").css("line-height", "" + $(".schedule").height() / 1 + "px")
	})
}
function mostrarMenuMovil() {
	var a = $(this);
	var b = $("body nav ul");
	var c = b.children("li").length;
	if (b.height() == 0) {
		a.css("background-color", "orange");
		b.height(170)
	} else {
		a.css("background-color", "white");
		b.height(0)
	}
	$("body nav ul li").click(function (d) {
		b.height(0);
		a.css("background-color", "white")
	});
	$("section").click(function (d) {
		b.height(0);
		a.css("background-color", "white")
	});
	return
}
function mostrarPagina() {
	var a = $("#noticias");
	if (a.height() <= 0) {
		a.height("100%");
		$("#news").height("100%")
	} else {
		a.height("0%");
		$("#news").height("30px")
	}
}
function maquetacion() {
	var a = $("#play1");
	a.height(a.width());
	a.css("bottom", $("#play-img").width() * 0.12)
};