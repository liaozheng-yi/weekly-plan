import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { useLogin } from '../../store/action/action.index.js';
import style from '../../static/login.module.css';


const { wrap, formBox, title } = style
const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 4 },
};
const tailLayout = {
    wrapperCol: { span: 4, offset: 10 },
};


function PageLogin(props) {
    const {memory} = props;
    const toLogin = useLogin();

    const onFinish = values => {
        toLogin(values)
    };

    return (
        <div className={wrap}>
            <div className={formBox}>
                <Row>
                    <Col span={14} offset={10}>
                        <p className={title}>请登录</p>
                    </Col>
                </Row>
                <Form
                    {...layout}
                    name="login"
                    initialValues={
                        memory?{
                            remember: true,
                            user: memory.user,
                            pwd: memory.pwd
                        }:{
                            remember:false
                        }
                    }

                    onFinish={onFinish}
                >
                    <Form.Item
                        label="用户名"
                        name="user"
                        rules={[{ required: true, message: '请输入用户名' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="pwd"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};



export default PageLogin;