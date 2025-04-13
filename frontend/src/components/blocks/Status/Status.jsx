import React from 'react';
import {useSelector} from "react-redux";
import {statusInterfaceGroup} from "../../../utils/Utils";

const Status = () => {
    const { nodes } = useSelector((state) => state.nodes);
    const {groups, selectedGroup } = useSelector((state) => state.groups);
    return (
        <div>
            <h2>Статус</h2>
            <p>{statusInterfaceGroup(selectedGroup, groups, nodes)}</p>
        </div>
    );
};

export default Status;