declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: {
				id: number;
				name: string | null;
				email: string;
				roleId: number | null;
			};
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
