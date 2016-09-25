import React from 'react';
import test from 'tape';
import dom from 'cheerio';

import reactDom from 'react-dom/server';
import createCheckboxList from './CheckboxList';

import helpers from '../../utils/test-utils/test-utils';

const render = reactDom.renderToStaticMarkup;
// eslint-disable-next-line no-unused-vars
const CheckboxList = createCheckboxList(React);

const options = [
	{
		label: 'Internship',
		value: false,
	},
	{
		label: 'Entry Level',
		value: false,
	},
	{
		label: 'Mid Level',
		value: false,
	},
	{
		label: 'Senior Level',
		value: false,
	},
];

const defaultProps = {
	className: 'levels',
	onClickFn: () => {},
	options,
};

test('CheckboxList', nest => {
  nest.test('... should render', assert => {
	const msg = 'CheckboxList should render.';
	const props = helpers.makeProps(defaultProps);

	const $ = dom.load(render(<CheckboxList {...props} />));
	const output = $('.levels-list').length;

	const actual = output > 0;
	const expected = true;

	assert.equal(actual, expected, msg);
	assert.end();
  });
});
