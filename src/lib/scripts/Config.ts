import {
	CONFIG_COOKIE_NAME,
	JIRA_ACCESS_TOKEN_NAME,
	JIRA_REFRESH_TOKEN_NAME,
	TEMPO_ACCESS_TOKEN_NAME,
	TEMPO_REFRESH_TOKEN_NAME,
	TEMPO_EXPIRES_IN_TOKEN_NAME
} from './Defaults';

interface Config {
	jira: {
		clientId: string;
		clientSecret: string;
		cloudId: string;
		domain: string;
	};
	tempo: {
		clientId: string;
		clientSecret: string;
	};
}

export function configExists(): boolean {
	return localStorage.getItem(CONFIG_COOKIE_NAME) != undefined;
}

export function loadConfig(): Config {
	const config = JSON.parse(localStorage.getItem(CONFIG_COOKIE_NAME) ?? '');
	return config;
}

export function saveJiraTokens(accessToken: string, refreshToken: string): void {
	localStorage.setItem(JIRA_ACCESS_TOKEN_NAME, accessToken);
	localStorage.setItem(JIRA_REFRESH_TOKEN_NAME, refreshToken);
}

export function saveTempoTokens(
	accessToken: string,
	refreshToken: string,
	expiresIn: string
): void {
	localStorage.setItem(TEMPO_ACCESS_TOKEN_NAME, accessToken);
	localStorage.setItem(TEMPO_REFRESH_TOKEN_NAME, refreshToken);
	localStorage.setItem(TEMPO_EXPIRES_IN_TOKEN_NAME, expiresIn);
}

export function getTempoAccessToken(): string {
	return localStorage.getItem(TEMPO_ACCESS_TOKEN_NAME) ?? '';
}

export function getJiraAccessToken(): string {
	return localStorage.getItem(JIRA_ACCESS_TOKEN_NAME) ?? '';
}

export function getJiraRefreshToken(): string {
	return localStorage.getItem(JIRA_REFRESH_TOKEN_NAME) ?? '';
}
