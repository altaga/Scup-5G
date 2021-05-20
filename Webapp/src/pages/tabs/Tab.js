// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import React from 'react';
import '../App.css';

// Dependencies Kendo Library

import { Avatar, Card, CardTitle, CardBody } from "@progress/kendo-react-layout";
import { Form, FormElement } from "@progress/kendo-react-form";
import { ComboBox } from "@progress/kendo-react-dropdowns";
import { Switch } from "@progress/kendo-react-inputs";

// Extra Dependencies Library

import { Col, Row } from 'reactstrap';
import {
  isMobile
} from "react-device-detect";

// Component Files

import LineGraph3 from "../components/charts/line3.js"
import LineGraph4 from "../components/charts/line4.js"

import ECG from '../components/images/ecg.png';
import SAT from '../components/images/sat.png';
import TEMP from '../components/images/temp.png';

import MyEditor from "../components/editor/MyEditor.js"
import MyEditorM from "../components/editor/MyEditorM.js"

import TabsNav from "../components/tabs"

import IotReciever from "../components/iot/iot-reciever-aws"

import Machete from '../components/format/machete';
import Machetem from '../components/format/machetem';

import Sum from "../components/summary/summary"

import Reports from "../components/reports/reports"
import Summ from '../components/summary/summarym';

import p1 from '../components/patients/1.jpg';
import p2 from '../components/patients/2.PNG';
import p3 from '../components/patients/3.PNG';
import p4 from '../components/patients/4.PNG';
import p5 from '../components/patients/5.PNG';

// Global Variables and Const

var images = [p1, p2, p3, p4, p5]
const numbers = ["Patients", "Victor Altamirano", "Padma Kumari", "Wang Li", "Charlie Smith"];
const age = [Number.NaN, 26, 42, 24, 40];
const height = [Number.NaN, 5.4, 5.9, 6.4, 7.1];
const weight = [Number.NaN, 176, 165, 174, 175];

const sumData = [
  ["Loading...", "Loading...", "Loading...", "Loading..."],
  ["Loading...", "Loading...", "Loading...", "Loading..."],
  ["Loading...", "Loading...", "Loading...", "Loading..."],
  ["Loading...", "Loading...", "Loading...", "Loading..."],
  ["Loading...", "Loading...", "Loading...", "Loading..."]
]

var flag = [false, false, false]

// Functions

function arrayContains(needle, arrhaystack) {
  return arrhaystack.indexOf(needle);
}

function cround(num) {
  if (isNaN(num)) {
    return num
  }
  else {
    return Math.round((num + Number.EPSILON) * 100) / 100
  }
}

// Filter Library EKG

var Fili = require('fili');
var iirCalculator = new Fili.CalcCascades();
var iirFilterCoeffs = iirCalculator.lowpass({
  order: 1, // cascade 3 biquad filters (max: 12)
  characteristic: 'bessel',
  Fs: 40, // sampling frequency
  Fc: 10, // cutoff frequency / center frequency for bandpass, bandstop, peak
  BW: 3, // bandwidth only for bandstop and bandpass filters - optional
  gain: 0, // gain for peak, lowshelf and highshelf
  preGain: false // adds one constant multiplication for highpass and lowpass
});
var iirFilter = new Fili.IirFilter(iirFilterCoeffs);

// Component Tab 1

