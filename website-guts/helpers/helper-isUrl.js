module.exports.register = function (Handlebars)  {
  Handlebars.registerHelper('isUrl', function (urlTest, options)  {
    var reURL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

    if( !reURL.test(urlTest) ) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
};