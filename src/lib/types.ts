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

export interface IGroupMember {
	id: string;
	role: 'admin' | 'editor' | 'viewer';
	user_id: string;
	group_id: string;
	users: {
		name: string;
		id: string;
	};
}

export interface IGroup {
	id: string;
	name: string;
}

export interface IDataProps<T> {
	data: {
		props: T;
	};
}

export interface INote {
	shoe_name: string;
	content: string;
	created_at: string;
	group_id: string | null;
	id: string;
	user_id: string;
	users: {
		name: string;
	};
}
