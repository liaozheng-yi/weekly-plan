import React, { useEffect, useState } from 'react'
import { Alert } from 'antd';
import { useHistory } from 'react-router-dom';


function Page404() {
    const { goBack, push } = useHistory();
    const [boom, setBoom] = useState(5)
    let time = setInterval(() => {
        setBoom(boom - 1)
    }, 1000);
    useEffect(()=>{
        if (boom===0) {
            push('/login')
        }
        return ()=>{clearInterval(time)}
    },[boom])

    return <Alert
        closable={true}
        showIcon={true}
        type={"warning"}
        message={<h2>搜索失败，{boom}秒后自动跳转至登录页面</h2>}
        description={"或点击关闭按钮，直接返回上一步"}
        afterClose={() => goBack()}
    />
}

export default Page404;