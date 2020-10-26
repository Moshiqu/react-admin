import React, { Fragment } from "react";


import "./index.scss";

import { Form, Input, Button, Col, Row } from 'antd';
import { UserOutlined, UnlockOutlined, MailOutlined } from '@ant-design/icons';

import Code from "../../component/code/index"


class RegisterForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: ""
        };
    }

    onFinish = values => {
        console.log('Received values of form: ', values);
    };

    toggleForm = () => {
        this.props.onToggle("login")
    }

    inputChange = (e) => {
        let value = e.target.value;
        this.setState({
            username: value
        })
    }

    render() {
        return (
            <Fragment>
                <div className="form-header">
                    <div className="column">注册</div>
                    <span onClick={this.toggleForm}>账号登录</span>
                </div>
                <div className="form-content">
                    <Form name="normal_login" className="login-form" onFinish={this.onFinish()} >
                        <Form.Item name="username" rules={
                            [
                                { required: true, message: '邮箱不能为空!' }
                            ]
                        } >
                            <Input onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                        </Form.Item>

                        <Form.Item name="password" rules={[{ required: true, message: 'Please input your Username!' }]} >
                            <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item name="re-password" rules={[{ required: true, message: 'Please input your Username!' }]} >
                            <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="re-password" />
                        </Form.Item>
                        <Form.Item name="code" rules={[{ required: true, message: 'Please input your Username!' }]} >
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Code" />
                                </Col>
                                <Col span={9}>
                                    <Code username={this.state.username} />
                                </Col>
                            </Row>

                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block>
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </Fragment>

        )
    }
}

export default RegisterForm;