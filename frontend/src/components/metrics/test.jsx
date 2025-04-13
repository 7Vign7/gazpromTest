import Chart from "chart.js/auto"; // Import ChartJS
useEffect(() => {
    if (!canvasRef.current) return;

    const labels = selectedNodeMetrics.map((metric) => metric.datetime);
    const cpuData = selectedNodeMetrics.map((metric) => metric.cpu || 0);
    const ramData = selectedNodeMetrics.map((metric) => metric.ram || 0);
    const diskData = selectedNodeMetrics.map((metric) => metric.disk || 0);

    if (chartRef.current) {
        chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");
    chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "CPU (%)",
                    data: cpuData,
                    borderColor: "red",
                    backgroundColor: "rgba(255, 0, 0, 0.1)",
                    fill: true,
                },
                {
                    label: "RAM (%)",
                    data: ramData,
                    borderColor: "blue",
                    backgroundColor: "rgba(0, 0, 255, 0.1)",
                    fill: true,
                },
                {
                    label: "DISK (%)",
                    data: diskData,
                    borderColor: "green",
                    backgroundColor: "rgba(0, 255, 0, 0.1)",
                    fill: true,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: "Usage (%)",
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: "Time",
                    },
                },
            },
            plugins: {
                legend: {
                    position: "top",
                },
            },
        },
    });

    // Cleanup on component unmount
    return () => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }
    };
}, [selectedNodeMetrics]);
