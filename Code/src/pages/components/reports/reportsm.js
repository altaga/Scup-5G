import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { FormGroup, Input, Label } from "reactstrap"

function getDate(unix) {
    if (isNaN(unix)) {
        return "Reports by Date"
    }
    let date = new Date(unix * 1000);
    return date
}

function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
   }

class Reportsm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            document:""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        for(let i = 0; i<this.props.nreports.length;i++){
            if(toTimestamp(event.target.value)=== this.props.nreports[i]){
               
                const element = (
                    <div>
                      <h1>Symptoms: {this.props.reports[i].sym}</h1>
                      <h1>Objective: {this.props.reports[i].obj}</h1>
                      <h1>BPM: {this.props.reports[i].bpm}</h1>
                      <h1>Sat%: {this.props.reports[i].so2}</h1>
                      <h1>Temp: {this.props.reports[i].temp}</h1>
                      <h1>BreathsPM: {this.props.reports[i].br}</h1>
                      <h1>Blood P: {this.props.reports[i].bp}</h1>
                      <h1>Action: {this.props.reports[i].ac}</h1>
                      <h1>Objective: {this.props.reports[i].p}</h1>
                    </div>
                  );
                ReactDOM.render(element, document.getElementById('report')); 
                
            }
        }
    }

    render() {
        let numbers = this.props.nreports
        return (
            <div>
                <FormGroup>
                    <Label for="exampleSelect" className="h1">Select Date</Label>
                    <Input style={{fontSize:"2rem"}} onChange={this.handleChange} type="select" name="select" id="exampleSelect">
                        {
                              numbers.map((number) => <option key={number}>{getDate(number).toString()}</option>)
                        }
                    </Input>
                </FormGroup>
                <div id="report" />
            </div>

        )
    }
}

export default Reportsm;