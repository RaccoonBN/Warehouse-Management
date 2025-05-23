// frontend/src/pages/Dashboard.js
import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';
import { FaBoxes, FaTruck, FaWarehouse, FaChartBar } from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Dữ liệu giả cho thống kê
  const totalProducts = 150;
  const totalWarehouses = 5;
  const deliveriesToday = 35;

  // Dữ liệu giả cho biểu đồ đường
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Products Sold',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: '#4a90e2',
        tension: 0.1,
      },
    ],
  };

  // Dữ liệu giả cho biểu đồ cột
  const barChartData = {
    labels: ['Warehouse A', 'Warehouse B', 'Warehouse C'],
    datasets: [
      {
        label: 'Inventory Levels',
        data: [120, 90, 150],
        backgroundColor: ['#63b8ff', '#4a90e2', '#34495e'],
      },
    ],
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Navbar />
        <div className="content">
          <h1>Dashboard</h1>
          <div className="stats">
            <div className="stat-card">
              <FaBoxes className="icon" />
              <div className="stat-value">{totalProducts}</div>
              <div className="stat-label">Total Products</div>
            </div>
            <div className="stat-card">
              <FaWarehouse className="icon" />
              <div className="stat-value">{totalWarehouses}</div>
              <div className="stat-label">Total Warehouses</div>
            </div>
            <div className="stat-card">
              <FaTruck className="icon" />
              <div className="stat-value">{deliveriesToday}</div>
              <div className="stat-label">Deliveries Today</div>
            </div>
          </div>
          <div className="charts">
            <div className="chart-card">
              <h2>Sales Trend</h2>
              <Line data={lineChartData} />
            </div>
            <div className="chart-card">
              <h2>Inventory Levels</h2>
              <Bar data={barChartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;