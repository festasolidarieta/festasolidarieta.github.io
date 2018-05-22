$(document).ready(function() {
    var consentIsSet = "unknown";
    var cookieBanner = "#cookieBanner";
    var consentString = "cookieConsent=";

    // Sets a cookie granting/denying consent, and displays some text on console/banner
    function setCookie(console_log, consent) {
        $(cookieBanner).fadeOut(750);
        console.log(console_log);
        var d = new Date();
        var exdays = 30*12; //  1 year
        d.setTime(d.getTime()+(exdays*24*60*60*1000));
        var expires = "expires="+d.toGMTString();
        document.cookie = consentString + consent + "; " + expires + ";path=/";
        consentIsSet = consent;
    }

    function denyConsent() {
        setCookie("Consenso negato", "false");
        // Unbind consent-granting actions
        $(window).unbind("scroll");
        $("a:not(.noconsent)").unbind("click");
    }

    function grantConsent() {
        if (consentIsSet == "true") return; // Don't grant twice
        setCookie("Consenso fornito", "true");
        doConsent();
    }

    // Run the consent code. We may be called either from grantConsent() or 
    // from the main routine
    function doConsent() {
        console.log("Consenso fornito");
        // XXX edit your consent code here. As an example here's a function to
        // run Google Analytics
        if(typeof loadGoogleMaps != 'undefined') {
            loadGoogleMaps();
        }
        analytics();
        if($("#fb-root").length > 0) {    
           facebook();
        }
    }

    function analytics() {
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-62281540-1', 'auto');
        ga('set', 'anonymizeIP', true);
        ga('send', 'pageview');
    }

    function facebook() {
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id; js.async = true;
          js.src = "//connect.facebook.net/it_IT/sdk.js#xfbml=1&version=v2.3";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }


    // main routine
    //
    // First, check if cookie is present
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var c = cookies[i].trim();
        if (c.indexOf(consentString) == 0) {
            consentIsSet = c.substring(consentString.length, c.length);
        }
    }

    if (consentIsSet == "unknown") {    
        $(cookieBanner).fadeIn();
        // The two cases where consent is granted: scrolling the window or clicking a link
        // Don't set cookies on the "cookies page" on scroll
        var pageName = location.pathname.substr(location.pathname.lastIndexOf("/") + 1);
        if (pageName != "cookies.html") {
            $(window).scroll(grantConsent);
            $("a:not(.noconsent)").click(grantConsent);
        }
        $(".denyConsent").click(denyConsent);
        // allow re-enabling cookies
        $(".allowConsent").click(grantConsent);
    } 
    else if (consentIsSet == "true") {
        doConsent();
    }
});
