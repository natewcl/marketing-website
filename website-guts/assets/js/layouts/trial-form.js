w.optly.mrkt.inlineFormLabels();

document.querySelector('[name="hidden"]').value = 'touched';

var freeTrialHelperInst = window.optly.mrkt.form.freeTrial({formId: 'seo-form'});

//form
new Oform({
  selector: '#seo-form'
})
.on('before', function(){
  freeTrialHelperInst.before();
  return w.optly.mrkt.Oform.before();
})
.on('validationerror', w.optly.mrkt.Oform.validationError)
.on('error', function(){
  $('body').addClass('oform-error').removeClass('oform-processing');
  freeTrialHelperInst.processingRemove({callee: 'error'});
  freeTrialHelperInst.showOptionsError('An unexpected error occurred. Please contact us if the problem persists.');
  window.analytics.track(w.optly.mrkt.utils.trimTrailingSlash(w.location.pathname), {
    category: 'api error',
    label: 'free trial xhr error'
  });
})
.on('load', freeTrialHelperInst.load.bind(freeTrialHelperInst))
.on('done', freeTrialHelperInst.done.bind(freeTrialHelperInst));
