import * as moment from 'moment';
import 'moment/locale/pt-br';

export class Library {
  private static readonly MOMENT_FORMAT = 'YYYY-MM-DD';

  public static getToday(): string {
    return moment().format(this.MOMENT_FORMAT);
  }

  public static getNextDay(date: Date): string {
    return moment(date).add(1, 'day').format(this.MOMENT_FORMAT);
  }

  public static dateToString(date: Date): string {
    return moment(date).format(this.MOMENT_FORMAT);
  }

  public static parseDate(date: string): Date {
    return moment(date).toDate();
  }
}
