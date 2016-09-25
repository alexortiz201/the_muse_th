import React from 'react';
import test from 'tape';
import dom from 'cheerio';

import reactDom from 'react-dom/server';
import createSwitch from './Switch';

import helpers from '../../utils/test-utils/test-utils';

const render = reactDom.renderToStaticMarkup;
// eslint-disable-next-line no-unused-vars
const Switch = createSwitch(React);

const defaultProps = {
	className: 'test',
};

test('Switch', nest => {
  nest.test('... should render', assert => {
	const msg = 'Switch should render switch.';
	const props = helpers.makeProps(defaultProps);

	const $ = dom.load(render(<Switch {...props} />));
	const output = $('.switch-input').length;

	const actual = output > 0;
	const expected = true;

	assert.equal(actual, expected, msg);
	assert.end();
  });
});
