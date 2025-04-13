export const selectFilteredNodes = (state) => {
    const { nodes } = state.nodes;
    const { groups, selectedGroup } = state.groups;

    return selectedGroup
        ? groups[selectedGroup]
        : nodes;
};
export const selectedNodeMetrics = (state) =>{
    const { selectedNode } = state.nodes;
    if(selectedNode){
        return selectedNode.node_metrics
    }
    return null
}