import React, { Component } from 'react';

import { TextArea } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { Card } from "@progress/kendo-react-layout";

import Minim from "./minicardm"

function blank(number){
    const seed = new Array(number).fill(0);
    const comp = seed.map((x) => <>&nbsp;</>)
    return comp
}

class Summ extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mydata: this.props.data
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let temp = this.state.mydata
        temp[event.nativeEvent.target.id] = event.value
        this.props.callback(temp)
    }

    componentDidUpdate() {
        if (JSON.stringify(this.state.mydata) !== JSON.stringify(this.props.data)) {
            this.setState({
                mydata: this.props.data
            })
        }
    }

    render() {
        return (
            <div>
                <Card>
                    <Minim
                        icon={<span class="k-icon k-i-round-corners" style={{ color: "#ff6358", fontSize: "2rem" }} />}
                        tittle={"PPA:"}
                        info={<TextArea style={{ fontSize: "1rem" }} value={this.state.mydata[0]} onChange={this.handleChange} type="textarea" name="text" id="0" />}
                    />
                    <Minim
                        icon={<span class="k-icon k-i-plus" style={{ color: "#ff6358", fontSize: "2rem" }} />}
                        tittle={"Medicines:"}
                        info={<TextArea style={{ fontSize: "1rem" }} value={this.state.mydata[1]} onChange={this.handleChange} type="textarea" name="text" id="1" />}
                    />
                    <Minim
                        icon={<span class="k-icon k-i-information" style={{ color: "#ff6358", fontSize: "2rem" }} />}
                        tittle={"Allergies:"}
                        info={<TextArea style={{ fontSize: "1rem" }} value={this.state.mydata[2]} onChange={this.handleChange} type="textarea" name="text" id="2" />}
                    />
                    <Minim
                        icon={<span class="k-icon k-i-calendar" style={{ color: "#ff6358", fontSize: "2rem" }} />}
                        tittle={"Last Consultation:"}
                        info={<TextArea style={{ fontSize: "1rem" }} value={this.state.mydata[3]} onChange={this.handleChange} type="textarea" name="text" id="3" />}
                    />
                </Card>
                <br />
                
                <div className="text-center" style={{ marginBottom: "-140px" }}>
                <input style={{ fontSize: "1.5rem" }} className="k-button k-primary" type="button" value="Submit" onClick={() => this.props.button()}></input>
                </div>
            </div>
        );
    }
}

export default Summ;