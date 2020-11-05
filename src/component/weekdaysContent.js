import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import HalfDay from './halfDay';
let thisDay;

function WeekdaysContent(props) {
    const { date} = props;
    const { weekdays } = useSelector(store => store.data);
    weekdays.forEach(item => {
        if (date === item.date) {
            thisDay = item
        }
    });
    return <Fragment>
        <HalfDay list={thisDay.am} time='上午' date={date} />
        <HalfDay list={thisDay.pm} time='下午' date={date} />
    </Fragment>
    
}



export default WeekdaysContent;