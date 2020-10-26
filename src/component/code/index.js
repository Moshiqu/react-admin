import React from "react";

import { GetCode } from "../../api/account"
import { Button, message } from 'antd';
import { validate_email } from "../../utils/validate";

//定时器
let timer = null;

class Code extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            button_text: "获取验证码",
            button_disabled: false,
            button_loading: false,
        }
    }

    //获取父组件传过来的props
    componentWillReceiveProps(value) {
        this.setState({
            username: value.username
        })
    }

    componentWillUnmount() {
        clearInterval(timer);
    }

    getCode = () => {
        if (!this.state.username) {
            message.warning('邮箱不能为空!', 1);
            return false; //阻止向后端请求验证码
        }
        if (!validate_email(this.state.username)) {
            message.warning('邮箱格式不正确!', 1);
            return false; //阻止向后端请求验证码
        }
        this.setState({
            button_loading: true,
            button_text: '发送中'
        })
        const requestData = {
            username: this.state.username,
            module: "login"
        }
        GetCode(requestData).then(response => {
            //执行倒计时
            this.countDown();
        }).catch(error => {
            this.setState({
                button_loading: false,
                button_text: "重新获取"
            })
        })
    }
    /**
     * 倒计时
     */
    countDown = () => {
        let sec = 3;
        this.setState({
            button_disabled: true,
            button_loading: true,
            button_text: `${sec}S`
        });

        timer = setInterval(() => {
            sec--;
            if (sec <= 0) {
                this.setState({
                    button_disabled: false,
                    button_loading: false,
                    button_text: "重新获取"
                });
                clearInterval(timer);
                return false
            }
            this.setState({
                button_text: `${sec}S`
            })
        }, 1000);

    }

    render() {
        return (
            <Button type="danger" disabled={this.state.button_disabled} loading={this.state.button_loading} block onClick={this.getCode} > {this.state.button_text} </Button>
        )
    }
}

export default Code;