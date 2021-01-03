import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import moment from 'moment';
import { useEffect, useRef } from 'react';

export const Chart = props => {
    const chartElem = useRef(null);
    const data = props.data.sort((a, b) => {
        return moment.utc(a.x).diff(moment.utc(b.x))
    });
    const config = {
       chart: {
         zoomType: 'xy'
       },
       rangeSelector: {
           enabled: false,
           inputEnabled: false
       },
       title: {
         text: 'Price'
       },
       series: [{
         turboThreshold: 0,
         type: 'ohlc',
         name: 'Price',
         data
       }]
    };

    useEffect(() => {
        chartElem.current.chart.zoomOut();
    }, [props.cType]);

    return (
        <div>
            <HighchartsReact
              highcharts={Highcharts}
              constructorType={"stockChart"}
              options={config}
              ref={chartElem}
            />
        </div>
    );
}