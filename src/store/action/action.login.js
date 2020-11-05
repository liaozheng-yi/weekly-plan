import http from '../http.js';
import {message} from 'antd';

function useLogin() {
    
    return (values) => {
        const { user, pwd, remember } = values
        http({
            url: '/login',
            method: 'post',
            data: {
                user: user,
                pwd: pwd
            }
        }).then((res) => {
            // console.log(res.data);
            //根据返回的state值，处理业务逻辑
            if (res.data.state === 1) {
                sessionStorage.setItem('token', res.data.data.token)            //存储token
                if (remember) {                                                 //存储登录信息
                    localStorage.setItem('weekly-plan-login', `{"user":"${user}","pwd":"${pwd}"}`)
                    
                }else{
                    localStorage.removeItem('weekly-plan-login')
                }
                window.location.href = '/plans'
            } else if (res.data.state===0){
                message.error('用户名或密码错误');
                //附加：清空当前输入框的内容
            }
        })
    }
}

export default useLogin ;