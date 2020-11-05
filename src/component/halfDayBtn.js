import React, { useEffect, useRef } from 'react';
import { Button, Input } from 'antd';
import { useDispatch } from 'react-redux';


function HalfDayBtn(props) {
    const { list, date, time } = props;
    const dispatch = useDispatch();
    const BtnBox = useRef();
    const DragShow = useRef();
    const InputRef = useRef();
    useEffect(() => {
        if (list.length === 0) {
            BtnBox.current.className = 'halfdayBtn'
        } else {
            BtnBox.current.classList.remove('halfdayBtn')
        }
    }, [list])
    useEffect(()=>{
        DragShow.current.date = date;
        DragShow.current.childNodes[0].date = date;
    },[])

    let onPressEnter = () => {
        if (InputRef.current.input.value !== '') {
            dispatch({
                type: "ATT-TO-HALFDAY",
                work: InputRef.current.input.value,
                date: date,
                time: time
            })
            InputRef.current.input.value = '';
            InputRef.current.state.value = '';
        }
    }
    return <div ref={BtnBox}>
        <Button
            className='halfDayBtn'
            type="primary"
            size="small"
            ref={DragShow}
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
                InputRef.current.input.style.display = 'none';
            }}
            onPressEnter={onPressEnter}
        />
    </div>
}
export default HalfDayBtn;