import { describe, it, expect } from 'vitest';
import { addSearchParam, removeSearchParam } from '../lib/utils';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('', { url: 'https://example.com' });
global.window = dom.window;
global.document = dom.window.document;

describe('addSearchParam', () => {
	it('adds a search param to the current URL', () => {
		const field = 'foo';
		const value = 'bar';
		expect(addSearchParam(field, value)).toBe(`/?${field}=${value}`);
	});

	it('overrides an existing search param', () => {
		const field = 'foo';
		const value1 = 'bar';
		const value2 = 'baz';
		addSearchParam(field, value1);
		expect(addSearchParam(field, value2)).toBe(`/?${field}=${value2}`);
	});

	it('does not add a search param if field is not a string', () => {
		const urlBefore = window.location.href;
		addSearchParam(123, 'value');
		expect(window.location.href).toBe(urlBefore);
	});

	it('does not add a search param if value is not a string or number', () => {
		const urlBefore = window.location.href;
		addSearchParam('field', null);
		expect(window.location.href).toBe(urlBefore);
	});

	it('does not add a search param if field is an empty string', () => {
		const urlBefore = window.location.href;
		addSearchParam('', 'value');
		expect(window.location.href).toBe(urlBefore);
	});
});

describe('removeSearchParam', () => {
	it('removes a search param from the current URL', () => {
		const paramName1 = 'foo';
		const paramName2 = 123;
		window.history.replaceState(
			{},
			'',
			`https://example.com/?${paramName1}=bar&fizz=buzz&${paramName2}=456`
		);
		removeSearchParam(paramName1);
		removeSearchParam(paramName2);
		expect(window.location.href).toBe('https://example.com/?fizz=buzz');
	});

	it('does not change the URL if the param does not exist', () => {
		const urlBefore = window.location.href;
		const paramName = 'foo';
		window.history.replaceState({}, '', urlBefore);
		removeSearchParam(paramName);
		expect(window.location.href).toBe(urlBefore);
	});

	it('does not remove a search param if paramName is not a string or number', () => {
		const urlBefore = window.location.href;
		window.history.replaceState({}, '', urlBefore);
		removeSearchParam('');
		removeSearchParam(undefined);
		removeSearchParam(null);
		expect(window.location.href).toBe(urlBefore);
	});
});
