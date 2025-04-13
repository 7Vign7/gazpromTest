export const selectFilteredNodes = (state) => {
    const { nodes } = state.nodes;
    const { groups, selectedGroup } = state.groups;

    return selectedGroup
        ? groups[selectedGroup]
        : nodes;
};
// export const selectedNodeMetrics = (state) =>{
//     const { selectedNode } = state.nodes;
//     return
//     // selectedNode ? filteredNodes.find((node) => node.node_id === selectedNode)?.node_metrics || []
//     //     : [];
// }