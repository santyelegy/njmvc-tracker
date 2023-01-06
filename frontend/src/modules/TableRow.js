import React from 'react'
import ReactECharts from 'echarts-for-react';
import moment from "moment";
import Accordion from 'react-bootstrap/Accordion';
import Button from "react-bootstrap/Button";


function TableRow(prop) {
    //console.log(info.history)
    const headerClick = () => {
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
    var average_waiting_day;
    if (prop.info.history) {
        for (let i = 0; i < prop.info.history.length; i++) {
            var d1msecs = new Date(prop.info.history[i][0]).getTime();
            var d2msecs = new Date(prop.info.history[i][1]).getTime();
            if (average_waiting_day) {
                average_waiting_day += (d2msecs - d1msecs);
            } else {
                average_waiting_day = (d2msecs - d1msecs);
            }
        }
        average_waiting_day /= prop.info.history.length;
        average_waiting_day = Math.floor(average_waiting_day/86400000);
    }

    return (
        <Accordion.Item eventKey={prop.index.toString()} id={prop.info.location}>
            <Accordion.Header className='accordion-header' onClick={headerClick}>{prop.info.location}<span style={{ color: 'red' }}>{" " + prop.info.openTime}</span></Accordion.Header>
            <Accordion.Body>
                <ReactECharts option={option} />
                <a>Average waiting day : {average_waiting_day}</a>
                <Button href={"https://telegov.njportal.com/njmvc/AppointmentWizard/15/".concat(prop.info.url.toString())}>Go To NJMVC</Button>
                <Button href={"http://127.0.0.1:3000/register/".concat(prop.info["locationId"].toString())}>Email notification</Button>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default TableRow