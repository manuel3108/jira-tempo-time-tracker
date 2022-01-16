export interface Issue {
	id: number;
	key: string;
	keyHtml: string;
	img: string;
	summary: string;
	summaryText: string;
}

export interface Section {
	label: string;
	sub: string;
	id: string;
	issues: Issue[];
}

export interface IssueSearchResponse {
	sections: Section[];
}
