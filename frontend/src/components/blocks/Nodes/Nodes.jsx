import React from 'react';
import {setSelectedNode} from "../../../store/nodesSlice.js";
import {useSelector, useDispatch} from "react-redux";
import {calculateNodeStatus} from "../../../utils/Utils"


const Nodes = () => {
    const dispatch = useDispatch();
    const {groups, selectedGroup } = useSelector((state) => state.groups);
    const {  nodes, selectedNode } = useSelector((state) => state.nodes);
    const filteredNodes = selectedGroup
        ? groups[selectedGroup] || []
        : Object.values(groups).flat();

    return (
        <div>
            <h2>Ноды</h2>
            {filteredNodes.map((node) => {
                const latestMetric = node.node_metrics[node.node_metrics.length - 1] || {};
                console.log(latestMetric);
                return (
                    <div
                        key={node.node_id}
                        // className={`node-item ${nodeStatus.toLowerCase()} ${
                        //     selectedNode.node_id === node.node_id ? "selected" : ""
                        // }`}
                        onClick={() => dispatch(setSelectedNode(node))}
                    >
                        <div>
                            <p>{node.node_name}</p>
                            <p>Status: {latestMetric.node_status_description}</p>
                        </div>
                        <div>
                            <div>
                                <p>CPU</p>
                                <p>{latestMetric.cpu_utilization || 0}%</p>
                            </div>
                            <div>
                                <p>RAM</p>
                                <p>{latestMetric.memory_utilization || 0}%</p>
                            </div>
                            <div>
                                <p>DISK</p>
                                <p>{latestMetric.disk_utilization || 0}%</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Nodes;