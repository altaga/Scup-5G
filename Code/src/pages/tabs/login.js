import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Card, CardTitle } from "@progress/kendo-react-layout";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";

import ninja from "../components/images/overview-kendoka-top.png"

import "../components/css/myindex.css"
import { isMobile } from 'react-device-detect';

import Index from "./index"
import { Col, Row } from 'reactstrap';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ["", ""],
            logindisp: "inline"
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        if (this.state.data[0] === "drgregoryhouse@gmail.com" && this.state.data[1] === "toor") {
            this.setState({
                logindisp: "none"
            })
            ReactDOM.render(<Index />, document.getElementById('myindex'));
        }
    }

    handleChange(event) {
        let temp = this.state.data
        temp[parseInt(event.target.props.id)] = event.value
        this.setState({
            data: temp
        })
    }

    render() {
        if (isMobile) {
            return (
                <div>
                    <div id="mylogin" style={{ display: this.state.logindisp }} >
                        <Card className="center-mob" style={{ width: "90%", backgroundColor: "#ffaea8" }}>
                            <CardTitle className="text-center" style={{ fontSize: "1.3rem", color: "black" }}>SCUP Monitor</CardTitle>
                            <br />
                            <div className="mb-3">
                                <Input
                                    style={{
                                        width: "70%",
                                        marginLeft: "15%",
                                        color: "black"
                                    }}
                                    label="Email address"
                                    id={"0"}
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <Input
                                    name="password"
                                    type="password"
                                    style={{
                                        width: "70%",
                                        marginLeft: "15%",
                                        color: "black"
                                    }}
                                    label="Password"
                                    id={"1"}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <br />
                            <Button
                                style={{ fontSize: "1.3rem", marginBottom: "20px", color: "black", margin: "10px" }}
                                primary={true}
                                onClick={this.handleSubmit}
                            >
                                Login
                                </Button>
                        </Card>
                        <div>
                        <Row md="2" className="lower-right">
                        <Col xs="6">
                        <div style={{ color: "black"}}>
                            <div className="lower-right-text-mob">
                            Made with:
                            </div>
                        </div>
                        </Col>
                        <Col xs="6">
                        <a href="https://www.telerik.com/kendo-react-ui/" target="_blank" rel="noreferrer">
                                <img className="ninja-style" alt="ninja" src={ninja} />
                            </a>
                        </Col>
                        </Row>
                        </div>
                    </div>
                    <div id="myindex" />
                </div>
            );
        }
        else {
            return (
                <div>
                    <div id="mylogin" style={{ display: this.state.logindisp }} >
                        <Card className="center" style={{ width: "30%", backgroundColor: "#ffaea8" }}>
                            <CardTitle className="text-center" style={{ fontSize: "1.3rem", color: "black" }}>SCUP Monitor</CardTitle>
                            <br />
                            <div className="mb-3">
                                <Input
                                    style={{
                                        width: "70%",
                                        marginLeft: "15%",
                                        color: "black"
                                    }}
                                    label="Email address"
                                    id={0}
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <Input
                                    name="password"
                                    type="password"
                                    style={{
                                        width: "70%",
                                        marginLeft: "15%",
                                        color: "black"
                                    }}
                                    label="Password"
                                    id={1}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <br />
                            <Button
                                style={{ fontSize: "1.3rem", marginBottom: "20px", color: "black", margin: "10px" }}
                                primary={true}
                                onClick={this.handleSubmit}
                            >
                                Login
                                </Button>
                        </Card>
                        <Row md="2" className="lower-right">
                        <Col xs="6">
                        <div style={{ color: "black"}}>
                            <div className="lower-right-text">
                            Made with:
                            </div>
                        </div>
                        </Col>
                        <Col xs="6">
                        <a href="https://www.telerik.com/kendo-react-ui/" target="_blank" rel="noreferrer">
                                <img className="ninja-style" alt="ninja" src={ninja} />
                            </a>
                        </Col>
                        </Row>
                    </div>
                    <div id="myindex" />
                </div>
            );
        }
    }
}

export default Login;