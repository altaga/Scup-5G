import React, { Component } from 'react';
import {
     Col, Row
} from 'reactstrap';

class Minim extends Component {
    render() {
        return (
            <div>
                <Row md="2" className="h5">
                    <Col xs="2">
                        {this.props.icon}
                    </Col>
                    <Col xs="10" style={{fontSize:"1.2rem"}}>
                        {this.props.tittle}
                    </Col>
                    <Col xs ="12">
                        {this.props.info}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Minim;