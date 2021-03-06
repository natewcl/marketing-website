var resetPassDialogHelperInst = window.optly.mrkt.form.resetPassword({formId: 'reset-password-form'});

var resetPassForm = new Oform({
  selector: '#reset-password-form',
  middleware: function(XhrObj, data){
    window.analytics.track('password reset submit', {
      category: 'account',
      label: w.location.pathname
    });

    return data;
  }
});

resetPassForm.on('before', resetPassDialogHelperInst.processingAdd.bind(resetPassDialogHelperInst));

resetPassForm.on('validationerror', w.optly.mrkt.Oform.validationError);

resetPassForm.on('error', function() {
  resetPassDialogHelperInst.processingRemove({callee: 'error'});
  resetPassDialogHelperInst.showOptionsError('An unexpected error occurred. Please contact us if the problem persists.');
  window.analytics.track('reset password xhr error', {
    category: 'account',
    label: w.location.pathname
  });
}.bind(resetPassDialogHelperInst));

resetPassForm.on('load', function(e) {
  resetPassDialogHelperInst.load(e);
  resetPassDialogHelperInst.processingRemove({callee: 'load'});
} .bind(resetPassDialogHelperInst));

resetPassForm.on('done', function() {
  resetPassDialogHelperInst.processingRemove({callee: 'done'});
}.bind(resetPassDialogHelperInst));



