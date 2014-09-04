module.exports.register = function (Handlebars)  { 
  Handlebars.registerHelper('sideways', function (info, options)  {
    console.log(info);
    debugger;
  });
};
