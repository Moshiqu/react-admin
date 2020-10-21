import React, { Fragment } from "react";

import { Button } from "antd";

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    render() {
        return (
            <Fragment>
                <p>Home</p>
                <Button type="primary">Primary Button</Button>
            </Fragment>
        )
    }
}

export default Home;