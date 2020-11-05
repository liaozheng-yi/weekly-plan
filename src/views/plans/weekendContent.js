import React, { Fragment, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Input, Checkbox } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';


function WeekendContent(props) {
    const { date, time } = props;
    const { weekdays } = useSelector(store => store.data)
    const InputRef = useRef();
    const BtnRef = useRef();
    const CheckedBoxRef = useRef();
    const BtnBoxRef = useRef();
    const dispatch = useDispatch();
    let thisDay = { plan: [] }
    weekdays.forEach(item => {
        if (item.date === date) {
            thisDay = item
        }
    })
    useEffect(()=>{
        BtnRef.current.date = date;
        BtnRef.current.childNodes[0].date = date;
    },[])

    useEffect(() => {
        // console.log(thisDay.plan.length);
        if (thisDay.plan.length === 0) {
            BtnBoxRef.current.className = 'halfdayBtn'
        } else {
            BtnBoxRef.current.classList.remove('halfdayBtn')
        }
    }, [thisDay.plan])

    let onchange = (index) => {
        // 将数据的done取反
        dispatch({
            type: 'WEEKEND-ISDONE',
            target: index,
            date: date
        })
    }

    let onClick = (index) => {
        dispatch({
            type: 'DEL-WEEKEND',
            target: index,
            date: date
        })
    }
    let onPressEnter = () => {
        if (InputRef.current.input.value !== "") {
            dispatch({
                type: "ADD-TO-WEEKEND",
                work: InputRef.current.input.value,
                date: date,
            })
            InputRef.current.input.value = '';
            InputRef.current.state.value = '';
        }
    }

    return <Fragment>
        <div ref={BtnBoxRef}>
            <Button
                ref={BtnRef}
                type="primary"
                size="small"
                onClick={() => {
                    InputRef.current.input.style.display = 'block';
                    InputRef.current.input.focus();
                }}
            >
                {time}
            </Button>
            <Input
                ref={InputRef}
                style={{ display: 'none' }}
                onBlur={() => {
                    InputRef.current.input.style.display = 'none'
                }}
                onPressEnter={onPressEnter}
            />
        </div>
        {
            thisDay.plan.map((item, index) => {
                return <div className='workItem' key={index}>
                    <Checkbox
                        ref={CheckedBoxRef}
                        checked={item.done}
                        onChange={() => { onchange(index) }}
                    >
                        {item.work}
                    </Checkbox>
                    <CloseCircleOutlined
                        className='workItemBtn'
                        onClick={() => { onClick(index) }}
                    />
                </div>
            })
        }
    </Fragment>

}

export default WeekendContent;