(function($) {
  /*//Set content min height
  var contentMinHeight = $(window).height() - $('header').height() - $('footer').height();
  $('.js-main-content-area').css('min-height', contentMinHeight);
  $(window).on('resize', function() {
    $('.js-main-content-area').css('min-height', contentMinHeight);
  });*/

  $('.gallery-image').fancybox({
    // Options will go here
  });
  // Bunch 'o dropdown
  $('body').on('click', '.js-mob-menu-button', function() {
      $('.js-mob-menu').toggleClass('active');
      if ($('.js-mob-menu').hasClass('active')) {
        $('body').css('overflow-x','hidden');
      } else {
        $('body').css('overflow-x','auto');
      }
  }).on('click', '.js-mob-menu-close', function() {
    $('.js-mob-menu').removeClass('active');
    if ($('.js-mob-menu').hasClass('active')) {
      $('body').css('overflow-y','hidden');
    } else {
      $('body').css('overflow-y','auto');
    }
  }).on('click', '.js-mob-footer-menu-close', function() {
    $('.footer-dropdown').removeClass('active');
  }).on('click', '.languages-dropdown-button', function() {
      $('.languages-dropdown-menu').toggleClass('active');
  }).on('click', '.footer-dropdown-button', function() {
      $('.footer-dropdown').toggleClass('active');
  }).on('click', '.js-details-mob-process-button', function() {
      $('.js-details-mob-process-tree').toggleClass('active');
  });

$('body').on('click', '.pswp__img', function(){
  photoswipeInstance.next();
});

 //Voog textediting additions
window.edy = window.edy || [];
 var labelOptions = {
  name: 'maja detaili märgend',
  tagname:'span',
  classname: 'details-info-label'
 };
 edy.push(['texteditorStyles', labelOptions]);

window.edy = window.edy || [];
 var detailOptions = {
  name: 'maja detail',
  tagname:'span',
  classname: 'details-info-detail'
 };
 edy.push(['texteditorStyles', detailOptions]);

window.edy = window.edy || [];
   var ancour = {
    name: 'anchor heading',
    tagname:'h2',
    classname: 'js-anchored-heading'
   };
   edy.push(['texteditorStyles', ancour]);

window.edy = window.edy || [];
  var border = {
   name: 'bottom border',
   tagname:'div',
   classname: 'borderline'
  };
  edy.push(['texteditorStyles', border]);

window.edy = window.edy || [];
  var groupContent = {
   name: 'Single groups content',
   tagname:'div',
   classname: 'js-group-content'
  };
  edy.push(['texteditorStyles', groupContent]);

  //Sidebar
  var headerHeight = $('.header-content').height() + 30;
  $('.sidebar-fixed').css("top", headerHeight);
  $(window).resize(function() {
    var headerHeight = $('.header-content').height() + 30;
    $('.sidebar-fixed').css("top", headerHeight);
  });

  //Footer cols
  /*if ($(window).width() >= 768) {
    var maxHeight = -1;
    $('.js-footer-col').each(function() {
      maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
    });
    $('.js-footer-col').each(function() {
      $(this).height(maxHeight);
    });
  }*/

  //Ancour rendering
  $('.js-anchored-heading').each(function(index, item) {
      var headingText = $(item).text().trim("");
      var headingTextData = headingText.toLowerCase();
      $(item).attr('data-anchor', headingTextData );
      $('.sidebar-inner').append('<span class="sidebar-option js-sidebar-option" data-anchor="'+ headingTextData +'"><span class="sidebar-option-inner">'+ headingText +'</span></span>');
  });

  $('body').on('click', '.js-sidebar-option', function(){
    var clickedanchor = $(this).data('anchor');
    $(window).unbind('scroll' ,changeOnScroll);
    $('.js-anchored-heading[data-anchor="'+ clickedanchor +'"]').velocity('scroll', 500, function(){$(window).scroll(changeOnScroll);});
    /*$('html, body').animate({scrollTop: $('.js-anchored-heading[data-anchor="'+ clickedanchor +'"]').offset().top}, 500, 'swing', function(){
      $(window).scroll(changeOnScroll);
    });*/
    $('.sidebar-option-inner').removeClass('active');
    $(this).find('.sidebar-option-inner').addClass('active');
  });
  $('.js-sidebar-option:first-child .sidebar-option-inner').addClass('active');
  $(window).scroll(changeOnScroll);

  //Objectfit Fallback
  objectFitFallback();

  if(window.location.href.indexOf("?") > -1) {
      var scrollToItem = window.location.href.split('?')[1];
      scrollToItem = decodeURIComponent(scrollToItem);
      $('.js-anchored-heading[data-anchor="'+ scrollToItem +'"]').velocity('scroll', 100, function(){$(window).scroll(changeOnScroll);});
  }

    $('.footer-nav-relative a').each(function() {
      var ref = $(this).attr('href'),
          encodedRef = encodeURI(ref);

      $(this).attr('href', encodedRef);
    });

  $('.js-numbers').find('input').attr('type', 'number');

})(jQuery);

  //Change sidebar active while scrolling
  function changeOnScroll() {
      var lastScrollTop = 0;
      var inViewElementData = $('.js-anchored-heading:in-viewport').data('anchor');
      //If multiple anchours last one in view is active
      if ($('.js-anchored-heading:in-viewport').length > 1 & $('body').scrollTop() > 100 ) {
         inViewElementData = $('.js-anchored-heading:in-viewport').last().data('anchor');
      } else {
         inViewElementData = $('.js-anchored-heading:in-viewport').data('anchor');
      }
      if ($('.js-anchored-heading:in-viewport').length !== 0) {$('.sidebar-option-inner').removeClass('active');}
      $('.js-sidebar-option[data-anchor="'+ inViewElementData +'"] .sidebar-option-inner').addClass('active');
  }


  //objectfit fallback
  function objectFitFallback() {
    // if ( ! Modernizr.objectfit ) {
    if ( ! Modernizr.objectfit && isReady) {
      $.each($('.object-fit-cover'), function (i, imageContainer) {
        var $container = $(imageContainer),
            imgUrl = $container.find('img').prop('src');
        if (imgUrl) {
          $container.find('img').before('<div class="object-fit-img-wrap"></div>');
          $container.find('.object-fit-img-wrap').css('background-image', 'url("' + imgUrl + '")');
          console.log(imgUrl);
        }
      });

      $('.js-object-fit').each(function () {
        var imgUrl = encodeURIComponent($(this).find('img').prop('src'));

        if (imgUrl) {
          $(this).css('backgroundImage', 'url(' + decodeURIComponent(imgUrl) + ')');
        }
      });
    }
  }

  //front page logo transform fallback
    if ( ! Modernizr.csstransforms) {
      $(preflabImg).css('margin-left', -preflabImg.width() / 2);
      $(preflabImg).css('margin-top', -preflabImg.height() / 2);
    }

  //Form animations and html that goes with it
  function formAnimations() {
    $('.details-form-group').append('<span class="bar"></span><span class="highlight"></span>');
    $($('.details-form-group')).each(function(index, group) {
      if ($(group).find('input').val() != 0) {
        $(group).addClass('active');
      }
    });
    $(' body').on('focus', '.details-form-group input', function() {
        $(this).closest('.details-form-group').addClass('active');
    })
    .on('blur', '.details-form-group input', function() {
        if ($(this).val().length === 0) {
            $(this).closest('.details-form-group').removeClass('active');
        }
    });
  }

// hide details-form title in custom project
$('.js-hide-title').closest('body').find('.details-heading').addClass('hidden');
