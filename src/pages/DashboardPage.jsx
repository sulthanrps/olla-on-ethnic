import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,
} from 'chart.js';

import Container from '../components/container';
import useDashboard from '../hooks/useDashboard'; 

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SummaryCard = ({ title, value }) => (
    <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
);

export default function DashboardPage() {
    const { dashboardData, loading, error, fetchDashboardData } = useDashboard();

    const [period, setPeriod] = useState('7days');

    const formatChartLabel = (data) => {
        if(!data) return [];
        if(period == 'annually'){
            return data.map(d => new Date(d.tanggal + '-01').toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }));
        }
        return data.map(d => new Date(d.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit' }));
    }

    const chartLabel = formatChartLabel(dashboardData?.dailyStats);



    useEffect(() => {
        fetchDashboardData(period);
    }, [period, fetchDashboardData]); 

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { display: false } },
    };

    const chartData = {
        labels: chartLabel,
        datasets: [
            { id: 'transactions', label: 'Jumlah Transaksi', data: dashboardData?.dailyStats.map(d => d.jumlah_transaksi) || [], borderColor: 'rgb(234, 179, 8)', backgroundColor: 'rgba(234, 179, 8, 0.5)' },
            { id: 'revenue', label: 'Total Pendapatan', data: dashboardData?.dailyStats.map(d => d.total_revenue) || [], borderColor: 'rgb(234, 179, 8)', backgroundColor: 'rgba(234, 179, 8, 0.5)' },
        ],
    };

    if (loading && !dashboardData) {
        return <Container><div>Memuat data dashboard... ⏳</div></Container>;
    }
    
    if (error) {
        return <Container><div>Error: {error.message}</div></Container>;
    }

    return (
        <Container>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                        <option value="7days">Last 7 Days</option>
                        <option value="monthly">Monthly</option>
                        <option value="annually">Annually</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow h-80 mb-10">
                        <h2 className="text-lg font-semibold mb-4">Transaction Overview</h2>
                        <Line options={chartOptions} data={{ ...chartData, datasets: [chartData.datasets[0]] }} />
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow h-80">
                        <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
                        <Line options={chartOptions} data={{ ...chartData, datasets: [chartData.datasets[1]] }} />
                    </div>
                </div>
                <div className="space-y-6">
                     <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">Summary Cards</h2>
                        <div className="space-y-4">
                           <SummaryCard title="Total Transactions" value={dashboardData?.summary.total_transactions || 0} />
                           <SummaryCard title="Total Revenue" value={`Rp ${Number(dashboardData?.summary.total_revenue || 0).toLocaleString('id-ID')}`} />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}