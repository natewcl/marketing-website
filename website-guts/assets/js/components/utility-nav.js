var $utilityNavElm = $('.utility-nav.signed-in-content');
var lastDropdown;

function bindDropdownClick($dropdownMenus) {
  
  $('[data-dropdown]').on('click', function(e) {
    e.preventDefault();
    // Get the type of dropdown anchor that was clicked
    var clickedData = $(this).data('dropdown');

    // Iterate through cached dropdown containers looking for the clicked type
    $.each($dropdownMenus, function(index, elm) {
      var $elm = $(elm);
      // Logic to close the dropdown if it is open and another is clicked
      if (clickedData !== lastDropdown && lastDropdown !== undefined) {
        $('[data-show-dropdown="' + lastDropdown + '"]').removeClass('show-dropdown');
      }

      // Logic to open the dropdown and cache the last opened dropdown
      if ( $elm.data('show-dropdown') ===  clickedData ) {
        // force synchornous behavior so dropdown doesn't cloase as soon as it opens
        $elm.toggleClass('show-dropdown').delay(0).queue(function(next) {
          $(document).bind('click', window.optly.mrkt.closeDropdown);
          next();
        });
        lastDropdown = clickedData;
      }
    });
  });
}

function showUtilityNav($elm, acctData, expData) {
  var handlebarsData = {
    account_id: acctData.account_id,
    email: acctData.email,
    experiments: expData.experiments
  };

  $('body').addClass('signed-in').removeClass('signed-out');

  $('#signed-in-utility').html( window.optly.mrkt.templates.experimentsNav(handlebarsData) );
  var $dropdownMenus = $('[data-show-dropdown]');

  bindDropdownClick($dropdownMenus);
  $('[data-logout]').on('click', window.optly.mrkt.signOut);
}

window.optly.mrkt.closeDropdown = function(e) {
  if ( e !== undefined ) {
    // Check that the target is not inside of the dropdown
    if ( ( !$(e.target).closest('[data-show-dropdown]').length && !$(e.target).is('[data-dropdown]') ) || $(e.target).closest('[data-modal-click]').length > 0 ) {
      $('[data-show-dropdown]').removeClass('show-dropdown');
      $(document).unbind('click', window.optly.mrkt.closeDropdown);
    } 

  }
  // If we want to manually close the dropdown there will be no event
  else {
    $('[data-show-dropdown]').removeClass('show-dropdown');
    $(document).unbind('click', window.optly.mrkt.closeDropdown);
  }

};

window.optly.mrkt.signOut = function(redirectPath) {

  var deferred = window.optly.mrkt.services.xhr.makeRequest({
    type: 'GET',
    url: '/account/signout'
  });

  // Close the dropdown
  window.optly.mrkt.closeDropdown();

  deferred.then(function(data){
    if(data && typeof redirectPath !== 'object') {
      window.location = redirectPath;
    }
    // If no path is specified then reload location
    else if (data) {
      window.location = window.location.origin + window.linkPath;
    }
  }, function(err) {
    // Report error here
    window.analytics.track(window.location.pathname, {
      category: 'api error',
      label: 'error on logout request: ' + err
    });
  });
};

// Make call to optly Q
window.optly_q.push([showUtilityNav, $utilityNavElm, 'acctData', 'expData']);
