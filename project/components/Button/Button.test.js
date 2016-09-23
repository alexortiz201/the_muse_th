import React from 'react';
import test from 'tape';
import dom from 'cheerio';

import reactDom from 'react-dom/server';
import createButton from './Button';

import helpers from '../../utils/test-utils/test-utils';

const render = reactDom.renderToStaticMarkup;
// eslint-disable-next-line no-unused-vars
const Button = createButton(React);

const defaultProps = {
	className: '',
	text: '',
	onClickFn: () => {},
};

test('Button', nest => {
  nest.test('... should render', assert => {
    const msg = 'Button should render button.';
    const props = helpers.makeProps(defaultProps);

    const $ = dom.load(render(<Button {...props} />));
    const output = $('.btn').length;

    const actual = output > 0;
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });
});
