import React, { useEffect, useState } from 'react'
import { Card, Col, Space, Statistic, Table, Typography } from 'antd';
import { DollarCircleFilled, MonitorOutlined, ProductOutlined, ProfileFilled, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import PropTypes from "prop-types";
// import { Bar } from 'react-chartjs-2';
import RevenueChart from '../../component/home/RevenueChart';
import { request, formatDateClient } from "../../util/helper"; // Added import for request helper and formatDateClient
// import {HomeSaleChart} from '../../component/home/HomeSaleChart';
function Dashboard() {

    const [orders, setOrders] = useState(0);
    const [customers, setCustomers] = useState(0);
    const [products, setProducts] = useState(0);
    const [category, setCategory] = useState(0);
    const [inventory, setInventory] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [report, setReport] = useState([]); // This state appears unused. Consider removing if not needed in the future.

    // Fetch orders
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await request("order", "get", {}); // Use request helper, no params for all orders
                if (res && res.list && Array.isArray(res.list)) {
                    setOrders(res.list.length);
                } else if (Array.isArray(res)) { // Fallback if the API directly returns an array
                    setOrders(res.length);
                } else {
                    console.warn("Orders data is not in expected format ({list: array} or array):", res);
                    setOrders(0); // Default to 0 if unexpected format
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
                setOrders(0); // Set to 0 on error
            }
        };
        fetchOrders();
    }, []);

    // Fetch category count
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await request("category", "get"); // Using request helper
                if (res && res.list && Array.isArray(res.list)) {
                    setCategory(res.list.length);
                } else {
                    console.warn("Category data is not in expected format:", res);
                    setCategory(0);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
                setCategory(0);
            }
        };
        fetchCategories();
    }, []); // Empty dependency array ensures this runs once on mount

    // Fetch products count
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await request("product", "get", {}); // Using request helper
                if (res && !res.error) {
                    // Use res.total if available, otherwise fallback to list length
                    setProducts(res.total || (res.list && res.list.length) || 0);
                } else {
                    console.warn("Product data is not in expected format:", res);
                    setProducts(0);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts(0);
            }
        };
        fetchProducts();
    }, []); // Empty dependency array ensures this runs once on mount

    // Fetch customers
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const res = await request("customer", "get", {}); // Using request helper
                if (res && res.list && Array.isArray(res.list)) {
                    setCustomers(res.list.length);
                } else if (Array.isArray(res)) { // Fallback if the API directly returns an array
                    setCustomers(res.length);
                } else {
                    console.warn("Customer data is not in expected format ({list: array} or array):", res);
                    setCustomers(0); // Default to 0 if unexpected format
                }
            } catch (error) {
                console.error("Error fetching customers:", error);
                setCustomers(0); // Set to 0 on error
            }
        };
        fetchCustomers();
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <Space size={20} direction='vertical'>
            <Typography.Title level={3}>Dashboard</Typography.Title>
            <Space direction='horizontal'>
                
                <DashboardCard
                    icon={
                        <ProductOutlined
                            style={{
                                color: 'green',
                                backgroundColor: 'rgba(0,255,0,0.25)',
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8
                            }}
                        />
                    }
                    title={'Products'}
                    value={products}
                />
                <DashboardCard
                    icon={
                        <ProfileFilled
                            style={{
                                color: "blue",
                                backgroundColor: "rgba(0,0,255,0.25)",
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                    }
                    title={"Category"}
                    value={category}
                />
                <DashboardCard
                    icon={
                        <ShoppingCartOutlined
                            style={{
                                color: "green",
                                backgroundColor: "rgba(0,255,0,0.25)",
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                    }
                    title={"Orders"}
                    value={orders}
                />
                <DashboardCard
                    icon={
                        <ShoppingOutlined
                            style={{
                                color: "blue",
                                backgroundColor: "rgba(0,0,255,0.25)",
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                    }
                    title={"Inventory"}
                    value={inventory}
                />
                <DashboardCard
                    icon={
                        <UserOutlined
                            style={{
                                color: "purple",
                                backgroundColor: "rgba(0,255,255,0.25)",
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                    }
                    title={"Customer"}
                    value={customers}
                />
                <DashboardCard
                    icon={
                        <DollarCircleFilled
                            style={{
                                color: "red",
                                backgroundColor: "rgba(255,0,0,0.25)",
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                    }
                    title={"Revenue"}
                    value={revenue}
                />
                <DashboardCard
                    icon={
                        <MonitorOutlined
                            style={{
                                color: "green",
                                backgroundColor: "rgba(95, 185, 95, 0.25)",
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                    }
                    title={"Reports"}
                    value={report}
                />
            </Space>
            
            <Space > 
                <RecentOrders /> 
                {/* <RevenueChart/> */}
            </Space>
            <Space>
                <RevenueChart/>
            </Space>
        </Space>

    )
}
function DashboardCard({ title, value, icon }) {
    return (
        <Card direction='horizontal'>
            <Space>
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    );

}

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
            <Space>
                <Table style={{width: '90%'}}
                    columns={[
                        {
                            title: "Order No",
                            dataIndex: "order_no",
                        },
                        {
                            title: "Customer",
                            dataIndex: "customer_name",
                        },
                        // {
                        //     title: "Total",
                        //     dataIndex: "total_amount",
                        //     render: (value) => typeof value === 'number' ? `$${value.toFixed(2)}` : '$0.00'
                        // },
                        {
                            key: "total_amount",
                            title: "Total",
                            dataIndex: "total_amount",
                            render: (value) => {
                                const numValue = parseFloat(value);
                                return !isNaN(numValue) ? `$${numValue.toFixed(2)}` : '$0.00';
                            }
                        },
                        {
                            key: "paid_amount",
                            title: "Paid Amount",
                            dataIndex: "paid_amount",
                        },
                        {
                            key: "payment_method",
                            title: "Payment Method",
                            dataIndex: "payment_method",
                        },
                        // {
                        //     title: "Remark",
                        //     dataIndex: "remark",
                        // },
                        {
                            title: "Date",
                            dataIndex: "create_at",
                            render: (value) => value ? formatDateClient(value, "DD/MM/YYYY") : "N/A"
                        },
                    ]}
                    dataSource={dataSource}
                    loading={loading}
                    pagination={false}
                    scroll={{ y: 300 }} // Added scroll prop for fixed height and vertical scroll
                ></Table>
            </Space>
        </>
    );
}
DashboardCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    icon: PropTypes.node.isRequired
}

// DashboardCard.PropTypes = {
//     title: PropTypes.string.isRequired,
//     value: PropTypes.number.isRequired,
//     icon: PropTypes.object.isRequired
// }

export default Dashboard;