import type { Tables } from './schema';

export interface IDataProps<T> {
	data: {
		props: T;
	};
}

export interface IBulletin extends Tables<'bulletins'> {
	users: { name: string; id: string };
}

export interface INote extends Tables<'notes'> {
	users: { name: string; id: string };
}

export interface IGroupMember extends Tables<'group_members'> {
	users: { name: string };
}

export type IResource = Omit<Tables<'resources'>, 'content'>;
