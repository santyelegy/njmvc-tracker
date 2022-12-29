import React from 'react'
import ReactECharts from 'echarts-for-react';
import moment from "moment";
import Accordion from 'react-bootstrap/Accordion';

function TableRow({ info }) {
    //console.log(info.history)
    const option = {
        xAxis: {
            axisLabel: {
                formatter: axisValue => {
                    return moment(axisValue).format("YY-MM-DD");
                }
            },
            type: 'time',
        },
        yAxis: {
            axisLabel: {
                formatter: axisValue => {
                    return moment(axisValue).format("YYYY-MM-DD HH:mm");
                }
            },
            type: 'time'
        },
        series: [
            {
                data: info.history,
                type: 'line'
            }
        ]
    };
    return (
        <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header><td>{info.location}</td>
                <td>{info.openTime}</td></Accordion.Header>
          <Accordion.Body>
            <ReactECharts option={option} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    )
}

export default TableRow