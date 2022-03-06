import { CONFIG_COOKIE_NAME, JIRA_ACCESS_TOKEN_NAME, JIRA_REFRESH_TOKEN_NAME } from './Defaults';
import Cookies from 'js-cookie';

interface Config {
	jira: {
		clientId: string;
		clientSecret: string;
		cloudId: string;
	};
}

export function configExists(): boolean {
	return Cookies.get(CONFIG_COOKIE_NAME) != undefined;
}

export function loadConfig(): Config {
	const config = JSON.parse(Cookies.get(CONFIG_COOKIE_NAME));
	return config;
}

export function saveJiraTokens(accessToken: string, refreshToken: string): void {
	Cookies.set(JIRA_ACCESS_TOKEN_NAME, accessToken);
	Cookies.set(JIRA_REFRESH_TOKEN_NAME, refreshToken);
}

export function getJiraAccessToken(): string {
	return Cookies.get(JIRA_ACCESS_TOKEN_NAME);
}

export function getJiraRefreshToken(): string {
	return Cookies.get(JIRA_REFRESH_TOKEN_NAME);
}
