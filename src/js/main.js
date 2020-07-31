//
class Main {
	constructor() {
		// the flow
		//1. set up form event listener(s) that will make the API calls
		//2. setup callback functions to process API responses
		this.setupEventListeners();
	}
	setupEventListeners() {
		const buttonEl = document.querySelector('[name="search"]');
		buttonEl.addEventListener('click', this.handleSearch);
		// buttonEl.addEventListener('click', this.handleResults);
		const bodyEl = document.querySelector('body');
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

	reformatDate = (dateString) => {
		if (dateString == null || dateString == '') {
			return null;
		}

		const matched = dateString.match(
			/^(0?[1-9]|1[0-2])\W(3[01]|[12][0-9]|0?[1-9])\W?(\d*?)$/
		);
		console.log('matched', matched);

		let year = matched[3];
		if (year.length == 0) {
			year = new Date().getFullYear();
		} else if (year.length == 2) {
			year = `20${year}`;
		} else if (year.length != 4) {
			return null;
		}

		const testDate = new Date(year, parseInt(matched[1]) - 1, matched[2]);
		console.log('testDate', testDate);
		if (testDate == null) {
			return null;
		}

		let mm = matched[1];
		if (mm.length == 1) {
			mm = `0${mm}`;
		}
		let dd = matched[2];
		if (dd.length == 1) {
			dd = `0${dd}`;
		}
		let formattedDate = `${year}${mm}${dd}`;
		console.log('formattedDate', formattedDate);
		return formattedDate;
	};
	handleSearch = (event) => {
		event.preventDefault();
		//
		const queryEl = document.querySelector('[name="query"]');
		const queryTerm = queryEl.value;

		const startDateEl = document.querySelector('[name="startDate"]');
		const startDateOrig = startDateEl.value;
		const startDate = this.reformatDate(startDateOrig);

		const endDateEl = document.querySelector('[name="endDate"]');
		const endDateOrig = endDateEl.value;
		const endDate = this.reformatDate(endDateOrig);

		const sortOptionsEl = document.querySelector('[name="sort"]');
		const sortOptionOrig = sortOptionsEl.value;

		const searchOptions = {};
		if (startDate != null) {
			searchOptions.begin_date = startDate;
		}
		if (endDate != null) {
			searchOptions.end_date = endDate;
		}
		searchOptions.sort = sortOptionOrig;

		console.log('searching...', queryTerm, searchOptions);
		const api = new NytApi();
		if (queryTerm === '') {
			alert('You need to search for something');
		} else {
			api.search(queryTerm, searchOptions);
		}
	};

	handleResults(results) {
		const allResultsEl = document.querySelector('.results');

		allResultsEl.textContent = ' ';
		for (let r in results.detail) {
			//
			const resultsEl = document.createElement('li');
			allResultsEl.appendChild(resultsEl);
			//
			const articleContainer = document.createElement('div');
			articleContainer.setAttribute('class', 'article-Container');
			resultsEl.appendChild(articleContainer);
			//
			const aboutArticleContainer = document.createElement('div');
			aboutArticleContainer.setAttribute(
				'class',
				'about-Article-Container)'
			);
			articleContainer.appendChild(aboutArticleContainer);
			//
			const sectionEl = document.createElement('span');
			aboutArticleContainer.appendChild(sectionEl);
			sectionEl.textContent = results.detail[r].section_name;
			//

			//
			const linkEl = document.createElement('a');
			aboutArticleContainer.appendChild(linkEl);
			const headlineEl = document.createElement('h2');
			linkEl.appendChild(headlineEl);
			linkEl.setAttribute('href', results.detail[r].web_url);
			linkEl.setAttribute('target', '_blank');
			headlineEl.textContent = results.detail[r].headline.main;
			//

			//
			const snippetEl = document.createElement('p');
			aboutArticleContainer.appendChild(snippetEl);
			snippetEl.textContent = results.detail[r].snippet;
			//
			const byLineDateContainer = document.createElement('div');
			byLineDateContainer.setAttribute('class', 'byLine-Date-Container');
			articleContainer.appendChild(byLineDateContainer);

			//
			const bylineEl = document.createElement('span');
			byLineDateContainer.appendChild(bylineEl);
			if (results.detail[r].byline.original === null) {
				bylineEl.innerText === 'NYT';
			} else {
				bylineEl.textContent = results.detail[r].byline.original + ' ';
			}
			//
			const dateEl = document.createElement('span');
			byLineDateContainer.appendChild(dateEl);
			new Date(results.detail[r].pub_date.slice(0, 19));
			dateEl.textContent = new Date(
				results.detail[r].pub_date
			).toDateString();
			//
			const imgEl = document.createElement('img');
			resultsEl.appendChild(imgEl);
			for (let m in results.detail[r].multimedia) {
				imgEl.setAttribute(
					'src',
					'https://www.nytimes.com/' +
						results.detail[r].multimedia[m].url
				);
			}
		}
		// console.log(results.detail);
	}

	handleSearchError(error) {}
}

new Main();
