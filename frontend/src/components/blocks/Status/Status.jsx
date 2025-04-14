import React from 'react';
import {useSelector} from "react-redux";
import {setColorStatus, statusInterfaceGroup} from "../../../utils/Utils";

const Status = () => {
    const { nodes } = useSelector((state) => state.nodes);
    const {groups, selectedGroup } = useSelector((state) => state.groups);
    const statusText = statusInterfaceGroup(selectedGroup, groups, nodes)
    return (
        <div>
            <h2>Статус</h2>
            <div className={`statusColorBlock`} style={{background:`${setColorStatus(statusText)}`}} >{statusText}</div>
        </div>
    );
};

export default Status;