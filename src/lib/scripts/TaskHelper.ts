import { Duration as DurationDate } from 'luxon';
import type DurationData from './models/DurationData';
import { tempoAccounts } from '$lib/stores/common';
import { get } from 'svelte/store';

export function getRoundedDuration(durations: DurationData[]): number {
	const totalDuration = getDuration(durations);

	const coeff = 1000 * 60 * 5; // round to five minutes
	const rounded = Math.ceil(totalDuration.toMillis() / coeff) * coeff;
	return rounded;
}

export function getDuration(durations: DurationData[]): DurationDate {
	let totalDuration = DurationDate.fromMillis(0);

	durations.forEach((duration) => {
		if (
			duration.duration.values != undefined &&
			duration.duration.values.milliseconds != undefined
		) {
			totalDuration = totalDuration.plus(duration.duration);
		}
	});

	return totalDuration;
}

export function convertAccountIdToAccountKey(accountId: string): string {
	const account = get(tempoAccounts).filter((x) => x.id === Number(accountId))[0];
	return account.key;
}
