"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//
var Main = /*#__PURE__*/function () {
  function Main() {
    _classCallCheck(this, Main);

    // the flow
    //1. set up form event listener(s) that will make the API calls
    //2. setup callback functions to process API responses
    this.setupEventListeners();
  }

  _createClass(Main, [{
    key: "setupEventListeners",
    value: function setupEventListeners() {
      var buttonEl = document.querySelector('[name="search"]');
      buttonEl.addEventListener('click', this.handleSearch); // buttonEl.addEventListener('click', this.handleResults);

      var bodyEl = document.querySelector('body');
      bodyEl.addEventListener('got-results', this.handleResults);
      bodyEl.addEventListener('got-error', this.handleSearchError);
    }
  }, {
    key: "handleSearch",
    value: function handleSearch(event) {
      event.preventDefault(); //

      var queryEl = document.querySelector('[name="query"]');
      var queryTerm = queryEl.value;
      console.log('searching...', queryTerm);
      var api = new NytApi();
      api.search(queryTerm);
    }
  }, {
    key: "handleResults",
    value: function handleResults(results) {
      var allResultsEl = document.querySelector('.results');
      allResultsEl.textContent = ' ';

      for (var r in results.detail) {
        //
        var resultsEl = document.createElement('li');
        allResultsEl.appendChild(resultsEl); //

        var sectionEl = document.createElement('span');
        resultsEl.appendChild(sectionEl);
        sectionEl.textContent = results.detail[r].section_name; //
        //

        var linkEl = document.createElement('a');
        resultsEl.appendChild(linkEl);
        var headlineEl = document.createElement('h2');
        linkEl.appendChild(headlineEl);
        linkEl.setAttribute('href', results.detail[r].web_url);
        linkEl.setAttribute('target', '_blank');
        headlineEl.textContent = results.detail[r].headline.main; //
        //

        var snippetEl = document.createElement('p');
        resultsEl.appendChild(snippetEl);
        snippetEl.textContent = results.detail[r].snippet; //

        var bylineEl = document.createElement('span');
        resultsEl.appendChild(bylineEl);
        bylineEl.textContent = results.detail[r].byline.original + ' '; //

        var dateEl = document.createElement('span');
        resultsEl.appendChild(dateEl);
        new Date(results.detail[r].pub_date).toDateString();
        dateEl.textContent = new Date(results.detail[r].pub_date).toDateString(); //

        var imgEl = document.createElement('img');
        resultsEl.appendChild(imgEl);
        imgEl.setAttribute('src', results.detail[r].multimedia.url); //
      }

      console.log(results.detail);
    }
  }, {
    key: "handleSearchError",
    value: function handleSearchError(error) {}
  }]);

  return Main;
}();

new Main();
//# sourceMappingURL=main.js.map
