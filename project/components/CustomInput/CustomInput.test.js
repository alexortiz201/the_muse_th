import React from 'react';
import test from 'tape';
import dom from 'cheerio';

import reactDom from 'react-dom/server';
import createCustomInput from './CustomInput';

import helpers from '../../utils/test-utils/test-utils';

const render = reactDom.renderToStaticMarkup;
// eslint-disable-next-line no-unused-vars
const CustomInput = createCustomInput(React);

const defaultProps = {
	type: 'text',
	placeholderText: 'Type Here',
	className: 'test',
};

test('CustomInput', nest => {
  nest.test('... should render', assert => {
    const msg = 'CustomInput should render button.';
    const props = helpers.makeProps(defaultProps);

    const $ = dom.load(render(<CustomInput {...props} />));
    const output = $('.input').length;

    const actual = output > 0;
    const expected = true;

    assert.equal(actual, expected, msg);
    assert.end();
  });
});
