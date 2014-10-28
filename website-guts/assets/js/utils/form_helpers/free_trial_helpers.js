window.optly.mrkt.form = window.optly.mrkt.form || {};

var freeTrialHelper = {

  showOptionsError: function (message){
    if( !this.optionsErrorElm.classList.contains('error-show') ) {
      this.optionsErrorElm.classList.add('error-show');
    }
    this.optionsErrorElm.innerHTML = message;
  },

  before: function() {
    this.processingAdd();
    w.analytics.track('/free-trial/submit', {
      category: 'account',
      label: w.optly.mrkt.utils.trimTrailingSlash(w.location.pathname)
    });
    this.xhrInitiationTime = new Date();
  },

  load: function(event) {
    var xhrElapsedTime,
        response;

    xhrElapsedTime = new Date() - this.xhrInitiationTime;
    try {
      response = JSON.parse(event.target.responseText);
    } catch(error){
      w.analytics.track(w.optly.mrkt.utils.trimTrailingSlash(w.location.pathname), {
        category: 'api error',
        label: 'json parse error: ' + error,
      });
    }
    w.analytics.track('/account/free_trial_create', {
      category: 'api response time',
      value: xhrElapsedTime
    });
    if(response){
      if(event.target.status === 200){
        //remove error class from body?
        w.optly.mrkt.Oform.trackLead({
          email: d.getElementById('email').value,
          url: d.getElementById('url').value,
          name: d.getElementById('name').value,
          phone: d.getElementById('phone').value
        }, event);
        /* legacy reporting - to be deprecated */
        w.analytics.track('/free-trial/success', {
          category: 'account',
          label: w.optly.mrkt.utils.trimTrailingSlash(w.location.pathname)
        }, {
          Marketo: true
        });
        w.Munchkin.munchkinFunction('visitWebPage', {
          url: '/free-trial/success'
        });
        /* end legacy reporting */
        setTimeout(function(){
          w.location = '/edit?url=' + encodeURIComponent(d.getElementById('url').value);
        }, 500);
      } else {
        $('body').addClass('oform-error').removeClass('oform-processing');
        this.processingRemove({callee: 'done'});
        w.analytics.track(w.optly.mrkt.utils.trimTrailingSlash(w.location.pathname), {
          category: 'api error',
          label: 'status not 200: ' + event.target.status
        });
        if(response.error && typeof response.error === 'string'){
          //update error message, apply error class to body
          w.analytics.track(w.optly.mrkt.utils.trimTrailingSlash(w.location.pathname), {
            category: 'api error',
            label: 'response.error: ' + response.error
          });
          this.showOptionsError(response.error);
        } else {
          this.showOptionsError('An unknown error occured.');
        }
      }
    } else {
      $('body').addClass('oform-error').removeClass('oform-processing');
      this.processingRemove({callee: 'done'});
      this.showOptionsError('An unknown error occured.');
    }

  },

  done: function() {
    if($('body').hasClass('oform-error')){
      this.processingRemove({callee: 'done'});
      $('body').removeClass('oform-processing');
      //report that there were errors in the form
      w.analytics.track('seo-form validation error', {
        category: 'form error',
        label: w.optly.mrkt.utils.trimTrailingSlash(w.location.pathname),
        value: $('input.oform-error-show').length
      });
    }
  }


};

window.optly.mrkt.form.freeTrial = function(argumentsObj) {
  var constructorArgs = {
    formId: argumentsObj.formId,
    dialogId: argumentsObj.dialogId,
    prototype: freeTrialHelper
  };

  return window.optly.mrkt.form.HelperFactory(constructorArgs);

};
