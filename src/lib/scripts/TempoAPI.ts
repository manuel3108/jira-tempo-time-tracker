import {
	fetch,
	Body,
	ResponseType,
	Response,
	type HttpVerb,
	type FetchOptions
} from '@tauri-apps/api/http';
import { DateTime } from 'luxon';
import { getTempoAccessToken, loadConfig } from './Config';
import { getJiraProfile } from './JiraClient';
import { getTempoCallbackUrl } from './TempoLogin';

const TEMPO_BASE_URL = 'https://api.tempo.io';
const TEMPO_V3_BASE_URL = TEMPO_BASE_URL + '/4';

export async function fetchTokensFromCode(code: string): Promise<Response<any>> {
	const config = loadConfig();

	const dataA: Record<string, string> = {
		grant_type: 'authorization_code',
		client_id: config.tempo.clientId,
		client_secret: config.tempo.clientSecret,
		code: code,
		redirect_uri: getTempoCallbackUrl()
	};

	const response = await fetch(TEMPO_BASE_URL + '/oauth/token', {
		method: 'POST',
		body: Body.text(new URLSearchParams(dataA).toString()),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		responseType: ResponseType.JSON
	});

	return response;
}

export async function fetchTempoAccounts() {
	return (await makeTempoRequest(TEMPO_V3_BASE_URL + '/accounts', 'GET')).results;
}

export async function bookTempoWorklog(
	issueId: number,
	description: string,
	accountKey: string,
	timeSpent: number,
	starTime: DateTime
) {
	timeSpent = timeSpent / 1000;
	const jiraProfile = await getJiraProfile();

	const requestData = {
		issueId,
		timeSpentSeconds: timeSpent,
		billableSeconds: timeSpent,
		startDate: DateTime.now().toFormat('yyyy-MM-dd'),
		startTime: starTime.toFormat("HH:mm:ss"),
		description: description,
		authorAccountId: jiraProfile.accountId,
		attributes: [
			{
				key: '_Account_',
				value: accountKey
			}
		]
	};

	const response = await makeTempoRequest(TEMPO_V3_BASE_URL + '/worklogs', 'POST', requestData);
	return response.errors as {message:string}[];
}

// Note: We use the http server provided by tauri here, because we will get cors problems otherwise
async function makeTempoRequest(
	url: string,
	method: HttpVerb,
	data: Record<any, any> | null = null
): Promise<any> {
	// TODO: Handle expired tempo tokens

	const request: FetchOptions = {
		method,
		headers: {
			Authorization: `Bearer ${getTempoAccessToken()}`
		}
	};

	if (data != null) {
		request.body = Body.json(data);
	}

	const response = await fetch(url, request);
	return response.data;
}
