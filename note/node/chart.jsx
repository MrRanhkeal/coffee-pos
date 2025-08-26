import React from 'react';
import { Chart } from 'react-google-charts';

const BarChartComponent = ({ monthlyData }) => {
    const chartData = [
        ['Month', 'Total Cost', 'Total test amount'],
        ...monthlyData.map((item) => [
            item.month,
            item.totalCost,
            item.totalTestAmount
        ])
    ];

    const options = {
        chartArea: { width: '85%', height: '75%' },
        hAxis: {
            title: 'Month',
            slantedText: true,
            slantedTextAngle: 45,
            textStyle: {
                fontFamily: 'Noto Sans Khmer, Roboto, sans-serif',
                color: '#333',
            },
        },
        vAxis: {
            title: 'Amount',
            minValue: 0,
        },
        colors: ['#1a73e8', '#db4437'], // Blue and red
        backgroundColor: 'transparent',
        tooltip: {
            isHtml: true,
            textStyle: { fontSize: 14 },
            trigger: 'selection',
        },
        legend: { position: 'top' },
    };

    return (
        <div style={{ marginBottom: 24 }}>
            <div
                style={{
                    padding: 16,
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
            >
                <h3
                    style={{
                        marginBottom: 16,
                        color: '#333',
                        fontFamily: 'Noto Sans Khmer, Roboto, sans-serif',
                        fontWeight: 'bold',
                    }}
                >
                    ទិដ្ឋភាពទូទៅនៃការចំណាយប្រចាំខែ
                </h3>
                <div
                    style={{ height: 400, fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}
                >
                    <Chart
                        chartType="ColumnChart"
                        width="100%"
                        height="100%"
                        data={chartData}
                        options={options}
                        loader={<div>Loading Chart...</div>}
                    />
                </div>
            </div>
        </div>
    );
};

export default BarChartComponent;


const monthlyData = [
    { month: 'Jan 2022', totalCost: 130, totalTestAmount: 50 },
    { month: 'Feb 2022', totalCost: 60, totalTestAmount: 0 },
    { month: 'Mar 2022', totalCost: 40, totalTestAmount: 10 },
    { month: 'May 2022', totalCost: 200, totalTestAmount: 5 },
    { month: 'Oct 2022', totalCost: 60, totalTestAmount: 15 },
    { month: 'Sep 2022', totalCost: 80, totalTestAmount: 10 },
    // add other months as needed...
];
