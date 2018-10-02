
    var isMenuOpen = false;
    var isWhiteIcon;
    var isWhiteIconRest;

    $('#startdate').datepicker({
      value: '01-Jun-17',
      minDate: '01-Jun-17',
      maxDate: '31-Aug-18',
      format: 'dd-mmm-yy',
      close: function (e, type) {
        var a = new Date(this.value);
        var b = new Date($('#enddate').val());
        var min = new Date('01-Jun-17');
        var max = new Date('31-Aug-18');
        var timeDiff = Math.abs(b - a);
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (diffDays < 120) {
          this.value = '01-Jun-17';
          $('#monthDisclaim').show().addClass('animated fadeIn');
          $('#monthDisclaim').on("animationend", function(){
            setTimeout(function () {
              $('#monthDisclaim').removeClass('animated fadeIn');}, 150
            );
            setTimeout(function () {
              $('#monthDisclaim').hide();}, 1200
            );
          });
        }
      }
    });
    $('#enddate').datepicker({
      value: '31-Aug-18',
      minDate: '01-Jun-17',
      maxDate: '31-Aug-18',
      format: 'dd-mmm-yy',
      close: function (e, type) {
        var a = new Date(this.value);
        var b = new Date($('#enddate').val());
        var min = new Date('01-Jun-17');
        var max = new Date('31-Aug-18');
        var timeDiff = Math.abs(b - a);
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (diffDays < 120) {
          this.value = '31-Aug-18';
          $('#monthDisclaim').show().addClass('animated fadeIn');
          $('#monthDisclaim').on("animationend", function(){
            setTimeout(function () {
              $('#monthDisclaim').removeClass('animated fadeIn');}, 150
            );
            setTimeout(function () {
              $('#monthDisclaim').hide();}, 1200
            );
          });
        }
      }
    });

    $(".conditions").click(function() {
      window.location = './conditions.html';
    });

    $(".home").click(function() {
      window.location = './index.html';
    });

    $('#startdate').attr('readonly', true);
    $('#enddate').attr('readonly', true);

    $( ".titleOverlay" ).mouseover(function() {
      $(this).siblings('.colorOverlay').css('opacity', 0.7);
    });

    $( ".titleOverlay" ).mouseout(function() {
      $( ".colorOverlay" ).css('opacity', 0.5);
    });


     $("#hamburger").click(function() {
       isMenuOpen = true;
       isWhiteIcon = false;
       isWhiteIconRest = false;
       $('html').css("overflow-y", "hidden");
       $('.overlayMenu').css("z-index", "4");
       $('#bottomHalfOverlay').removeClass('slideOutLeft');
       $('#topHalfOverlay').removeClass('slideOutRight');
       setTimeout(function () {
         $('#topHalfOverlay').show().addClass('animated slideInLeft');}, 50
       );
       setTimeout(function () {
         $('#bottomHalfOverlay').show().addClass('animated slideInRight');}, 75
       );
     });


     $('#topHalfOverlay').on("animationend", function(){
       if (isMenuOpen === true) {
         if (isWhiteIcon === false || isWhiteIconRest === true) {
           setTimeout(function () {
             $('#overlay1').show().addClass('animated fadeInDown');}, 50
           );
           setTimeout(function () {
             $('#overlay4').show().addClass('animated fadeInUp');}, 50
           );
           setTimeout(function () {
             $('#overlay2').show().addClass('animated fadeInDown');}, 150
           );
           setTimeout(function () {
             $('#overlay5').show().addClass('animated fadeInUp');}, 150
           );
           setTimeout(function () {
             $('#overlay3').show().addClass('animated fadeInDown');}, 200
           );
          }
          else if ((isWhiteIcon === true)) {
            setTimeout(function () {
              $('#overlay1').show().addClass('animated fadeIn');}, 50
            );
            setTimeout(function () {
              $('#overlay2').show().addClass('animated fadeIn');}, 50
            );
            setTimeout(function () {
              $('#overlay3').show().addClass('animated fadeIn');}, 50
            );
            setTimeout(function () {
              $('#overlay4').show().addClass('animated fadeIn');}, 50
            );
            setTimeout(function () {
              $('#overlay5').show().addClass('animated fadeIn');}, 50
            );
          }
        }
        else {
          $('#overlay1').css('opacity', '0');
          $('#overlay2').css('opacity', '0');
          $('#overlay3').css('opacity', '0');
          $('#overlay4').css('opacity', '0');
          $('#overlay5').css('opacity', '0');
          $('#overlay1').hide();
          $('#overlay2').hide();
          $('#overlay3').hide();
          $('#overlay4').hide();
          $('#overlay5').hide();
        }
     });


     $("#hamburgerWhite").click(function() {
       isMenuOpen = true;
       isWhiteIcon = true;
       isWhiteIconRest = false;
       $('html').css("overflow-y", "hidden");
       $('.overlayMenu').css("z-index", "4");
       $('#bottomHalfOverlay').removeClass('slideOutLeft');
       $('#topHalfOverlay').removeClass('slideOutRight');
       setTimeout(function () {
         $('#topHalfOverlay').show().addClass('animated slideInLeft');}, 50
       );
       setTimeout(function () {
         $('#bottomHalfOverlay').show().addClass('animated slideInRight');}, 75
       );
     });

     $("#hamburgerWhiteRest").click(function() {
       isMenuOpen = true;
       isWhiteIcon = true;
       isWhiteIconRest = true;
       $('html').css("overflow-y", "hidden");
       $('.overlayMenu').css("z-index", "4");
       $('#bottomHalfOverlay').removeClass('slideOutLeft');
       $('#topHalfOverlay').removeClass('slideOutRight');
       setTimeout(function () {
         $('#topHalfOverlay').show().addClass('animated slideInLeft');}, 50
       );
       setTimeout(function () {
         $('#bottomHalfOverlay').show().addClass('animated slideInRight');}, 75
       );
     });



     $("#closeIcon").click(function() {
       isMenuOpen = false;
       $('html').css("overflow-y", "visible");
       setTimeout(function () {
         $('#topHalfOverlay').show().addClass('animated slideOutRight');}, 50
       );
       setTimeout(function () {
         $('#bottomHalfOverlay').show().addClass('animated slideOutLeft');}, 75
       );

       setTimeout(function () {
         $('.overlayMenu').css("z-index", "0");}, 950
       );
     });