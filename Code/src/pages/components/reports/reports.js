import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { FormElement } from "@progress/kendo-react-form";
import { ComboBox } from '@progress/kendo-react-dropdowns';

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

class Reports extends Component {

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
                      <h3>Symptoms: {this.props.reports[i][0]}</h3>
                      <h3>Objective: {this.props.reports[i][1]}</h3>
                      <h5>BPM: {this.props.reports[i][2]}</h5>
                      <h5>Sat%: {this.props.reports[i][3]}</h5>
                      <h5>Temp: {this.props.reports[i][4]}</h5>
                      <h5>BreathsPM: {this.props.reports[i][5]}</h5>
                      <h5>Blood P: {this.props.reports[i][6]}</h5>
                      <h3>Action: {this.props.reports[i][7]}</h3>
                      <h3>Objective: {this.props.reports[i][8]}</h3>
                    </div>
                  );
                ReactDOM.render(element, document.getElementById('report')); 
                
            }
        }
    }

    render() {
        let numbers = this.props.nreports
        let mydata = numbers.map((number) =>getDate(number).toString())
        return (
            <div>
                <FormElement>
                    <hr />
                    <ComboBox filter={null} filterable={false} value={this.state.value} clearButton={false} defaultValue="Select Date" style={{ fontSize: "1.2rem" }} data={mydata} onChange={this.handleChange} />
                </FormElement>
                <div id="report" />
                <div style={{marginBottom:"60px"}} />
            </div>

        )
    }
}

export default Reports;