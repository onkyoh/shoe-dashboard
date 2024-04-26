// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import { SupabaseClient } from '@supabase/supabase-js';
import type { Session, User } from '@supabase/supabase-js';

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>;
			safeGetSession(): Promise<{ session: Session | null; user: User | null }>;
		}
		interface PageData {
			session: Session | null;
		}
		interface Error {
			message?: string;
			link?: {
				href: string;
				label: string;
			};
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
