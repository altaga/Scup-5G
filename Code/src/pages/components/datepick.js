import React, { Component } from "react";
import { DatePicker} from "@y0c/react-datepicker";
import "./calendars.css"

function getDate(date) {
  let unix = new Date(date).getTime() / 1000
  return unix
}

class InlineDatePickerDemo extends Component {
  
    onChange = (date) => {
      let mydate = date.toDate()
      mydate = getDate(mydate) - mydate.getSeconds() - mydate.getMinutes()*60 - mydate.getHours()*3600
      if(mydate>=1612224000){
        this.props.callback(new Date(mydate*1000))
      }
      
    }
  
    render() {
      return (
        <div style={{fontSize:"3.5rem"}}>
        <DatePicker showToday onChange={this.onChange} />
        </div>
      );
    }
  }


export default InlineDatePickerDemo;