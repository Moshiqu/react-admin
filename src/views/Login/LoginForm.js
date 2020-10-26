import React, { Fragment } from "react";


import "./index.scss";

import { Form, Input, Button, Col, Row } from 'antd';
import { UserOutlined, UnlockOutlined, MailOutlined } from '@ant-design/icons';

import { validate_password } from "../../utils/validate";

import { Login } from "../../api/account"

import Code from "../../component/code/index"

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: ""
        };
    }

    onFinish = values => {
        Login().then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
        console.log('Received values of form: ', values);
    };

    toggleForm = () => {
        this.props.onToggle("register")
    }

    inputChange = (e) => {
        const value = e.target.value
        this.setState({
            username: value
        })
    }

    render() {
        return (
            <Fragment>
                <div className="form-header">
                    <div className="column">登录</div>
                    <span onClick={this.toggleForm}>账号注册</span>
                </div>
                <div className="form-content">
                    <Form
                        name="normal_login"
                        className="login-form"
                        onFinish={this.onFinish}
                    >
                        <Form.Item name="username" rules={
                            [
                                { required: true, message: '邮箱不能为空!' },
                                { type: "email", message: "邮箱格式不正确!" }
                            ]
                        } >
                            <Input value={this.state.username} onChange={this.inputChange}
                                prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                        </Form.Item>

                        <Form.Item name="password" rules={
                            [
                                { required: true, message: '密码不能为空!' },
                                { min: 8, message: "密码不能小于8位!" },
                                { max: 20, message: "密码不能大于20位!" },
                                {
                                    pattern: validate_password,
                                    message: "输入8到20位包含至少1个大写字母，1个小写字母和1个数字的密码"
                                }
                            ]
                        } >
                            <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Password" />
                        </Form.Item>

                        <Form.Item name="code" rules={
                            [
                                { required: true, message: '验证码不能为空!' },
                                { len: 6, message: "请输入6位数的验证码~" }
                            ]
                        } >
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
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </Fragment>

        )
    }
}

export default LoginForm;