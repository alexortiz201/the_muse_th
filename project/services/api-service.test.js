// eslint-disable-next-line
import React from 'react';
import test from 'tape';
import { createFIlters } from './api-service';


test('API Service', nest => {
	nest.test('... should return empty string', assert => {
		const msg = '... did return empty string.';
		const actual = createFIlters();
		const expected = '';

		assert.equal(actual, expected, msg);
		assert.end();
  });

  nest.test('... should construct url off params opts', assert => {
		const msg = '... constructed url off params opts.';
		const actual = createFIlters();
		const expected = '&test=test';

		assert.equal(actual, expected, msg);
		assert.end();
  });
});