class Tab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'Patients',
      imag: images[0],
      ages: age[0],
      heights: height[0],
      weights: weight[0],
      vars: [Number.NaN, Number.NaN, Number.NaN],
      patient: 0,
      example: "Text :(",
      data1: [],
      datamem1: [],
      series1: [],
      memory1: [],
      data2: [],
      series2: [],
      memory2: [],
      data3: [],
      series3: [],
      temper: Number.NaN,
      bpm: Number.NaN,
      ibi: "+",
      sdnn: "+",
      sdsd: "+",
      rmssd: "+",
      pnn20: "+",
      pnn50: "+",
      hr_mad: "+",
      sd1: "+",
      sd2: "+",
      s: "+",
      sd1sd2: "+",
      br: "NaN",
      gray: 1,
      templabel: "°F",
      weightlabel: "lb",
      heightlabel: "ft",
      bmi: "+",
      range1: 42 * 1.8 + 32,
      range2: 35 * 1.8 + 32,
      label: "Eng to SI",
      SIEnable: true,
      checked: false,
      sumMemory: "",
      sumDat: sumData[0],
      sumDats: "",
      nreports: [],
      reports: [],
      mydata: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.callBackIoT = this.callBackIoT.bind(this);
    this.callbackbutton = this.callbackbutton.bind(this);
    this.callbackSumUpdate = this.callbackSumUpdate.bind(this);
    this.uploadSummaryDataServer = this.uploadSummaryDataServer.bind(this)
  }

  toogleSI() {
    if (!this.state.SIEnable) {
      let arrayTemp = []
      if (this.state.weightlabel === "lb") {
        for (let i = 0; i < this.state.data3.length; i++) {
          arrayTemp.push(cround((this.state.data3[i] - 32) / 1.8))
        }
        this.setState({
          weightlabel: "kg",
          weights: cround(this.state.weights * 0.453592, 2),
          heightlabel: "m",
          heights: cround(this.state.heights * 0.3048, 2),
          templabel: "°C",
          temper: cround((this.state.temper - 32) / 1.8),
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
          temper: cround((this.state.temper * 1.8) + 32),
          range1: 42 * 1.8 + 32,
          range2: 35 * 1.8 + 32,
          data3: arrayTemp,
          label: "Eng to SI",
          checked: false
        });
      }
    }
  }

  checkEKG() {
    if (this.state.memory1.length > 5000) {
      this.setState({
        gray: 0.5
      })
      let _this = this
      let tempdata = ""
      for (var i = 0; i < this.state.memory1.length; i++) {
        tempdata += parseInt(this.state.memory1[i], 10) + ".0"
        if (i === this.state.memory1.length) {

        }
        else {
          tempdata += ","
        }
      }
      tempdata = tempdata.substring(0, tempdata.length - 1);
      var unirest = require('unirest');
      unirest('POST', 'https://574cyfj51e.execute-api.us-east-1.amazonaws.com/EKG_from_array')
        .headers({
          'Content-Type': 'text/plain'
        })
        .send(tempdata)
        .end(function (res) {
          if (res.error) console.log(res.error);
          let array = res.raw_body.replace("[", "").replace("]", "").replace(' ', "").replace('"', "")
          for (let k = 0; k < 25; k++) {
            array = array.replace(' ', "").replace('"', "")
          }
          array = array.split(",")
          for (let k = 0; k < array.length; k++) {
            array[k] = parseFloat(array[k], 10)
          }
          for (let k = 0; k < array.length; k++) {
            if (array[k] >= 100) {
              array[k] = array[k].toFixed(0)
            }
            else if (array[k] >= 1) {
              array[k] = array[k].toFixed(2)
            }
            else if (array[k] < 1) {
              array[k] = array[k].toFixed(4)
            }
          }
          for (let k = 0; k < array.length; k++) {
            array[k] = " " + (array[k].toString()).substring(0, 5);
          }

          _this.setState(
            {
              ibi: array[3],
              sdnn: array[5],
              sdsd: array[7],
              rmssd: array[9],
              pnn20: array[11],
              pnn50: array[13],
              hr_mad: array[15],
              sd1: array[17],
              sd2: array[19],
              s: array[21],
              sd1sd2: array[23],
              br: 2 * Math.round((parseInt(parseFloat(array[25]) * 60) + Number.EPSILON) * 100) / 100,
              gray: 0
            }
          )
          alert("EKG Analysis Complete!")

        });
    }
    else {

    }
  }
  //React lifecycle method that gets called once a component has finished mounting
  //Learn more: https://reactjs.org/docs/react-component.html#componentdidmount
  componentDidMount() {
    let _this = this
    var unirest = require('unirest');
    unirest('GET', 'https://98yl5ljnse.execute-api.us-east-1.amazonaws.com/GetLastSummary')
      .headers({
        'bucket': 'scup-blankit',
        'file': 'vars/summary.json'
      })
      .end(function (res) {
        if (res.error) throw new Error(res.error);

        _this.setState({
          sumMemory: JSON.parse(JSON.parse(JSON.parse(res.raw_body))),
          sumDat: JSON.parse(JSON.parse(JSON.parse(res.raw_body)))[0]
        })
      });
    setInterval(() => {
      if (this.state.memory1.length > 5000) {
        this.setState({
          gray: 0
        })
      }
    }, 5000);
    setInterval(() => { this.toDynamoDB() }, 60000 * 5);
  }

  toDynamoDB() {
    /*
    const temp = arrayContains(this.state.value, numbers)
    if (flag[0] && flag[1] && flag[2] && temp !== 0) {
      let temperature;
      if (this.state.temper > 50) {
        temperature = cround((this.state.temper - 32) / 1.8);
      }
      else {
        temperature = this.state.temper;
      }
      var unirest = require('unirest');
      unirest('GET', 'https://98yl5ljnse.execute-api.us-east-1.amazonaws.com/PutPatientData')
        .headers({
          'database': 'Scup-Database',
          'patient': this.state.value,
          'data': this.state.bpm + ',' + this.state.vars[1] + ',' + temperature
        })
        .end(function (res) {
          if (res.error) throw new Error(res.error);
          console.log("Data to Database")
          console.log(res.raw_body)
        });
    }
    else {

    }
    */
  }

  callBackIoT = (IoTData) => {

    var indata = ""
    var inserie = ""
    var inmemory = ""
    var total = 0
    var avg = 0
    var i = ""
    let mytopics = ["/scup/ecg-1", "/scup/spo2-1", "/scup/temp-1"]
    if (IoTData[0] === mytopics[0]) {

      let temp = JSON.parse(IoTData[1])
      flag[0] = true
      var hr_array = temp.data
      if (hr_array.length === 1) {
        hr_array = temp.data[0]
      }
      if (parseInt(temp.pat) === parseInt(this.state.patient)) {
        indata = this.state.datamem1
        inserie = this.state.series1
        inmemory = this.state.memory1

        for (i = 0; i < hr_array.length; i++) {
          indata.push(hr_array[i.toString()])
          inmemory.push(hr_array[i.toString()])
          inserie.push(".")
          if (indata.length > 1000) {
            indata.shift()
          }
          if (indata.length > 500) {
            inserie.shift()
          }
          if (inmemory.length > 10000) {
            inmemory.shift()
          }
        }
        indata = iirFilter.multiStep(indata)
        inmemory = iirFilter.multiStep(inmemory)
        if (isMobile) {
          this.setState(
            {
              data1: indata.slice(0, 1000),
              datamem1: indata,
              series1: inserie,
              memory1: inmemory
            }
          )
        }
        else {
          this.setState(
            {
              data1: indata.slice(0, 500),
              datamem1: indata,
              series1: inserie,
              memory1: inmemory
            }
          )
        }
      }
    }
    else if (IoTData[0] === mytopics[1]) {
      flag[1] = true
      let temp = JSON.parse(IoTData[1])
      const pat = temp.pat
      const temp2 = temp.graph
      temp = temp.data
      if (parseInt(pat) === parseInt(this.state.patient)) {
        indata = this.state.data2
        inserie = this.state.series2
        inmemory = this.state.memory2
        for (i = 0; i < temp2.length; i++) {
          indata.push(temp2[i.toString()])
          inserie.push(".")
          if (indata.length > temp2.length) {
            indata.shift()
          }
          if (indata.length > temp2.length) {
            inserie.shift()
          }
        }
        inmemory.push(temp[0])
        if (inmemory.length > 10) {
          inmemory.shift()
        }
        total = 0;
        for (i = 0; i < inmemory.length; i++) {
          total += parseInt(inmemory[i]);
        }
        avg = Math.round(total / inmemory.length, 2);
        this.setState(
          {
            vars: [this.state.vars[0], avg, this.state.vars[2]],
            data2: indata.slice(0, temp2.length),
            series2: inserie.slice(0, temp2.length),
            bpm: temp[1]
          }
        )
      }

    }
    else if (IoTData[0] === mytopics[2]) {

      flag[2] = true
      const temp = JSON.parse(IoTData[1])
      if (parseInt(temp.pat) === parseInt(this.state.patient)) {
        indata = this.state.data3
        inserie = this.state.series3
        if (this.state.weightlabel === "lb") {
          let temps = cround(temp.data * 1.8 + 32)
          indata.push(temps)
        }
        else {
          let temps = cround(parseFloat(temp.data))
          indata.push(temps)
        }
        inserie.push(".")
        if (indata.length > 6) {
          indata.shift()
        }
        if (indata.length > 6) {
          inserie.shift()
        }
        total = 0;
        for (i = 0; i < indata.length; i++) {
          total += parseFloat(indata[i]);
        }
        avg = (total / indata.length);
        avg = cround(avg)
        this.setState(
          {
            temper: avg,
            data3: indata.slice(0, 10),
            series3: inserie.slice(0, 10),
          }
        )
      }
    }
  }

  callbackbutton(data) {
    console.log(data)
    const temp = arrayContains(data, numbers)
    let _this = this
    if (temp === 0) {
      // Nothing
    }
    else {
      var unirest = require('unirest');
      unirest('GET', 'https://98yl5ljnse.execute-api.us-east-1.amazonaws.com/GetReports-Database')
        .headers({
          'database': 'Scup-Reports',
          'patient': data
        })
        .end(function (res) {
          if (res.error) throw new Error(res.error);
          if (res.raw_body !== "") {
            let temp = JSON.parse(res.raw_body);
            let dataArray1 = []
            let dataArray2 = []
            for (let i = 0; i < temp.length; i++) {
              let tempo = temp[i].Data.split(",")
              let frame = Math.round(temp[i].Time)
              dataArray1.push(frame)
              dataArray2.push(tempo)
            }
            _this.setState({
              nreports: dataArray1,
              reports: dataArray2
            })
          }
          else {
            _this.setState({
              nreports: [],
              reports: []
            })
          }
          alert("Report Sent")
        });
    }
  }

  uploadSummaryDataServer() {
    var unirest = require('unirest');
    unirest('POST', 'https://98yl5ljnse.execute-api.us-east-1.amazonaws.com/putS3')
      .headers({
        'bucket': 'scup-blankit',
        'path': 'vars/summary.json',
        'Content-Type': 'application/json'
      })
      .send(JSON.stringify(this.state.sumMemory))
      .end(function (res) {
        if (res.error) throw new Error(res.error);
        alert("Data Submited")
      });
  }

  handleChange(event) {
    const temp = arrayContains(event.target.value, numbers)
    if (temp === 0) {
      // nothing
    }
    else {
      flag = [false, false, false]
      this.setState({
        sumDat: this.state.sumMemory[temp],
        sumDats: "",
        checked: false,
        SIEnable: false,
        value: event.target.value,
        weightlabel: "lb",
        heightlabel: "ft",
        templabel: "°F",
        imag: images[temp],
        ages: age[temp],
        heights: height[temp],
        weights: weight[temp],
        patient: temp,
        data1: [],
        datamem1: [],
        series1: [],
        memory1: [],
        data2: [],
        series2: [],
        data3: [],
        series3: [],
        bmi: cround(703 * weight[temp] / Math.pow(height[temp] * 12, 2)),
        range1: 42 * 1.8 + 32,
        range2: 35 * 1.8 + 32
      });
      var unirest = require('unirest');
      let _this = this
      unirest('GET', 'https://98yl5ljnse.execute-api.us-east-1.amazonaws.com/GetReports-Database')
        .headers({
          'database': 'Scup-Reports',
          'patient': event.target.value
        })
        .end(function (res) {
          if (res.error) throw new Error(res.error);
          if (res.raw_body !== "") {
            let temp = JSON.parse(res.raw_body);
            let dataArray1 = []
            let dataArray2 = []
            for (let i = 0; i < temp.length; i++) {
              let tempo = temp[i].Data.split(",")
              let frame = Math.round(temp[i].Time)
              dataArray1.push(frame)
              dataArray2.push(tempo)
            }
            _this.setState({
              nreports: dataArray1,
              reports: dataArray2
            })
          }
          else {
            _this.setState({
              nreports: [],
              reports: []
            })
          }
        });
    }
  }

  callbackSumUpdate(data) {
    console.log(data)
    const temp = arrayContains(this.state.value, numbers)
    if (temp === 0) {
      // Nothing
    }
    else {
      let temps = this.state.sumMemory
      temps[temp] = data
      this.setState({
        sumMemory: temps,
        sumDat: data
      })
    }
  }


  render() {
    if (isMobile) {
      return (
        <div style={{ padding: "1%" }}>
          <IotReciever sub_topics={["/scup/ecg-1", "/scup/spo2-1", "/scup/temp-1"]} callback={this.callBackIoT} />
          <Row md="1">
            <Col xs="12">
              <Row md="1">
                <Col xs="12">
                  <Card>
                    <CardBody>
                      <Row md="1">
                        <Col xs="6" className="d-flex justify-content-around">
                          <img style={{width:"80%" ,height:"86%" , filter: "grayscale(" + this.state.gray + ")" }} src={ECG} alt={Math.random()} onClick={() => this.checkEKG()} />
                        </Col>
                        <Col xs="6">
                          <Col className="d-flex justify-content-around h2">
                            BPM
                              <br />
                            {this.state.bpm}
                          </Col>
                        </Col>
                        <Col xs="12">
                          <LineGraph4 data={[this.state.data1, this.state.series1]} />
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col xs="12">
                  <Card>
                    <CardBody>
                      <Row md="1">
                        <Col xs="5" className="d-flex justify-content-around">
                        <img style={{width:"80%" ,height:"86%"}} src={SAT} alt={Math.random()} />
                        </Col>
                        <Col xs="7">
                          <Col className="d-flex justify-content-around h2">
                            Sat[%]
                              <br />
                            {this.state.vars[1]}
                          </Col>
                        </Col>
                        <Col xs="12">
                          <LineGraph4 data={[this.state.data2, this.state.series2]} />
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col xs="12">
                  <Card>
                    <CardBody>
                      <Row md="1">
                        <Col xs="5" className="d-flex justify-content-around">
                        <img style={{width:"80%" ,height:"86%"}}  src={TEMP} alt={Math.random()} />
                        </Col>
                        <Col xs="7">
                          <Col className="d-flex justify-content-around h2">
                            Temp[{this.state.templabel}]
                            <br />
                            {this.state.temper}
                          </Col>
                        </Col>
                        <Col xs="12">
                          <LineGraph3 max={this.state.range1} min={this.state.range2} data={[this.state.data3, this.state.series3]} />
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col xs="12">
              <Card style={{ height: "80%" }}>
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
                            <ComboBox filter={null} filterable={false} value={this.state.value} clearButton={false} defaultValue="Patients" style={{ fontSize: "1.2rem", width:"82%" }} data={numbers} onChange={this.handleChange} />
                          </FormElement>
                        )}
                      />
                    </Col>
                  </Row>
                  <hr />
                  <FormElement>
                    <TabsNav
                      tab1={<Summ callback={this.callbackSumUpdate}
                        data={this.state.sumDat}
                        patient={this.state.patient}
                        button={() => this.uploadSummaryDataServer()}
                      />}
                      tab2={<Machetem
                        numbers={numbers}
                        value={this.state.value}
                        bpm={this.state.bpm}
                        sat={this.state.vars[1]}
                        temp={this.state.temper}
                        brpm={this.state.br}
                        callback={this.callbackbutton}
                      />}
                      tab3={<MyEditorM data={this.state.sumDats} patient={this.state.patient} />}
                      tab4={<Reports nreports={this.state.nreports} reports={this.state.reports} />}
                      tab5={
                        <Card style={{marginBottom:"-60px"}}>
                          <CardBody>
                            <CardTitle style={{ textAlign: "center", fontSize: "2.2rem" }}>Analysis:</CardTitle>
                            <Row md="1">
                              <Col xs="12" style={{ textAlign: "left", fontSize: "1.7rem" }}>
                                <div>IBI:{this.state.ibi}</div>
                                <p></p>
                                <div>SDNN:{this.state.sdnn}</div>
                                <p></p>
                                <div>SDSD:{this.state.sdsd}</div>
                                <p></p>
                                <div>RMSSD:{this.state.rmssd}</div>
                                <p></p>
                                <div>PNN20:{this.state.pnn20}</div>
                                <p></p>
                                <div>PNN50:{this.state.pnn50}</div>
                                <p></p>
                              </Col>
                              <Col xs="12" style={{ textAlign: "left", fontSize: "1.7rem" }}>
                                <div>HR_MAD:{this.state.hr_mad}</div>
                                <p></p>
                                <div>SD1:{this.state.sd1}</div>
                                <p></p>
                                <div>SD2:{this.state.sd2}</div>
                                <p></p>
                                <div>S:{this.state.s}</div>
                                <p></p>
                                <div>SD1SD2:{this.state.sd1sd2}</div>
                                <p></p>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      }
                    />
                  </FormElement>
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
          <IotReciever sub_topics={["/scup/ecg-1", "/scup/spo2-1", "/scup/temp-1"]} callback={this.callBackIoT} />
          <Row>
            <Col>
              <Row md="1">
                <Col>
                  <Card>
                    <CardBody>
                      <Row>
                        <Col xs="3" className="d-flex justify-content-around">
                          <img style={{ filter: "grayscale(" + this.state.gray + ")" }} src={ECG} alt={Math.random()} onClick={() => this.checkEKG()} />
                        </Col>
                        <Col xs="7">
                          <LineGraph4 data={[this.state.data1, this.state.series1]} />
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
                  <Card>
                    <CardBody>
                      <Row>
                        <Col xs="3" className="d-flex justify-content-around">
                          <img src={SAT} alt={Math.random()} />
                        </Col>
                        <Col xs="7">
                          <LineGraph4 data={[this.state.data2, this.state.series2]} />
                        </Col>
                        <Col xs="2">
                          <Row md="1" className="h5">
                            <Col className="d-flex justify-content-around ">
                              Sat %
                            </Col>
                            <Col className="d-flex justify-content-around h1">
                              {this.state.vars[1]}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <CardBody>
                      <Row >
                        <Col xs="3" className="d-flex justify-content-around">
                          <img src={TEMP} alt={Math.random()} />
                        </Col>
                        <Col xs="7">
                          <LineGraph3 max={this.state.range1} min={this.state.range2} data={[this.state.data3, this.state.series3]} />
                        </Col>
                        <Col xs="2">
                          <Row md="1" className="h5" >
                            <Col className="d-flex justify-content-around">
                              Temp {this.state.templabel}
                            </Col>
                            <Col className="d-flex justify-content-around h1">
                              {this.state.temper}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col>
              <Card style={{ height: "80%" }}>
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
                            <ComboBox filter={null} filterable={false} value={this.state.value} clearButton={false} defaultValue="Patients" style={{ fontSize: "1.2rem" }} data={numbers} onChange={this.handleChange} />
                          </FormElement>
                        )}
                      />
                    </Col>
                  </Row>
                  <hr />
                  <FormElement>
                    <TabsNav
                      tab1={<Sum callback={this.callbackSumUpdate}
                        data={this.state.sumDat}
                        patient={this.state.patient}
                        button={this.uploadSummaryDataServer}
                      />}
                      tab2={<Machete
                        numbers={numbers}
                        value={this.state.value}
                        bpm={this.state.bpm}
                        sat={this.state.vars[1]}
                        temp={this.state.temper}
                        brpm={this.state.br}
                        callback={this.callbackbutton}
                      />}
                      tab3={<MyEditor patient={this.state.patient} />}
                      tab4={<Reports nreports={this.state.nreports} reports={this.state.reports} />}
                      tab5={
                        <Card>
                          <CardBody>
                            <CardTitle style={{ textAlign: "center", fontSize: "32px" }}>Analysis:</CardTitle>
                            <Row md="2">
                              <Col style={{ textAlign: "left", fontSize: "20px" }}>
                                <div>IBI:{this.state.ibi}</div>
                                <p></p>
                                <div>SDNN:{this.state.sdnn}</div>
                                <p></p>
                                <div>SDSD:{this.state.sdsd}</div>
                                <p></p>
                                <div>RMSSD:{this.state.rmssd}</div>
                                <p></p>
                                <div>PNN20:{this.state.pnn20}</div>
                                <p></p>
                                <div>PNN50:{this.state.pnn50}</div>
                                <p></p>
                              </Col>
                              <Col style={{ textAlign: "left", fontSize: "20px" }}>
                                <div>HR_MAD:{this.state.hr_mad}</div>
                                <p></p>
                                <div>SD1:{this.state.sd1}</div>
                                <p></p>
                                <div>SD2:{this.state.sd2}</div>
                                <p></p>
                                <div>S:{this.state.s}</div>
                                <p></p>
                                <div>SD1SD2:{this.state.sd1sd2}</div>
                                <p></p>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      }
                    />
                  </FormElement>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <Row md="5" style={{ fontSize: "1rem" }}>
                    <Col>
                      <Col>
                        Age [years]
                      </Col>
                      <Col>
                        {this.state.ages}
                      </Col>
                    </Col>
                    <Col>
                      <Col>
                        Height [{this.state.heightlabel}]
                      </Col>
                      <Col>
                        {this.state.heights}
                      </Col>
                    </Col>
                    <Col>
                      <Col>
                        Weight [{this.state.weightlabel}]
                      </Col>
                      <Col>
                        {this.state.weights}
                      </Col>
                    </Col>
                    <Col>
                      <Col>
                        BMI
                      </Col>
                      <Col>
                        {
                          this.state.bmi
                        }
                      </Col>
                    </Col>
                    <Col>
                      <Col>
                        {this.state.label}
                      </Col>
                      <Col>
                        <Switch onLabel={"SI"} offLabel={"ENG"} onChange={() => this.toogleSI()} disabled={this.state.SIEnable} />
                      </Col>
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
export default Tab;