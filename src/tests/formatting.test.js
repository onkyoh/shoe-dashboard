import { describe, it, expect } from 'vitest';
import { formatCreatedAt, formatName, formatSortValue } from '../lib/utils';

describe('formatCreatedAt', () => {
	it('returns null if createdAt is null', () => {
		expect(formatCreatedAt(null)).toBeNull();
	});

	it('returns a formatted date string when a valid date is provided', () => {
		const date = new Date(2022, 0, 1);
		expect(formatCreatedAt(date.toISOString())).toBe('2022-01-01');
	});
});

describe('formatName', () => {
	it('returns the full name if it only has one part', () => {
		expect(formatName('John')).toBe('John');
	});

	it('returns the first name and last initial if the name has multiple parts', () => {
		expect(formatName('John Doe')).toBe('John D');
	});

	it('returns the original name if it has multiple parts but the last part is empty', () => {
		expect(formatName('John ')).toBe('John ');
	});

	it('returns an empty string if name is not a string', () => {
		expect(formatName(null)).toBe('');
		expect(formatName(123)).toBe('');
		expect(formatName(undefined)).toBe('');
	});
});

describe('formatSortValue', () => {
	it('returns the formatted sort value with "date" instead of "created_at"', () => {
		expect(formatSortValue(['created_at', 'asc'])).toBe('date|asc');
	});

	it('returns the formatted sort value with the original field name if it is not "created_at"', () => {
		expect(formatSortValue(['name', 'desc'])).toBe('name|desc');
	});

	it('returns an empty string if sortFieldRaw or sortOrder is null', () => {
		expect(formatSortValue([null, 'asc'])).toBe('null|asc');
		expect(formatSortValue(['name', null])).toBe('name|null');
	});

	it('returns the original value if sortFieldRaw or sortOrder is not a string', () => {
		expect(formatSortValue([123, 'asc'])).toBe('123|asc');
		expect(formatSortValue(['name', 123])).toBe('name|123');
	});
});
