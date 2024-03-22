export interface IShoe {
	id: string;
	name: string;
	weight?: number;
	drop?: number;
	category?: string;
	image?: string;
	source?: string;
	date_added?: number;
}

export interface IDataProps<T> {
	data: {
		props: T;
	};
}
