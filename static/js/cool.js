var currentSection = 1;
var sections = document.getElementsByClassName("main-container");
var len = sections.length;
var c1 = document.getElementById("circle1");
var c2 = document.getElementById("circle2");
var c3 = document.getElementById("circle3");
var c4 = document.getElementById("circle4");
var p = document.getElementById("play");
var mousePos;
var lastMousePos;
var lastPos = 0;
var parallaxMargin = 2;
var form = document.getElementById("contact-form");
var narrators = document.getElementsByClassName("narrator");
var cNarrators = document.getElementsByClassName("cover-narrator");
var lNarrators = document.getElementsByClassName("narrator-list");
var leftScroll = document.getElementById("left-scroll");
var rightScroll = document.getElementById("right-scroll");
var narratorsDiv = document.getElementById("broadcaster-show");
var hideNarratorsDiv = document.getElementById("hide-casters");
var nLen = narrators.length;
var widthPercent = 0.15;
var heightPercent = 0.3;
var winInnerSize = [window.innerWidth, window.innerHeight];
var iW, iH;
var whichSide;
var isScrolling = false;

function iniciarHome() {
	c1.style.marginLeft = c2.style.marginLeft = c3.style.marginLeft = c4.style.marginLeft = p.style.marginLeft = "0px";
	var f = function () {
		sections[0].style.left = "0";
		for (var g = 0; g < len - 1; g++) {
			sections[1 + g].style.left = (g + 1) + "00%"
		}
	};
	f();
	if (screen.width <= 480) {
		hideNarratorsDiv.style.width = ((winInnerSize[0] / 1.6) * nLen) + "px";
		for (var c = 0; c < nLen; c++) {
			narrators[c].style.width = 45 + "vw";
			narrators[c].style.height = 45 + "vw";
			cNarrators[c].style.width = 46 + "vw";
			cNarrators[c].style.height = 46 + "vw";
			lNarrators[c].style.width = 60 + "vw"
		}
	} else {
		if (screen.width <= 1024) {
			hideNarratorsDiv.style.width = ((winInnerSize[0] / 2.95) * nLen) + "px";
			for (var c = 0; c < nLen; c++) {
				narrators[c].style.width = 25 + "vw";
				narrators[c].style.height = 25 + "vw";
				cNarrators[c].style.width = 26 + "vw";
				cNarrators[c].style.height = 26 + "vw";
				lNarrators[c].style.width = 33 + "vw"
			}
		} else {
			hideNarratorsDiv.style.width = ((winInnerSize[0] / 3.95) * nLen) + "px";
			for (var c = 0; c < nLen; c++) {
				narrators[c].style.width = 19 + "vw";
				narrators[c].style.height = 19 + "vw";
				cNarrators[c].style.width = 20 + "vw";
				cNarrators[c].style.height = 20 + "vw";
				lNarrators[c].style.width = 25 + "vw"
			}
		}
	}
	setInterval(keepScrolling, 45);
	setInterval(getMousePos, 1);
	leftScroll.addEventListener("mouseover", scrollToRight, false);
	rightScroll.addEventListener("mouseover", scrollToLeft, false);
	leftScroll.addEventListener("mouseleave", stopScrolling, false);
	rightScroll.addEventListener("mouseleave", stopScrolling, false);
	p.addEventListener("mousemove", setMousePos, false);
	p.addEventListener("mouseleave", returnToCenterPos, false);
	document.addEventListener("click", checkElement, false);
	window.addEventListener("mousedown", removeMouseEvent, false);
	form.addEventListener("submit", removeSubmitEvent, false);
	var d = document.getElementById("map");
	var a = [d.offsetWidth * 0.98, d.offsetHeight * 0.98];
	var b = document.getElementById("map-img")
}
function goToSection(c) {
	var b;
	switch (c) {
	case "a":
		setLeftTransition();
		for (var a = 0; a < len - 1; a++) {
			setStyle(sections[len - 1 - a], "left", (len - a) + "00%")
		}
		currentSection = 1;
		break;
	case "b":
		if (currentSection > 2) {
			setRightTransition();
			for (var a = currentSection; a > 2; a--) {
				setStyle(sections[a - 1], "left", (a - 2) + "00%")
			}
		} else {
			if (currentSection < 2) {
				setLeftTransition();
				for (var a = currentSection; a <= 2; a++) {
					setStyle(sections[a - 1], "left", "0")
				}
			}
		}
		currentSection = 2;
		break;
	case "c":
		if (currentSection > 3) {
			setRightTransition();
			for (var a = currentSection; a > 3; a--) {
				setStyle(sections[a - 1], "left", (a - 3) + "00%")
			}
		} else {
			if (currentSection < 3) {
				setLeftTransition();
				for (var a = currentSection; a <= 3; a++) {
					setStyle(sections[a - 1], "left", "0")
				}
			}
		}
		currentSection = 3;
		break;
	case "d":
		setRightTransition();
		for (var a = 0; a < len - 1; a++) {
			setStyle(sections[1 + a], "left", "0")
		}
		currentSection = 4;
		break
	}
}
function checkElement(b) {
	var a = b.target;
	if (a.className === "nav") {
		goToSection(a.dataset.page.toLowerCase())
	}
}
function setLeftTransition() {
	for (var a = 0; a < len; a++) {
		sections[a].style.transitionTimingFunction = "ease-in";
		sections[a].style.webkitTransitionTimingFunction = "ease-in";
		sections[a].style.mozTransitionTimingFunction = "ease-in";
		sections[a].style.oTransitionTimingFunction = "ease-in"
	}
}
function setRightTransition() {
	for (var a = 0; a < len; a++) {
		sections[a].style.transitionTimingFunction = "ease-out";
		sections[a].style.webkitTransitionTimingFunction = "ease-out";
		sections[a].style.mozTransitionTimingFunction = "ease-out";
		sections[a].style.oTransitionTimingFunction = "ease-out"
	}
}
function setStyle(a, b, c) {
	a.style[b] = c
}
function getMousePos() {
	if (typeof(lastMousePos) !== "undefined") {
		var a = parseInt(c2.style.marginLeft.substr(0, c1.style.marginLeft.indexOf("px")));
		if (lastMousePos.x > mousePos.x && a < 8) {
			c1.style.marginLeft = (parseInt(c1.style.marginLeft.substr(0, c1.style.marginLeft.indexOf("px"))) + (parallaxMargin * 4)) + "px";
			c2.style.marginLeft = (parseInt(c2.style.marginLeft.substr(0, c2.style.marginLeft.indexOf("px"))) + parallaxMargin) + "px";
			c3.style.marginLeft = (parseInt(c3.style.marginLeft.substr(0, c3.style.marginLeft.indexOf("px"))) + (parallaxMargin / 2)) + "px"
		} else {
			if (lastMousePos.x < mousePos.x && a > -8) {
				c1.style.marginLeft = (parseInt(c1.style.marginLeft.substr(0, c1.style.marginLeft.indexOf("px"))) - (parallaxMargin * 4)) + "px";
				c2.style.marginLeft = (parseInt(c2.style.marginLeft.substr(0, c2.style.marginLeft.indexOf("px"))) - parallaxMargin) + "px";
				c3.style.marginLeft = (parseInt(c3.style.marginLeft.substr(0, c3.style.marginLeft.indexOf("px"))) - (parallaxMargin / 2)) + "px"
			} else {}
		}
	}
	lastMousePos = mousePos
}
function returnToCenterPos() {
	c1.style.marginLeft = c2.style.marginLeft = c3.style.marginLeft = "0px"
}
function setMousePos(a) {
	e = a || window.event;
	mousePos = {
		x: e.clientX,
		y: e.clientY
	}
}
function removeMouseEvent(a) {
	if (a.button == 1) {
		a.stopPropagation();
		a.preventDefault()
	}
}
function removeSubmitEvent(a) {
	return false
}
function scrollToLeft() {
	narratorsDiv.scrollLeft += 5;
	whichSide = "l";
	isScrolling = true
}
function scrollToRight() {
	narratorsDiv.scrollLeft -= 5;
	whichSide = "r";
	isScrolling = true
}
function keepScrolling() {
	if (isScrolling) {
		if (whichSide === "r") {
			narratorsDiv.scrollLeft -= 5
		} else {
			if (whichSide === "l") {
				narratorsDiv.scrollLeft += 5
			}
		}
	}
}
function stopScrolling() {
	isScrolling = false;
	whichSide = ""
}
$(function () {
	$.get("/schedules", function (c) {
		console.log(c);
		var b = $("#current-schedule").children();
		var a = b.length;
		for (i = 0; i < a; i++) {
			b[i].children[1].innerHTML = c[i]["show_name"];
			b[i].children[0].innerHTML = c[i]["hour_range"]
		}
		$("#is-playing").html(c[2]["show_name"]);
		$("#is-playing-detail").html(c[2]["show-details"]);
		$("#is-playing-portrait").css({
			background: "url(/media/" + c[2]["show_pict"] + ")",
			backgroundSize: "100%"
		})
	});
	$(".hour").css("line-height", "" + $(".schedule").height() / 1 + "px");
	$(".program-name").css("line-height", "" + $(".schedule").height() / 1 + "px")
});
$(function () {
	$.get("/staff", function (u) {
		var k = $("#hide-casters ul");
		var d = 0.15;
		var c = 0.3;
		var l = [window.innerWidth, window.innerHeight];
		var h = document.getElementById("broadcaster-show");
		var n = document.getElementById("hide-casters");
		var g = (l[0] * d) + "px";
		var f = (l[1] * c) + "px";
		var t = (l[0] * (d + 0.02)) + "px";
		var a = (l[1] * (c + 0.02)) + "px";
		n.style.width = ((l[0] * (d + 0.045)) * j) + "px";
		var q = u.length;
		var m = function () {
			var w = $(this);
			$("#narrator-name").html(w.attr("title"));
			$("#narrator-info").html(w.children("span").html())
		};
		var r = function () {
			$("#narrator-name").html("");
			$("#narrator-info").html("")
		};
		for (o = 0; o < q; o++) {
			k.append('<li class="narrator-list inline-pos"><div class="cover-narrator"><div class="narrator" style="background-image:url(/media/' + u[o]["picture"] + ");background-size :" + g + " " + f + ';" title="' + u[o]["name"] + '"><span style="display:none">' + u[o]["bio"] + "<br/>" + u[o]["programs"] + "</span></div></div></li>")
		}
		var s = document.getElementsByClassName("narrator");
		var v = document.getElementsByClassName("cover-narrator");
		var b = document.getElementsByClassName("narrator-list");
		var j = s.length;
		if (screen.width <= 480) {
			n.style.width = ((l[0] / 1.6) * j) + "px";
			for (var o = 0; o < j; o++) {
				s[o].addEventListener("mouseenter", m, false);
				s[o].addEventListener("mouseleave", r, false);
				s[o].style.marginTop = "2%";
				s[o].style.backgroundSize = "100% 100%";
				s[o].style.backgroundRepeat = "no-repeat";
				s[o].style.width = 95 + "%";
				s[o].style.height = parseInt(s[o].style.width) + "%";
				v[o].style.width = 40 + "%";
				v[o].style.height = 60 + "%";
				b[o].style.width = 25 + "%"
			}
		} else {
			if (screen.width <= 1024) {
				n.style.width = ((l[0] / 2.95) * j) + "px";
				for (var o = 0; o < j; o++) {
					s[o].addEventListener("mouseenter", m, false);
					s[o].addEventListener("mouseleave", r, false);
					s[o].style.marginTop = "2%";
					s[o].style.backgroundSize = "100% 100%";
					s[o].style.backgroundRepeat = "no-repeat";
					s[o].style.width = 95 + "%";
					s[o].style.height = parseInt(s[o].style.width) + "%";
					v[o].style.width = 30 + "%";
					v[o].style.height = 70 + "%";
					b[o].style.width = 25 + "%"
				}
			} else {
				n.style.width = ((l[0] / 2.95) * j) + "px";
				for (var o = 0; o < j; o++) {
					s[o].addEventListener("mouseenter", m, false);
					s[o].addEventListener("mouseleave", r, false);
					s[o].style.marginTop = "2%";
					s[o].style.backgroundSize = "100% 100%";
					s[o].style.backgroundRepeat = "no-repeat";
					s[o].style.width = 95 + "%";
					s[o].style.height = parseInt(s[o].style.width) + "%";
					v[o].style.width = 20 + "%";
					v[o].style.height = 80 + "%";
					b[o].style.width = (window.innerWidth * 0.3) + "px"
				}
			}
		}
	})
});
(function () {
	var h = document.getElementById("novelles");
	var j = document.getElementById("top-news");
	var g = document.getElementById("other-news");
	var o = document.getElementById("newsfeed");
	var n = document.getElementById("load-more-newsfeeds");
	var b = document.getElementById("newsfeed");
	var H = j.getElementsByClassName("content");
	var G = h.getElementsByClassName("news-pic");
	var F = g.getElementsByClassName("news-other");
	var D = H.length;
	var l = G.length;
	var k = F.length;
	var a = window.innerHeight;
	var y = a * 0.05;
	var r = h.children[0];
	var A = false;
	var s = 1;
	var u = false;
	var E = function () {
		var c = this.children[0].offsetHeight;
		var d = this.offsetHeight;
		this.children[0].style.top = (d - c) + "px"
	};
	var f = function () {
		var c = this.children[0].children[0].children[0].children[0].offsetHeight;
		var d = this.offsetHeight;
		this.children[0].style.top = (d - c) + "px"
	};
	var w = function () {
		this.parentNode.style.top = A ? (a - y) + "px" : "0px";
		A = !A
	};
	var C = function (d) {
		var c = d.which;
		if (c == 2) {
			return false
		}
		return true
	};
	var q = function (c) {};
	var x = function (c) {};
	for (var B = 0; B < D; B++) {
		var t = H[B].children[0].offsetHeight;
		var z = H[B].children[0].children[0].children[0].children[0].offsetHeight;
		var m = H[B].offsetHeight;
		H[B].children[0].style.top = (m - z) + "px";
		H[B].addEventListener("mouseover", E, false);
		H[B].addEventListener("mouseleave", f, false)
	}
	for (var B = 0; B < l; B++) {
		var t = G[B].parentNode.parentNode.parentNode.offsetHeight;
		var v = G[B].parentNode.parentNode.parentNode.offsetWidth;
		G[B].style.height = (t * 0.3) + "px";
		G[B].style.width = (v * 0.3) + "px"
	}
	o.style.height = (F[0].offsetHeight * k) + "px";
	g.style.height = (F[0].offsetHeight * (k + 0.5)) + "px";
	h.style.top = (a - y) + "px";
	document.addEventListener("click", C, false);
	r.addEventListener("click", w, false);
	b.addEventListener("scroll", x, false);
	q(s++)
})();