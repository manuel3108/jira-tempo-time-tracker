export function getJiraAuthorizationUrl(clientId: string): string {
	return `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=${clientId}&scope=read%3Ame%20read%3Aissue-details%3Ajira&redirect_uri=${getEncodedUrlIncludingPath()}&state=YOUR_USER_BOUND_VALUE&response_type=code&prompt=consent`;
}

export function getJiraCallbackUrl(): string {
	const url = window.location.origin + '/login/jira/callback';
	return url;
}

function getEncodedUrlIncludingPath() {
	const encodedUrl = encodeURIComponent(getJiraCallbackUrl());
	return encodedUrl;
}
