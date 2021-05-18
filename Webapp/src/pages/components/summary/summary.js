import React, { Component } from 'react';

import { TextArea } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { Card } from "@progress/kendo-react-layout";

import Mini from "./minicard"

class Sum extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mydata: this.props.data
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let temp = this.state.mydata
        temp[event.nativeEvent.target.id] = event.target.value
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
            <div style={{ paddingTop: "10px" }}>
                <Card>
                    <Mini
                        icon={<span class="k-icon k-i-round-corners" style={{ color: "#ff6358", fontSize: "2rem" }} />}
                        tittle={"PPA:"}
                        info={<TextArea style={{ fontSize: "1rem" }} value={this.state.mydata[0]} onChange={this.handleChange} type="textarea" name="text" id="0" />}
                    />
                    <hr />
                    <Mini
                        icon={<span class="k-icon k-i-plus" style={{ color: "#ff6358", fontSize: "2rem" }} />}
                        tittle={"Medicines:"}
                        info={<TextArea style={{ fontSize: "1rem" }} value={this.state.mydata[1]} onChange={this.handleChange} type="textarea" name="text" id="1" />}
                    />
                    <hr />
                    <Mini
                        icon={<span class="k-icon k-i-information" style={{ color: "#ff6358", fontSize: "2rem" }} />}
                        tittle={"Allergies:"}
                        info={<TextArea style={{ fontSize: "1rem" }} value={this.state.mydata[2]} onChange={this.handleChange} type="textarea" name="text" id="2" />}
                    />
                    <hr />
                    <Mini
                        icon={<span class="k-icon k-i-calendar" style={{ color: "#ff6358", fontSize: "2rem" }} />}
                        tittle={"Last Consultation:"}
                        info={<TextArea style={{ fontSize: "1rem" }} value={this.state.mydata[3]} onChange={this.handleChange} type="textarea" name="text" id="3" />}
                    />
                </Card>
                <br />
                <div style={{ marginBottom: "50px" }}>
                    <Button style={{ fontSize: "1.25rem" }} onClick={() => this.props.button()} primary={true}>Submit</Button>
                </div>
            </div>
        );
    }
}

export default Sum;