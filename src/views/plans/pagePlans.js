import { Button, Col, Layout, Row,message } from 'antd';
import plansStyle from '../../static/plans.module.css';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useGetPlans, useSave, thisYear, thisWeek, getWeek,giveBox } from '../../store/action/action.index.js';
import { useHistory, useLocation } from 'react-router-dom';
import WeekdaysCard from '../../component/weekdaysCard.js';
import WeekendCard from './weekendCard.js';
import qs from 'qs';
import WholeWeekCard from './wholeWeekCard';

const { Header, Content, Footer } = Layout;
const { title, footer, layout, header, main, fatherHeight,drag } = plansStyle;

function PagePlans() {
    const { push } = useHistory();
    const { search } = useLocation();
    const toSave = useSave();
    const getCurrentPlan = useGetPlans();
    const { loading, data } = useSelector(store => store);
    let { year = thisYear, week = thisWeek } = qs.parse(search.slice(1));
    let { weekdaysDate, weekendDate } = getWeek(year, week);

    let BoxRef = useRef();
    useEffect(()=>{
        giveBox(BoxRef.current)
    },[])

    useEffect(() => {
        getCurrentPlan(year, week, weekdaysDate, weekendDate)
        // console.log(weekdaysDate, weekendDate);
    }, [year, week])

    function isChanged() {
        return sessionStorage.getItem('initData') !== JSON.stringify(data)
    }

    return <Layout className={layout}>
        <Header className={header}>
            <h1 className={title}>Weekly Plan</h1>
            <span ref={BoxRef} className={drag}></span>
        </Header>
        <Content className={main}>
            <Row className={fatherHeight}>
                <Col span={16} >
                    <Row >
                        {
                            weekdaysDate.map((item, index) => {
                                return <Col span={8} key={item} >
                                    <WeekdaysCard date={item} index={index} />
                                </Col>
                            })
                        }
                        <Col span={8} >
                            <WeekendCard dates={weekendDate} />
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <WholeWeekCard loading={loading} year={year} week={week} />
                </Col>
            </Row>
        </Content>
        <Footer className={footer}>
            <Row >
                <Col offset={14} span={6}>
                    <Button type="link"
                        onClick={() => {
                            if (isChanged()) toSave();
                            push(`/plans?year=${week - 1 <= 0 ? year - 1 : year}&week=${week - 1 <= 0 ? 52 : week - 1}`)
                        }}
                    ><h3 className={title}>上一周</h3></Button>
                    <Button type="link"
                        onClick={() => {
                            if (isChanged()) toSave();
                            push(`/plans?year=${+week + 1 > 52 ? +year + 1 : year}&week=${+week + 1 > 52 ? 1 : +week + 1}`)
                        }}
                    ><h3 className={title}>下一周</h3></Button>
                </Col>
                <Col span={4}>
                    <Button type="primary"
                        onClick={() => {
                            if (isChanged()) {
                                toSave()
                                sessionStorage.setItem('initData',JSON.stringify(data))
                            } else {
                                message.success('虽然没修改，但我也保存了')
                            }
                        }}
                    >
                        保存
                    </Button>
                </Col>
            </Row>
        </Footer>
    </Layout>
}

export default PagePlans;