import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);

let thisWeek = dayjs().week()
let thisYear = dayjs().get('year')

function getWeek(year=thisYear,num) {
    let correspondDate = dayjs(year).week(num) //传入周数来获取对应日期
    let startOfWeek = dayjs(correspondDate).startOf('week')
    function daysInWeek(num) {
        return (dayjs(startOfWeek).add(num, 'day').$M + 1)+'-'+dayjs(startOfWeek).add(num, 'day').$D
    }
    let correspondWeekdays = [
        daysInWeek(1),
        daysInWeek(2),
        daysInWeek(3),
        daysInWeek(4),
        daysInWeek(5),
    ]
    let correspondWeekend = [
        daysInWeek(6),
        daysInWeek(7)
    ]
    return {weekdaysDate:correspondWeekdays,weekendDate:correspondWeekend};
}

function numToText(num) {
    switch (num) {
        case 1:
            return '一';
        case 2:
            return '二';
        case 3:
            return '三';
        case 4:
            return '四';
        case 5:
            return '五';
        default:
            break;
    }
}

export { thisWeek, thisYear, getWeek, numToText };