import React from 'react';
import {useSelector} from "react-redux";
import {calculateNodeStatus} from "../../../utils/Utils"
import MetricsChart from  "../../metrics/test"

const NodesData = () => {
    const { selectedNode } = useSelector((state) => state.nodes);
    if(!selectedNode){
        return (
            <div>Выберите ноду</div>
        )
    }
    console.log(selectedNode);
    const none = "Отсутствуют данные"
    return (
        <div>
            <MetricsChart
            metricsData={selectedNode.node_metrics}
            nodeName={selectedNode.node_name}/>
            <div className="metrics-block">
                <h2>Метрики</h2>

            </div>
            <div className="interface-block">
                <h2>Интерфейс</h2>
                {selectedNode.interface_name?
                    <p>Название: {selectedNode.interface_name}</p>
                    :null
                }
                <p>{calculateNodeStatus(selectedNode.node_metrics)}</p>
            </div>
            <div className="admin-block">
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
            <div className="apps-block">
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