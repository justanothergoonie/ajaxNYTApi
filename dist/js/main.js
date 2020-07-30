"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
var Main = /*#__PURE__*/function () {
  function Main() {
    var _this = this;

    _classCallCheck(this, Main);

    _defineProperty(this, "reformatDate", function (dateString) {
      if (dateString == null || dateString == '') {
        return null;
      }

      var matched = dateString.match(/^(0?[1-9]|1[0-2])\W(3[01]|[12][0-9]|0?[1-9])\W?(\d*?)$/);
      console.log('matched', matched);
      var year = matched[3];

      if (year.length == 0) {
        year = new Date().getFullYear();
      } else if (year.length == 2) {
        year = "20".concat(year);
      } else if (year.length != 4) {
        return null;
      }

      var testDate = new Date(year, parseInt(matched[1]) - 1, matched[2]);
      console.log('testDate', testDate);

      if (testDate == null) {
        return null;
      }

      var mm = matched[1];

      if (mm.length == 1) {
        mm = "0".concat(mm);
      }

      var dd = matched[2];

      if (dd.length == 1) {
        dd = "0".concat(dd);
      }

      var formattedDate = "".concat(year).concat(mm).concat(dd);
      console.log('formattedDate', formattedDate);
      return formattedDate;
    });

    _defineProperty(this, "handleSearch", function (event) {
      event.preventDefault(); //

      var queryEl = document.querySelector('[name="query"]');
      var queryTerm = queryEl.value;
      var startDateEl = document.querySelector('[name="startDate"]');
      var startDateOrig = startDateEl.value;

      var startDate = _this.reformatDate(startDateOrig);

      var endDateEl = document.querySelector('[name="endDate"]');
      var endDateOrig = endDateEl.value;

      var endDate = _this.reformatDate(endDateOrig);

      var sortOptionsEl = document.querySelector('[name="sort"]');

      for (var option in sortOptionsEl) {
        console.log(sortOptionsEl[option].value);
      } // console.log('sortOptionsEl', sortOptionsEl[1].value);


      var searchOptions = {};

      if (startDate != null) {
        searchOptions.begin_date = startDate;
      }

      if (endDate != null) {
        searchOptions.end_date = endDate;
      }

      console.log('searching...', queryTerm, searchOptions);
      var api = new NytApi();

      if (queryTerm === '') {
        alert('You need to search for something');
      } else {
        api.search(queryTerm, searchOptions);
      }
    });

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
    /**
     * Takes a string value input by a user and converts it to the
     * format expected by the NYT API e.g. YYYYMMDD
     *
     * If the value is empty, or is an invalid date, return null.
     *
     * Allowable input formats: mm/dd/yyyy, mm/dd/yy (will prefix year with 20)
     * 							mm/dd (will assume the current year)
     * 							mm.dd.yyyy, mm-dd-yyyy (and similar variations)
     */

  }, {
    key: "handleResults",
    value: function handleResults(results) {
      var allResultsEl = document.querySelector('.results');
      allResultsEl.textContent = ' ';

      for (var r in results.detail) {
        //
        var resultsEl = document.createElement('li');
        allResultsEl.appendChild(resultsEl); //

        var articleContainer = document.createElement('div');
        articleContainer.setAttribute('class', 'article-Container');
        resultsEl.appendChild(articleContainer); //

        var aboutArticleContainer = document.createElement('div');
        aboutArticleContainer.setAttribute('class', 'about-Article-Container)');
        articleContainer.appendChild(aboutArticleContainer); //

        var sectionEl = document.createElement('span');
        aboutArticleContainer.appendChild(sectionEl);
        sectionEl.textContent = results.detail[r].section_name; //
        //

        var linkEl = document.createElement('a');
        aboutArticleContainer.appendChild(linkEl);
        var headlineEl = document.createElement('h2');
        linkEl.appendChild(headlineEl);
        linkEl.setAttribute('href', results.detail[r].web_url);
        linkEl.setAttribute('target', '_blank');
        headlineEl.textContent = results.detail[r].headline.main; //
        //

        var snippetEl = document.createElement('p');
        aboutArticleContainer.appendChild(snippetEl);
        snippetEl.textContent = results.detail[r].snippet; //

        var byLineDateContainer = document.createElement('div');
        byLineDateContainer.setAttribute('class', 'byLine-Date-Container');
        articleContainer.appendChild(byLineDateContainer); //

        var bylineEl = document.createElement('span');
        byLineDateContainer.appendChild(bylineEl);

        if (results.detail[r].byline.original === null) {
          bylineEl.innerText === 'NYT';
        } else {
          bylineEl.textContent = results.detail[r].byline.original + ' ';
        } //


        var dateEl = document.createElement('span');
        byLineDateContainer.appendChild(dateEl);
        new Date(results.detail[r].pub_date.slice(0, 19));
        dateEl.textContent = new Date(results.detail[r].pub_date).toDateString(); //

        var imgEl = document.createElement('img');
        resultsEl.appendChild(imgEl);

        for (var m in results.detail[r].multimedia) {
          imgEl.setAttribute('src', 'https://www.nytimes.com/' + results.detail[r].multimedia[m].url);
        }
      } // console.log(results.detail);

    }
  }, {
    key: "handleSearchError",
    value: function handleSearchError(error) {}
  }]);

  return Main;
}();

new Main();
//# sourceMappingURL=main.js.map
