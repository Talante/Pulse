
const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false,
    controlsText: [
        '<img src="../icons/chevron left solid.png">',
        '<img src="../icons/chevron-right-solid.png">',
    ]
  });
  
  $('ul.catalog__tabs',).on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });
  $('.catalog-item__link').each(function(i) {
    $(this).on('click', function(e) {
      e.preventDefault();
      $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
      $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    })

  })

document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
  });

  document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('prev');
  });

    // Modal

    $('button[data-modal="consultation"]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
  });
  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });
  $('.button_mini').each(function(i) {
    $(this).on('click', function () {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    });
    function validateForms(form) {
      $(form).validate({
        rules: {
          name: "required",
          phone: "required",
          email: {
            required: true,
            email: true,
          }
        },
        messages: {
          name: "Please specify your name",
          phone: "Please specify your phone number",
          email: {
            required: "we need your email adress",
            email: "Your email adress was written incorrect",
          }
        }
      });
    }
    validateForms('#consultation-form')
    validateForms('#consultation form')
    validateForms('#order form')
    $('input[name=phone]').mask("+7 (999) 999-99-99")
  });

  $('form').submit(function(e) {
    e.preventDefault();
    if (!$(this).valid()) {
      return;
  }

  $.ajax({
    type: "POST",
    url: "mailer/smart.php",
    data: $(this).serialize()
}).done(function() {
    $(this).find("input").val("");
    $('#consultation, #order').fadeOut();
    $('.overlay, #thanks').fadeIn('slow');

    $('form').trigger('reset');
});
return false;
});
// Smooth scroll and page up
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
  }
});
  $("a[href^='#']").click(function() {
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });
  new WOW().init();




 
  
