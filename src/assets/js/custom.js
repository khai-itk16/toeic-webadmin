(function ($) {
    "use strict";
    var mainApp = {

        main_fun: function () {
            /*====================================
            METIS MENU 
            ======================================*/
            $('#main-menu').metisMenu();

            /*====================================
              LOAD APPROPRIATE MENU BAR
           ======================================*/
            $(window).bind("load resize", function () {
                if ($(this).width() < 768) {
                    $('div.sidebar-collapse').addClass('collapse')
                } else {
                    $('div.sidebar-collapse').removeClass('collapse')
                }
            });
     
        },

        initialization: function () {
            mainApp.main_fun();

        }

    }
    // Initializing ///

    $(document).ready(function () {
        mainApp.main_fun();
    });

}(jQuery));

$(document).ready(function () {
    $(document).scroll(function() {
        if ($(document).scrollTop() < 20){
          $(".back-to-top").css("display", "none")
          $(".back-to-top").removeClass("fadeIn")
        } else {
          $(".back-to-top").css("display", "inline")
          $(".back-to-top").addClass("fadeIn")
        } 
    });

    $(".back-to-top").click(function (e) { 
        e.preventDefault();
        $("html,body").animate({
        scrollTop: 0
    }, 700);
    });
})
