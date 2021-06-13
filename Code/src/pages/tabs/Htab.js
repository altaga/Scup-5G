// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import React from 'react';
import '../App.css';
import { Avatar, Card, CardBody } from "@progress/kendo-react-layout";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Switch } from "@progress/kendo-react-inputs";
import { ComboBox } from "@progress/kendo-react-dropdowns";
import { Col, Row, } from 'reactstrap';
import LineGraph3 from "../components/charts/line3.js"
import ECG from '../components/images/ecg.png';
import SAT from '../components/images/sat.png';
import TEMP from '../components/images/temp.png';

import {
    isMobile
} from "react-device-detect";

import p1 from '../components/patients/1.jpg';
import p2 from '../components/patients/2.PNG';
import p3 from '../components/patients/3.PNG';
import p4 from '../components/patients/4.PNG';
import p5 from '../components/patients/5.PNG';

import "../components/css/Calendar.css"

import { Calendar } from "@progress/kendo-react-dateinputs";

var images = [p1, p2, p3, p4, p5]
const numbers = ["Patients", "Victor Altamirano", "Padma Kumari", "Wang Li", "Charlie Smith"];
const age = [Number.NaN, 26, 42, 24, 40];
const height = [Number.NaN, 5.4, 5.9, 6.4, 7.1];
const weight = [Number.NaN, 176, 165, 174, 175];

function arrayContains(needle, arrhaystack) {
    return arrhaystack.indexOf(needle);
}

function sortArrays(arrays, comparator = (a, b) => (a < b) ? -1 : (a > b) ? 1 : 0) {
    let arrayKeys = Object.keys(arrays);
    let sortableArray = Object.values(arrays)[0];
    let indexes = Object.keys(sortableArray);
    let sortedIndexes = indexes.sort((a, b) => comparator(sortableArray[a], sortableArray[b]));

    let sortByIndexes = (array, sortedIndexes) => sortedIndexes.map(sortedIndex => array[sortedIndex]);

    if (Array.isArray(arrays)) {
        return arrayKeys.map(arrayIndex => sortByIndexes(arrays[arrayIndex], sortedIndexes));
    } else {
        let sortedArrays = {};
        arrayKeys.forEach((arrayKey) => {
            sortedArrays[arrayKey] = sortByIndexes(arrays[arrayKey], sortedIndexes);
        });
        return sortedArrays;
    }
}

function cround(num) {
    if (isNaN(num)) {
        return num
    }
    else {
        return Math.round((num + Number.EPSILON) * 100) / 100
    }
}

function todayCorr() {
    var today = new Date();
    var time = today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds();
    return time
}

function avgArray(indat) {
    let total = 0;
    for (let i = 0; i < indat.length; i++) {
        total += parseFloat(indat[i]);
    }
    let avg = total / indat.length;
    avg = cround(avg)
    return (avg)
}


function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = hour + ':' + min + ':' + sec;
    return time;
}

function getDate(unix) {
    let date = new Date(unix * 1000);
    return date
}

