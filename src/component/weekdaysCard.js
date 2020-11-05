import React, { useRef } from 'react';
import { Card } from 'antd';
import { numToText } from '../store/action/action.index.js';
import { useSelector } from 'react-redux';
import WeekdaysContent from './weekdaysContent.js';

//收到的是对应的时间和对应的事项
function WeekdaysCard(props) {
    const { date, index } = props;
    let day = numToText(index + 1);
    const {loading} = useSelector(store=>store);
    const CardRef = useRef();

    return (
        <div ref={CardRef}>
        <Card loading={loading}
            title={`${date},周${day}`}
            className='weekdaysCard'
        >
            <WeekdaysContent date={date} />
        </Card>
        </div>
    )
}



export default WeekdaysCard;