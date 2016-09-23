import React from 'react';
import test from 'tape';
import dom from 'cheerio';

import reactDom from 'react-dom/server';
import createMain from './Main';

import helpers from '../../utils/test-utils/test-utils';

const render = reactDom.renderToStaticMarkup;
// eslint-disable-next-line no-unused-vars
const Main = createMain(React);

const defaultProps = {
	render: () => {},
	onClickFn: () => {},
};

test('Main', nest => {
  nest.test('... should render', assert => {
	const msg = '... should render Main.';
	const props = helpers.makeProps(defaultProps);

	const $ = dom.load(render(<Main {...props} />));
	const output = $('.main').length;

	const actual = output > 0;
	const expected = true;

	assert.equal(actual, expected, msg);
	assert.end();
  });
});
