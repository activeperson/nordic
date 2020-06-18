var url = window.location.href;

if (url == "https://Modernhouses.no/" && readCookie("site_lang") != "nb" || url == "https://www.Modernhouses.no/" && readCookie("site_lang") != "nb") {
	createCookie("site_lang", "nb", 365);
	window.location.reload();
}
if (window.location.pathname === "/nb" && url.indexOf("Modernhouses.no") !== -1) {
	window.location.replace("https://Modernhouses.no/");
}

function createCookie(name,value,days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }

    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }

    return null;
}
function eraseCookie(name) {
    createCookie(name,"",-1);
}
