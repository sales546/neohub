/**
 * Re-initializes legacy jQuery plugins after Next.js client-side navigation.
 * custom.js only runs once on first load, so carousels on newly mounted pages need this.
 */

function updateDots(event) {
  const carousel = event.target;
  const dots = window.jQuery(carousel).find(".owl-dots .owl-dot");
  dots.each(function assignDotLabel(index) {
    window.jQuery(this).text(index + 1);
  });
}

function updateSlideInfo(event) {
  const carousel = event.target;
  const totalSlides = event.item.count;
  let currentIndex = event.item.index - event.relatedTarget._clones.length / 2;

  if (currentIndex < 1) {
    currentIndex = totalSlides + currentIndex;
  }

  const formattedIndex = currentIndex.toString().padStart(2, "0");

  if (totalSlides > 0) {
    window
      .jQuery(carousel)
      .closest(".main-wrapper-carousel")
      .find(".active-slide")
      .text(formattedIndex);
    window
      .jQuery(carousel)
      .closest(".main-wrapper-carousel")
      .find(".total-slides")
      .text(totalSlides);
  }
}

function initOwl($, selector, config) {
  const $el = $(selector);
  if ($el.length && !$el.hasClass("owl-loaded")) {
    $el.owlCarousel(config);
  }
}

export function initLegacyUi() {
  const $ = window.jQuery;
  if (!$?.fn?.owlCarousel) return;

  initOwl($, "#slider .owl-carousel", {
    margin: 0,
    nav: true,
    autoplay: true,
    lazyLoad: true,
    autoplayTimeout: 5000,
    loop: true,
    dots: false,
    onInitialized: updateDots,
    onChanged: updateSlideInfo,
    navText: [
      '<i class="fas fa-arrow-left"></i>',
      '<i class="fas fa-arrow-right"></i>',
    ],
    responsive: {
      0: { items: 1 },
      768: { items: 1 },
      992: { items: 1 },
      1024: { items: 1 },
      1200: { items: 1 },
    },
    autoplayHoverPause: true,
    mouseDrag: true,
  });

  initOwl($, "#spaces-sec .owl-carousel", {
    margin: 0,
    nav: true,
    autoplay: true,
    lazyLoad: true,
    autoplayTimeout: 5000,
    loop: true,
    dots: false,
    navText: [
      '<i class="fas fa-angle-left"></i>',
      '<i class="fas fa-angle-right"></i>',
    ],
    responsive: {
      0: { items: 1 },
      768: { items: 1 },
      992: { items: 1 },
      1024: { items: 1 },
      1200: { items: 1 },
    },
    autoplayHoverPause: true,
    mouseDrag: true,
  });

  initOwl($, "#counter-sec .owl-carousel", {
    margin: 30,
    nav: true,
    autoplay: true,
    lazyLoad: false,
    autoplayTimeout: 5000,
    loop: true,
    dots: false,
    smartSpeed: 4000,
    navText: [
      '<i class="fa fa-arrow-left"></i>',
      '<i class="fa fa-arrow-right"></i>',
    ],
    responsive: {
      0: { items: 1 },
      481: { items: 2 },
      576: { items: 2 },
      768: { items: 2 },
      992: { items: 3 },
      1400: { items: 4 },
    },
    autoplayHoverPause: false,
    mouseDrag: true,
  });

  initOwl($, "#pricing_plans .owl-carousel", {
    margin: 15,
    nav: true,
    autoplay: true,
    lazyLoad: false,
    autoplayTimeout: 5000,
    loop: true,
    dots: false,
    smartSpeed: 4000,
    navText: [
      '<i class="fas fa-angle-left"></i>',
      '<i class="fas fa-angle-right"></i>',
    ],
    responsive: {
      0: { items: 1 },
      481: { items: 2 },
      992: { items: 3 },
      1024: { items: 3 },
    },
    autoplayHoverPause: false,
    mouseDrag: true,
  });

  initOwl($, "#partners .owl-carousel", {
    margin: 10,
    nav: true,
    autoplay: true,
    lazyLoad: false,
    autoplayTimeout: 5000,
    loop: true,
    dots: false,
    smartSpeed: 4000,
    navText: [
      '<i class="fas fa-angle-left"></i>',
      '<i class="fas fa-angle-right"></i>',
    ],
    responsive: {
      0: { items: 1 },
      480: { items: 2 },
      768: { items: 3 },
      992: { items: 5 },
      1024: { items: 6 },
    },
    autoplayHoverPause: false,
    mouseDrag: true,
  });

  initOwl($, "#testimonial .owl-carousel", {
    margin: 20,
    nav: false,
    autoplay: true,
    lazyLoad: false,
    autoplayTimeout: 5000,
    loop: true,
    dots: false,
    smartSpeed: 4000,
    navText: [
      '<i class="fas fa-angle-left"></i>',
      '<i class="fas fa-angle-right"></i>',
    ],
    responsive: {
      0: { items: 1 },
      425: { items: 1 },
      768: { items: 2 },
      1200: { items: 2 },
    },
    autoplayHoverPause: false,
    mouseDrag: true,
  });

  initOwl($, "#our-team .owl-carousel", {
    margin: 10,
    nav: true,
    autoplay: true,
    lazyLoad: false,
    autoplayTimeout: 5000,
    loop: true,
    dots: false,
    smartSpeed: 4000,
    navText: [
      '<i class="fas fa-angle-left"></i>',
      '<i class="fas fa-angle-right"></i>',
    ],
    responsive: {
      0: { items: 1 },
      480: { items: 2 },
      768: { items: 3 },
      992: { items: 3 },
      1024: { items: 4 },
    },
    autoplayHoverPause: false,
    mouseDrag: true,
  });

  initOwl($, "#blog .owl-carousel", {
    margin: 20,
    nav: true,
    autoplay: true,
    lazyLoad: false,
    autoplayTimeout: 5000,
    loop: true,
    dots: false,
    navText: [
      '<i class="fas fa-arrow-left"></i>',
      '<i class="fas fa-arrow-right"></i>',
    ],
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      992: { items: 3 },
      1200: { items: 3 },
    },
    autoplayHoverPause: true,
    mouseDrag: true,
  });

  initOwl($, "#related-products .owl-carousel", {
    margin: 0,
    nav: false,
    autoplay: true,
    lazyLoad: false,
    autoplayTimeout: 5000,
    loop: true,
    dots: false,
    smartSpeed: 4000,
    navText: [
      '<i class="fas fa-angle-left"></i>',
      '<i class="fas fa-angle-right"></i>',
    ],
    responsive: {
      0: { items: 1 },
      480: { items: 2 },
      768: { items: 3 },
      1200: { items: 5 },
    },
    autoplayHoverPause: false,
    mouseDrag: true,
  });

  if (window.AOS) {
    window.AOS.init({ once: true });
    window.AOS.refresh();
  }

  if (window.WOW) {
    new window.WOW().init();
  }

  initGalleryLightbox($);
}

function initGalleryLightbox($) {
  if (!$?.fn?.magnificPopup) return;

  const $homeGallery = $("#Our_gallery .home-gallery-grid");
  if ($homeGallery.length) {
    $homeGallery.magnificPopup({
      delegate: "a.home-gallery-link",
      type: "image",
      gallery: { enabled: true },
      mainClass: "mfp-fade",
      removalDelay: 200,
      image: { titleSrc: "title" },
    });
  }

  const $galleryPage = $(".gallery-page .gallery-outer");
  if ($galleryPage.length) {
    $galleryPage.magnificPopup({
      delegate: "a.gallery-page-link",
      type: "image",
      gallery: { enabled: true },
      mainClass: "mfp-fade",
      removalDelay: 200,
      image: { titleSrc: "title" },
    });
  }
}
