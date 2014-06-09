$('form :input').each(function(index, elem) {

    var eId = $(elem).attr('id');

    var label = null;

    if (eId && (label = $(elem).parents('form').find('label[for='+eId+']')).length === 1) {

        $(elem).attr('placeholder', $(label).html());

        $(label).addClass('hide-label');

    }

});

$('#seo-form').oForm({

  url: '/account/free_trial_landing',

  reportValidationError: function(element){

    console.log('error on: ' + $(element).attr('name'));

    window.analytics.track(window.location.pathname, {

      category: 'form field error',

      label: $(element).attr('name')

    });

  },

  after: function(){

    //TO DO: add marketo code, remarketing code, etc.

    //window.location = 'https://www.optimizely.com/edit?url=' + $('url');

  }

});
