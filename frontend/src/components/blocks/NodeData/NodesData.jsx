import React from 'react';
import {useSelector} from "react-redux";
import {calculateNodeStatus} from "../../../utils/Utils"


const NodesData = () => {
    const { selectedNode } = useSelector((state) => state.nodes);
    const {groups, selectedGroup } = useSelector((state) => state.groups);
    const filteredNodes = selectedGroup
        ? groups[selectedGroup] || []
        : Object.values(groups).flat();
    // const selectedNodeMetrics = selectedNode
    //     ? filteredNodes.find((node) => node.node_id === selectedNode)?.node_metrics || []
    //     : [];
    console.log(selectedNode);
    return (
        <div>
            <div className="metrics-block">
                <h2>Метрики</h2>
                {/*<canvas id="metrics-chart" ref={canvasRef}></canvas>*/}
            </div>


            <div className="interface-block">
                <h2>Интерфейс</h2>
                <p>Название: {selectedNode.interface_name ? "Null" : "Не выбрано"}</p>
                {/*<p>Статус: {selectedNode ? calculateNodeStatus(selectedNodeMetrics) : "N/A"}</p>*/}
            </div>

            <div className="admin-block">
                <h2>Администратор</h2>
                <p>Данные администратора: {selectedNode.admin_name ? "TBD" : "Не выбрано"}</p>
            </div>

            <div className="apps-block">
                <h2>Приложения</h2>
                <p>Данные приложений: {selectedNode.application_name ? "TBD" : "Не выбрано"}</p>
            </div>
        </div>
    );
};

export default NodesData;