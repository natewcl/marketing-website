window.optly.mrkt.benefits = {};

window.optly.mrkt.benefitsLayout.menuHandlers = function() {

  $('body').delegate('.for-menu', 'click', function(event) {
    event.stopPropagation();
    $(this).toggleClass('shown');
  });

  /* Close menu when clicking away */
  $('html').click(function() {
    $('.for-menu').removeClass('shown');
  });
};

window.optly.mrkt.benefitsLayout.menuOrder = function() {
  /* Changes the order of menu items and disables the current link */

  var currentPage = $('.for-menu').attr('data-current'),
      currentMenuItem = $('.for-menu').find('a:contains("' + currentPage + '")');

  $(currentMenuItem).removeAttr('href').parent().insertBefore($('.for-menu li:first'));
};

window.optly.mrkt.benefitsLayout.menuHandlers();
window.optly.mrkt.benefitsLayout.menuOrder();