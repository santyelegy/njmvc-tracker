import React from "react";
import timeData from "../data/timeData.json"
import locationData from "../data/location.json"


function Table(props) {
    //Load data
    var IdToName = {};
    for (let i = 0; i < locationData.length; i++) {
        var processing = locationData[i];
        var locApp = processing["LocAppointments"];
        IdToName[locApp[0]["LocationId"]] = processing["Name"].split("-")[0]
    }
    var outputs = []
    for (let i = 0; i < timeData.length; i++) {
        processing = timeData[i];
        var locationId = processing["LocationId"];
        var output = {}
        output["openTime"] = processing["FirstOpenSlot"];
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
        <div className="Table">
            <table>
                <thead>
                    <tr>
                        <th>Location</th>
                        <th>Earliest Date</th>
                        <th>Newest Fetch</th>
                        <th>Date Ahead</th>
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