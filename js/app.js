$(document).ready(function () {
    $(".location").click(function () {

    })

    let heartIcon = document.querySelectorAll(".heart")
    heartIcon.forEach(heart => {
        heart.onclick = function () {
            if (this.classList.contains("bxs-heart")) {
                this.classList.remove("bxs-heart")
                this.classList.add("bx-heart")
            }
            else {
                this.classList.remove("bx-heart")
                this.classList.add("bxs-heart")
            }
        }
    })

    $('#deadline').countdown('2022/8/12', function (event) {

        $('#hours').html(event.strftime(''
            + `<div>%H</div>`
        ));
        $('#minutes').html(event.strftime(''
            + `<div>%M</div>`
        ));
        $('#sec').html(event.strftime(''
            + `<div>%S</div>`
        ));
    });

    (function () {
        let second = 1000,
            minute = second * 60,
            hour = minute * 60,
            day = hour * 24;

        let today = new Date(),
            dd = String(today.getDate()).padStart(2, "0"),
            mm = String(today.getMonth() + 1).padStart(2, "0"),
            yyyy = today.getFullYear(),
            nextYear = yyyy,
            dayMonth = "08/12/",
            deadline = dayMonth + yyyy;

        today = mm + "/" + dd + "/" + yyyy;
        if (today > deadline) {
            deadline = dayMonth + nextYear;
        }

        let countDown = new Date(deadline).getTime(),
            x = setInterval(function () {

                let now = new Date().getTime(),
                    distance = countDown - now;

                document.getElementById("days").innerText = Math.floor(distance / (day));
               
                if (distance < 0) {
                    clearInterval(x);
                }
              
            }, 0)
    }());
})

//  Carousel Section Start

let index = 0,
    amount = 0,
    currTransl = [],
    translationComplete = true,
    moveOffset = 0;

let transitionCompleted = function () {
    translationComplete = true;
}

document.addEventListener("DOMContentLoaded", function () {
    amount = document.getElementsByClassName("slide").length;
   
    moveOffset = parseInt(window.getComputedStyle(document.getElementById('carousel-container')).width, 10);
   
    document.getElementById('carousel').style.width = (amount * moveOffset) + 'px';
   
    for (let i = 0; i < amount; i++) {
        currTransl[i] = -moveOffset;
        document.getElementsByClassName("slide")[i].addEventListener("webkitTransitionEnd", transitionCompleted, true);
        document.getElementsByClassName("slide")[i].addEventListener("oTransitionEnd", transitionCompleted, true);
        document.getElementsByClassName("slide")[i].addEventListener("MSTransitionEnd", transitionCompleted, true);
    }
    document.getElementById('carousel').insertBefore(document.getElementById('carousel').children[3], document.getElementById('carousel').children[0])
    document.getElementById('prev').addEventListener('click', prev, true);
    document.getElementById('next').addEventListener('click', next, true);
});

function prev() {
    if (translationComplete === true) {
        translationComplete = false;

        index--;
        if (index == -1) {
            index = amount - 1;
        }
        let outerIndex = (index) % amount;
        for (let i = 0; i < amount; i++) {
            let slide = document.getElementsByClassName("slide")[i];
            slide.style.opacity = '1';
            slide.style.transform = 'translateX(' + (currTransl[i] + moveOffset) + 'px)';
            currTransl[i] = currTransl[i] + moveOffset;
        }
        let outerSlide = document.getElementsByClassName("slide")[outerIndex];
        outerSlide.style.transform = 'translateX(' + (currTransl[outerIndex] - (moveOffset * amount)) + 'px)';
        outerSlide.style.opacity = '0';
        currTransl[outerIndex] = currTransl[outerIndex] - moveOffset * (amount);
    }
}

function next() {
    if (translationComplete === true) {
        translationComplete = false;
        let outerIndex = (index) % amount;
        index++;
        for (let i = 0; i < amount; i++) {
            let slide = document.getElementsByClassName("slide")[i];
            slide.style.opacity = '1';
            slide.style.transform = 'translateX(' + (currTransl[i] - moveOffset) + 'px)';
            currTransl[i] = currTransl[i] - moveOffset;
        }
        let outerSlide = document.getElementsByClassName("slide")[outerIndex];
        outerSlide.style.transform = 'translateX(' + (currTransl[outerIndex] + (moveOffset * amount)) + 'px)';
        outerSlide.style.opacity = '0';
        currTransl[outerIndex] = currTransl[outerIndex] + moveOffset * (amount);
    }
}

//  Carousel Section End


// product carousel start 
let items = document.querySelectorAll('#featurecntnr .carousel .carousel-item');
items.forEach((el) => {
    const minPerSlide = 5
    let next = el.nextElementSibling
    for (var i = 1; i < minPerSlide; i++) {
        if (!next) {

            next = items[0]
        }
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
})
$(document).ready(function () {
    $('#featureCarousel').carousel({ interval: false });
    $('#featureCarousel').carousel('pause');
});


var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-36251023-1']);
_gaq.push(['_setDomainName', 'jqueryscript.net']);
_gaq.push(['_trackPageview']);

(function () {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

try {
    fetch(new Request("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", { method: 'HEAD', mode: 'no-cors' })).then(function (response) {
        return true;
    }).catch(function (e) {
        var carbonScript = document.createElement("script");
        carbonScript.src = "//cdn.carbonads.com/carbon.js?serve=CK7DKKQU&placement=wwwjqueryscriptnet";
        carbonScript.id = "_carbonads_js";
    });
} catch (error) {
    console.log(error);
}
// product carousel end