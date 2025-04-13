import React from 'react';
import {setSelectedNode} from "../../../store/Slice/nodesSlice.js";
import {useSelector, useDispatch} from "react-redux";
// import {calculateNodeStatus} from "../../../utils/Utils"
import {selectFilteredNodes} from "../../../store/selector/selectors.js";


const Nodes = () => {
    const dispatch = useDispatch();
    const filteredNodes = useSelector(selectFilteredNodes);

    return (
        <div className="blocks">
            <h2>Ноды</h2>
            {filteredNodes.map((node) => {
                const latestMetric = node.node_metrics[node.node_metrics.length - 1] || {};
                return (
                    <div key={node.node_id} className="nodeBlock" onClick={() => dispatch(setSelectedNode(node))}>
                        <div className="nodTitle">
                            <div className="circle"></div>
                            <p>{node.node_name}</p>
                            <p>{latestMetric.node_status_description}</p>
                        </div>
                        <div className="nodeMetrick">
                            <div>
                                <p>CPU</p>
                                <p>{latestMetric.cpu_utilization || 0}%</p>
                            </div>
                            <div>
                                <p>MEMORY</p>
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