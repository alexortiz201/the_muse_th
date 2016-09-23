export const endpoints = {
	jobs: 'https://api-v2.themuse.com/jobs',
};

/**
 * Creates parameters to use for filtering jobs
 * @param  {Object} opts  key for param name, and value.
 * @return {String}      constructed params string.
 */
// eslint-disable-next-line
export const createFIlters = (opts = {}) => {
	// iterate throuhg keys and if key exist, construct
	// param based on value
	return '';
};

/**
 * Typical fetch
 * @param {Object} opts object for options,
 * including filters.
 * @return {Promise}  a promise
 */
// eslint-disable-next-line
export const getJobs = (opts = {}) => {
	return fetch(`${endpoints.jobs}`, {
		method: 'GET',
	});
};

export default {
	getJobs,
};
