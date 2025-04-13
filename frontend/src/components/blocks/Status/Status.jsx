import React from 'react';
import {useSelector} from "react-redux";
import {statusInterfaceGroup} from "../../../utils/Utils";

const Status = () => {
    const { nodes } = useSelector((state) => state.nodes);
    const {groups, selectedGroup } = useSelector((state) => state.groups);
    console.log(nodes)
    return (
        <div>
            <h2>Статус</h2>
            <div className={`statusColorBlock`} style={{background:`${nodes}`}}>{statusInterfaceGroup(selectedGroup, groups, nodes)}</div>
        </div>
    );
};

export default Status;