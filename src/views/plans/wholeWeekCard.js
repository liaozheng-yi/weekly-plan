import React, { useRef } from 'react';
import { Card, Input } from 'antd';
import plansStyle from '../../static/plans.module.css';
import WholeWeekContent from './wholeWeekContent.js';
import { useDispatch } from 'react-redux';
const { wholeCard, title } = plansStyle;

function WholeWeekCard(props) {
    const { loading, year, week } = props;
    const dispatch = useDispatch();
    const WorkRef = useRef();
    const onPressEnter = () => {
        if (WorkRef.current.input.value !== '') {
            dispatch({
                type: 'ADD-WORK-TO-MAIN',
                work: WorkRef.current.input.value
            })
            WorkRef.current.state.value = '';
        }
    }
    return (
        <Card loading={loading}
            title={<h2 className={title}>{year}年第{week}周_PLAN</h2>}
            className={wholeCard+' hidden'}
        >
            <Input
                ref={WorkRef}
                style={{ margin: "0 0 16px 0" }}
                placeholder='按Enter建立工作项'
                onPressEnter={onPressEnter}
            />
            <WholeWeekContent />
        </Card>
    )
}

export default WholeWeekCard;