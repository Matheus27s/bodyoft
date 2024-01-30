import {format, parseISO} from 'date-fns';

export const dateMonthAndYear = (date: string) => {
  return format(parseISO(date), 'MM/yyyy');
};
