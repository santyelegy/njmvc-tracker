import React, { useState,useEffect } from "react";
import TableRow from "./TableRow";
import {default as BSTable} from 'react-bootstrap/Table' ;

function Table(props) {
    //Load data
    let [mvcs, setmvc] = useState([])
    let [times,settime]= useState([])
    let [historys,sethistory]= useState([])
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
    let getHistory = async() =>{
        let response = await fetch('http://127.0.0.1:8000/api/history/')
        let time = await response.json()
        sethistory(time)
    }
    useEffect(() => {
        getLocation();
        getTime();
        getHistory();
    }, [])

    var IdToName = {};
    for (let i = 0; i < mvcs.length; i++) {
        var processing = mvcs[i];
        var locId = processing["id"];
        IdToName[locId] = processing["name"].split("-")[0]
    }
    var IdToHistory={}
    for (let i=0;i<historys.length;i++){
        processing=historys[i];
        locId= processing["locationId"];
        if(locId in IdToHistory){
            IdToHistory[locId].push([processing["day"],processing["earliestTime"]])
        }else{
            IdToHistory[locId]=[[processing["day"],processing["earliestTime"]]]
        }
    }
    var outputs = []
    for (let i = 0; i < times.length; i++) {
        processing = times[i];
        var locationId = processing["locationId"];
        var output = {}
        output["openTime"] = processing["time"];
        output["location"] = IdToName[locationId];
        output["history"]=IdToHistory[locationId];
        outputs.push(output);
    }

    //end load data
    const tableBody = outputs.map((info,index) => {
        return (
            <TableRow key={index} info={info} />
        );
    });
    return (
        <BSTable striped bordered hover>
                <thead>
                    <tr>
                        <th scope="col">Location</th>
                        <th scope="col">Earliest Date</th>
                        <th scope="col">Newest Fetch</th>
                        <th scope="col">Date Ahead</th>
                    </tr>
                </thead>
                <th colSpan="4">
                {tableBody}
                </th>        
        </BSTable>
    );
}
export default Table;