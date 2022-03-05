import { getJiraAccessToken } from './Config';
import type { IssueSearchResponse } from './models/IssueSearchResponse';

function getBaseUrl() {
	return 'https://api.atlassian.com/ex/jira/a2287409-a192-4405-be5b-b30a3c375bfc/';
}

async function makeApiCall<T>(path: string): Promise<T> {
	const baseUrl = getBaseUrl();
	const token = getJiraAccessToken();

	const response = await fetch(`${baseUrl}${path}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	});
	const json = await response.json();

	return json as T;
}

export async function searchIssues(query: string): Promise<IssueSearchResponse> {
	return await makeApiCall<IssueSearchResponse>(
		`rest/api/3/issue/picker?query=${query}&currentJQL=`
	);
}
