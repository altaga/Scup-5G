import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import "./css/colors.css"
import {
    isMobile
} from "react-device-detect";

const TabsNav = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    if (isMobile) {
        return (
            <div>
                <Nav tabs style={{ fontColor: "#ff6358", fontSize: "1rem" }}>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggle('1'); }}
                        >
                            Summary
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            Report
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '3' })}
                            onClick={() => { toggle('3'); }}
                        >
                            Additional Notes
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '4' })}
                            onClick={() => { toggle('4'); }}
                        >
                            Past Reports
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '5' })}
                            onClick={() => { toggle('5'); }}
                        >
                            ECG Details
                        </NavLink>
                    </NavItem>
                </Nav>
                <hr />
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        {props.tab1}
                    </TabPane>
                    <TabPane tabId="2">
                        {props.tab2}
                    </TabPane>
                    <TabPane tabId="3">
                        {props.tab3}
                    </TabPane>
                    <TabPane tabId="4">
                        {props.tab4}
                    </TabPane>
                    <TabPane tabId="5">
                        {props.tab5}
                    </TabPane>
                </TabContent>
            </div>
        );
    }
    else {
        return (
            <div>
                <Nav tabs style={{ fontColor: "#ff6358", fontSize: "0.9rem" }}>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggle('1'); }}
                        >
                            Summary
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            Report
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '3' })}
                            onClick={() => { toggle('3'); }}
                        >
                            Additional Notes
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '4' })}
                            onClick={() => { toggle('4'); }}
                        >
                            Past Reports
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '5' })}
                            onClick={() => { toggle('5'); }}
                        >
                            ECG Details
                        </NavLink>
                    </NavItem>
                </Nav>
                <hr />
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        {props.tab1}
                    </TabPane>
                    <TabPane tabId="2">
                        {props.tab2}
                    </TabPane>
                    <TabPane tabId="3">
                        {props.tab3}
                    </TabPane>
                    <TabPane tabId="4">
                        {props.tab4}
                    </TabPane>
                    <TabPane tabId="5">
                        {props.tab5}
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

export default TabsNav;