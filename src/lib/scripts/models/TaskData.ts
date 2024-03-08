import type DurationData from './DurationData';

export default class TaskData {
	public issue: string;
	public issueName: string;
	public description: string;
	public durations: DurationData[];
}
