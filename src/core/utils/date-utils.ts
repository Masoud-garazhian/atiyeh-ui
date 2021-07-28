import moment from 'moment';

export class DateUtil {
  static differentMonth(d1?: Date, d2?: Date): boolean {
    const isNull = !!d1 !== !!d2;
    const differentYear = DateUtil.differentYear(d1, d2);
    return isNull || differentYear || d1?.getMonth() !== d2?.getMonth();
  }
  static differentYear(d1?: Date, d2?: Date): boolean {
    return !!d1 !== !!d2 || d1?.getFullYear() !== d2?.getFullYear();
  }
  static toFullDate(date?: Date): string | undefined {
    const _date = new Date(date!);
    if (_date instanceof Date && !isNaN(_date.valueOf())) {
      const [y, m, d, h, min, s] = [_date.getFullYear(), _date.getMonth(), _date?.getDate(), _date?.getHours(), _date?.getMinutes(), _date?.getSeconds()]
        .map(x => x.toString().padStart(2, '0'));
      return `${y} ${DateUtil.monthName(Number(m))} ${d} - ${h}:${min}:${s}`;
    }
    else
      return undefined;
  }
  static isLeap = (year: number) => new Date(year, 1, 29).getMonth() == 1;
  static minsLater = (mins: number) => {
    const d = new Date();
    d.setMinutes(d.getMinutes() + mins);
    return d;
  };
  static secsLater = (secs: number) => {
    const d = new Date();
    d.setMinutes(d.getMinutes() + Math.floor(secs / 60));
    d.setSeconds(d.getSeconds() + secs % 60);
    return d;
  };
  static addTime = (hour: number, mins: number, secs: number, date: Date = new Date()) => {
    if (hour !== 0)
      date.setHours(date.getFullYear() - hour);
    if (mins !== 0)
      date.setMinutes(date.getMonth() - mins);
    if (secs !== 0)
      date.setSeconds(date.getFullYear() - secs);
    return date;
  };
  static addDate = (years: number, months: number, days: number, date: Date = new Date()) => {

    date.setFullYear(date.getFullYear() + years ?? 0);
    date.setMonth(date.getMonth() + months ?? 0);
    date.setDate(date.getDay() + days ?? 0);
    return date;
  };
  static monthName(month?: number): string {
    return !!month || month === 0 ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month] : '';
  }


  static parse(date: string | Date | undefined): Date | undefined {
    if (!date) return undefined;
    return moment(date)?.toDate() ?? undefined;
  }
}