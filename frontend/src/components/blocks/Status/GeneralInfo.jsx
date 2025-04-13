import React from 'react';
import {useSelector} from "react-redux";

const GeneralInfo = () => {
    const {groups, selectedGroup } = useSelector((state) => state.groups);
    const { selectedNode } = useSelector((state) => state.nodes);
    return (
        <div>
            <h2>Общая информация</h2>
            <p>Группа где мы находимся: {selectedGroup || "Все группы"}</p>
        </div>
    );
};

export default GeneralInfo;