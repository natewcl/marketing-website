w.optly.mrkt.index = {};

console.log('d3: ', typeof(window.d3));

w.optly.mrkt.index.testItOut = function(editURL){

  //send user to the editor
  w.location = '/edit?url=' + encodeURIComponent(editURL);

  w.analytics.track('homepage test it out submitted', {

    category: 'forms',
    label: w.location.pathname

  });

};

$('#test-it-out-form input[type="text"]').focus();

$('#test-it-out-form').submit(function(e){

  var inputVal = $('#test-it-out-form input[type="text"]').val();

  if( inputVal ){

      w.optly.mrkt.index.testItOut( inputVal );

  } else {

    $('input[type="text"]').focus();

  }

  e.preventDefault();

});

var touchHomeFormHelperInst = window.optly.mrkt.form.createAccount({formId: 'touch-homepage-create-account-form'});

var touchHomeForm = new Oform({
  selector: '#touch-homepage-create-account-form',
  customValidation: {
    password1: function(elm) {
      return touchHomeFormHelperInst.password1Validate(elm);
    },
    password2: function(elm) {
      return touchHomeFormHelperInst.password2Validate(elm);
    }
  }
});

touchHomeForm.on('before', function() {
  //set the hidden input value
  touchHomeFormHelperInst.formElm.querySelector('[name="hidden"]').value = 'touched';
  touchHomeFormHelperInst.processingAdd();
  return true;
});

touchHomeForm.on('validationerror', w.optly.mrkt.Oform.validationError);

touchHomeForm.on('validationerror', function(elm) {
  w.optly.mrkt.Oform.validationError(elm);
  touchHomeFormHelperInst.showOptionsError('Please Correct Form Errors');
});


touchHomeForm.on('load', function(e){
  touchHomeFormHelperInst.load(e);
  touchHomeFormHelperInst.processingRemove({callee: 'load'});
});

touchHomeForm.on('done', function(){
  touchHomeFormHelperInst.processingRemove({callee: 'done'});
  window.setTimeout(function() {
    touchHomeFormHelperInst.scrollTopCta('touch-cta');
  }, 500);
}.bind(touchHomeFormHelperInst));

/* global d3: false */

(function(){

  var vis = d3.select('#time-series');

  $.getJSON('/time-series/one.json').always(function(response){

    /*
    var width = 1000,
    height = 500,
    margins = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    };

    //var data = response;

    var data = [{
      x: 1,
      y: 5
    }, {
      x: 20,
      y: 20
    }, {
      x: 40,
      y: 10
    }, {
      x: 60,
      y: 40
    }, {
      x: 80,
      y: 5
    }, {
      x: 100,
      y: 60
    }];

    //debugger;

    console.log('xRange: ', d3.min(data, function(d){
      return d.x;
    }));
    console.log('yRange: ', d3.min(data, function(d){
      return d.y;
    }));

    var xRange = d3.scale.linear().range([margins.left, width - margins.right]).domain([d3.min(data, function(d){
      return d.x;
    })]),
    yRange = d3.scale.linear().range([margins.left, width - margins.right]).domain([d3.min(data, function(d){
      return d.y;
    })]),
    xAxis = d3.svg.axis()
      .scale(xRange)
      .tickSize(5)
      .tickSubdivide(true),
    yAxis = d3.svg.axis()
      .scale(yRange)
      .tickSize(5)
      .orient('left')
      .tickSubdivide(true);

    vis.append('svg:g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + (height - margins.bottom) + ')')
      .call(xAxis);

    vis.append('svg:g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + (margins.left) + ',0)')
      .call(yAxis);
    */

  });

})();
