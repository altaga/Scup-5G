import React, { Component } from 'react';
import {
     Col, Row
} from 'reactstrap';

class Mini extends Component {
    render() {
        return (
            <div>
                <Row className="h5">
                    <Col xs="1">
                        {this.props.icon}
                    </Col>
                    <Col xs="4">
                        {this.props.tittle}
                    </Col>
                    <Col>
                        {this.props.info}
                    </Col>
                </Row>
                
            </div>
        );
    }
}

export default Mini;