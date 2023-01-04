import React, { useState, useEffect } from "react";
import TableRow from "./TableRow";
import Accordion from 'react-bootstrap/Accordion';
import MapWrapper from "./MapWrapper";
import Container from 'react-bootstrap/Container';

function Table(props) {
    //Load data
    const ref = React.useRef(null);
    const [map, setMap] = React.useState();
    const [center, setcenter] = useState({ lat: 39.833851, lng: -74.871826 });
    const [zoom, setzoom] = useState(8);
    const [activeKey, setactiveKey] = useState(null);
    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);
    let [mvcs, setmvc] = useState([])
    let [times, settime] = useState([])
    let [historys, sethistory] = useState([])
    let [outputs, setoutputs] = useState([])
    let [MVCToIndex, setMVCToIndex] = useState({})
    let getLocation = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/mvc/')
        let data = await response.json()
        setmvc(data)
    }
    let getTime = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/time/')
        let time = await response.json()
        settime(time)
    }
    let getHistory = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/history/')
        let time = await response.json()
        sethistory(time)
    }


    useEffect(() => {
        getLocation();
        getTime();
        getHistory();

    }, [])
    useEffect(() => {
        let processInputData = () => {
            var IdToName = {};
            for (let i = 0; i < mvcs.length; i++) {
                var processing = mvcs[i];
                var locId = processing["id"]; // the locationId is infact the index in database
                IdToName[locId] = processing
            }
            var IdToHistory = {}
            for (let i = 0; i < historys.length; i++) {
                processing = historys[i];
                locId = processing["locationId"];
                if (locId in IdToHistory) {
                    IdToHistory[locId].push([processing["day"], processing["earliestTime"]])
                } else {
                    IdToHistory[locId] = [[processing["day"], processing["earliestTime"]]]
                }
            }
            var outputs = []
            for (let i = 0; i < times.length; i++) {
                processing = times[i];
                var locationId = processing["locationId"];
                var output = {}
                output["openTime"] = processing["time"];
                output["location"] = IdToName[locationId]["name"].split("-")[0];
                output["history"] = IdToHistory[locationId];
                output["position"] = { lat: IdToName[locationId]["lat"], lng: IdToName[locationId]["long"] }
                output["locationId"] = locationId
                outputs.push(output);
            }
            let newmapping = {}
            for (let i = 0; i < outputs.length; i++) {
                newmapping[outputs[i].locationId] = i.toString();
            }
            setoutputs(outputs)
            setMVCToIndex(newmapping);
        }
        processInputData()
    }, [mvcs, historys, times])




    //end load data
    const tableBody = outputs.map((info, index) => {

        return (
            <TableRow key={index} info={info} index={index} setcenter={setcenter}
                setzoom={setzoom} setactiveKey={setactiveKey} />
        );
    });
    return (
        <div className="rowC">
            <MapWrapper mvcs={mvcs} center={center} zoom={zoom} setactiveKey={setactiveKey}
                MVCToIndex={MVCToIndex} />
            <Container fluid className="container">
                <h3>All MVC</h3>
                    <Accordion activeKey={activeKey} >
                        {tableBody}
                    </Accordion>
            </Container>
        </div>
    );
}
export default Table;