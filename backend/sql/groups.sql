SELECT
    g.id AS group_id,
    g.caption AS group_name,
    n.id AS node_id,
    n.caption AS node_name,
    i.id AS interface_id,
    i.caption AS interface_name,
    s.color AS interface_status_color,
    s.description AS interface_status_description,
    a.id AS application_id,
    a.caption AS application_name,
    u.id AS admin_id,
    u.firstname || ' ' || u.lastname AS admin_name,
    u.email AS admin_email,
    ns.color AS node_status_color,
    ns.description AS node_status_description
FROM
    groups g
JOIN
    groups_nodes gn ON g.id = gn.group_id
JOIN
    nodes n ON gn.node_id = n.id
LEFT JOIN
    interfaces i ON n.interface = i.id
LEFT JOIN
    statuses s ON i.status = s.Id
LEFT JOIN
    nodes_applications na ON n.id = na.node_id
LEFT JOIN
    applications a ON na.application_id = a.id
LEFT JOIN
    users u ON n.admin = u.id
LEFT JOIN
    statuses ns ON n.status = ns.Id
ORDER BY
    g.id, n.id;