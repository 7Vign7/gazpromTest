import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function SimpleChart() {
    const data = {
        labels: ['Янв', 'Фев', 'Мар',"Апр"],
        datasets: [
            {
                label: 'Продажи 2023',
                data: [100, 200, 150,300],
                borderColor: 'blue',
                tension: 0.1
            }
        ]
    };

    return <Line data={data} />;
}