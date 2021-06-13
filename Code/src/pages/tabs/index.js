import React from 'react';
import { ButtonGroup, Button } from '@progress/kendo-react-buttons';
import Tab from "./Tab";
import Htab from "./Htab";
import Tab2 from "./Tab2";
import {
    isMobile
} from "react-device-detect";

const fontSize = "1.2rem"

class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTab: "0",
            display0: "inline",
            display1: "none",
            display2: "none"
        }
        this.setActiveTab = this.setActiveTab.bind(this)
    }

    setActiveTab(tab, button) {
        if (tab === this.state.activeTab) {
            // None
        }
        else {
            if (button === 0) {
                this.setState({
                    activeTab: "0",
                    display0: "inline",
                    display1: "none",
                    display2: "none"
                })
            }
            else if (button === 1) {
                this.setState({
                    activeTab: "1",
                    display0: "none",
                    display1: "inline",
                    display2: "none"
                })
            }
            else if (button === 2) {
                this.setState({
                    activeTab: "2",
                    display0: "none",
                    display1: "none",
                    display2: "inline"
                })
            }
        }
    }

    render() {
        if (isMobile) {
            return (
                <div className="text-center">
                    <div>
                        <ButtonGroup>
                            <Button style={{ fontSize: fontSize }} primary={true} onClick={() => this.setActiveTab("0", 0)}>
                                Monitor
                    </Button>
                            <span style={{ color: "white" }}>|</span>
                            <Button style={{ fontSize: fontSize }} primary={true} onClick={() => this.setActiveTab("1", 1)}>
                                Historical
                    </Button>
                            <span style={{ color: "white" }}>|</span>
                            <Button style={{ fontSize: fontSize }} primary={true} onClick={() => this.setActiveTab("2", 2)}>
                                Simulator
                    </Button>
                        </ButtonGroup>
                    </div>
                    <hr />
                    <div id="0" style={{ display: this.state.display0 }}>
                        <Tab />
                    </div>
                    <div id="1" style={{ display: this.state.display1 }}>
                        <Htab />
                    </div>
                    <div id="2" style={{ display: this.state.display2 }}>
                        <Tab2 />
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div>
                        <ButtonGroup>
                            <Button style={{ fontSize: "1.3rem" }} primary={true} onClick={() => this.setActiveTab("0", 0)}>
                                Monitor
                    </Button>
                            <span style={{ color: "white" }}>|</span>
                            <Button style={{ fontSize: "1.3rem" }} primary={true} onClick={() => this.setActiveTab("1", 1)}>
                                Historical
                    </Button>
                            <span style={{ color: "white" }}>|</span>
                            <Button style={{ fontSize: "1.3rem" }} primary={true} onClick={() => this.setActiveTab("2", 2)}>
                                Simulator
                    </Button>
                        </ButtonGroup>
                    </div>
                    <hr />
                    <div id="0" style={{ display: this.state.display0 }}>
                        <Tab />
                    </div>
                    <div id="1" style={{ display: this.state.display1 }}>
                        <Htab />
                    </div>
                    <div id="2" style={{ display: this.state.display2 }}>
                        <Tab2 />
                    </div>
                </div>
            );
        }
    }
}

export default Index;