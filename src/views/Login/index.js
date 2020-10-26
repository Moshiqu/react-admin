import React from "react";

import "./index.scss";


import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formType: "login"
        };
    }

    switchForm = (value) => {
        this.setState({
            formType: value
        })
    }

    render() {
        return (
            <div className="form-wrap">
                {
                    this.state.formType === "login"
                        ? <LoginForm onToggle={this.switchForm} />
                        : <RegisterForm onToggle={this.switchForm} />
                }
            </div>
        )
    }
}

export default Login;