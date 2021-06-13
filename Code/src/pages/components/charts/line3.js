
import React from 'react';
import {
    Chart,
    ChartTitle,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem
} from "@progress/kendo-react-charts";

class LineGraph3 extends React.Component {

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
                <ChartCategoryAxis>
                    <ChartCategoryAxisItem
                        categories={this.props.data[0]}
                    />
                </ChartCategoryAxis>
                <ChartSeries>
                    <ChartSeriesItem type="line" data={this.props.data[0]} />
                </ChartSeries>
            </Chart>
        );
    }
}

export default LineGraph3;