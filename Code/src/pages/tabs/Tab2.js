// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// Base Libraries

import React from 'react';
import '../App.css';

// Kendo Dependencies

import { Avatar, Card } from "@progress/kendo-react-layout";
import { Form, FormElement } from "@progress/kendo-react-form";
import { ComboBox } from "@progress/kendo-react-dropdowns";

// Organization

import { Col, Row} from 'reactstrap';

// Extra libraries

import {
    isMobile
} from "react-device-detect";

// Images

import ECG from '../components/images/ecg.png';
import SAT from '../components/images/sat.png';
import TEMP from '../components/images/temp.png';
import p1 from '../components/patients/1.jpg';
import p2 from '../components/patients/2.PNG';
import p3 from '../components/patients/3.PNG';
import p4 from '../components/patients/4.PNG';
import p5 from '../components/patients/5.PNG';

var images = [p1, p2, p3, p4, p5]
const numbers = ["Patients", "Victor Altamirano", "Padma Kumari", "Wang Li", "Charlie Smith"];

function arrayContains(needle, arrhaystack) {
    return arrhaystack.indexOf(needle);
}

function apiCall(device, counter, pat) {
    var unirest = require('unirest');
    unirest('GET', 'https://nbdj4nrnsg.execute-api.us-east-1.amazonaws.com/sum-device')
  .headers({
    'counter': counter,
    'device': device
  })
        .end(function (res) {
            if (res.error) return "ERROR";
            return ("OK")
        });
}

var count0 = 0;
var count1 = 0;
var count2 = 0;

class Tab2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 'Patients',
            imag: images[0],
            patient: 0,
            context: {},
            gray1: 1,
            gray2: 1,
            gray3: 1
        }
        this.handleChange = this.handleChange.bind(this);
    }

    toggleEKG() {
        const temp = arrayContains(this.state.value, numbers)
        if (this.state.gray1 && temp !== 0) {
            this.setState({
                gray1: 0
            })
            this.intervalID1 = setInterval(() => {
                apiCall(0, count0, temp)
                count0 = count0 + 1
                if (count0 > 39) {
                    count0 = 0
                }
            }, 1000);
        }
        else {
            this.setState({
                gray1: 1
            })
            clearInterval(this.intervalID1)
        }
    }
    toggleSAT() {
        const temp = arrayContains(this.state.value, numbers)
        if (this.state.gray2 && temp !== 0) {
            this.setState({
                gray2: 0
            })
            this.intervalID2 = setInterval(() => {
                apiCall(1, count1, temp)
                count1 = count1 + 1
                if (count1 > 4) {
                    count1 = 0
                }
            }, 5000);
        }
        else {
            this.setState({
                gray2: 1
            })
            clearInterval(this.intervalID2)
        }
    }
    toggleTEMP() {
        const temp = arrayContains(this.state.value, numbers)
        if (this.state.gray3 && temp !== 0) {
            this.setState({
                gray3: 0
            })
            this.intervalID3 = setInterval(() => {
                apiCall(2, count2, temp)
                count2 = count2 + 1
                if (count2 > 4) {
                    count2 = 0
                }
            }
                , 3000);
        }
        else {
            this.setState({
                gray3: 1
            })
            clearInterval(this.intervalID3)
        }
    }

    componentDidMount() {

    }

    handleChange(event) {
        const temp = arrayContains(event.target.value, numbers)
        if (temp === 0) {
            //.......
        }
        else {
            clearInterval(this.intervalID1)
            clearInterval(this.intervalID2)
            clearInterval(this.intervalID3)
            this.setState({
                value: event.target.value,
                imag: images[temp],
                patient: temp,
                gray1: 1,
                gray2: 1,
                gray3: 1
            });
        }
    }

    render() {
        if (isMobile) {
            return (
                <div style={{ padding: "1%" }}>
                <Row>
                    <Col>
                        <Card>
                            <Row md="1">
                                <Col xs="12" style={{ paddingTop: "3%" }} className="d-flex justify-content-around">
                                    <Row style={{paddingLeft:'30px'}}>
                                        <Col xs="2">
                                            <Avatar
                                                shape="circle"
                                                type="image"
                                                size="large"
                                                style={{
                                                    marginRight: 10
                                                }}
                                            >
                                                <img src={this.state.imag} alt={Math.random()} />
                                            </Avatar>
                                        </Col>
                                        <Col xs="10">
                                            <Form style={{ fontSize: "0.8rem" }}
                                                render={() => (
                                                    <FormElement>
                                                        <ComboBox filter={null} filterable={false} value={this.state.value} clearButton={false} defaultValue="Patients" style={{ fontSize: "1.2rem" }} data={numbers} onChange={this.handleChange} />
                                                    </FormElement>
                                                )}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs="12" className="d-flex justify-content-around" style={{marginTop:"10%"}}>
                                    <img style={{ filter: "grayscale(" + this.state.gray1 + ")" }} src={ECG} alt="Logo" onClick={() => this.toggleEKG()} />
                                </Col>
                                <hr />
                                <Col xs="12" className="d-flex justify-content-around" style={{marginTop:"10%"}}>
                                    <img onClick={() => this.toggleSAT()} style={{ filter: "grayscale(" + this.state.gray2 + ")" }} src={SAT} alt="Logo" />
                                </Col>
                                <hr />
                                <Col xs="12" className="d-flex justify-content-around" style={{marginTop:"10%"}}>
                                    <img style={{ filter: "grayscale(" + this.state.gray3 + ")" }} onClick={() => this.toggleTEMP()} src={TEMP} alt="Logo" />
                                </Col>
                            </Row>
                        </Card>
                    </Col >
                </Row >
            </div >
            );
        }
        else {
            return (
                <div style={{ padding: "1%" }}>
                    <Row>
                        <Col>
                            <Card>
                                <Row md="4">
                                    <Col xs="3" style={{ paddingTop: "3%" }} className="d-flex justify-content-around">
                                        <Row style={{paddingLeft:'30px'}}>
                                            <Col xs="2">
                                                <Avatar
                                                    shape="circle"
                                                    type="image"
                                                    size="large"
                                                    style={{
                                                        marginRight: 10
                                                    }}
                                                >
                                                    <img src={this.state.imag} alt={Math.random()} />
                                                </Avatar>
                                            </Col>
                                            <Col xs="10">
                                                <Form style={{ fontSize: "0.8rem" }}
                                                    render={() => (
                                                        <FormElement>
                                                            <ComboBox filter={null} filterable={false} value={this.state.value} clearButton={false} defaultValue="Patients" style={{ fontSize: "1.2rem" }} data={numbers} onChange={this.handleChange} />
                                                        </FormElement>
                                                    )}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs="3" className="d-flex justify-content-around">
                                        <img style={{ filter: "grayscale(" + this.state.gray1 + ")" }} src={ECG} alt="Logo" onClick={() => this.toggleEKG()} />
                                    </Col>

                                    <Col xs="3" className="d-flex justify-content-around">
                                        <img onClick={() => this.toggleSAT()} style={{ filter: "grayscale(" + this.state.gray2 + ")" }} src={SAT} alt="Logo" />
                                    </Col>

                                    <Col xs="3" className="d-flex justify-content-around">
                                        <img style={{ filter: "grayscale(" + this.state.gray3 + ")" }} onClick={() => this.toggleTEMP()} src={TEMP} alt="Logo" />
                                    </Col>
                                </Row>
                            </Card>
                        </Col >
                    </Row >
                </div >
            );
        }
    }
}
export default Tab2;