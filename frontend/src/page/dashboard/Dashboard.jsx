import React, { useEffect, useState } from 'react'
import { Card, Space, Statistic, Table, Typography } from 'antd';
import { AppstoreOutlined, DollarCircleFilled, ProductOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import PropTypes from "prop-types";
import RevenueChart from '../../component/home/RevenueChart';
import { request, formatDateClient } from "../../util/helper"; // Added import for request helper and formatDateClient 
function Dashboard() {

    const [orders, setOrders] = useState(0);
    const [customers, setCustomers] = useState(0);
    const [products, setProducts] = useState(0);
    const [category, setCategory] = useState(0); 
    const [revenue, setRevenue] = useState(0);

    // Calculate total revenue from orders
    useEffect(() => {
        const fetchRevenue = async () => {
            try {
                const res = await request("order", "get", {});
                if (res && res.list && Array.isArray(res.list)) {
                    // Calculate total revenue from all orders
                    const totalRevenue = res.list.reduce((sum, order) => {
                        const amount = parseFloat(order.total_amount) || 0;
                        return sum + amount;
                    }, 0);
                    setRevenue(totalRevenue);
                } else {
                    setRevenue(0);
                }
            } catch (error) {
                console.error("Error fetching revenue:", error);
                setRevenue(0);
            }
        };
        fetchRevenue();
    }, []);

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
            <Typography.Title level={4}>Dashboard Overview</Typography.Title>
            <Space direction='horizontal'> 
                <DashboarProduct 
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
                <DashboardCategory
                    icon={
                        <AppstoreOutlined
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
                <DashboardOrder
                    icon={
                        <ShoppingCartOutlined
                            style={{
                                color: "red",
                                backgroundColor: "rgba(216, 168, 35, 0.25)",
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                    }
                    title={"Orders"}
                    value={orders}
                />
                <DashboardCustomer
                    icon={
                        <UserOutlined
                            style={{
                                color: "purple",
                                backgroundColor: "rgba(128,0,128,0.25)",
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                    }
                    title={"Customers"}
                    value={customers}
                />
                <DashboardReven
                    icon={
                        <DollarCircleFilled
                            style={{
                                color: "green",
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
function DashboarProduct({ title, value, icon }) {
    return (
        <Card direction='horizontal' style={{width: "210px",height: "120px", backgroundColor: "rgba(46, 71, 182, 0.53)", display: "flex", alignItems: "center" }}>
            <Space >
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    );
}
function DashboardCategory({ title, value, icon }) {
    return (
        <Card direction='horizontal' style={{width: "210px",height: "120px", backgroundColor: "rgba(5, 243, 57, 0.46)", display: "flex", alignItems: "center" }}>
            <Space >
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    );
}
function DashboardOrder({ title, value, icon }) {
    return (
        <Card direction='horizontal' style={{width: "210px",height: "120px", backgroundColor: "rgba(155, 25, 231, 0.47)", display: "flex", alignItems: "center" }}>
            <Space >
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    );
}
function DashboardCustomer({ title, value, icon }) {
    return (
        <Card direction='horizontal' style={{width: "210px",height: "120px", backgroundColor: "rgba(235, 42, 39, 0.55)", display: "flex", alignItems: "center" }}>
            <Space >
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    );
}
function DashboardReven({ title, value, icon }) {
    return (
        <Card direction='horizontal' style={{width: "210px",height: "120px", backgroundColor: "rgba(79, 255, 10, 0.5)", display: "flex", alignItems: "center" }}>
            <Space >
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
    );
}
DashboarProduct.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    icon: PropTypes.node.isRequired
}
DashboardCategory.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    icon: PropTypes.node.isRequired
}
DashboardOrder.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    icon: PropTypes.node.isRequired
}
DashboardCustomer.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    icon: PropTypes.node.isRequired
}
DashboardReven.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    icon: PropTypes.node.isRequired
}
export default Dashboard;