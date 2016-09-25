export const endpoints = {
	jobs: 'https://api-v2.themuse.com/jobs',
};

/**
 * Remove certain characters from value.
 * @param  {String} value
 * @return {String}       value after character clean up.
 */
export const cleanValues = (value = '') => {
	let cleanVal = value
		.replace(/&/g, '%26')
		.replace(/,/g, '%2C')
		.replace(/ /g, '+');

	return cleanVal;
};

// get delimeter for url params.
const getDelimeter = (counter) => {
	return counter === 0 ? '?' : '&';
};

/**
 * Creates parameters to use for filtering jobs
 * @param  {Object} opts  	key for param name and value name=value.
 * @return {String}      		constructed params string.
 */
export const createFilters = (opts = {}) => {
	const keys = Object.keys(opts);
	let urlParams = [];
	let counter = 0;

	if (!keys.length) {
		return '';
	}

	// iterate through keys and if key exist, construct
	// param based on value, empty vals exempt for url.
	keys.forEach((key) => {
		let valIsArray = Array.isArray(opts[key]);

		if (valIsArray && opts[key].length) {
			opts[key].forEach((val) => {
				let cleanVal = cleanValues(val);
				urlParams.push(`${getDelimeter(counter)}${key}=${cleanVal}`);
				counter++;
			});
		} else if (!valIsArray && opts[key]) {
			urlParams.push(`${getDelimeter(counter)}${key}=${opts[key]}`);
			counter++;
		}
	});

	return urlParams.join('');
};

/**
 * Typical fetch with cache factory function.
 * This allows the caching on the invoking side,
 * decoupling internals of service from invoking functions.
 *
 * @param {Object} cache 			object on which to store response.
 * @return {function}
 *   @param {Object} filters 		object of filters.
 *   @return {Promise}  				a promise with response, or cached response
 *                            	if its stored.
 */
export const createGetJobsWithCache = (cache ={}) =>
	(filters = {}) => {
		const url = `${endpoints.jobs}${createFilters(filters)}`;

		if (cache[url]) {
			return Promise.resolve(cache[url]);
		}

		return fetch(url, {
			method: 'GET',
			cache: 'force-cache',
		})
		.then(response => {
			cache[url] = response.json();
			return cache[url];
		});
	};

export default {
	createGetJobsWithCache,
};
