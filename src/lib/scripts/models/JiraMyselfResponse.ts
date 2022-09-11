export interface AvatarUrls {
	'48x48': string;
	'24x24': string;
	'16x16': string;
	'32x32': string;
}

export interface Groups {
	size: number;
	items: any[];
}

export interface ApplicationRoles {
	size: number;
	items: any[];
}

export interface JiraMyselfResponse {
	self: string;
	key: string;
	accountId: string;
	accountType: string;
	name: string;
	emailAddress: string;
	avatarUrls: AvatarUrls;
	displayName: string;
	active: boolean;
	timeZone: string;
	groups: Groups;
	applicationRoles: ApplicationRoles;
}
