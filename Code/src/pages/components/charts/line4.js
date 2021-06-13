
import React from 'react';
import {
    Chart,
    ChartTitle,
    ChartSeries,
    ChartSeriesItem
} from "@progress/kendo-react-charts";

class LineGraph4 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let hei = window.innerHeight / 4 - 20
        return (
            <Chart style={{ height: hei }} transitions={false} >
                <ChartTitle />
                <ChartSeries>
                    <ChartSeriesItem type="line" data={this.props.data[0]} markers={{ visible: false }} />
                </ChartSeries>
            </Chart>
        );
    }
}

export default LineGraph4;