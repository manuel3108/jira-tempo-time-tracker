import type { DateTime, Duration } from 'luxon';

export default class DurationData {
	public startTime: DateTime;
	public endTime: DateTime;
	public duration: Duration;
}
