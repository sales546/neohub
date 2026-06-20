  /**
   * Exoplanet Custom JS
   *
   * @package Exoplanet
   *
   * Distributed under the MIT license - http://opensource.org/licenses/MIT
   */

  /* Mobile responsive Menu*/

  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }



  // owl-dots js start
  function updateDots(event) {
    var carousel = event.target;
    var dots = jQuery(carousel).find('.owl-dots .owl-dot');

    dots.each(function(index) {
        jQuery(this).text(index + 1);
    });
  }
  function updateSlideInfo(event) {
    var carousel = event.target;
    var totalSlides = event.item.count;
    var currentIndex = event.item.index - event.relatedTarget._clones.length / 2;

    if (currentIndex < 1) {
        currentIndex = totalSlides + currentIndex;
    }

    var formattedIndex = currentIndex.toString().padStart(2, '0');

    if (totalSlides > 0) {
        jQuery(carousel).closest('.main-wrapper-carousel').find('.active-slide').text(formattedIndex);
        jQuery(carousel).closest('.main-wrapper-carousel').find('.total-slides').text(totalSlides);
    }
  }
  // owl-dots js end



  var interval=null;
	function show_loading_box()
	{
		jQuery(".eco-box").css("display","none");
		clearInterval(interval);
	}
  interval = setInterval(show_loading_box,2000);

  // SEARCH POPUP
  jQuery(document).ready(function() {

    jQuery('#pet-adoption-form').on('submit', function(event) {
      event.preventDefault();

      var values = jQuery(this).serialize();

      jQuery.post(wp_customscripts_object.ajaxurl, {
        'action': 'get_home_page_adoption_filter',
        'data':   values
      },

      function(response) {
        jQuery('.adoption-form-content-outer-box .row').html(response.html)
      });

    });
    // search js start
    jQuery(document).click(function(){
      jQuery(".search-container").hide();
    });
    jQuery(".search-icon").click(function(e){
      jQuery(".search-container").show();
      e.stopPropagation();
    });

    jQuery(".search-container").click(function(e){
      e.stopPropagation();
    });
    // search js end


  // nav tab js start
  var tabLinks = document.querySelectorAll('.nav-link');
  // Add click event listener to each tab link
  tabLinks.forEach(function(tabLink) {
    tabLink.addEventListener('click', function() {
      // Remove "active" class from all tab links
      tabLinks.forEach(function(link) {
          link.classList.remove('active');
      });
      // Add "active" class to the clicked tab link
      tabLink.classList.add('active');
      // Remove "active" class from all tab contents
      var tabContents = document.querySelectorAll('.tab-pane');
      tabContents.forEach(function(content) {
          content.classList.remove('show', 'active');
      });
      // Get the corresponding tab content and add "show" and "active" classes
      var targetId = tabLink.getAttribute('data-bs-target').slice(1);
      document.getElementById(targetId).classList.add('show', 'active');
    });
  });
  // nav tab js ends

  

    //counter
    jQuery('.counter-value').each(function () {
        jQuery(this).prop('our-record-box',0).animate({
            Counter: jQuery(this).text()
        }, {
            duration: 20000,
            easing: 'swing',
            step: function (now) {
              jQuery(this).text(Math.ceil(now));
            }
        });
    });

    //about counter
    jQuery('.about-counter-value').each(function () {
      jQuery(this).prop('our-record-box',0).animate({
          Counter: jQuery(this).text()
      }, {
          duration: 20000,
          easing: 'swing',
          step: function (now) {
            jQuery(this).text(Math.ceil(now));
          }
      });
  });




    
  });

  // ------------ Scroll Top ---------------

  var btn = jQuery('#return-to-top');

  jQuery(window).scroll(function() {
    if (jQuery(window).scrollTop() > 300) {
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });

  btn.on('click', function(e) {
    e.preventDefault();
    jQuery('html, body').animate({scrollTop:0}, '300');
  });

  //Loader
  jQuery(window).load(function() {
    jQuery(".preloader").delay(2000).fadeOut("slow");
  });

  var blog_loop = jQuery('#slider').attr('blog-loop');
  var owl = jQuery('#slider .owl-carousel');
  owl.owlCarousel({
    margin: 0,
    nav:true,
    autoplay : true,
    lazyLoad: true,
    autoplayTimeout: 5000,
    loop: true,
    dots: false,
    onInitialized: updateDots,
    onChanged: updateSlideInfo,
    navText : ['<i class="fas fa-arrow-left"></i>','<i class="fas fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1,
        // stagePadding: 50,
      },
      768: {
        items: 1,
        // stagePadding: 80,
      },
      992: {
        items: 1,
        // stagePadding: 125,
      },
      1024: {
        items: 1,
        // stagePadding: 130,
      },
      1200: {
        items: 1,
        // stagePadding: 140,
      }

    },
    autoplayHoverPause : true,
    mouseDrag: true
  });

  var blog_loop = jQuery('#spaces-sec').attr('blog-loop');
  var owl = jQuery('#spaces-sec .owl-carousel');
  owl.owlCarousel({
    margin: 0,
    nav:true,
    autoplay : true,
    lazyLoad: true,
    autoplayTimeout: 5000,
    loop: true,
    dots: false,
    navText : ['<i class="fas fa-angle-left"></i>','<i class="fas fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 1
      },
      992: {
        items: 1
      },
      1024: {
        items: 1
      },
      1200: {
        items: 1
      }

    },
    autoplayHoverPause : true,
    mouseDrag: true
  });
 
  var slider_loop = jQuery('#counter-sec').attr('counter-loop');
  var owl = jQuery('#counter-sec .owl-carousel');
  owl.owlCarousel({
    margin: 30,
    nav:true,
    autoplay : true,
    lazyLoad: false,
    autoplayTimeout: 5000,
    loop: true,
    dots: false,
    smartSpeed: 4000,
    navText : ['<i class="fa fa-arrow-left"></i>','<i class="fa fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      481: {
        items: 2
      },
      576: {
        items: 2
      },
      768: {
        items: 2
      },
      992: {
        items: 3
      },
      1400: {
        items: 4
      }
    },
    autoplayHoverPause : false,
    mouseDrag: true
  });

  var slider_loop = jQuery('#pricing_plans').attr('counter-loop');
  var owl = jQuery('#pricing_plans .owl-carousel');
  owl.owlCarousel({
    margin: 15,
    nav:true,
    autoplay : true,
    lazyLoad: false,
    autoplayTimeout: 5000,
    loop: true,
    dots: false,
    smartSpeed: 4000,
    navText : ['<i class="fas fa-angle-left"></i>','<i class="fas fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      481: {
        items: 2
      },
      992: {
        items: 3
      },
      1024: {
        items: 3
      },
    },
    autoplayHoverPause : false,
    mouseDrag: true
  }); 
  
  var slider_loop = jQuery('#partners').attr('counter-loop');
  var owl = jQuery('#partners .owl-carousel');
  owl.owlCarousel({
    margin: 10,
    nav:true,
    autoplay : true,
    lazyLoad: false,
    autoplayTimeout: 5000,
    loop: true,
    dots: false,
    smartSpeed: 4000,
    navText : ['<i class="fas fa-angle-left"></i>','<i class="fas fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 2
      },
      768: {
        items: 3
      },
      992: {
        items: 5
      },
      1024: {
        items: 6
      }
    },
    autoplayHoverPause : false,
    mouseDrag: true
  });

  var slider_loop = jQuery('#testimonial').attr('counter-loop');
  var owl = jQuery('#testimonial .owl-carousel');
  owl.owlCarousel({
    margin: 20,
    nav:false,
    autoplay : true,
    lazyLoad: false,
    autoplayTimeout: 5000,
    loop: true,
    dots: false,
    smartSpeed: 4000,
    navText : ['<i class="fas fa-angle-left"></i>','<i class="fas fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      425: {
        items: 1
      },
      768: {
        items: 2
      },
      1200: {
        items: 2
      }
    },
    autoplayHoverPause : false,
    mouseDrag: true
  });

  var slider_loop = jQuery('#our-team').attr('counter-loop');
  var owl = jQuery('#our-team .owl-carousel');
  owl.owlCarousel({
    margin: 10,
    nav:true,
    autoplay : true,
    lazyLoad: false,
    autoplayTimeout: 5000,
    loop: true,
    dots: false,
    smartSpeed: 4000,
    navText : ['<i class="fas fa-angle-left"></i>','<i class="fas fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 2
      },
      768: {
        items: 3
      },
      992: {
        items: 3
      },
      1024: {
        items: 4
      }
    },
    autoplayHoverPause : false,
    mouseDrag: true
  });

  var blog_loop = jQuery('#blog').attr('blog-loop');
  var owl = jQuery('#blog .owl-carousel');
  owl.owlCarousel({
      margin: 20,
      nav:true,
      autoplay : true,
      lazyLoad: false,
      autoplayTimeout: 5000,
      loop: true,
      dots: false,
      navText : ['<i class="fas fa-arrow-left"></i>','<i class="fas fa-arrow-right"></i>'],
      responsive: {
        0: {
          items: 1
        },
        576: {
          items: 2
        },
        992: {
          items: 3
        },
        1200: {
          items: 3
        }

      },
      autoplayHoverPause : true,
      mouseDrag: true
  });
  
  var slider_loop = jQuery('#related-products').attr('counter-loop');
  var owl = jQuery('#related-products .owl-carousel');
  owl.owlCarousel({
    margin: 0,
    nav:false,
    autoplay : true,
    lazyLoad: false,
    autoplayTimeout: 5000,
    loop: true,
    dots: false,
    smartSpeed: 4000,
    navText : ['<i class="fas fa-arrow-left"></i>','<i class="fas fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 2
      },
      768: {
        items: 3
      },
      1200: {
        items: 5
      }
    },
    autoplayHoverPause : false,
    mouseDrag: true
  });

  function openSearch() {
    document.getElementById("myOverlay").style.display = "block";
  }

  function closeSearch() {
    document.getElementById("myOverlay").style.display = "none";
  }

  //sticky header

  jQuery(window).scroll(function() {
    var data_sticky = jQuery(' #header_navigation').attr('data-sticky');

    if (data_sticky == "true") {
      if (jQuery(this).scrollTop() > 1){
        jQuery('#header_navigation').addClass("stickynavbar");
      } else {
        jQuery('#header_navigation').removeClass("stickynavbar");
      }
    }
  });
    
  new WOW().init();
    
  //video popup
  jQuery('.myVideoBtns').click(function()
  {
    var url = jQuery(this).data('url');
    jQuery('#videoEmbed').attr('src', url);
    jQuery("#myVideoNewModals").show();
  });
  jQuery('.close-one').click(function()
  {
    jQuery("#myVideoNewModals").hide()
  });

  //hide show
  jQuery(document).ready(function(){
    jQuery(".search-icon").click(function(){
      jQuery(".search_col").toggle();
    });
  });

  jQuery('.horizontal .progress-fill span').each(function(){
    var percent = jQuery(this).html();
    jQuery(this).parent().css('width', percent);
  });


  jQuery(document).ready(function() {
    AOS.init({
    once: true,
    });
  });







