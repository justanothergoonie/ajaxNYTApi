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

	handleSearch(event) {
		event.preventDefault();
		//
		const queryEl = document.querySelector('[name="query"]');
		const queryTerm = queryEl.value;
		console.log('searching...', queryTerm);

		const api = new NytApi();
		api.search(queryTerm);
	}

	handleResults(results) {
		const allResultsEl = document.querySelector('.results');

		allResultsEl.textContent = ' ';
		for (let r in results.detail) {
			//
			const resultsEl = document.createElement('li');
			allResultsEl.appendChild(resultsEl);

			//
			const sectionEl = document.createElement('span');
			resultsEl.appendChild(sectionEl);
			sectionEl.textContent = results.detail[r].section_name;
			//

			//
			const linkEl = document.createElement('a');
			resultsEl.appendChild(linkEl);
			const headlineEl = document.createElement('h2');

			linkEl.appendChild(headlineEl);

			linkEl.setAttribute('href', results.detail[r].web_url);
			linkEl.setAttribute('target', '_blank');
			headlineEl.textContent = results.detail[r].headline.main;
			//

			//
			const snippetEl = document.createElement('p');
			resultsEl.appendChild(snippetEl);
			snippetEl.textContent = results.detail[r].snippet;
			//
			const bylineEl = document.createElement('span');
			resultsEl.appendChild(bylineEl);
			bylineEl.textContent = results.detail[r].byline.original + ' ';
			//
			const dateEl = document.createElement('span');
			resultsEl.appendChild(dateEl);
			new Date(results.detail[r].pub_date).toDateString();
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

			//
		}
		console.log(results.detail);
	}

	handleSearchError(error) {}
}

new Main();
