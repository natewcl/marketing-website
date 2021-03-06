window.optly.mrkt.form = window.optly.mrkt.form || {};

var createAccountHelper = {

  customErrorMessage: function (elm, message) {
    if(message) {
      elm.innerHTML = message;
    }
  },

  showOptionsError: function (message){
    if(!document.body.classList.contains('error-state')) {
      document.body.classList.add('error-state');
    }
    if( !this.optionsErrorElm.classList.contains('error-show') ) {
      this.optionsErrorElm.classList.add('error-show');
    }
    this.optionsErrorElm.innerHTML = message;
  },

  scrollTopDialog: function() {
    if(document.body.classList.contains('oform-error')) {
      var dialog = this.dialogElm.querySelector('.dialog'),
        scrollAmt = dialog.scrollTop,
        callee = this.scrollTopDialog;

      if(scrollAmt !== 0) {
        dialog.scrollTop = (scrollAmt - 10);
        if(window.requestAnimationFrame) {
          window.requestAnimationFrame(callee.bind(this));
        } else {
          dialog.scrollTop = 0;
        }
      }
    }
  },

  scrollTopCta: function(ctaId) {
    if(document.body.classList.contains('oform-error')) {
      var target = document.getElementById(ctaId);
      
      $('html,body').animate({
        scrollTop: $(target).offset().top
      }, 1000);
    }
  },

  addErrors: function(elmArr) {
    if(!document.body.classList.contains('error-state')) {
      document.body.classList.add('error-state');
    }
    $.each(elmArr, function(i, elm) {
      if( !elm.classList.contains('error-show') ) {
        elm.classList.add('error-show');
      }
    });
  },

  removeErrors: function(elmArr, retainBodyClass) {
    if(!retainBodyClass && document.body.classList.contains('error-state')) {
      document.body.classList.remove('error-state');
    }
    $.each(elmArr, function(i, elm) {
      if( elm.classList.contains('error-show') ) {
        elm.classList.remove('error-show');
      }
    });
  },

  passwordConfirm: function(password1, password2){
    var password2ErrorElm = this.formElm.querySelector('.password2-related');

    if ( password2.value.length > 0 && password1.value !== password2.value ) {
      this.addErrors([password2, password2ErrorElm]);
      this.customErrorMessage(password2ErrorElm, 'Please enter the same value as above');
    } 
    //remove local error classes but do not remove body error class just in case
    else {
      this.passed = true;
      this.removeErrors([password2, password2ErrorElm]);
    }
  },

  passwordKeyupValid: function() {
    var password1 = this.formElm.querySelector('[name="password1"]'),
      password2 = this.formElm.querySelector('[name="password2"]'),
      password2ErrorElm = this.formElm.querySelector('.password2-related');

    // password1 validations
    $(password1).on('focusout', function() {
      if( password1.value.length > 0 && !w.optly.mrkt.utils.checkComplexPassword(password1.value) ){
        this.addErrors([password1, this.characterMessageElm]);
      } else {
        this.removeErrors([password1, this.characterMessageElm]);
        this.passed = true;
      }
      
      $(password1).on('focusin', function() {
        this.removeErrors([password1, this.characterMessageElm], true);
      }.bind(this));

    }.bind(this));

    //password2 confirmation
    $(password2).on('focusout', function() {
      this.passwordConfirm(password1, password2);
      $(password2).on('focusin', function() {
        this.removeErrors([password2, password2ErrorElm], true);
      }.bind(this));
    }.bind(this));
  },

  password1Validate: function(elm) {
    var validationPassed = w.optly.mrkt.utils.checkComplexPassword(elm.value),
      errorElm = this.formElm.getElementsByClassName('password1-related')[0],
      message;

    if(!validationPassed) {
      if(elm.value.length === 0) {
        message = 'This field is required';
      } else {
        message = 'Password is Invalid';
      }
      this.characterMessageElm.classList.add('error-show');
    } else if (validationPassed && this.characterMessageElm.classList.contains('error-show')) {
      this.characterMessageElm.className = this.characterMessageElm.classList.remove('error-show');
    }

    this.customErrorMessage(errorElm, message);

    return validationPassed;
  },

  password2Validate: function(elm) {
    var password1 = this.formElm.querySelector('[name="password1"]'),
      errorElm = this.formElm.getElementsByClassName('password2-related')[0],
      message;

    if(elm.value.length === 0) {
      message = 'This field is required';
    } else if (elm.value !== password1.value) {
      message = 'Please enter the same value as above';
    }

    this.customErrorMessage(errorElm, message);

    return elm.value === password1.value && w.optly.mrkt.utils.checkComplexPassword(password1.value);
  },

  load: function(e) {
    var formElm = this.formElm;
    var resp = JSON.parse(e.target.responseText);

    if(e.target.status !== 200) {
      this.processingRemove({callee: 'load'});
      this.showOptionsError(resp.error);
    } else {
      w.optly.mrkt.Oform.trackLead({
        name: formElm.querySelector('[name="name"]').value,
        email: formElm.querySelector('[name="email"]').value,
        phone: formElm.querySelector('[name="phone_number"]').value
      }, e);
      
      window.optly.mrkt.modal.close({ modalType: 'signup', track: false });
      window.optly_q.acctData = resp;
      window.optly_q.push([window.optly.mrkt.showUtilityNav, 'acctData']);
    }

  }

};

window.optly.mrkt.form.createAccount = function(argumentsObj) {
  var constructorArgs = {
    formId: argumentsObj.formId,
    dialogId: argumentsObj.dialogId,
    characterMessageSelector: '.password-req',
    init: 'passwordKeyupValid',
    prototype: createAccountHelper
  };

  return window.optly.mrkt.form.HelperFactory(constructorArgs);

};
