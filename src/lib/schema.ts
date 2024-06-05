export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	public: {
		Tables: {
			bulletins: {
				Row: {
					content: string;
					created_at: string | null;
					delete_at: string;
					group_id: string | null;
					id: string;
					priority: number;
					user_id: string | null;
				};
				Insert: {
					content: string;
					created_at?: string | null;
					delete_at: string;
					group_id?: string | null;
					id?: string;
					priority: number;
					user_id?: string | null;
				};
				Update: {
					content?: string;
					created_at?: string | null;
					delete_at?: string;
					group_id?: string | null;
					id?: string;
					priority?: number;
					user_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'bulletins_group_id_fkey';
						columns: ['group_id'];
						isOneToOne: false;
						referencedRelation: 'groups';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'bulletins_user_id_fkey';
						columns: ['user_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			group_members: {
				Row: {
					group_id: string;
					id: string;
					role: string;
					user_id: string;
				};
				Insert: {
					group_id: string;
					id?: string;
					role?: string;
					user_id: string;
				};
				Update: {
					group_id?: string;
					id?: string;
					role?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'public_group_members_group_id_fkey';
						columns: ['group_id'];
						isOneToOne: false;
						referencedRelation: 'groups';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'public_group_members_user_id_fkey';
						columns: ['user_id'];
						isOneToOne: true;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			groups: {
				Row: {
					created_at: string;
					id: string;
					name: string;
				};
				Insert: {
					created_at?: string;
					id?: string;
					name: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					name?: string;
				};
				Relationships: [];
			};
			notes: {
				Row: {
					content: string;
					created_at: string | null;
					group_id: string | null;
					id: string;
					shoe_id: string;
					shoe_name: string | null;
					user_id: string;
				};
				Insert: {
					content: string;
					created_at?: string | null;
					group_id?: string | null;
					id?: string;
					shoe_id: string;
					shoe_name?: string | null;
					user_id?: string;
				};
				Update: {
					content?: string;
					created_at?: string | null;
					group_id?: string | null;
					id?: string;
					shoe_id?: string;
					shoe_name?: string | null;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'notes_shoe_id_fkey';
						columns: ['shoe_id'];
						isOneToOne: false;
						referencedRelation: 'shoes';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'notes_shoe_name_fkey';
						columns: ['shoe_name'];
						isOneToOne: false;
						referencedRelation: 'shoes';
						referencedColumns: ['name'];
					},
					{
						foreignKeyName: 'public_notes_group_id_fkey';
						columns: ['group_id'];
						isOneToOne: false;
						referencedRelation: 'groups';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'public_notes_user_id_fkey';
						columns: ['user_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			resources: {
				Row: {
					content: string;
					created_at: string;
					description: string;
					id: string;
					title: string;
					link: string;
				};
				Insert: {
					content?: string;
					created_at?: string;
					description: string;
					id?: string;
					title: string;
					link?: string;
				};
				Update: {
					content?: string;
					created_at?: string;
					description?: string;
					id?: string;
					title?: string;
					link?: string;
				};
				Relationships: [];
			};
			shoes: {
				Row: {
					category: string;
					created_at: string;
					drop: number;
					id: string;
					image: string;
					name: string;
					source: string;
					weight: number;
				};
				Insert: {
					category: string;
					created_at?: string;
					drop: number;
					id?: string;
					image: string;
					name: string;
					source: string;
					weight: number;
				};
				Update: {
					category?: string;
					created_at?: string;
					drop?: number;
					id?: string;
					image?: string;
					name?: string;
					source?: string;
					weight?: number;
				};
				Relationships: [];
			};
			users: {
				Row: {
					created_at: string;
					email: string;
					group_id: string | null;
					id: string;
					name: string;
				};
				Insert: {
					created_at?: string;
					email: string;
					group_id?: string | null;
					id: string;
					name: string;
				};
				Update: {
					created_at?: string;
					email?: string;
					group_id?: string | null;
					id?: string;
					name?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'public_users_group_id_fkey';
						columns: ['group_id'];
						isOneToOne: false;
						referencedRelation: 'groups';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'public_users_id_fkey';
						columns: ['id'];
						isOneToOne: true;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			allow_read_by_group: {
				Args: Record<PropertyKey, never>;
				Returns: boolean;
			};
			create_group_and_link_user: {
				Args: {
					group_name: string;
					user_id: string;
				};
				Returns: undefined;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
		? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
		? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
		? PublicSchema['Enums'][PublicEnumNameOrOptions]
		: never;
