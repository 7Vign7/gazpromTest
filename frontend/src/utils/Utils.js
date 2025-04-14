export function percentColor(val){
    if (val >= 95){
        return 'red'
    }else if(val >= 85){
        return 'yellow'
    }
    return null
}


export function parseCustomDate(dateStr) {
    const [datePart, timePart] = dateStr.split(' ');
    const [day, month, year] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');
    return new Date(year, month - 1, day, hours, minutes);
}
export function setColorStatus(status){
    const colorStatus = {
        SHUTDOWN:'grey',
        DOWN:'darkred',
        CRITICAL:'red',
        WARNING:'yellow',
        UP:'lightgreen'
    }
    return colorStatus[status]
}

export function statusInterfaceGroup(currentGroup, group, nodes) {
    const statusPriority = [
        'SHUTDOWN',
        'DOWN',
        'CRITICAL',
        'WARNING',
        'UP',
    ];
    let worstStatus = 'UP';
    if (!currentGroup) {
        nodes.forEach((node) => {
            const nodeStatus = node.node_status_description;
            if (statusPriority.indexOf(nodeStatus) < statusPriority.indexOf(worstStatus)) {
                worstStatus = nodeStatus;
            }
        });
        return worstStatus;
    }

    group[currentGroup].forEach(node => {
        const nodeStatus = node.node_status_description;
        if (statusPriority.indexOf(nodeStatus) < statusPriority.indexOf(worstStatus)) {
            worstStatus = nodeStatus;
        }
    });
    return worstStatus;
}


export const calculateNodeStatus = (metrics) => {
    if (!metrics || metrics.length === 0) return "CRITICAL";
    const latestMetric = metrics[metrics.length - 1];
    const { cpu, ram, disk } = latestMetric;
    const maxUsage = Math.max(cpu || 0, ram || 0, disk || 0);
    if (maxUsage > 95) return "CRITICAL";
    if (maxUsage > 85) return "WARNING";
    return "UP";
};
