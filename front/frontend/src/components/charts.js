import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart }            from 'react-chartjs-2';

function DynamicChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      const data = {
        labels: ['A','B','C'],
        datasets: [{label: 'example data', data: [10, 20, 15]}]
      };

      setChartData(data);
    };

    fetchData();
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return <Bar data={chartData} />;
}

export default DynamicChart;