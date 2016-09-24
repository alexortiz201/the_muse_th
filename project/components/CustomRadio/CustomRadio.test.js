import React from 'react';
import test from 'tape';
import dom from 'cheerio';

import reactDom from 'react-dom/server';
import createCustomRadio from './CustomRadio';

import helpers from '../../utils/test-utils/test-utils';

const render = reactDom.renderToStaticMarkup;
// eslint-disable-next-line no-unused-vars
const CustomRadio = createCustomRadio(React);

const descendingOptions = [
	{
		text: 'Ascending',
		default: true,
	},
	{
		text: 'Descending',
	},
];

const defaultProps = {
	className: 'test',
	options: descendingOptions,
};

test('CustomRadio', nest => {
  nest.test('... should render', assert => {
	const msg = 'CustomRadio should render button.';
	const props = helpers.makeProps(defaultProps);

	const $ = dom.load(render(<CustomRadio {...props} />));
	const output = $('.radio-btn').length;

	const actual = output > 0;
	const expected = true;

	assert.equal(actual, expected, msg);
	assert.end();
  });
});
