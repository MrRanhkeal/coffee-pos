import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Table, Space, message } from 'antd';
import dayjs from 'dayjs';
import { formatDateClient, request } from '../../util/helper';
import { FaSearch } from 'react-icons/fa';
// import { formatDateClient, formatDateServer, request } from "../../util/helper";
function ReportSalePage() {
    // const [fromDate, setFromDate] = useState(dayjs().startOf('month'));
    // const [toDate, setToDate] = useState(dayjs());
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const [filter, setFilter] = useState({
        // from_date: dayjs().startOf('month'),
        from_date: dayjs().subtract(5, 'd'),
        to_date: dayjs().add(1, 'd'),
    })
    useEffect(() => {
        getSaleReport();
    }, []);

    const getSaleReport = async () => {
        try {
            var param = {
                from_date: dayjs(filter.from_date).format('YYYY-MM-DD'),
                to_date: dayjs(filter.to_date).format('YYYY-MM-DD'),
            };
            setLoading(false);
            const res = await request('report/getsalereport', 'get', param);
            if (res && Array.isArray(res.list)) {
                setData(res.list);
            } else if (res && Array.isArray(res)) {
                setData(res);
            } else {
                setData([]);
                message.info('No data found for selected dates.');
            }
        } catch (err) {
            message.error('Failed to get report.', err);
        }
    };

    const columns = [
        {
            title: 'Order No',
            dataIndex: 'order_no',
            key: 'order_no'
        },
        {
            title: 'Order Date',
            dataIndex: 'order_date',
            key: 'order_date',
            // render: (value) => formatDateClient(value,"DD/MM/YYYY h:mm A")
            render: (value) => new Date(value).toLocaleDateString("en-GB", { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            // render: (date) => new Date(date).toLocaleDateString("en-GB", { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        },
        {
            title: 'Customer',
            dataIndex: 'customer_name',
            key: 'customer_name'
        },
        {
            title: 'Cashier',
            dataIndex: 'user_name',
            key: 'user_name'
        },
        {
            title: 'Product',
            dataIndex: 'product_name',
            key: 'product_name'
        },
        {
            title: 'Qty',
            dataIndex: 'qty',
            key: 'qty'
        },
        {
            title: 'Price',
            dataIndex: 'product_price_at_order',
            key: 'product_price_at_order',
            render: (value) =>' $'+parseFloat(value).toFixed(2) 
        },
        {
            title: 'Discount',
            dataIndex: 'order_detail_discount',
            key: 'order_detail_discount',
            render: (value) =>parseFloat(value).toFixed(2) + '%'
        },
        {
            title: 'Brand',
            dataIndex: 'product_brand',
            key: 'product_brand'
        },
        {
            title: 'Total',
            dataIndex: 'order_detail_total',
            key: 'order_detail_total',
            render: (value) =>' $'+parseFloat(value).toFixed(2) 
        },
    ];
    
    return (
        <div>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "rgba(222, 33, 121, 1)" }}>Sale Report</h2><br />
            <Space style={{ marginBottom: 16 }}> 
                <DatePicker.RangePicker style={{ width: "400px" }}
                    allowClear={true}
                    value={filter.from_date && filter.to_date ? [dayjs(filter.from_date), dayjs(filter.to_date)] : []}
                    format={"YYYY-MM-DD"}
                    onChange={(value) => {
                        setFilter((p) => ({
                            ...p,
                            from_date: value && value[0] ? value[0] : null,
                            to_date: value && value[1] ? value[1] : null,
                        }));
                    }}
                />
                {/* <DatePicker
                    value={fromDate}
                    onChange={setFromDate}
                    format="YYYY-MM-DD"
                    placeholder="From Date"
                />
                <DatePicker
                    value={toDate}
                    onChange={setToDate}
                    format="YYYY-MM-DD"
                    placeholder="To Date"
                /> */}
                <Button type="primary" onClick={getSaleReport} >
                    <FaSearch />Filter
                </Button>
                {/* <Button type="primary" onClick={getSaleReport} loading={loading}>
                    Get Report
                </Button> */}
            </Space>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                rowKey={(record, idx) => record.order_no + '_' + idx}
                pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '50', '100'] }}
                // pagination={false}
                scroll={false}
            />
        </div>
    );
}

export default ReportSalePage