import React, { useEffect } from 'react'
import { request,formatDateClient } from '../../../util/helper'; // Added import for request helper and formatDateClient 
import { Space, Table } from 'antd';

function RecentOrders() {
    const [dataSource, setDataSource] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        const getRecentOrders = async () => {
            setLoading(true);
            try {
                const res = await request("order", "get", {}); // Use request helper
                if (res && res.list && Array.isArray(res.list)) {
                    // Display the first 10 orders. If API sorts by newest first, these are the most recent.
                    setDataSource(res.list.slice(0, 15));
                } else if (Array.isArray(res)) {
                    setDataSource(res.slice(0, 10)); // Fallback if API returns a direct array
                } else {
                    console.warn("Recent orders data is not in expected format ({list: array} or array):", res);
                    setDataSource([]);
                }
            } catch (error) {
                console.error("Error recent orders:", error);
                setDataSource([]);
            } finally {
                setLoading(false);
            }
        };
        getRecentOrders();
    }, []);
    return (
        <>
            {/* <Typography.Text strong>Recent Orders</Typography.Text> */}
            <div style={{fontWeight:'bold',color:'#833AB4'}}>Recent Orders</div>
            <Space style={{ width: '100%' ,display:"block",overflowX:"auto"}}>
                <Table style={{ width: 1450, minWidth: 1200, maxWidth: "100%", display: "block", overflowX: "auto" }}
                    columns={[
                        // {
                        //     key: "order_no",
                        //     title: "Order No",
                        //     dataIndex: "order_no",
                        //     width: '10%',
                        //     align: 'left'
                        // },
                        {
                            key: "NO",
                            title: "NO",
                            dataIndex: "NO",
                            width: '5%',
                            align: 'left',
                            render: (text, record, index) => index + 1
                        },
                        {
                            key: "customer_name",
                            title: "Customer",
                            dataIndex: "customer_name",
                            width: '20%',
                            align: 'left'
                        },
                        {
                            key: "total_amount",
                            title: "Total",
                            dataIndex: "total_amount",
                            width: '20%',
                            align: 'left',
                            render: (value) => {
                                const numValue = parseFloat(value);
                                return !isNaN(numValue) ? `$${numValue.toFixed(2)}` : '$0.00';
                            }
                        },
                        {
                            key: "paid_amount",
                            title: "Paid Amount",
                            dataIndex: "paid_amount",
                            width: '20%',
                            align: 'left',
                            render: (value) => {
                                const numValue = parseFloat(value);
                                return !isNaN(numValue) ? `$${numValue.toFixed(2)}` : '$0.00';
                            }
                        },
                        {
                            key: "payment_method",
                            title: "Payment Method",
                            dataIndex: "payment_method",
                            width: '20%',
                            align: 'left'
                        },
                        {
                            key: "create_at",
                            title: "Date",
                            dataIndex: "create_at",
                            width: '20%',
                            align: 'left',
                            render: (value) => value ? formatDateClient(value, "DD/MM/YYYY") : "N/A"
                        }
                    ]}
                    dataSource={dataSource}
                    loading={loading}
                    pagination={false}
                    scroll={{ y: 220 }}
                    
                    // rowClassName={() => 'table-row-hover'}
                    // bordered
                    size="small" 
                />
            </Space>
        </>
    )
}

export default RecentOrders