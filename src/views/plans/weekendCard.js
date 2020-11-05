import React from 'react';
import { Card } from 'antd';
import WeekendContent from './weekendContent.js'
import { useSelector } from 'react-redux';

//收到的是对应的时间和对应的事项
function WeekendCard(props) {
    const { dates } = props;
    const { loading } = useSelector(store => store)

    return <Card loading={loading}
        className='weekdaysCard'
        title={`${dates[0]}~${dates[1]},周末`}
    >
        <WeekendContent date={dates[0]} time={'周六'} />
        <WeekendContent date={dates[1]} time={'周日'} />
    </Card>
}

export default WeekendCard;