export function formatSortValue([sortFieldRaw, sortOrder]: string[]): string {
	const sortField = sortFieldRaw === 'created_at' ? 'date' : sortFieldRaw;
	return `${sortField}|${sortOrder}`; // Format: "field|order" (e.g., "date|asc")
}

export function removeSearchParam(paramName: string) {
	const url = new URL(window.location.href);
	url.searchParams.delete(paramName);
	window.history.replaceState({}, '', url.toString());
}
