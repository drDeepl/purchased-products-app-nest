import {
  Instant,
  ZonedDateTime,
  ZoneId,
  DateTimeFormatter,
  ZoneOffset,
  ZoneRegion,
  TemporalAccessor,
} from '@js-joda/core';
export class ZoneDateTimeUtil {
  private instant: Instant;

  constructor(epochMilli: number) {
    this.instant = Instant.ofEpochMilli(epochMilli);
  }

  getStartDay(): string {
    // const d = DateTimeFormatter.ofPattern('yyyy-MM-ddThh:mm:ss.Z');

    const zoneDateTime = ZonedDateTime.ofInstant(this.instant, ZoneId.UTC)
      .withZoneSameInstant(ZoneId.SYSTEM)
      .withHour(0)
      .withMinute(0)
      .withSecond(0);

    return zoneDateTime.format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
  }

  getEndDay(): string {
    const zoneDateTime = ZonedDateTime.ofInstant(this.instant, ZoneId.UTC)
      .withZoneSameInstant(ZoneId.SYSTEM)
      .withHour(23)
      .withMinute(59)
      .withSecond(59);
    return zoneDateTime.format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
  }
}
