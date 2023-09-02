import * as moment from 'moment';

export class Library {
  private static readonly MOMENT_FORMAT = 'YYYY-MM-DD';

  public static getToday(): string {
    return moment().format(this.MOMENT_FORMAT);
  }

  public static getDateAhead(date: Date, days: number): string {
    return moment(date).add(days, 'day').format(this.MOMENT_FORMAT);
  }

  public static getDateBefore(date: Date, days: number): string {
    return moment(date).subtract(days, 'day').format(this.MOMENT_FORMAT);
  }

  public static momentDate(date: string, format?: string): moment.Moment {
    return moment(date, format);
  }

  public static convertDate(date: Date): string {
    return moment(date).format(this.MOMENT_FORMAT);
  }

  public static parseDate(date: string): Date {
    return moment(date).toDate();
  }
}
