import { useSelector } from 'react-redux';
import http from '../http.js';
import { removeKeys } from './action.index.js';
import { message } from 'antd';

function useSave() {
    const {data} = useSelector(store => store)
    return () => {
        const newWholeWeek = removeKeys(data.wholeWeek)
        http({
            url:'/save',
            method:'post',
            data:{
                ...data,
                wholeWeek:newWholeWeek,
            }
        }).then(res=>{
            console.log('后端返回的通知',res.data);
            if(res.data.state===1){
                message.success('已保存')
            }
        })
    }


}

export default useSave ;