//
class NytApi {
	//
	API_URL_BASE = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

	API_KEY = 'TdnPuYVlx3m5XnJ8WCV2br6J1wo3AnEM';

	constructor() {}

	search(term, options = {}) {
		axios
			.get(this.API_URL_BASE, {
				params: {
					'api-key': this.API_KEY,
					q: term,
					...options,
				},
			})
			.then(this.handleResponse)
			.catch(this.handleError);
	}
	handleResponse(response) {
		console.log('got a response', response);

		const value = response.data.response.docs;

		const event = new CustomEvent('got-results', { detail: value });
		document.querySelector('body').dispatchEvent(event);
	}

	handleError(error) {}
}
