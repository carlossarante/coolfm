$(function() {

        $.get('/schedules', function(data) {
            var scheduleTabs = $("#current-schedule").children();
            var len = scheduleTabs.length;
            //data = JSON.parse(data);
            for (i = 0; i < len; i++) {
                // scheduleTabs[i].children(".hour").html(data[i].showName);
                // scheduleTabs[i].children(".program-name").html(data[i].hourRange);

                // console.log(data[i]["show_name"]);
                // console.log(data[i]["hour_range"]);
                // console.log(scheduleTabs[i].children[0]);
                // console.log(scheduleTabs[i].children[1]);

                scheduleTabs[i].children[1].innerHTML = data[i]["show_name"];
                scheduleTabs[i].children[0].innerHTML = data[i]["hour_range"];
            }
            $('#is-playing').html(data[2]["show_name"]);
            $('#is-playing-portrait').css({
                background: "url(/media/" + data[2]["show_pict"] + ")",
                backgroundSize: '100%'
            });
        });
    });

    $(function() {
        $.get('/staff', function(data) {
            var narratorContainer = $('#hide-casters ul');

            var widthPercent = 0.15;
            var heightPercent = 0.3;
            var winInnerSize = [window.innerWidth, window.innerHeight];
            var narratorsDiv = document.getElementById('broadcaster-show');
            var hideNarratorsDiv = document.getElementById('hide-casters');
            var widthNarrator = (winInnerSize[0] * widthPercent) + 'px';
            var heightNarrator = (winInnerSize[1] * heightPercent) + 'px';
            var cWidthNarrator = (winInnerSize[0] * (widthPercent + 0.02)) + 'px';
            var cHeightNarrator = (winInnerSize[1] * (heightPercent + 0.02)) + 'px';
            hideNarratorsDiv.style['width'] = ((winInnerSize[0] * (widthPercent + 0.045)) * nLen) + 'px';

            //var dat = JSON.parse(data);
            var len = data.length;

            var changeNameOnHover = function() {
                $('#narrator-name').html(this.title);
                // console.log(this);
            };
            var clearNameOnHover = function() {
                $('#narrator-name').html('');
                // console.log(this);
            };
            //se pegan las fotos
            for (i = 0; i < len; i++) {
                narratorContainer.append('<li class="narrator-list inline-pos"><div class="cover-narrator"><div class="narrator" style="background-image:url(/media/' + data[i]["picture"] + ');background-size :' + widthNarrator + ' ' + heightNarrator + ';" title="' + data[i]["name"] + '"></div></div></li>');
            }

            var narrators = document.getElementsByClassName('narrator');
            var cNarrators = document.getElementsByClassName('cover-narrator');
            var lNarrators = document.getElementsByClassName('narrator-list');
            var nLen = narrators.length;

            for (var i = 0; i < nLen; i++) {
                narrators[i].addEventListener('mouseenter', changeNameOnHover, false);
                narrators[i].addEventListener('mouseleave', clearNameOnHover, false);
                // console.log(i);
                narrators[i].style['width'] = widthNarrator;
                narrators[i].style['height'] = heightNarrator;
                cNarrators[i].style['width'] = cWidthNarrator;
                cNarrators[i].style['height'] = cHeightNarrator;
                lNarrators[i].style['width'] = (winInnerSize[0] * (widthPercent + 0.025)) + 'px';
                //insertar fotos en el centro aqui
            }
        });
    });


    (function() {
        var novelle = document.getElementById('novelles');
        var main = document.getElementById('top-news');
        var other = document.getElementById('other-news');
        var feeds = document.getElementById('newsfeed');
        var loadMore = document.getElementById('load-more-newsfeeds');
        var newsfeeds = document.getElementById('newsfeed');
        var c = main.getElementsByClassName('content');
        var d = novelle.getElementsByClassName('news-pic');
        var e = other.getElementsByClassName('news-other');
        var len = c.length;
        var len2 = d.length;
        var len3 = e.length;
        var winHeight = window.innerHeight;
        var sectionHeight = winHeight * 0.05;
        var headNovelles = novelle.children[0];
        var toggleNews = false;
        var newsfeedsCount = 1;
        var bottomNewsfeed = false;

        var showNews = function() {
            var height = this.children[0].offsetHeight;
            var outHeight = this.offsetHeight;
            this.children[0].style['top'] = (outHeight - height) + "px";
            // console.log(outHeight - headerHeight);
        };

        var hideNews = function() {
            var headerHeight = this.children[0].children[0].children[0].children[0].offsetHeight;
            var outHeight = this.offsetHeight;
            this.children[0].style['top'] = (outHeight - headerHeight) + "px";
            // console.log(outHeight - headerHeight);
        };

        var toggleNewsToMain = function() {
            this.parentNode.style['top'] = toggleNews ? (winHeight - sectionHeight) + 'px' : '0px';
            toggleNews = !toggleNews;
        };

        var negateMiddleClick = function(e) {
            var a = e.which;
            if (a == 2) {
                return false;
            }
            return true;
        };

        var requestForNews = function(count){
//            $.get('/morenews', {data:count},function(data) {
//                $()
//             }).error(function() {
//                loadMore.innerHTML = 'hola!';
//             });
        };

        var loadMoreNewsIfScroll = function(e) {
            // if(this.scrollTop )
            // if (this.scrollTop > (this.scrollHeight / 2)){
            //     requestForNews(newsfeedsCount++);
            // }
        };

        for (var i = 0; i < len; i++) {
            var height = c[i].children[0].offsetHeight;
            var headerHeight = c[i].children[0].children[0].children[0].children[0].offsetHeight;
            var outHeight = c[i].offsetHeight;

            c[i].children[0].style['top'] = (outHeight - headerHeight) + "px";

            c[i].addEventListener('mouseover', showNews, false);
            c[i].addEventListener('mouseleave', hideNews, false);
        }

        for (var i = 0; i < len2; i++) {
            var height = d[i].parentNode.parentNode.parentNode.offsetHeight;
            var width = d[i].parentNode.parentNode.parentNode.offsetWidth;

            d[i].style['height'] = (height * 0.3) + 'px';
            d[i].style['width'] = (width * 0.3) + 'px';
        }
        // console.log(e[0].offsetHeight);
        feeds.style['height'] = (e[0].offsetHeight * len3) + 'px';
        other.style['height'] = (e[0].offsetHeight * (len3 + 0.5)) + 'px';

        novelle.style['top'] = (winHeight - sectionHeight) + 'px';

        document.addEventListener('click', negateMiddleClick, false);
        headNovelles.addEventListener('click', toggleNewsToMain, false);
        newsfeeds.addEventListener('scroll', loadMoreNewsIfScroll, false);

        requestForNews(newsfeedsCount++);
    })();