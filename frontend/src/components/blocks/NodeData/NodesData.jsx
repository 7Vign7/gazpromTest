import React from 'react';
import {useSelector} from "react-redux";
import {calculateNodeStatus} from "../../../utils/Utils"
import MetricsChart from "../../metrics/MetricsChart.jsx";

const NodesData = () => {
    const { selectedNode } = useSelector((state) => state.nodes);
    if(!selectedNode){
        return (
            <div>Выберите ноду</div>
        )
    }
    console.log(selectedNode);
    return (
        <div className="blocks">
            <div>
                <h2>Метрики</h2>
                <MetricsChart/>
            </div>
            <div>
                <h2>Интерфейс</h2>
                {selectedNode.interface_name?
                    <p>Название: {selectedNode.interface_name}</p>
                    :null
                }
                {selectedNode.interface_status_description?
                    <p>Название: {selectedNode.interface_status_description}</p>
                    :null
                }
            </div>
            <div>
                <h2>Администратор</h2>
                {selectedNode.admin_name?
                    <p>Имя: {selectedNode.admin_name}</p>
                    :null
                }
                {selectedNode.admin_email?
                    <p>Почта: {selectedNode.admin_email}</p>
                    :null
                }
            </div>
            <div>
                <h2>Приложения</h2>
                {selectedNode.application_name?
                    <p>{selectedNode.application_name}</p>
                    :null
                }
            </div>
        </div>
    );
};

export default NodesData;