window.onload = function () {
    task10();
    task11();
    task12();
    task13();
}

function cssDisplayNone() {
    document.getElementById("task-1").style.display = "none";
}

function jsDelete() {
    document.getElementById("task-1").remove();
}

function cssJsHidden() {
    document.getElementById("task-1").classList.add('hidden');
}

function cssJsToggle() {
    if (document.getElementById("task-2").classList.contains('hidden')) {
        document.getElementById("task-2").classList.remove('hidden');
    } else {
        document.getElementById("task-2").classList.add('hidden');
    }
}

function task3() {
    for (let i = 0; i < document.getElementsByClassName('task-3').length; i++) {
        if (document.getElementsByClassName('task-3').item(i).classList.contains('hidden')) {
            document.getElementsByClassName('task-3').item(i).classList.remove('hidden');
        } else {
            document.getElementsByClassName('task-3').item(i).classList.add('hidden');
        }
    }
}

function hideUnhideSelector(selector) {
    let qs = document.querySelectorAll(selector);
    if (qs.length > 0) {
        qs.forEach(function (element) {
            if (element.classList.contains('hidden')) {
                element.classList.remove('hidden')
            } else {
                element.classList.add('hidden');
            }
        })
    } else {
        alert("Selector " + selector + " not found!");
    }
}

function getSelectorFromInput() {
    let qs = document.getElementById('input').value;
    hideUnhideSelector(qs);
}

function task5() {
    let elem = document.getElementById('task-5');
    if (elem.classList.contains('clicked')) {
        elem.classList.add('hidden');
    } else {
        alert("Привет");
        elem.classList.add("clicked");
    }
}

function task6() {
    hideUnhideSelector("#task-6");
}

function task7(handler) {
    let div = document.getElementById("task-7");
    if (handler === "focus") {
        div.classList.remove('hidden');
    }
    if (handler === "input") {
        div.classList.add('hidden');
    }
}

function task8() {
    let link = document.getElementById("input3").value;
    let expr = "(https?:\\/\\/.*\\.(?:png|jpg|jpeg))";
    if (link.match(expr)) {
        document.getElementById("task-8").innerHTML = "<img src='" + link + "' alt='some alt'>";
    } else {
        alert("it's not a link to image")
    }
}

function task9() {
    let links = document.getElementById("input4").value;
    let link = links.split('\n');
    link.forEach(function (href) {
        let expr = "(https?:\\/\\/.*\\.(?:png|jpg|jpeg))";
        if (href.match(expr)) {
            document.getElementById("task-9").innerHTML += "<br><img src='" + href + "' alt='some alt'>";
        } else {
            alert("it's not a link to image")
        }
    })

}

function task10() {
    document.addEventListener('mousemove', function (mouseevent) {
        document.getElementById('coords').innerHTML = "X: " + mouseevent.pageX + "<br> Y: " + mouseevent.pageY;
    })

}

function task11() {
    let lang = navigator.language;
    document.getElementById('other').innerHTML += "Language: " + lang;
}

function task12() {
    let elem = document.getElementById('other');
    navigator.geolocation.getCurrentPosition(function (pos) {
        elem.innerHTML += "<br>Ш: " + pos.coords.latitude + ",Д: " + pos.coords.longitude;
    })
}

function task13(command) {
    let task13a = document.getElementById("task-13-a");
    let task13b = document.getElementById("task-13-b");
    let task13c = document.getElementById("task-13-c");

    if (command === 'save') {
        localStorage.setItem("content", task13a.innerHTML);
        document.cookie = task13b.innerHTML;
        sessionStorage.setItem("content", task13c.innerHTML);
    } else {
        task13a.innerHTML = localStorage.getItem("content");
        task13b.innerHTML = document.cookie;
        task13c.innerHTML = sessionStorage.getItem("content");
    }
}