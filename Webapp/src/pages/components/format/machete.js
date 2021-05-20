import React, { Component } from 'react';
import { Row, Label, Col } from 'reactstrap';
import { Button } from "@progress/kendo-react-buttons";
import { TextArea, Input } from "@progress/kendo-react-inputs";
import { Form, FormElement } from "@progress/kendo-react-form";

function cround(num) {
    if (isNaN(num)) {
        return num
    }
    else {
        return Math.round((num + Number.EPSILON) * 100) / 100
    }
}

function arrayContains(needle, arrhaystack) {
    return arrhaystack.indexOf(needle);
}

class Machete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value1: "",
            value2: "",
            value3: "",
            value4: "",
            value5: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    toDynamoDB() {
        const temp = arrayContains(this.props.value, this.props.numbers)
        if (this.state.value1 !== "" &&
            this.state.value2 !== "" &&
            this.state.value3 !== "" &&
            this.state.value4 !== "" &&
            this.state.value5 !== "" &&
            temp !== 0
        ) {
            let temperature;
            if (this.props.temp > 50) {
                temperature = cround((this.props.temp - 32) / 1.8);
            }
            else {
                temperature = this.props.temp;
            }
            let _this = this
            var unirest = require('unirest');
            unirest('GET', 'https://98yl5ljnse.execute-api.us-east-1.amazonaws.com/PutPatientData')
                .headers({
                    'database': 'Scup-Reports',
                    'patient': _this.props.value,
                    'data': _this.state.value1 +
                        ',' + _this.state.value2 +
                        ',' + _this.props.bpm +
                        ',' + _this.props.sat +
                        ',' + temperature +
                        ',' + _this.props.brpm +
                        ',' + _this.state.value3 +
                        ',' + _this.state.value4 +
                        ',' + _this.state.value5
                })
                .end(function (res) {
                    if (res.error) throw new Error(res.error);
                    _this.props.callback(_this.props.value);
                });
        }
        else {

        }
    }

    handleChange(event) {
        switch (parseInt(event.nativeEvent.target.id)) {
            case 1:
                this.setState({
                    value1: event.value
                })
                break;
            case 2:
                this.setState({
                    value2: event.value
                })
                break;
            case 3:
                this.setState({
                    value3: event.value
                })
                break;
            case 4:
                this.setState({
                    value4: event.value
                })
                break;
            case 5:
                this.setState({
                    value5: event.value
                })
                break;
            default:
                break;
        }
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div id="forms" className="label" style={{ paddingTop: "18px" }}>
                <Form style={{ fontSize: "0.8rem" }}
                    render={() => (
                        <FormElement>
                            <Row md="1">
                                <Col>
                                    <Label for="exampleText">Symptoms</Label>
                                </Col>
                                <Col>
                                    <TextArea style={{ fontSize: "0.7rem", width: "100%", height: "100%" }} value={this.state.value1} onChange={this.handleChange} type="textarea" name="text" id="1" />
                                </Col>
                            </Row>
                            <br />
                            <Row md="1">
                                <Col>
                                    <Label for="exampleText">Objective</Label>
                                </Col>
                                <Col>
                                    <TextArea style={{ fontSize: "0.7rem", width: "100%", height: "100%" }} value={this.state.value2} onChange={this.handleChange} type="textarea" name="text" id="2" />
                                </Col>
                            </Row>
                            <br />
                            <Row form>
                                <Col md={2}>
                                    <Label for="exampleCity">BPM</Label>
                                    <Input style={{ fontSize: "0.7rem" }} value={this.props.bpm} type="text" name="city" />
                                </Col>
                                <Col md={2}>
                                    <Label for="exampleState">Sat %</Label>
                                    <Input style={{ fontSize: "0.7rem" }} value={this.props.sat} type="text" name="state" />
                                </Col>
                                <Col md={2}>
                                    <Label for="exampleZip">Temp</Label>
                                    <Input style={{ fontSize: "0.7rem" }} value={this.props.temp} type="text" name="zip" />
                                </Col>
                                <Col md="2">
                                    <Label for="exampleZip">BreathsPM</Label>
                                    <Input style={{ fontSize: "0.7rem" }} value={this.props.brpm} type="text" name="zip" />
                                </Col>
                                <Col md={2}>
                                    <Label for="exampleZip">Blood P</Label>
                                    <Input style={{ fontSize: "0.7rem" }} value={this.state.value3} onChange={this.handleChange} type="text" name="zip" id="3" />

                                </Col>
                            </Row>
                            <br />
                            <Row md="1">
                                <Col>
                                    <Label for="exampleText">Analysis</Label>
                                </Col>
                                <Col>
                                    <TextArea style={{ fontSize: "0.7rem", width: "100%", height: "100%" }} value={this.state.value4} onChange={this.handleChange} type="textarea" name="text" id="4" />
                                </Col>
                            </Row>
                            <br />
                            <Row md="1">
                                <Col>
                                    <Label for="exampleText">Plan</Label>
                                </Col>
                                <Col>
                                    <TextArea style={{ fontSize: "0.7rem", width: "100%", height: "100%" }} value={this.state.value5} onChange={this.handleChange} type="textarea" name="text" id="5" />
                                </Col>
                            </Row>

                            <br />
                            <div style={{ marginBottom: "60px" }}>
                                <Button style={{ fontSize: "1.25rem" }} onClick={() => this.toDynamoDB()} primary={true}>Submit</Button>
                            </div>
                        </FormElement>
                    )}
                />
            </div>
        );
    }
}

export default Machete;