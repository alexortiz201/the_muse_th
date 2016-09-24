// eslint-disable-next-line
import React from 'react';
import test from 'tape';
import { createFilters } from './api-service';


test('API Service', nest => {
	nest.test('... should return empty string', assert => {
		const msg = '... did return empty string.';
		const actual = createFilters();
		const expected = '';

		assert.equal(actual, expected, msg);
		assert.end();
  });

  nest.test('... should construct url off params opts with first delimter as ?', assert => {
		const msg = '... constructed url off params opts with first delimter as ?.';
		const opts = {
			test: 'test',
		};
		const actual = createFilters(opts);
		const expected = '?test=test';

		assert.equal(actual, expected, msg);
		assert.end();
  });

  nest.test('... should construct url off params opts with first delimter as ? and rest as &', assert => {
		const msg = '... constructed url off params opts with first delimter as ? and rest as &.';
		const opts = {
			test: 'test',
			test2: 'test2',
		};
		const actual = createFilters(opts);
		const expected = '?test=test&test2=test2';

		assert.equal(actual, expected, msg);
		assert.end();
  });
});
