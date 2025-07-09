import { AppstoreAddOutlined } from '@ant-design/icons';
import { Card, Space } from 'antd';
import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import { request } from '../../../util/helper';
import Statistic from 'antd/es/statistic/Statistic';

function DashboardCategory() {
    const [category, setCategory] = useState(0);

// Fetch category count
useEffect(() => {
    const getCategories = async () => {
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
    getCategories();
}, []); // Empty dependency array ensures this runs once on mount
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
    return (
        <Space style={{fontWeight: "bold"}}>
            <DashboardCategory
                icon={
                    <AppstoreAddOutlined
                        style={{
                            color: "blue",
                            backgroundColor: "rgba(0,0,255,0.25)",
                            borderRadius: 50,
                            fontSize: 40,
                            padding: 8,
                        }}
                    />
                }
                title={"Category"}
                value={category}
            />
        </Space>
    )
}
DashboardCategory.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    icon: PropTypes.node.isRequired
}
export default DashboardCategory