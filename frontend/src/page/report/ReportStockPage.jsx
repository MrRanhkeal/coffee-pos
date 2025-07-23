import React, { useState } from 'react';
import { Button, Table, Space, message } from 'antd';
import { request } from '../../util/helper';

function ReportStockPage() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const getStockReport = async () => {
        setLoading(true);
        try {
            const res = await request('report/getstockreport', 'get');
            if (res && Array.isArray(res.list)) {
                setData(res.list);
            } else if (res && Array.isArray(res)) {
                setData(res);
            } else {
                setData([]);
                message.info('No stock data found.');
            }
        } catch (err) {
            message.error('Failed to fetch stock report.', err);
        }
        setLoading(false);
    };

    const columns = [
        { title: 'Product ID', dataIndex: 'product_id', key: 'product_id' },
        { title: 'Product Name', dataIndex: 'product_name', key: 'product_name' },
        { title: 'Barcode', dataIndex: 'barcode', key: 'barcode' },
        { title: 'Brand', dataIndex: 'brand', key: 'brand' },
        { title: 'Retail Price', dataIndex: 'retail_price', key: 'retail_price' },
        { title: 'Current Stock Qty', dataIndex: 'current_stock_qty', key: 'current_stock_qty' },
        { title: 'Last Incoming Price', dataIndex: 'last_incoming_price', key: 'last_incoming_price' },
        { title: 'Supplier Name', dataIndex: 'supplier_name', key: 'supplier_name' },
    ];

    return (
        <div>
            <h2>Product Stock Report</h2>
            <Space style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={getStockReport} loading={loading}>
                    Get Stock Report
                </Button>
            </Space>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                rowKey={(record, idx) => record.product_id + '_' + idx}
                pagination={{ pageSize: 20 }}
                scroll={{ x: 'max-content' }}
            />
        </div>
    );
}

export default ReportStockPage