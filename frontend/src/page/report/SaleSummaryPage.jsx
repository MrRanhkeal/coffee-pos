import { Table, Button, message } from 'antd';
import { useState, useEffect } from 'react';
import { request } from '../../util/helper';
import { IoIosRefresh } from "react-icons/io";
import { Chart } from 'react-google-charts';
//import { Chart } from 'react-chartjs-2';

// Helper function to parse currency string to number
const parseCurrency = (value) => {
    if (typeof value === 'string') {
        return parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0;
    }
    return value || 0;
};

function SaleSummaryPage() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    // Optionally store summary and sale_summary_by_month if needed
    const [summary, setSummary] = useState(null);
    const [saleSummaryByMonth, setSaleSummaryByMonth] = useState([]);
    // const [summary_by_year, setSummaryByYear] = useState(null);
    const [summary_per_year, setSummaryByYear] = useState(null);


    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setLoading(true);
        try {
            const res = await request('report/get_sale_summary', 'get');
            if (res && res.sale_summary_by_month) {
                //console.log('Sale Summary Data:', res.sale_summary_by_month); // Debug log
                setData(res.sale_summary_by_month);
                setSummary(res.summary_month ? res.summary_month[0] : null);
                setSaleSummaryByMonth(res.sale_summary_by_month);
                setSummaryByYear(res.summary_per_year);
            } else {
                setData([]);
                setSummary(null);
                setSaleSummaryByMonth([]);
                setSummaryByYear(null);
                message.info('No sale data found.');
            }
        } catch (err) {
            message.error('Failed to get sale per month data.',err);
        } finally {
            setLoading(false);
        }
    };
    const months = [
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
        }, 
        {
            title: 'Jan',
            dataIndex: 'jan',
            key: 'jan', 
        },
        {
            title: 'Feb',
            dataIndex: 'feb',
            key: 'feb', 
        },
        {
            title: 'Mar',
            dataIndex: 'mar',
            key: 'mar',
        },
        {
            title: 'Apr',
            dataIndex: 'apr',
            key: 'apr',
        },
        {
            title: 'May',
            dataIndex: 'may',
            key: 'may',
        },
        {
            title: 'Jun',
            dataIndex: 'jun',
            key: 'jun',
        },
        {
            title: 'Jul',
            dataIndex: 'jul',
            key: 'jul',
        },
        {
            title: 'Aug',
            dataIndex: 'aug',
            key: 'aug',
        },
        {
            title: 'Sep',
            dataIndex: 'sep',
            key: 'sep',
        },
        {
            title: 'Oct',
            dataIndex: 'oct',
            key: 'oct',
        },
        {
            title: 'Nov',
            dataIndex: 'nov',
            key: 'nov',
        },
        {
            title: 'Dec',
            dataIndex: 'dec',
            key: 'dec',
        },
    ]
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}> 
                <span style={{ fontWeight: 'bold', fontSize: 24 ,color:'#ef4e0aff'}}>Sale per Month Report</span>
                <Button type="primary" onClick={getData} loading={loading}><IoIosRefresh />Refresh</Button>
            </div>
            <div style={{ marginBottom: 16 ,fontSize: 20 ,fontWeight: 'bold',color:'#28d90cff'}}>Total Income: {summary_per_year && summary_per_year.total_income}</div>
            {summary && (
                <div style={{ marginBottom: 16 ,fontSize: 16 }}>
                    <b>{summary.summary.Sale}:</b> {summary.summary.Total}  <br/> <b>Total Orders:</b> {summary.summary.Total_Order}
                </div>
            )}
            <Table 
                style={{fontWeight: 'bold'}}
                dataSource={data}
                columns={months}
                loading={loading}
                pagination={false}
                //rowKey={(record, idx) => record.title + '_' + idx}
            />
            <div style={{ marginTop: 32, marginBottom: 32 }}>
                {saleSummaryByMonth?.[0] ? (
                    <div>
                        <h3 style={{ textAlign: 'center', marginBottom: 24, color: '#333' }}>Monthly Sales Analysis</h3>
                        <div style={{ marginBottom: 24 }}>
                            <div style={{ padding: 16, backgroundColor: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                                <h3 style={{ marginBottom: 16, color: '#333' }}>Monthly Sales Overview</h3>
                                <div style={{ height: 400 }}>
                                    <Chart
                                        width={'100%'}
                                        height={'100%'}
                                        chartType="LineChart"
                                        loader={<div>Loading Chart...</div>}
                                        data={[
                                            ['Month', 'Sales ($)'],
                                            ...months
                                                .filter(month => month.dataIndex && month.dataIndex !== 'year' && month.dataIndex !== 'currency')
                                                .map(month => {
                                                    const value = parseCurrency(saleSummaryByMonth[0][month.dataIndex]);
                                                    return [month.title, value];
                                                })
                                        ]}
                                        options={{
                                            chartArea: { width: '85%', height: '75%' },
                                            hAxis: {
                                                title: 'Month',
                                                titleTextStyle: { color: '#333' },
                                                slantedText: true,
                                                slantedTextAngle: 45,
                                            },
                                            vAxis: {
                                                title: 'Amount ($)',
                                                minValue: 0,
                                                format: 'currency',
                                            },
                                            colors: ['#ef4e0a'],
                                            backgroundColor: 'transparent',
                                            pointSize: 5,
                                            pointShape: 'circle',
                                            tooltip: { 
                                                isHtml: true, 
                                                textStyle: { fontSize: 14 },
                                                trigger: 'selection'
                                            },
                                            legend: { position: 'top' },
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* <div style={{ marginBottom: 24 }}>
                            <div style={{ padding: 16, backgroundColor: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                                <h3 style={{ marginBottom: 16, color: '#333' }}>Sales Distribution</h3>
                                <div style={{ height: 400 }}>
                                    <Chart
                                        width={'100%'}
                                        height={'100%'}
                                        chartType="PieChart"
                                        loader={<div>Loading Chart...</div>}
                                        data={[
                                            ['Month', 'Sales ($)'],
                                            ...months
                                                .filter(month => month.dataIndex && month.dataIndex !== 'year' && month.dataIndex !== 'currency')
                                                .map(month => {
                                                    const value = parseCurrency(saleSummaryByMonth[0][month.dataIndex]);
                                                    return [month.title, value];
                                                })
                                                .filter(([, value]) => value > 0)
                                        ]}
                                        options={{
                                            title: '',
                                            pieHole: 0.4,
                                            is3D: false,
                                            chartArea: { 
                                                width: '90%', 
                                                height: '80%',
                                                top: 20,
                                                right: 10,
                                                bottom: 20,
                                                left: 10
                                            },
                                            legend: { 
                                                position: 'right',
                                                alignment: 'center',
                                                textStyle: {
                                                    fontSize: 12
                                                }
                                            },
                                            pieSliceText: 'value',
                                            pieSliceTextStyle: { 
                                                color: 'white', 
                                                fontSize: 12,
                                                bold: true
                                            },
                                            tooltip: { 
                                                showColorCode: true,
                                                text: 'value',
                                                format: 'currency',
                                                ignoreBounds: false,
                                                trigger: 'focus'
                                            },
                                            slices: {
                                                0: { color: '#ef4e0a' },
                                                1: { color: '#ff9800' },
                                                2: { color: '#ffc107' },
                                                3: { color: '#8bc34a' },
                                                4: { color: '#4caf50' },
                                                5: { color: '#00bcd4' },
                                                6: { color: '#2196f3' },
                                                7: { color: '#3f51b5' },
                                                8: { color: '#673ab7' },
                                                9: { color: '#9c27b0' },
                                                10: { color: '#e91e63' },
                                                11: { color: '#f44336' }
                                            },
                                            animation: {
                                                startup: true,
                                                duration: 1000,
                                                easing: 'out'
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div> */}
                    </div>
                ) : (
                    <div style={{ 
                        textAlign: 'center', 
                        marginTop: 20, 
                        padding: '40px',
                        border: '2px dashed #ddd',
                        borderRadius: '8px',
                        backgroundColor: '#f9f9f9'
                    }}>
                        <p style={{ fontSize: '16px', color: '#666' }}>No sales data available to display charts</p>
                        <Button type="primary" onClick={getData} style={{ marginTop: '10px' }}>
                            <IoIosRefresh /> Refresh Data
                        </Button>
                    </div>
                )}
            </div>
            {data.length === 0 && !loading && (
                <div style={{ textAlign: 'center', marginTop: 20 }}>
                    <span>No data available</span>
                </div>
            )}
            <></>
        </div>
    )
}

export default SaleSummaryPage