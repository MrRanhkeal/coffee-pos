import { ProductOutlined } from '@ant-design/icons';
import { Card, Space, Statistic } from 'antd';
import React, { useEffect, useState } from 'react'
import { request } from '../../../util/helper';
import PropTypes from "prop-types";
function DashboarProduct() {
    const [products, setProducts] = useState(0);

    // get products count
    useEffect(() => {
        const getProducts = async () => {
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
        getProducts();
    }, []);
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
    return (
        <Space style={{fontWeight: "bold"}}>
            <DashboarProduct
                icon={
                    <ProductOutlined
                        style={{
                            color: 'green',
                            backgroundColor: 'rgba(0,255,0,0.25)',
                            borderRadius: 50,
                            fontSize: 40,
                            padding: 8
                        }}
                    />
                }
                title={'Products' }
                value={products} 
            />
        </Space>
    )
}
DashboarProduct.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    icon: PropTypes.node.isRequired
}
export default DashboarProduct