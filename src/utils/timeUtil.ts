import moment from 'moment-timezone';


export const toDate = (date: string, format: string = 'M/DD/YYYY'): Date => {
    return moment(date, format).toDate();
}