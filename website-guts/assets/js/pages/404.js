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
        console.log(response.items[0].link);
      }
    });
  };
}

var path = window.location.pathname;
console.log("&&&&&&&&&&&&&&&&&");
console.log(path);
var phrase = decodeURIComponent(path.replace(/\/+/g, ' ').trim());
console.log("%%%%%%%%%%%%%%%%%%%%");
console.log(phrase);

var customSearch = new CustomSearchConstructor();
customSearch.search('new');
