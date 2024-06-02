import { describe, it, expect } from 'vitest';
import { getArrayParams, getPageParam, getRangeParams, getSortParam } from '../lib/utils';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('', { url: 'https://example.com' });
global.window = dom.window;
global.document = dom.window.document;

describe('getArrayParams', () => {
	it('returns null when no param is present in the URL', () => {
		const url = new URL('https://example.com');
		expect(getArrayParams(url, 'foo')).toBe(null);
	});

	it('returns an array of values when a single param is present in the URL', () => {
		const url = new URL('https://example.com/?foo=bar');
		expect(getArrayParams(url, 'foo')).toEqual([['bar']]);
	});

	it('returns an array of values when multiple params are present in the URL', () => {
		const url = new URL('https://example.com/?foo=bar&foo=baz');
		expect(getArrayParams(url, 'foo')).toEqual([['bar'], ['baz']]);
	});

	it('returns an array of split values when a comma-separated param is present in the URL', () => {
		const url = new URL('https://example.com/?foo=bar,baz');
		expect(getArrayParams(url, 'foo')).toEqual([['bar', 'baz']]);
	});
});

describe('getPageParam', () => {
	it('returns 0 when no page param is present in the URL', () => {
		const url = new URL('https://example.com');
		expect(getPageParam(url)).toBe(0);
	});

	it('returns the page number when a valid page param is present in the URL', () => {
		const url = new URL('https://example.com/?page=2');
		expect(getPageParam(url)).toBe(2);
	});

	it('returns 0 when a non-numeric page param is present in the URL', () => {
		const url = new URL('https://example.com/?page=foo');
		expect(getPageParam(url)).toBe(0);
	});

	it('returns 0 when the page param is not a number', () => {
		const url = new URL('https://example.com/?page=foo');
		expect(getPageParam(url)).toBe(0);
	});

	it('returns 0 when the page param is null', () => {
		const url = new URL('https://example.com/?page');
		expect(getPageParam(url)).toBe(0);
	});
});

describe('getRangeParams', () => {
	it('returns the default range when no range params are present in the URL', () => {
		const url = new URL('https://example.com');
		expect(getRangeParams(url, 'min', 'max')).toEqual([0, 15]);
	});

	it('returns the parsed range when valid range params are present in the URL', () => {
		const url = new URL('https://example.com/?min=5&max=10');
		expect(getRangeParams(url, 'min', 'max')).toEqual([5, 10]);
	});

	it('returns the enforced range when minRange is greater than maxRange', () => {
		const url = new URL('https://example.com/?min=10&max=5');
		expect(getRangeParams(url, 'min', 'max')).toEqual([5, 10]);
	});

	it('returns the default range when the minRange param is not a number', () => {
		const url = new URL('https://example.com/?min=foo&max=10');
		expect(getRangeParams(url, 'min', 'max')).toEqual([0, 10]);
	});

	it('returns the default range when the maxRange param is not a number', () => {
		const url = new URL('https://example.com/?min=5&max=foo');
		expect(getRangeParams(url, 'min', 'max')).toEqual([5, 15]);
	});

	it('returns the default range when the minRange param is null', () => {
		const url = new URL('https://example.com/?min&max=10');
		expect(getRangeParams(url, 'min', 'max')).toEqual([0, 10]);
	});

	it('returns the default range when the maxRange param is null', () => {
		const url = new URL('https://example.com/?min=5&max');
		expect(getRangeParams(url, 'min', 'max')).toEqual([5, 15]);
	});
});

describe('getSortParam', () => {
	it('returns the default sort when no sort param is present in the URL', () => {
		const url = new URL('https://example.com');
		expect(getSortParam(url)).toEqual(['created_at', 'desc']);
	});

	it('returns the parsed sort when a valid sort param is present in the URL', () => {
		const url = new URL('https://example.com/?sort=weight|asc');
		expect(getSortParam(url)).toEqual(['weight', 'asc']);
	});

	it('returns the default sort when an invalid sort field is present in the URL', () => {
		const url = new URL('https://example.com/?sort=invalidSort|asc');
		expect(getSortParam(url)).toEqual(['created_at', 'desc']);
	});

	it('returns the parsed and modified sort when a date sort param is present in the URL', () => {
		const url = new URL('https://example.com/?sort=date|asc');
		expect(getSortParam(url)).toEqual(['created_at', 'asc']);
	});

	it('returns the default sort when a sort param without a field is present in the URL', () => {
		const url = new URL('https://example.com/?sort=|asc');
		expect(getSortParam(url)).toEqual(['created_at', 'desc']);
	});
});
