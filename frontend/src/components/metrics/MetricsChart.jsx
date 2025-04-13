import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto'; // Импортируем Chart.js
import { useSelector } from 'react-redux';
import { selectedNodeMetrics } from "../../store/selector/selectors.js";

const MetricsChart = () => {
    const selectNodeMetric = useSelector(selectedNodeMetrics);
    const chartRef = useRef(null);
    const canvasRef = useRef(null);
    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }
        if (!selectNodeMetric || selectNodeMetric.length === 0) return;
        const ctx = canvasRef.current.getContext('2d');
        const labels = selectNodeMetric.map(metric => metric.datetime);
        const cpuData = selectNodeMetric.map(metric => metric.cpu_utilization);
        const memoryData = selectNodeMetric.map(metric => metric.memory_utilization);
        const diskData = selectNodeMetric.map(metric => metric.disk_utilization);
        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'CPU(%)',
                        data: cpuData,
                        borderColor: '#398A40',
                        tension: 0.1
                    },
                    {
                        label: 'Memory(%)',
                        data: memoryData,
                        borderColor: '#E3A30C',
                        tension: 0.1
                    },
                    {
                        label: 'Disk(%)',
                        data: diskData,
                        borderColor: '#EF4E4A',
                        tension: 0.1
                    }
                ],

            },
            options: {
                scales: {
                    x: {
                        ticks: {
                            display: false
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        ticks: {
                            display: false
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }

    })
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [selectNodeMetric]);
    return (
        <>
            <canvas ref={canvasRef} ></canvas>
        </>
    );
};

export default MetricsChart;