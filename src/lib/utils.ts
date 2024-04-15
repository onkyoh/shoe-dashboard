import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import { goto } from '$app/navigation';
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

export function getFilterParams(url: URL, param: string) {
	const values = url.searchParams.getAll(param);
	return values.length > 0 ? values : null;
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
	const minRangeRaw = url.searchParams.get(minRangeParamName);
	const maxRangeRaw = url.searchParams.get(maxRangeParamName);

	// Ensure maxRange exists
	if (!maxRangeRaw || isNaN(parseFloat(maxRangeRaw))) {
		return null;
	}

	const minRange = minRangeRaw ? parseFloat(minRangeRaw) : 0;
	const maxRange = parseFloat(maxRangeRaw);

	// Enforce minRange <= maxRange
	return [Math.min(minRange, maxRange), maxRange];
}

export function getSortParam(url: URL, defaultSort = ['created_at', 'desc']) {
	const sort = url.searchParams.get('sort');

	if (!sort) {
		return defaultSort; // Return default as an array
	}

	const [sortFieldRaw, sortOrder] = sort.split('|');
	const sortField = sortFieldRaw === 'date' ? 'created_at' : sortFieldRaw;

	return [sortField, sortOrder];
}

export function addSearchParam(field: string, value: string | number) {
	const currentParams = new URLSearchParams(window.location.search);
	currentParams.set(field, value.toString());
	goto(`${window.location.pathname}?${currentParams}`);
}
