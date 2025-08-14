import { Table, Button, message } from 'antd';
import { useState, useEffect } from 'react';
import { request } from '../../util/helper';
import { IoIosRefresh } from "react-icons/io";
import { Chart } from 'react-google-charts';
//import { Chart } from 'react-chartjs-2';
import { MdCalendarMonth } from "react-icons/md";
import { FaCalendarWeek } from "react-icons/fa6";
import { CiCalendarDate } from "react-icons/ci";
import { BiCalendarWeek } from "react-icons/bi";
import { LiaCalendarWeekSolid } from "react-icons/lia";

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
    const [summary_per_year, setSummaryByYear] = useState(null);
    const [summaryLastMonth, setSummaryLastMonth] = useState(null);
    const [summaryPerWeek, setSummaryPerWeek] = useState(null);
    const [this_week, setThisWeek] = useState(null);
    const [last_week, setLastWeek] = useState(null);

    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Khmer:wght@400;700&family=Roboto:wght@400;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        return () => { document.head.removeChild(link); };
    }, []);

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
                setSummaryPerWeek(res.summary_per_week);
                setSummaryLastMonth(res.summary_last_month || null);
                setThisWeek(res.this_week || null);
                setLastWeek(res.last_week || null);

            } else {
                setData([]);
                setSummary(null);
                setSaleSummaryByMonth([]);
                setSummaryByYear(null);
                //setSaleSummaryByday([]);
                message.info('No sale data found.');
            }
        } catch (err) {
            message.error('Failed to get sale per month data.', err);
        } finally {
            setLoading(false);
        }
    };
    const months = [
        {
            title: <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>ឆ្នាំ</span>,
            dataIndex: 'year',
            key: 'year',
        },
        {
            key: 'jan',
            title: <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>មករា</span>,
            dataIndex: 'jan',
        },
        {
            title: <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>កុម្ភៈ</span>,
            dataIndex: 'feb',
            key: 'feb',
        },
        {
            title: <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>មីនា</span>,
            dataIndex: 'mar',
            key: 'mar',
        },
        {
            title: <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>មេសា</span>,
            dataIndex: 'apr',
            key: 'apr',
        },
        {
            title: <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>ឧសភា</span>,
            dataIndex: 'may',
            key: 'may',
        },
        {
            title: <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>មិថុនា</span>,
            dataIndex: 'jun',
            key: 'jun',
        },
        {
            title: <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>កក្កដា</span>,
            dataIndex: 'jul',
            key: 'jul',
        },
        {
            title: <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>សីហា</span>,
            dataIndex: 'aug',
            key: 'aug',
        },
        {
            title: <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>កញ្ញា</span>,
            dataIndex: 'sep',
            key: 'sep',
        },
        {
            title: <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>តុលា</span>,
            dataIndex: 'oct',
            key: 'oct',
        },
        {
            title: <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>វិច្ឆិកា</span>,
            dataIndex: 'nov',
            key: 'nov',
        },
        {
            title: <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>ធ្នូ</span>,
            dataIndex: 'dec',
            key: 'dec',
        },
    ]
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontWeight: 'bold', fontSize: 20, color: '#ef4e0aff', fontFamily: 'Khmer OS Muol Light' }}>របាយការណ៍នៃការលក់</span>
                <Button type="primary" onClick={getData} loading={loading}><IoIosRefresh />Refresh</Button>
            </div>
            {summary && (
                <div style={{ marginBottom: 16, fontSize: 16 }}>
                    <b style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>ការលក់ក្នុងខែនេះ</b> <span style={{ color: '#ea4909ff', fontWeight: 'bold' }}>{summary.summary.Total}</span>  <br /> <b style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>ការបញ្ជារទិញក្នុងខែនេះ</b> <span style={{ color: '#ea4909ff', fontWeight: 'bold' }}>{summary.summary.Total_Order} </span><b style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>ប៉ុង</b>
                </div>
            )}
            <div style={{ margin: '20px 0', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                <h3 style={{ marginBottom: 16, color: '#fa0808ff', fontSize: 20, fontWeight: 'bold', fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>របាយការណ៍នៃការលក់</h3>
                {summaryPerWeek ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        {summaryLastMonth && (
                            <div style={{ margin: '10px', color: '#f04107ff', backgroundColor: '#e6ece4ff', borderRadius: 6, fontSize: 20, padding: 18, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', fontWeight: 'bold', textAlign: 'center' }}>
                                <MdCalendarMonth style={{ justifyContent: 'center', alignItems: 'center' }} />
                                <b style={{ color: '#2d1817ff', fontWeight: 'bold', fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>ខែមុន&nbsp;</b>
                                <span style={{ color: '#da2016ff', fontWeight: 'bold' }}>${parseFloat(summaryLastMonth.total || '0').toFixed(2)}</span>
                            </div>
                        )}
                        {last_week && (
                            <div style={{ margin: '10px', color: '#0c3e6b', backgroundColor: '#e2e8ecff', borderRadius: 6, fontSize: 20, padding: 18, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', fontWeight: 'bold', textAlign: 'center' }}>
                                <LiaCalendarWeekSolid />
                                <b style={{ color: '#2d1817ff', fontWeight: 'bold', fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>សប្តាហ៍មុន&nbsp;</b>
                                <span style={{ color: '#da2016ff', fontWeight: 'bold' }}>
                                    ${parseFloat((last_week?.total_last_week || summaryPerWeek?.[1]?.total_last_week || summaryPerWeek?.[1]?.total_per_week || '0')).toFixed(2)}
                                </span>
                            </div>
                        )}
                        {summary && (
                            <div style={{ margin: '10px', color: '#e3683fff', backgroundColor: '#e4eae2ff', borderRadius: 6, fontSize: 20, padding: 18, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', fontWeight: 'bold', textAlign: 'center' }}>
                                <FaCalendarWeek />
                                <b style={{ color: '#2d1817ff', fontWeight: 'bold', fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>ខែនេះ&nbsp;</b>
                                <span style={{ color: '#da2016ff', fontWeight: 'bold', fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>${parseFloat(summary.summary.Total?.replace('$', '') || '0').toFixed(2)}</span>
                            </div>
                        )}
                        {/* {(last_week || (summaryPerWeek && summaryPerWeek.length > 1)) && (
                            <div style={{ margin: '10px', color: '#0c3e6b', backgroundColor: '#e8e6e2ff', borderRadius: 6, fontSize: 20, padding: 18, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', fontWeight: 'bold', textAlign: 'center' }}>
                                <TbCalendarWeekFilled />
                                <b style={{ color: '#2d1817ff', fontWeight: 'bold' }}>Last Week ({(last_week?.week_start_date || summaryPerWeek?.[1]?.week_start_date) ?? 'N/A'}):</b>
                                <span style={{ color: '#da2016ff', fontWeight: 'bold' }}>
                                    ${parseFloat((last_week?.total_last_week || summaryPerWeek?.[1]?.total_last_week || summaryPerWeek?.[1]?.total_per_week || '0')).toFixed(2)}
                                </span>
                            </div>
                        )} */}
                        
                        {(this_week || (summaryPerWeek && summaryPerWeek.length > 0)) && (
                            <div style={{ margin: '10px', color: '#0c3e6b', backgroundColor: '#e1e6eaff', borderRadius: 6, fontSize: 20, padding: 18, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', fontWeight: 'bold', textAlign: 'center' }}>
                                <BiCalendarWeek />
                                <b style={{ color: '#2d1817ff', fontWeight: 'bold', fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>សប្តាហ៍នេះ&nbsp;</b>
                                <span style={{ color: '#da2016ff', fontWeight: 'bold' }}>
                                    ${parseFloat((this_week?.total_this_week || summaryPerWeek?.[0]?.total_this_week || '0')).toFixed(2)}
                                </span>
                            </div>
                        )}
                        {summary_per_year && (
                            <div style={{ margin: '10px', color: '#0c3e6b', backgroundColor: '#e8e6e2ff', borderRadius: 6, fontSize: 20, padding: 18, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', fontWeight: 'bold', textAlign: 'center' }}>
                                <CiCalendarDate />
                                <b style={{ color: '#2d1817ff', fontWeight: 'bold', fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>ឆ្នាំនេះ&nbsp;</b>
                                <span style={{ color: '#da2016ff', fontWeight: 'bold' }}>${parseFloat(summary_per_year[0]?.total_per_year || '0').toFixed(2)}</span>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>Loading summary data...</div>
                )}
            </div>
            <br />
            <Table
                style={{ fontWeight: 'bold' }}
                dataSource={data}
                columns={months}
                loading={loading}
                pagination={false}
            />
            <div style={{ marginTop: 32, marginBottom: 32 }}>
                {saleSummaryByMonth?.[0] ? (
                    <div>
                        <h3 style={{ textAlign: 'center', marginBottom: 24, color: '#f33939ff', fontSize: 20, fontFamily: 'Noto Sans Khmer, Roboto, sans-serif', fontWeight: 'bold' }}>ការវិភាគការលក់ប្រចាំខែ</h3>
                        <div style={{ marginBottom: 24 }}>
                            <div style={{ padding: 16, backgroundColor: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                                <h3 style={{ marginBottom: 16, color: '#333', fontFamily: 'Noto Sans Khmer, Roboto, sans-serif', fontWeight: 'bold' }}>ទិដ្ឋភាពទូទៅនៃការលក់ប្រចាំខែ</h3>
                                <div style={{ height: 400, fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>
                                    <Chart
                                        style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}
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
                                                    return [month.key, value];
                                                })
                                        ]}
                                        options={{
                                            chartArea: { width: '85%', height: '75%' },
                                            hAxis: {
                                                key: 'Month',
                                                keyTextStyle: { color: '#333' },
                                                slantedText: true,
                                                slantedTextAngle: 45,
                                                fontFamily: 'Noto Sans Khmer, Roboto, sans-serif',

                                            },
                                            vAxis: {
                                                key: 'Amount ($)',
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

                        <div style={{ marginBottom: 24 }}>
                            <div style={{ padding: 16, backgroundColor: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                                <h3 style={{ marginBottom: 16, color: '#333', fontFamily: 'Noto Sans Khmer, Roboto, sans-serif', fontWeight: 'bold' }}>គំនូសតាងនៃការលក់</h3>
                                <div style={{ height: 400 }}>
                                    <Chart
                                        width={'100%'}
                                        height={'100%'}
                                        chartType="PieChart"
                                        loader={<div>Loading Chart...</div>}
                                        data={[
                                            ['Month', 'Sales'],
                                            ...months
                                                .filter(month => month.dataIndex && month.dataIndex !== 'year' && month.dataIndex !== 'currency')
                                                .map(month => {
                                                    const value = parseCurrency(saleSummaryByMonth[0][month.dataIndex]);
                                                    return [month.key, value];
                                                })
                                                .filter(([, value]) => value > 0)
                                        ]}
                                        options={{
                                            key: '',
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
                        </div>
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
        </div>
    )
}

export default SaleSummaryPage