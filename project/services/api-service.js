export const endpoints = {
	jobs: 'https://api-v2.themuse.com/jobs',
};

export const cleanValues = (value = '') => {
	let cleanVal = value
			.replace(/,/g, '%2C')
			.replace(' ', '+');

	return cleanVal;
};

const getDelimeter = (counter) => {
	return counter === 0 ? '?' : '&';
};

/**
 * Creates parameters to use for filtering jobs
 * @param  {Object} opts  key for param name, and value.
 * @return {String}      constructed params string.
 */
export const createFilters = (opts = {}) => {
	const keys = Object.keys(opts);
	let urlParams = [];
	let counter = 0;

	if (!keys.length) {
		return '';
	}

	// iterate through keys and if key exist, construct
	// param based on value
	keys.forEach((key) => {
		let valIsArray = Array.isArray(opts[key]);

		if (valIsArray && opts[key].length) {
			opts[key].forEach((val) => {
				urlParams.push(`${getDelimeter(counter)}${key}=${val}`);
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
 * Typical fetch with cache
 * @param {Object} opts object for options,
 * including filters.
 * @return {Promise}  a promise
 */
export const createGetJobsWithCache = (cache ={}) =>
	(opts = {}) => {
		const url = `${endpoints.jobs}${createFilters(opts)}`;

		if (cache[url]) {
			return Promise.resolve(cache[url]);
		}

		let p = fetch(url, {
			method: 'GET',
			cache: 'force-cache',
		});

		p.then(response => {
			cache[response.url] = response;
			return cache[response.url];
		});

		return p;
	};

export default {
	createGetJobsWithCache,
};
