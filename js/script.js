$(document).ready(function(){
    $('.carousel__inner').slick(
        {
            speed: 1200,     
            // adaptiveHeight: true,
            prevArrow: '<button type="button" class="slick-prev"> <img src="icons/left.svg" ></button>',
            nextArrow: '<button type="button" class="slick-next"> <img src="icons/right.svg" ></button>',
            responsive: [
              {
                breakpoint: 1200,
                settings: {
                  arrows: false,
                  dots: false,
                  
              }}]

          }
    );

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_activ)', function() {
      $(this)
        .addClass('catalog__tab_activ').siblings().removeClass('catalog__tab_activ')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(slide) {
    $(slide).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      });
    }); }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // modal

    $('[data-modal=consultation]').on('click', function(){
        $('.overlay, #consultation').fadeIn();

    });
    $('.modal__close').on('click', function() {
      $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });
   
    // $('.button_mini').on('click', function(){
    //   $('.overlay, #order').fadeIn('slow');
    // });
  
    $('.button_mini').each(function(i){
        $(this).on('click', function(){
              $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text()
              );
              $('.overlay, #order').fadeIn('slow');

        });
    });



      // $('#consultation-form').validate();
      // $('#consultation form').validate();
      // $('#order form').validate();






    
    
    function valideForms(form) {
      $(form).validate({
        rules: {
         
          name: {required: true},
          phone: "required",
        
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: "Пожалуйста, введите свое имя",
          phone: "Пожалуйста, введите ваш телефон",
          email: {
            required: "Нам необходим ваш адрес электронной почты, чтоб связаться с вами!",
            email: "Ваш адрес должен быть в формате name@domain.com"
          }
        }
  
      });
    }

    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');
      
    $('input[name=phone]').mask('+7(999)999-9999');
    
          //  mail
          function sendMail(forms){
    $(forms).submit(function(e) {
      e.preventDefault();

      // if (!$(this).valid()) {
      //   return;
      // }

      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function(){
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');


        $('form').trigger('reset');
      });
      return false;
      
    });
  }
  sendMail('#consultation-form');
  sendMail('#consultation form');
  sendMail('#order form');



    // smooth scroll and pageup

    $(window).scroll(function(){
      if($(this).scrollTop()>1600) {
        $('.pageup').fadeIn();
      } else {
         $('.pageup').fadeOut();
      }
    });
    $("a[href='#up']").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({
        scrollTop: $(_href).offset().top+"px"
      });
      return false ;
    });


  });