import React, { Fragment } from "react";


import "./index.scss";

import { Form, Input, Button, Col, Row, message } from 'antd';
import { UserOutlined, UnlockOutlined, MailOutlined } from '@ant-design/icons';

import Code from "../../component/code/index";

import { validate_pwd } from "../../utils/validate";

import { Register } from "../../api/account"

//加密密码
import CryptoJs from "crypto-js";


class RegisterForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            code: "",
            module: "register"
        };
    }

    onFinish = values => {
        const requestData = {
            username: this.state.username,
            password: CryptoJs.MD5(this.state.password).toString(),
            code: this.state.code
        }
        console.log(requestData);
        Register(requestData).then((response) => {
            if (response.data.resCode === 0) {
                message.success(response.data.message);
                this.toggleForm();
            } else {
                message.warning(response.data.message)
            }
        }).catch(error => {
            console.log(error);
        })
        // console.log('Received values of form: ', values);
    };

    toggleForm = () => {
        this.props.onToggle("login")
    }

    inputChangeUsername = (e) => {
        let value = e.target.value;
        this.setState({
            username: value
        })
    }

    inputChangeCode = (e) => {
        let value = e.target.value;
        this.setState({
            code: value
        })
    }

    inputChangePassword = (e) => {
        let value = e.target.value;
        this.setState({
            password: value
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
                    <Form name="normal_login" className="login-form" onFinish={this.onFinish} >
                        <Form.Item name="username" rules={
                            [
                                { required: true, message: '邮箱不能为空!' },
                                { type: "email", message: "邮箱格式不正确!" }
                            ]
                        } >
                            <Input onChange={this.inputChangeUsername} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入邮箱" />
                        </Form.Item>

                        <Form.Item name="password" rules={
                            [
                                { required: true, message: '密码不能为空!' },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (getFieldValue("re-password") && getFieldValue("re-password") !== value) {
                                            return Promise.reject("两次密码不一致!");
                                        }
                                        if (!validate_pwd(value)) {
                                            return Promise.reject("输入6到20位包含小写字母和数字的密码!")
                                        }
                                        return Promise.resolve()
                                    },
                                }),
                            ]
                        } >
                            <Input onChange={this.inputChangePassword} prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item name="re-password" rules={
                            [
                                { required: true, message: '再次确认密码不能为空!' },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('两次密码不一致!');
                                    },
                                }),
                            ]
                        } >
                            <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="请再次输入密码" />
                        </Form.Item>
                        <Form.Item name="code" rules={
                            [
                                { required: true, len: 6, message: '请输入六位验证码!' },
                            ]
                        } >
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input onChange={this.inputChangeCode} prefix={<MailOutlined className="site-form-item-icon" />} placeholder="请输入验证码" />
                                </Col>
                                <Col span={9}>
                                    <Code username={this.state.username} module={this.state.module} />
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

            </Fragment >

        )
    }
}

export default RegisterForm;