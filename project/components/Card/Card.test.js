import React from 'react';
import test from 'tape';
import dom from 'cheerio';

import reactDom from 'react-dom/server';
import createCardList from './Card';

import helpers from '../../utils/test-utils/test-utils';

const render = reactDom.renderToStaticMarkup;
// eslint-disable-next-line no-unused-vars
const CardList = createCardList(React);

const defaultProps = {
	className: 'test',
	options: [],
};

test('CardList', nest => {
  nest.test('... should not render', assert => {
		const msg = '... should not render CardList.';
		const props = helpers.makeProps(defaultProps);

		const $ = dom.load(render(<CardList {...props} />));
		const output = $('.test').length;

		const actual = output === 0;
		const expected = true;

		assert.equal(actual, expected, msg);
		assert.end();
  });

  nest.test('... should render', assert => {
		const msg = '... render Cards.';
		const props = helpers.makeProps(defaultProps, {
			options: [{
				id: 123,
				name: 'Software Engineer',
				company: { name: 'Google' },
				refs: { landing_page: 'http://www.google.com' }
			},
			{
				id: 234,
				name: 'Gibson Cowboy',
				company: { name: 'Armitage' },
				refs: { landing_page: 'http://127.0.0.1' }
			}]
		});

		const $ = dom.load(render(<CardList {...props} />));
		const output = $('.test').length;

		const actual = output > 1;
		const expected = true;

		assert.equal(actual, expected, msg);
		assert.end();
  });
});
