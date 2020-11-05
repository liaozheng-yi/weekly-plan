import React, { Fragment, useRef } from 'react';
import {  Checkbox } from 'antd';
import { useDispatch } from 'react-redux';
import { CloseCircleOutlined } from '@ant-design/icons';
import HalfDayBtn from './halfDayBtn';

function HalfDay(props) {
    const { list, time, date } = props;
    const dispatch = useDispatch();
    const CheckedBox = useRef();

    let onchange = (index) => {
        //将数据的done取反
        dispatch({
            type: 'WEEKDAYS-ISDONE',
            target: index,
            time: time,
            date: date
        })
    }
    
    let onClick = (index)=>{
        dispatch({
            type: 'DEL-HALFDAY',
            target: index,
            time: time,
            date: date
        })
    }
    return <Fragment>
        <HalfDayBtn date={date} time={time} list={list}/>
        {
            list.map((item, index) => {
                return <div className='workItem' key={index}>
                    <Checkbox
                        ref={CheckedBox}
                        checked={item.done}
                        onChange={() => { onchange(index)}}
                    >
                        {item.work}
                    </Checkbox>
                    <CloseCircleOutlined
                        className='workItemBtn'
                        onClick={() => { onClick(index)}}
                    />
                </div>
            })
        }
    </Fragment>
}
export default HalfDay;