window.optly.mrkt.page404 = {};

function CustomSearchConstructor() {
  var context = this;
  var engineID = '012678993876609152281:p0vjn2lv1zs';
  var apiKey = 'AIzaSyDLJdkQigy0JfnHD72wkTPu3jxHkKzovAg';

  this.search = function(phrase) {
    var queryParams = {
      cx: engineID,
      key: apiKey,
      num: 10,
      q: phrase,
      alt: 'JSON'
    };
    var API_URL = 'https://www.googleapis.com/customsearch/v1?';
    // Send the request to the custom search API
    $.getJSON(API_URL, queryParams, function(response) {
      if (response.items && response.items.length) {
        $('.suggestions').append('<li><a href="' + response.items[0].link + '">' + response.items[0].title + '</a></li>');
        $('.suggestions').append('<li><a href="' + response.items[1].link + '">' + response.items[1].title + '</a></li>');
        $('.suggestions').append('<li><a href="' + response.items[2].link + '">' + response.items[2].title + '</a></li>');
      }
    });
  };
}

var path = window.location.pathname;
var phrase = decodeURIComponent(path.replace(/\/+/g, ' ').trim());

var customSearch = new CustomSearchConstructor();
customSearch.search('jobs');
