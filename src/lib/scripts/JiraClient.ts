import { getJiraAccessToken, getJiraRefreshToken, loadConfig, saveJiraTokens } from './Config';
import type { IssueSearchResponse } from './models/IssueSearchResponse';
import jwt_decode from 'jwt-decode';
import { DateTime } from 'luxon';

function getBaseUrl() {
	const config = loadConfig();
	return `https://api.atlassian.com/ex/jira/${config.jira.cloudId}/`;
}

async function updateToken() {
	const config = loadConfig();

	const data = {
		grant_type: 'refresh_token',
		client_id: config.jira.clientId,
		client_secret: config.jira.clientSecret,
		refresh_token: getJiraRefreshToken()
	};

	const response = await fetch('https://auth.atlassian.com/oauth/token', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const json = await response.json();
	saveJiraTokens(json.access_token, json.refresh_token);
}

async function makeApiCall<T>(path: string): Promise<T> {
	const baseUrl = getBaseUrl();
	let token = getJiraAccessToken();

	const decoded: any = jwt_decode(token);
	if (DateTime.fromMillis(decoded.exp * 1000) < DateTime.now()) {
		await updateToken();
		token = getJiraAccessToken();
	}
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