class Htab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            valuec: new Date(),
            bpm: "+",
            so2: "+",
            temp: "+",
            data1: [],
            data2: [],
            data3: [],
            series1: [],
            series2: [],
            series3: [],
            imag: images[0],
            ages: age[0],
            heights: height[0],
            weights: weight[0],
            time: Math.floor(Date.now() / 1000) - todayCorr(),
            memdata: "",
            templabel: "F°",
            weightlabel: "lb",
            heightlabel: "ft",
            bmi: "+",
            range1: 42 * 1.8 + 32,
            range2: 35 * 1.8 + 32,
            label: "Eng to SI",
            SIEnable: true,
            checked: false,
            calMaxDate: new Date(),
            calMinDate: getDate(1612245600),
            comboDisable: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangec = this.handleChangec.bind(this);
        this.toogleSI = this.toogleSI.bind(this);
    }


    componentDidMount() {

    }


    handleChange(event) {
        const temp = arrayContains(event.target.value, numbers)
        let _this = this
        if (temp === 0) {

        }
        else {
            this.setState({
                SIEnable: false,
                value: event.target.value,
                weightlabel: "lb",
                heightlabel: "ft",
                templabel: "°F",
                imag: images[temp],
                patient: temp,
                ages: age[temp],
                heights: height[temp],
                weights: weight[temp],
                bmi: cround(703 * weight[temp] / Math.pow(height[temp] * 12, 2)),
                range1: 42 * 1.8 + 32,
                range2: 35 * 1.8 + 32,
                comboDisable: true
            });

            var unirest = require('unirest');
            unirest('GET', 'https://98yl5ljnse.execute-api.us-east-1.amazonaws.com/GetReports-Database')
                .headers({
                    'database': 'Scup-Database',
                    'patient': event.target.value
                })
                .end(function (res) {
                    if (res.error) throw new Error(res.error);
                    if (res.raw_body !== "") {
                        let temp = JSON.parse(res.raw_body);
                        let dataArray1 = []
                        let dataArray2 = []
                        let dataArray3 = []
                        let dateArray = []
                        let sortArray = []
                        for (let i = 0; i < temp.length; i++) {
                            let tempo = JSON.parse(temp[i].Time)
                            let data = temp[i].Data.split(",")
                            let frame = Math.round(tempo) - _this.state.time
                            if (frame < 86400 && Math.round(tempo) >= _this.state.time) {
                                sortArray.push(tempo)
                                dateArray.push(timeConverter(Math.round(tempo)))
                                dataArray1.push(parseInt(data[0]))
                                dataArray2.push(parseInt(data[1]))
                                dataArray3.push(cround(parseInt(data[2]) * 1.8 + 32))
                            }
                        }
                        [sortArray, dateArray, dataArray1, dataArray2, dataArray3] = sortArrays([sortArray, dateArray, dataArray1, dataArray2, dataArray3]);
                        _this.setState({
                            memdata: temp,
                            series1: dateArray,
                            series2: dateArray,
                            series3: dateArray,
                            data1: dataArray1,
                            data2: dataArray2,
                            data3: dataArray3,
                            bpm: avgArray(dataArray1),
                            so2: avgArray(dataArray2),
                            temp: avgArray(dataArray3),
                            comboDisable: false
                        })
                    }
                    else {
                        _this.setState({
                            data1: [],
                            data2: [],
                            data3: [],
                            series1: [],
                            series2: [],
                            series3: [],
                            bpm: "NA",
                            so2: "NA",
                            temp: "NA",
                            comboDisable: false
                        })
                    }
                });
        }
    }

    toogleSI() {
        if (!this.state.SIEnable) {
            if (this.state.value === 0) {
                // Nothing
            }
            else {
                let arrayTemp = []
                if (this.state.data3.length === 0 && this.state.weightlabel === "lb") {
                    this.setState({
                        weightlabel: "kg",
                        weights: cround(this.state.weights * 0.453592, 2),
                        heightlabel: "m",
                        heights: cround(this.state.heights * 0.3048, 2),
                        templabel: "°C",
                        range1: 42,
                        range2: 35,
                        data3: arrayTemp,
                        label: "SI to Eng",
                        checked: true
                    });
                }
                else if (this.state.data3.length === 0 && this.state.weightlabel === "kg") {
                    this.setState({
                        weightlabel: "lb",
                        weights: cround(this.state.weights / 0.453592),
                        heightlabel: "ft",
                        heights: cround(this.state.heights / 0.3048),
                        templabel: "°F",
                        range1: cround(42 * 1.8 + 32),
                        range2: cround(35 * 1.8 + 32),
                        data3: arrayTemp,
                        label: "Eng to SI",
                        checked: false
                    });
                }
                else if (this.state.weightlabel === "lb") {
                    for (let i = 0; i < this.state.data3.length; i++) {
                        arrayTemp.push(cround((this.state.data3[i] - 32) / 1.8))
                    }
                    this.setState({
                        weightlabel: "kg",
                        weights: cround(this.state.weights * 0.453592),
                        heightlabel: "m",
                        heights: cround(this.state.heights * 0.3048),
                        templabel: "°C",
                        temp: cround((this.state.temp - 32) / 1.8),
                        range1: 42,
                        range2: 35,
                        data3: arrayTemp,
                        label: "SI to Eng",
                        checked: true
                    });
                }
                else {
                    for (let i = 0; i < this.state.data3.length; i++) {
                        arrayTemp.push(cround(this.state.data3[i] * 1.8 + 32))
                    }
                    this.setState({
                        weightlabel: "lb",
                        weights: cround(this.state.weights / 0.453592, 2),
                        heightlabel: "ft",
                        heights: cround(this.state.heights / 0.3048, 2),
                        templabel: "°F",
                        temp: cround((this.state.temp * 1.8) + 32),
                        range1: 42 * 1.8 + 32,
                        range2: 35 * 1.8 + 32,
                        data3: arrayTemp,
                        label: "Eng to SI",
                        checked: false
                    });
                }
            }
        }
    }

    handleChangec(event) {
        const memweight = this.state.weightlabel
        if (this.state.value === 0) {
            // Nothing
        }
        else {
            this.setState({
                valuec: event.value,
                time: Date.parse(event.value) / 1000
            });
            if (this.state.memdata !== "") {
                let dataArray1 = []
                let dataArray2 = []
                let dataArray3 = []
                let dateArray = []
                let sortArray = []
                for (let i = 0; i < this.state.memdata.length; i++) {
                    let tempo = JSON.parse(this.state.memdata[i].Time)
                    let data = this.state.memdata[i].Data.split(",")
                    let frame = Math.round(tempo) - Date.parse(event.value) / 1000
                    if (frame < 86400 && Math.round(tempo) >= Date.parse(event.value) / 1000) {
                        sortArray.push(tempo)
                        dateArray.push(timeConverter(Math.round(tempo)))
                        dataArray1.push(data[0])
                        dataArray2.push(data[1])
                        if (memweight === "lb") {
                            dataArray3.push(cround(data[2] * 1.8 + 32))
                        }
                        else {
                            dataArray3.push(data[2])
                        }
                    }
                }
                [sortArray, dateArray, dataArray1, dataArray2, dataArray3] = sortArrays([sortArray, dateArray, dataArray1, dataArray2, dataArray3]);
                this.setState({
                    series1: dateArray,
                    series2: dateArray,
                    series3: dateArray,
                    data1: dataArray1,
                    data2: dataArray2,
                    data3: dataArray3,
                    bpm: avgArray(dataArray1),
                    so2: avgArray(dataArray2),
                    temp: avgArray(dataArray3)
                })
            }
        }
    }

    mobileDate(event) {

    }

    render() {
        if (isMobile) {
            return (
                <div style={{ padding: "1%" }}>
                    <Row md="2">
                        <Col>
                            <Row md="1">
                                <Col xs="12">
                                    <Card>
                                        <CardBody>
                                            <Row md="1">
                                                <Col xs="6" className="d-flex justify-content-around">
                                                    <img
                                                        style={{ width: "80%", height: "86%" }}
                                                        src={ECG} alt="Logo" />
                                                </Col>
                                                <Col xs="6">
                                                    <Col className="d-flex justify-content-around h2">
                                                        BPM
                              <br />
                                                        {this.state.bpm}
                                                    </Col>
                                                </Col>
                                                <Col xs="12">
                                                    <LineGraph3 data={[this.state.data1, this.state.series1]} />
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col xs="12">
                                    <Card>
                                        <CardBody>
                                            <Row md="1">
                                                <Col xs="6" className="d-flex justify-content-around">
                                                    <img
                                                        style={{ width: "80%", height: "86%" }}
                                                        src={SAT} alt="Logos" />
                                                </Col>
                                                <Col xs="6">
                                                    <Col className="d-flex justify-content-around h2">
                                                        Sat %
                              <br />
                                                        {this.state.so2}
                                                    </Col>
                                                </Col>
                                                <Col xs="12">
                                                    <LineGraph3 data={[this.state.data2, this.state.series2]} />
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col xs="12">
                                    <Card>
                                        <CardBody>
                                            <Row md="1">
                                                <Col xs="6" className="d-flex justify-content-around">
                                                    <img
                                                        style={{ width: "80%", height: "86%" }}
                                                        src={TEMP} alt="Logo" />
                                                </Col>
                                                <Col xs="6">
                                                    <Col className="d-flex justify-content-around h2">
                                                        Temp
                              <br />
                                                        {this.state.templabel}
                                                    </Col>
                                                </Col>
                                                <Col xs="12">
                                                    <LineGraph3 data={[this.state.data3, this.state.series3]} />
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                        <Col style={{ paddingLeft: "1%" }}>
                            <Card>
                                <CardBody>
                                    <Row>
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
                                                        <ComboBox filter={null} filterable={false} value={this.state.value} clearButton={false} defaultValue="Patients" style={{ fontSize: "1.2rem" }} data={numbers} onChange={this.handleChange} disabled={this.state.comboDisable} />
                                                    </FormElement>
                                                )}
                                            />
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Calendar
                                        min={this.state.calMinDate}
                                        max={this.state.calMaxDate}
                                        onChange={this.handleChangec}
                                        value={this.state.valuec}
                                    />
                                </CardBody>
                            </Card>
                            <Card>
                <CardBody>
                  <Row md="1" style={{ fontSize: "1.4rem" }}>
                      <Col xs="6">
                        Age [years]
                      </Col>
                      <Col xs="6">
                        {this.state.ages}
                      </Col>
                      <br />
                      <br />
                      <Col xs="6">
                        Height [{this.state.heightlabel}]
                      </Col>
                      <Col xs="6">
                        {this.state.heights}
                      </Col>
                      <br />
                      <br />
                      <Col xs="6">
                        Weight [{this.state.weightlabel}]
                      </Col>
                      <Col xs="6">
                        {this.state.weights}
                      </Col>

                      <br />
                      <br />
                      <Col xs="6">
                        BMI
                      </Col>
                      <Col xs="6">
                        {
                          this.state.bmi
                        }
                      </Col>
                      <br />
                      <br />
                      <Col xs="6">
                        {this.state.label}
                      </Col>
                      <Col xs="6">
                        <Switch onLabel={"SI"} offLabel={"ENG"} onChange={() => this.toogleSI()} disabled={this.state.SIEnable} />
                      </Col>
                  </Row>
                </CardBody>
              </Card>
                        </Col>
                    </Row>
                </div>
            );
        }
        else {
            return (
                <div style={{ padding: "1%" }}>
                    <Row md="2">
                        <Col>
                            <Row md="1">
                                <Col>
                                    <Card style={{ width: "151%" }}>
                                        <CardBody>
                                            <Row>
                                                <Col xs="3" className="d-flex justify-content-around">
                                                    <img style={{ filter: "grayscale(" + this.state.gray + ")" }} src={ECG} alt="Logo" />
                                                </Col>
                                                <Col xs="7">
                                                    <LineGraph3 data={[this.state.data1, this.state.series1]} />
                                                </Col>
                                                <Col xs="2">
                                                    <Row md="1" className="h5">
                                                        <Col className="d-flex justify-content-around">
                                                            BPM
                                                        </Col>
                                                        <Col className="d-flex justify-content-around h1">
                                                            {this.state.bpm}
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card style={{ width: "151%" }}>
                                        <CardBody>
                                            <Row>
                                                <Col xs="3" className="d-flex justify-content-around">
                                                    <img src={SAT} alt="Logo" />
                                                </Col>
                                                <Col xs="7">
                                                    <LineGraph3 data={[this.state.data2, this.state.series2]} />
                                                </Col>
                                                <Col xs="2">
                                                    <Row md="1" className="h5">
                                                        <Col className="d-flex justify-content-around ">
                                                            Sat %
                              </Col>
                                                        <Col className="d-flex justify-content-around h1">
                                                            {this.state.so2}
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card style={{ width: "151%" }}>
                                        <CardBody>
                                            <Row >
                                                <Col xs="3" className="d-flex justify-content-around">
                                                    <img src={TEMP} alt="Logo" />
                                                </Col>
                                                <Col xs="7">
                                                    <LineGraph3 data={[this.state.data3, this.state.series3]} />
                                                </Col>
                                                <Col xs="2">
                                                    <Row md="1" className="h5" >
                                                        <Col className="d-flex justify-content-around">
                                                            Temp {this.state.templabel}
                                                        </Col>
                                                        <Col className="d-flex justify-content-around h1">
                                                            {this.state.temp}
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                        <Col style={{ paddingLeft: "24.4%" }}>
                            <Card>
                                <CardBody>
                                    <Row>
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
                                                        <ComboBox filter={null} filterable={false} value={this.state.value} clearButton={false} defaultValue="Patients" style={{ fontSize: "1.2rem" }} data={numbers} onChange={this.handleChange} disabled={this.state.comboDisable} />
                                                    </FormElement>
                                                )}
                                            />
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Calendar
                                        min={this.state.calMinDate}
                                        max={this.state.calMaxDate}
                                        onChange={this.handleChangec}
                                        value={this.state.valuec}
                                    />
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <Row md="2" className="h5">
                                        <Col>
                                            Age [years]
                                        </Col>
                                        <Col>
                                            {this.state.ages}
                                        </Col>
                                        <hr />
                                        <hr />
                                        <Col>
                                            Height [{this.state.heightlabel}]
                                        </Col>
                                        <Col>
                                            {this.state.heights}
                                        </Col>
                                        <hr />
                                        <hr />
                                        <Col>
                                            Weight [{this.state.weightlabel}]
                                        </Col>
                                        <Col>
                                            {this.state.weights}
                                        </Col>
                                        <hr />
                                        <hr />
                                        <Col>
                                            BMI
                                        </Col>
                                        <Col>
                                            {
                                                this.state.bmi
                                            }
                                        </Col>
                                        <hr />
                                        <hr />
                                        <Col>
                                            {this.state.label}
                                        </Col>
                                        <Col>
                                            <Switch onLabel={"SI"} offLabel={"ENG"} onChange={() => this.toogleSI()} disabled={this.state.SIEnable} />
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}
export default Htab;