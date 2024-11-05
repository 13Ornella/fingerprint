import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import React from 'react';

// Functional component 'MyChart' to render the Bar chart
function MyChart() {
  // Registering necessary Chart.js components using the registerables array
  Chart.register(...registerables);

  // Data configuration for the Bar chart
  const data = {
    labels: [
      'Week 1',
      'Week 2',
      'Week 3',
      'Week 4',
    ],
    datasets: [
      {
        // Label for the dataset
        label: 'Website View January',

        // Styling properties for the bars
        backgroundColor: '#843657', // Background color for the bars
        borderColor: '#843657', // Border color for the bars
        borderWidth: 1, // Border width for the bars
        hoverBackgroundColor: '#843657', // Background color on hover
        hoverBorderColor: '#843657', // Border color on hover

        // Data values representing website views for each week
        data: [650, 590, 800, 810], // Website view values for the four weeks
      },
    ],
  };

  // Return JSX to render the Bar chart using the 'Bar' component
  return (
    <div>
      {/* Render a Bar chart using provided data and options */}
      <Bar data={data} width={25} height={10} />
    </div>
  );
}

// Export 'MyChart' component as the default export
export default MyChart;