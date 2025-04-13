import React from 'react';
import GeneralInfo from "./GeneralInfo.jsx";
import Status from "./Status.jsx";


const StatusBlock = () => {
    return (
        <div className="blocks statusAndGroupsBlocs">
            <Status/>
            <hr/>
            <GeneralInfo/>
        </div>
    )
}
export default StatusBlock;