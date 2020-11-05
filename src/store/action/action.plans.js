import http from '../http.js';
import { useDispatch } from 'react-redux';
import { addKeys,fillDates } from './action.index.js';

function useGetPlans() {
    const dispatch = useDispatch();
    //获取当前日期对应的数据
    return (year,week,weekdaysDate,weekendDate) => {
        dispatch({
            type: 'PLANS-LOADING'
        })
        http({
            url: `/plans?year=${year}&week=${week}`,
            method: 'get',
        }).then((res) => {
            addKeys(res.data.data.wholeWeek) //给数组添加keys
            fillDates(res.data.data.weekdays,weekdaysDate,weekendDate)//补足空缺的weekdays
            console.log('后端返回的通知',res.data);
            dispatch({
                type: 'PLANS-LOAD',
                data:res.data.data
            })
            sessionStorage.setItem('initData',JSON.stringify(res.data.data))
        })
    }
}

export default useGetPlans ;