import React from 'react';
import {useSelector} from "react-redux";
import {setColorStatus} from "../../../utils/Utils"
import MetricsChart from "../../metrics/MetricsChart.jsx";

const NodesData = () => {
    const { selectedNode } = useSelector((state) => state.nodes);
    if(!selectedNode){
        return (
            <div className="blocks"><h2>Выберите ноду</h2></div>
        )
    }

    return (
        <div className="blocks">
            <div>
                <h2>Метрики</h2>
                <MetricsChart/>
            </div>
            <hr/>
            {
                selectedNode.interface_name || selectedNode.interface_status_description?
                    <>
                        <div>
                            <h2>Интерфейс</h2>
                            <div className="interfaceData">
                                {selectedNode.interface_name?
                                    <p>Название: {selectedNode.interface_name}</p>
                                    :null
                                }
                                {selectedNode.interface_status_description?
                                    <p style={{color:`${setColorStatus(selectedNode.interface_status_description)}`}}>
                                        {selectedNode.interface_status_description}
                                    </p>
                                    :null
                                }
                            </div>
                        </div>
                        <hr/>
                    </>
                    :null
            }
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
            <hr/>
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