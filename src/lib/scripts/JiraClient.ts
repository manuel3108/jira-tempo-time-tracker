import { getJiraAccessToken, loadConfig } from './Config';
import type { IssueSearchResponse } from './models/IssueSearchResponse';

function getBaseUrl() {
	const config = loadConfig();
	return `https://api.atlassian.com/ex/jira/${config.jira.appId}/`;
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
