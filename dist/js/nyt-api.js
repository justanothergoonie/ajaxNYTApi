"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
var NytApi = /*#__PURE__*/function () {
  //
  function NytApi() {
    _classCallCheck(this, NytApi);

    _defineProperty(this, "API_URL_BASE", 'https://api.nytimes.com/svc/search/v2/articlesearch.json');

    _defineProperty(this, "API_KEY", 'TdnPuYVlx3m5XnJ8WCV2br6J1wo3AnEM');
  }

  _createClass(NytApi, [{
    key: "search",
    value: function search(term) {
      axios.get(this.API_URL_BASE, {
        params: {
          'api-key': this.API_KEY,
          q: term
        }
      }).then(this.handleResponse).catch(this.handleError);
    }
  }, {
    key: "handleResponse",
    value: function handleResponse(response) {
      console.log('got a response', response);
      var value = response.data.response.docs;
      var event = new CustomEvent('got-results', {
        detail: value
      });
      document.querySelector('body').dispatchEvent(event);
    }
  }, {
    key: "handleError",
    value: function handleError(error) {}
  }]);

  return NytApi;
}();
//# sourceMappingURL=nyt-api.js.map
