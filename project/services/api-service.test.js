import test from 'tape';
import { createFilters, cleanValues } from './api-service';


test('API Service', nest => {
	nest.test('createFilters should return empty string', assert => {
		const msg = '... did return empty string.';
		const actual = createFilters();
		const expected = '';

		assert.equal(actual, expected, msg);
		assert.end();
  });

  nest.test('createFilters should construct url off params opts with first delimter as ?', assert => {
		const msg = '... constructed url off params opts with first delimter as ?.';
		const opts = {
			test: 'test',
		};
		const actual = createFilters(opts);
		const expected = '?test=test';

		assert.equal(actual, expected, msg);
		assert.end();
  });

  nest.test('createFilters should construct url off params opts with first delimter as ? and rest as &', assert => {
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

  nest.test('createFilters should construct url with same params and different values for arrays', assert => {
		const msg = '... constructed construct url with same params and different values for arrays.';
		const opts = {
			test: ['test1', 'test2', 'test3'],
		};
		const actual = createFilters(opts);
		const expected = '?test=test1&test=test2&test=test3';

		assert.equal(actual, expected, msg);
		assert.end();
  });

  nest.test('cleanValues should return a string', assert => {
		const msg = '... returned string';
		const val = 'test';
		const actual = cleanValues(val);
		const expected = 'test';

		assert.equal(actual, expected, msg);
		assert.end();
  });

  nest.test('cleanValues should replace values , and space with %2C and +', assert => {
		const msg = '... replaced values , and space with %2C and +, mmmmmm Bolognie....';
		const val = 'Bolognie, Italy';
		const actual = cleanValues(val);
		const expected = 'Bolognie%2C+Italy';

		assert.equal(actual, expected, msg);
		assert.end();
  });
});
