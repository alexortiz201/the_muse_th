export const endpoints = {
	jobs: 'https://api-v2.themuse.com/jobs',
};

/**
 * Creates parameters to use for filtering jobs
 * @param  {Object} opts  key for param name, and value.
 * @return {String}      constructed params string.
 */
// eslint-disable-next-line
export const createFilters = (opts = {}) => {
	const keys = Object.keys(opts);
	let urlParams = [];

	if (!keys.length) {
		return '';
	}

	// iterate through keys and if key exist, construct
	// param based on value
	Object.keys(opts).forEach((key, index) => {
		let delimeter = index === 0 ? '?' : '&';
		urlParams.push(`${delimeter}${key}=${opts[key]}`);
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
