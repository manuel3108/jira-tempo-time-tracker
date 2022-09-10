export function getTempoAuthorizationUrl(jiraDomain: string, clientId: string): string {
	return `https://${jiraDomain}/plugins/servlet/ac/io.tempo.jira/oauth-authorize/?client_id=${clientId}&redirect_uri=${getEncodedUrlIncludingPath()}`;
}

export function getTempoCallbackUrl(): string {
	const url = window.location.origin + '/login/tempo/callback';
	return url;
}

function getEncodedUrlIncludingPath() {
	const encodedUrl = encodeURIComponent(getTempoCallbackUrl());
	return encodedUrl;
}
