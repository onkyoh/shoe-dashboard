import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

export function getArrayParams(url: URL, param: string) {
	const values = url.searchParams.getAll(param);
	return values.length > 0 ? values.map((value) => value.split(',')) : null;
}

export function getPageParam(url: URL): number {
	const pageNumberString = url.searchParams.get('page');
	if (!pageNumberString) return 0;
	const pageNumber = parseInt(pageNumberString);
	return isNaN(pageNumber) ? 0 : pageNumber;
}

export function getRangeParams(
	url: URL,
	minRangeParamName: string,
	maxRangeParamName: string
): number[] | null {
	const minRange = parseFloat(url.searchParams.get(minRangeParamName) || '0');
	const maxRange = parseFloat(url.searchParams.get(maxRangeParamName) || '15');

	return [
		Math.min(isNaN(minRange) ? 0 : minRange, isNaN(maxRange) ? 15 : maxRange),
		Math.max(isNaN(minRange) ? 0 : minRange, isNaN(maxRange) ? 15 : maxRange)
	];
}

const sortFields: Record<string, string> = {
	date: 'created_at',
	weight: 'weight',
	drop: 'drop'
};

export function getSortParam(url: URL) {
	const sort = url.searchParams.get('sort');
	const defaultSort = ['created_at', 'desc'];
	if (!sort) {
		return defaultSort;
	}

	const [sortFieldRaw, sortOrder] = sort.split('|');
	const sortField = sortFields[sortFieldRaw];

	if (!sortField || (sortOrder !== 'asc' && sortOrder !== 'desc')) {
		return defaultSort;
	}

	return [sortField, sortOrder];
}

export function addSearchParam(field: string, value: string | number | null | undefined): string {
	const currentParams = new URLSearchParams(window.location.search);
	if (value != null) {
		currentParams.set(field, value.toString());
	}
	return `${window.location.pathname}?${currentParams}`;
}

export function removeSearchParam(paramName: string) {
	const url = new URL(window.location.href);
	url.searchParams.delete(paramName);
	window.history.replaceState({}, '', url.toString());
}

export function formatCreatedAt(createdAt: string | null) {
	if (!createdAt) return null;
	return new Date(createdAt).toLocaleDateString('en-CA');
}

export function formatName(name: string): string {
	if (typeof name !== 'string') return '';
	const parts = name.split(' ');
	if (parts.length > 1) {
		const lastName = parts.pop();
		if (!lastName) return name;
		return `${parts.join(' ')} ${lastName[0]}`;
	}
	return name;
}

export function formatSortValue([sortFieldRaw, sortOrder]: string[]): string {
	const sortField = sortFieldRaw === 'created_at' ? 'date' : sortFieldRaw;
	return `${sortField}|${sortOrder}`; // Format: "field|order" (e.g., "date|asc")
}
