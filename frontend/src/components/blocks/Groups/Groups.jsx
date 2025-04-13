import React from 'react';
import {setSelectedGroup} from "../../../store/Slice/groupsSlice.js";

import {useDispatch, useSelector} from "react-redux";


const Groups = () => {
    const dispatch = useDispatch();
    const {groups, selectedGroup } = useSelector((state) => state.groups);
    return (
        <div className="blocks statusAndGroupsBlocs">
            <h2>Группы</h2>
            <div className={`groupItem ${!selectedGroup ? "selected" : ""}`} onClick={() => dispatch(setSelectedGroup(null))}>
                Все группы
            </div>
            {Object.keys(groups).map((groupName) => (
                <div
                    key={groupName}
                    className={`groupItem ${selectedGroup === groupName ? "selected" : ""}`}
                    onClick={() => dispatch(setSelectedGroup(groupName))}
                >
                    {groupName}
                </div>
            ))}
        </div>
    );
};

export default Groups;