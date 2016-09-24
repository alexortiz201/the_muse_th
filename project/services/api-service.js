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
	Object.keys(opts).forEach((key) => {
		if (Array.isArray(opts[key]) && opts[key].length) {
			opts[key].forEach((val) => {
				urlParams.push(`${getDelimeter(counter)}${key}=${val}`);
				counter++;
			});
		} else {
			urlParams.push(`${getDelimeter(counter)}${key}=${opts[key]}`);
		}

		counter++;
	});

	return urlParams.join('');
};

/**
 * Typical fetch
 * @param {Object} opts object for options,
 * including filters.
 * @return {Promise}  a promise
 */
// eslint-disable-next-line
export const getJobs = (opts = {}) => {
	return fetch(`${endpoints.jobs}${createFilters(opts)}`, {
		method: 'GET',
	});
};

export default {
	getJobs,
};
