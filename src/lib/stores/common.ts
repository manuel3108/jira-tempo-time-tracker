import type TempoAccount from '$lib/scripts/models/TempoAccount';
import { writable, type Writable } from 'svelte/store';

export const tempoAccounts: Writable<TempoAccount[]> = writable<TempoAccount[]>([]);
