import React from 'react';
import {setSelectedNode} from "../../../store/Slice/nodesSlice.js";
import {useSelector, useDispatch} from "react-redux";
import {percentColor, setColorStatus} from "../../../utils/Utils"
import {selectFilteredNodes} from "../../../store/selector/selectors.js";


const Nodes = () => {
    const dispatch = useDispatch();
    const filteredNodes = useSelector(selectFilteredNodes);

    return (
        <div className="blocks nodesBlocks">
            <h2>Ноды</h2>
            {filteredNodes.map((node) => {
                console.log(node);
                const latestMetric = node.node_metrics[node.node_metrics.length - 1] || {};
                return (
                    <div key={node.node_id} className={`nodeBlock`} onClick={() => dispatch(setSelectedNode(node))}>
                        <div className="nodTitle">
                            <div className="circle" style={{background:`${node.node_status_color}`}}></div>
                            <p>{node.node_name}</p>
                            <p style={{color:`${setColorStatus(latestMetric.node_status_description)}`}}>{latestMetric.node_status_description}</p>
                        </div>
                        <div className="nodeMetrick">
                            <div>
                                <p>CPU</p>
                                <p style={{color:`${percentColor(latestMetric.cpu_utilization)}`}}>{latestMetric.cpu_utilization}%</p>
                            </div>
                            <div>
                                <p>MEMORY</p>
                                <p style={{color:`${percentColor(latestMetric.memory_utilization)}`}}>{latestMetric.memory_utilization}%</p>
                            </div>
                            <div>
                                <p>DISK</p>
                                <p style={{color:`${percentColor(latestMetric.disk_utilization)}`}}>{latestMetric.disk_utilization}%</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Nodes;