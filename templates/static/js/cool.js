
    (function() {
        var currentSection = 1;
        var sections = document.getElementsByClassName('main-container');
        var len = sections.length;
		
        var c1 = document.getElementById('circle1');
        var c2 = document.getElementById('circle2');
        var c3 = document.getElementById('circle3');
        var c4 = document.getElementById('circle4');
        var p = document.getElementById('play');
        var mousePos;
        var lastMousePos;
        var lastPos = 0;
        var parallaxMargin = 2;
        var form = document.getElementById('contact-form');

        var narrators = document.getElementsByClassName('narrator');
        var cNarrators = document.getElementsByClassName('cover-narrator');
        var lNarrators = document.getElementsByClassName('narrator-list');
        var leftScroll = document.getElementById('left-scroll');
        var rightScroll = document.getElementById('right-scroll');
        var narratorsDiv = document.getElementById('broadcaster-show');
        var hideNarratorsDiv = document.getElementById('hide-casters');
        var nLen = narrators.length;
        var widthPercent = 0.15;
        var heightPercent = 0.3;
        var winInnerSize = [window.innerWidth, window.innerHeight];
        var iW, iH;
        var whichSide;
        var isScrolling = false;

        c1.style.marginLeft = c2.style.marginLeft = c3.style.marginLeft = c4.style.marginLeft = p.style.marginLeft = '0px';
        var putSectionsToPosition = function() {
            sections[0].style['left'] = '0';
            for (var i = 0; i < len - 1; i++) {
                sections[1 + i].style['left'] = (i + 1) + /*1*/ '00%';
            }
        };

        putSectionsToPosition();

        var checkElement = function(event) {
            var element = event.target;

            if (element.className === 'nav') {
                goToSection(element.dataset.page.toLowerCase());
            }
        };

 var goToSection = function(to) {
            var xTime;
            // console.log(to);
            switch (to) {
                case 'a':
                    setLeftTransition();
                    // setTransitionDuration('1s');
                    for (var i = 0; i < len - 1; i++) {
						
                        setStyle(sections[len-1 - i], 'left', (len - i) + '00%');
                    }
                    currentSection = 1;
                    break;
                case 'b':
                    if (currentSection > 2) {
                        // setTransitionDuration('0.6s');
                        setRightTransition();
                        for (var i = currentSection; i > 2; i--) {
                            setStyle(sections[i - 1], 'left', (i - 2) + '00%');
                        }
                    } else if (currentSection < 2) {
                        // setTransitionDuration('0.4s');
                        setLeftTransition();
                        for (var i = currentSection; i <= 2; i++) {
                            setStyle(sections[i - 1], 'left', '0');
                        }
                    }
                    currentSection = 2;
                    break;
                case 'c':
                    if (currentSection > 3) {
                        // setTransitionDuration('0.4s');
                        setRightTransition();
                        for (var i = currentSection; i > 3; i--) {
                            setStyle(sections[i - 1], 'left', (i - 3) + '00%');
                        }

                    } else if (currentSection < 3) {
                        // setTransitionDuration('0.6s');
                        setLeftTransition();
                        for (var i = currentSection; i <= 3; i++) {
                            setStyle(sections[i - 1], 'left', '0');
                        }
                    }
                    currentSection = 3;
                    break;
                case 'd':
                    // setTransitionDuration('1s');
                    setRightTransition();
                    for (var i = 0; i < len - 1; i++) {
                        setStyle(sections[1 + i], 'left', '0');
                    }
                    currentSection = 4;
                    break;
            }
        };
		
        var setLeftTransition = function() {
            for (var i = 0; i < len; i++) {
                sections[i].style.transitionTimingFunction = 'ease-in';
                sections[i].style.webkitTransitionTimingFunction = 'ease-in';
                sections[i].style.mozTransitionTimingFunction = 'ease-in';
                sections[i].style.oTransitionTimingFunction = 'ease-in';
            }
        };

        var setRightTransition = function() {
            for (var i = 0; i < len; i++) {
                sections[i].style.transitionTimingFunction = 'ease-out';
                sections[i].style.webkitTransitionTimingFunction = 'ease-out';
                sections[i].style.mozTransitionTimingFunction = 'ease-out';
                sections[i].style.oTransitionTimingFunction = 'ease-out';
            }
        };

        // var setTransitionDuration = function(value) {
        //     for (var i = 0; i < len; i++) {
        //         sections[i].style.transitionDuration= value;
        //         sections[i].style.webkitTransitionDuration= value;
        //         sections[i].style.mozTransitionDuration= value;
        //         sections[i].style.oTransitionDuration= value;
        //     }
        // };

        var setStyle = function(element, style, value) {
            element.style[style] = value;
        };

        var getMousePos = function() {
            if (typeof(lastMousePos) !== 'undefined') {
                var pad = parseInt(c2.style.marginLeft.substr(0, c1.style.marginLeft.indexOf('px')));
                if (lastMousePos.x > mousePos.x && pad < 8) {
                    c1.style.marginLeft = (parseInt(c1.style.marginLeft.substr(0, c1.style.marginLeft.indexOf('px'))) + (parallaxMargin * 4)) + 'px';
                    c2.style.marginLeft = (parseInt(c2.style.marginLeft.substr(0, c2.style.marginLeft.indexOf('px'))) + parallaxMargin) + 'px';
                    c3.style.marginLeft = (parseInt(c3.style.marginLeft.substr(0, c3.style.marginLeft.indexOf('px'))) + (parallaxMargin / 2)) + 'px';
                } else if (lastMousePos.x < mousePos.x && pad > -8) {
                    c1.style.marginLeft = (parseInt(c1.style.marginLeft.substr(0, c1.style.marginLeft.indexOf('px'))) - (parallaxMargin * 4)) + 'px';
                    c2.style.marginLeft = (parseInt(c2.style.marginLeft.substr(0, c2.style.marginLeft.indexOf('px'))) - parallaxMargin) + 'px';
                    c3.style.marginLeft = (parseInt(c3.style.marginLeft.substr(0, c3.style.marginLeft.indexOf('px'))) - (parallaxMargin / 2)) + 'px';
                } else {
                    //console.log(c3.style.marginLeft);
                }
            }
            lastMousePos = mousePos;
        };

        var returnToCenterPos = function() {
            c1.style.marginLeft = c2.style.marginLeft = c3.style.marginLeft = '0px';
        };

        var setMousePos = function(event) {
            e = event || window.event;
            mousePos = {
                x: e.clientX,
                y: e.clientY
            };
        };

        var removeMouseEvent = function(e) {
            if (e.button == 1) {
                e.stopPropagation();
                e.preventDefault();
            }
        };

        var removeSubmitEvent = function(e) {

            return false;
        };
        //arreglar esto
        /*        var getImageSize = function(element) {
            var elementURL = window.getComputedStyle(element);
            var image = new Image();
            var imageSrc = elementURL.backgroundImage.replace(/url\((file:\/\/\/)?/, '').replace(/\)$/,'');

            image.src = imageSrc;
            var imgSize = [image.width, image.height];
            console.log(image.width);
            return imgSize;
        };
        */
        var scrollToLeft = function() {
            narratorsDiv.scrollLeft += 20;
            whichSide = 'l';
            isScrolling = true;
        };
        var scrollToRight = function() {
            narratorsDiv.scrollLeft -= 20;
            whichSide = 'r';
            isScrolling = true;
        };
        var keepScrolling = function() {
            if (isScrolling) {
                if (whichSide === 'r') {
                    narratorsDiv.scrollLeft -= 20;
                } else if (whichSide === 'l') {
                    narratorsDiv.scrollLeft += 20;
                }
            }
        };
        var stopScrolling = function() {
            isScrolling = false;
            whichSide = '';
        };

        

        
			
			if(window.innerWidth<=480){
				for (var i = 0; i < nLen; i++) {
				
				}
			}else if(window.innerWidth<=1023){
				hideNarratorsDiv.style['width'] = ((winInnerSize[0]/2.95) * nLen) + 'px';
				for (var i = 0; i < nLen; i++) {
					// console.log(i);
					narrators[i].style['width'] = 25 + 'vw';
					narrators[i].style['height'] =  25 + 'vw';
					cNarrators[i].style['width'] = 26 + 'vw';
					cNarrators[i].style['height'] = 26 + 'vw';
					lNarrators[i].style['width'] = 33 + 'vw';
					//insertar fotos en el centro aqui
				}
			}else{
				hideNarratorsDiv.style['width'] = ((winInnerSize[0]/3.95) * nLen) + 'px';
				for (var i = 0; i < nLen; i++) {
					// console.log(i);
					narrators[i].style['width'] = 19 + 'vw';
					narrators[i].style['height'] =  19+ 'vw';
					cNarrators[i].style['width'] = 20+ 'vw';
					cNarrators[i].style['height'] = 20 + 'vw';
					lNarrators[i].style['width'] = 25 + 'vw';
					//insertar fotos en el centro aqui
				}
			}

        setInterval(keepScrolling, 45);
        setInterval(getMousePos, 1);

        leftScroll.addEventListener('mouseover', scrollToRight, false);
        rightScroll.addEventListener('mouseover', scrollToLeft, false);
        leftScroll.addEventListener('mouseleave', stopScrolling, false);
        rightScroll.addEventListener('mouseleave', stopScrolling, false);

        p.addEventListener('mousemove', setMousePos, false);
        p.addEventListener('mouseleave', returnToCenterPos, false);
        document.addEventListener('click', checkElement, false);
        window.addEventListener('mousedown', removeMouseEvent, false);
        form.addEventListener('submit', removeSubmitEvent, false);

        var figMap = document.getElementById('map');
        var innerSize = [figMap.offsetWidth * 0.98, figMap.offsetHeight * 0.98];
        var imgMap = document.getElementById('map-img');
        imgMap.src = 'http://maps.googleapis.com/maps/api/staticmap?center=Rue+des+Ramparts,Haiti&zoom=15&size=' + Math.floor(innerSize[0]) + 'x' + Math.floor(innerSize[1]) + '&maptype=roadmap&sensor=true'

        // document.addEventListener('load',alert('hoola'));
    })();

    // (function() {

    // })();