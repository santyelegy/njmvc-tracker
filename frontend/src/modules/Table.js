import React, { useState,useEffect } from "react";

function Table(props) {
    //Load data
    let [mvcs, setmvc] = useState([])
    let [times,settime]= useState([])

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
    useEffect(() => {
        getLocation();
        getTime();
    }, [])

    var IdToName = {};
    for (let i = 0; i < mvcs.length; i++) {
        var processing = mvcs[i];
        var locId = processing["id"];
        IdToName[locId] = processing["name"].split("-")[0]
    }
    var outputs = []
    for (let i = 0; i < times.length; i++) {
        processing = times[i];
        var locationId = processing["locationId"];
        var output = {}
        output["openTime"] = processing["time"];
        output["location"] = IdToName[locationId];
        outputs.push(output);
    }

    //end load data
    const tableBody = outputs.map((info) => {
        return (
            <tr>
                <td>{info.location}</td>
                <td>{info.openTime}</td>
                <td>{ }</td>
                <td>{ }</td>
            </tr>
        );
    });
    return (
        <div className="Table" class="table">
            <table>
                <thead>
                    <tr>
                        <th scope="col">Location</th>
                        <th scope="col">Earliest Date</th>
                        <th scope="col">Newest Fetch</th>
                        <th scope="col">Date Ahead</th>
                    </tr>
                </thead>
                <tbody>
                    {tableBody}
                </tbody>
            </table>
        </div>
    );
}
export default Table;