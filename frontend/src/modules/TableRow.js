import React from 'react'
import ReactECharts from 'echarts-for-react';
import moment from "moment";
import Accordion from 'react-bootstrap/Accordion';



function TableRow( prop ) {
    //console.log(info.history)
    const headerClick=()=>{
        prop.setcenter(prop.info.position);
        prop.setzoom(11);
        prop.setactiveKey(prop.index.toString());
    }
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
                    return moment(axisValue).format("YYYY-MM-DD");
                }
            },
            type: 'time'
        },
        series: [
            {
                data: prop.info.history,
                type: 'line'
            }
        ]
    };
    return (
        <Accordion.Item eventKey={prop.index.toString()}>
          <Accordion.Header className='accordion-header' onClick={headerClick}>{prop.info.location}<span style={{color:'red'}}>{" "+prop.info.openTime}</span></Accordion.Header>
          <Accordion.Body>
            <ReactECharts option={option} />
          </Accordion.Body>
        </Accordion.Item>
    )
}

export default TableRow