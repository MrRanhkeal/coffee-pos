import React, { useEffect } from 'react'
import { request,formatDateClient } from '../../../util/helper'; // Added import for request helper and formatDateClient 
import { Space, Table, Typography } from 'antd';

function RecentOrders() {
    const [dataSource, setDataSource] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        const fetchRecentOrders = async () => {
            setLoading(true);
            try {
                const res = await request("order", "get", {}); // Use request helper
                if (res && res.list && Array.isArray(res.list)) {
                    // Display the first 10 orders. If API sorts by newest first, these are the most recent.
                    setDataSource(res.list.slice(0, 10));
                } else if (Array.isArray(res)) {
                    setDataSource(res.slice(0, 10)); // Fallback if API returns a direct array
                } else {
                    console.warn("Recent orders data is not in expected format ({list: array} or array):", res);
                    setDataSource([]);
                }
            } catch (error) {
                console.error("Error fetching recent orders:", error);
                setDataSource([]);
            } finally {
                setLoading(false);
            }
        };
        fetchRecentOrders();
    }, []);
    return (
        <>
            <Typography.Text strong>Recent Orders</Typography.Text>
            <Space style={{ width: '100%' }}>
                <Table style={{ width: '100%' }}
                    columns={[
                        {
                            key: "order_no",
                            title: "Order No",
                            dataIndex: "order_no",
                            width: 120,
                            align: 'left'
                        },
                        {
                            key: "customer_name",
                            title: "Customer",
                            dataIndex: "customer_name",
                            width: 120,
                            align: 'left'
                        },
                        {
                            key: "total_amount",
                            title: "Total",
                            dataIndex: "total_amount",
                            width: 120,
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
                            width: 120,
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
                            width: 120,
                            align: 'left'
                        },
                        {
                            key: "create_at",
                            title: "Date",
                            dataIndex: "create_at",
                            width: 120,
                            align: 'left',
                            render: (value) => value ? formatDateClient(value, "DD/MM/YYYY") : "N/A"
                        }
                    ]}
                    dataSource={dataSource}
                    loading={loading}
                    pagination={false}
                    scroll={{ y: 300 }}
                    rowClassName={() => 'table-row-hover'}
                    bordered
                ></Table>
            </Space>
        </>
    )
}

export default RecentOrders