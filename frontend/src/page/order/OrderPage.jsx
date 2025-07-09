import React, { useEffect, useState } from "react";
import {
    Button,
    DatePicker,
    Image,
    Input,
    message,
    Modal,
    Space,
    Table,
    Tag,
} from "antd";
import { formatDateClient, formatDateServer, request } from "../../util/helper";
import { MdDelete } from "react-icons/md";
import MainPage from "../../component/layout/MainPage";
import { IoMdEye } from "react-icons/io";
import { Config } from "../../util/config";
import dayjs from "dayjs";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { FaSearch } from "react-icons/fa";

import { useReactToPrint } from "react-to-print";
import PrintInvoice from "../../component/pos/PrintInvoice";

function OrderPage() {
    const [list, setList] = useState([]);
    const [orderDetail, setOrderDetails] = useState([]);

    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        visibleModal: false,
        txtSearch: "",
    });
    const user = JSON.parse(localStorage.getItem("user")); //check it for get user 
    const [filter, setFiler] = useState({
        from_date: dayjs(), // current
        to_date: dayjs(), // current
    });

    useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        var param = {
            txtSearch: state.txtSearch,
            from_date: formatDateServer(filter.from_date), // 2024-11-20
            to_date: formatDateServer(filter.to_date), // 2024-11-22
        };
        setLoading(true);
        const res = await request("order", "get", param);
        setLoading(false);
        if (res) {
            setList(res.list);
            setSummary(res.summary);
        }
    };
    const getOrderDetail = async (data) => {
        setLoading(true);
        const res = await request("order_detail/" + data.id, "get");
        setLoading(false);
        if (res) {
            setOrderDetails(res.list); // The backend sends data in the 'list' property
            setState({
                ...state,
                visibleModal: true,
            });
        }
    };
    const refInvoice = React.useRef(null);
    const handlePrintInvoice = useReactToPrint({
        contentRef: refInvoice,
        onBeforePrint: () => {
            // Any setup before printing can be done here
            console.log("`onBeforePrint` called");
            return Promise.resolve();
        },
        onAfterPrint: () => {
            // Reset the print data after printing
            window.close();
        }
    });
    const onClickDelete = async (data) => {
        Modal.confirm({
            title: "Delete Order",
            content: `Are you sure you want to delete order no. ${data.order_no}?`,
            okText: "Delete",
            cancelText: "Cancel",
            okType: "danger",
            onOk: async () => {
                const res = await request("order", "delete", {
                    id: data.id,
                });
                if (res && !res.error) {
                    message.success(res.message);
                    getList();
                }
            },
        });
    };
    useEffect(() => {
        handlePrintInvoice();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const onCloseModal = () => {
        setState({
            ...state,
            visibleModal: false,
        });
    };
    return (
        <MainPage loading={loading}>
            <div className="pageHeader">
                <Space>
                    <div>
                        <div style={{ fontWeight: "bold" }}>Order</div>
                        <div>
                            Total : {summary?.total_order || 0} Order |{" "}
                            {summary?.total_amount || 0}$
                        </div>
                    </div>
                    <Input.Search
                        onChange={(value) =>
                            setState((p) => ({ ...p, txtSearch: value.target.value }))
                        }
                        allowClear
                        onSearch={getList}
                        placeholder="Search"
                    />
                    <DatePicker.RangePicker
                        defaultValue={[
                            dayjs(filter.from_date, "DD/MM/YYYY"),
                            dayjs(filter.to_date, "DD/MM/YYYY"),
                        ]}
                        format={"DD/MM/YYYY"}
                        onChange={(value) => {
                            setFiler((p) => ({
                                ...p,
                                from_date: value[0],
                                to_date: value[1],
                            }));
                        }}
                    />
                    <Button type="primary" onClick={getList}>
                        <FaSearch />Filter
                    </Button>
                </Space>
            </div>
            <Modal
                open={state.visibleModal}
                title={"Order Details View"}
                footer={null}
                onCancel={onCloseModal}
                width={800}
            >
                <Table
                    dataSource={orderDetail}
                    pagination={false}
                    columns={[
                        {
                            key: "p_name",
                            title: "Product",
                            dataIndex: "p_name",
                            render: (data, row) => (
                                <div>
                                    <div style={{ fontWeight: "bold" }}>{data}</div>
                                    <div>
                                        {row.p_brand} -{row.p_des}
                                    </div>
                                    {/* <div>{row.p_des}</div> */}
                                </div>
                            ),
                        },
                        {
                            key: "p_category_name",
                            title: "Categories",
                            dataIndex: "p_category_name",
                        },
                        {
                            key: "p_image",
                            title: "Image",
                            dataIndex: "p_image",
                            render: (value) => (
                                <Image
                                    src={Config.image_path + value}
                                    alt=""
                                    style={{ width: 60, borderRadius: 5, margin: 0, padding: 0 }}
                                />
                            ),
                        },
                        {
                            // key: "sugar_level",
                            // title: "Sugar",
                            // dataIndex: "sugar_level",
                            // render: (value) => <Tag color="blue">{value}%</Tag>,
                        },
                        {
                            key: "qty",
                            title: "Qty",
                            dataIndex: "qty",
                        },
                        {
                            key: "price",
                            title: "Price",
                            dataIndex: "price",
                            render: (value) => <Tag color="green">{value}$</Tag>,
                        },
                        {
                            key: "discount",
                            title: "Discount",
                            dataIndex: "discount",
                            render: (value) => <Tag color="red">{value}%</Tag>,
                        },
                        {
                            key: "total",
                            title: "Total",
                            dataIndex: "total",
                            render: (value) => <Tag color="green">{value}$</Tag>,
                        }
                    ]}
                />
                <div style={{ marginTop: 16, textAlign: "right" }}>
                    <Button onClick={onCloseModal}>Close</Button>
                    <Button
                        type="primary"
                        style={{ marginLeft: 10 }}
                        onClick={() => {
                            // Use getOrderDetail data for printing
                            if (orderDetail && orderDetail.length > 0) {
                                const detail = orderDetail[0];
                                const order = list.find(o => o.id === detail.order_id);
                                if (order) {
                                    setTimeout(() => {
                                        handlePrintInvoice();
                                    }, 300);
                                } else {
                                    message.error('Order info not found for printing');
                                }
                            } else {
                                message.error('No order details available to print');
                            }
                        }}
                    >
                        Print
                    </Button>
                </div>
            </Modal>
            {/* Hidden print component for current order */}
            {state.visibleModal && (
                <div style={{ display: 'none' }}>
                    <PrintInvoice
                        ref={refInvoice}
                        cart_list={orderDetail.map(item => ({
                            name: item.p_name,
                            cart_qty: item.qty,
                            price: item.price,
                            discount: item.discount,
                            sugarLevel: item.sugar_level || 0
                        }))}
                        objSummary={{
                            ...list.find(o => o.id === orderDetail[0]?.order_id),
                            order_no: list.find(o => o.id === orderDetail[0]?.order_id)?.order_no,
                            order_date: list.find(o => o.id === orderDetail[0]?.order_id)?.order_date,
                            customer_id: list.find(o => o.id === orderDetail[0]?.order_id)?.customer_name,
                            payment_method: list.find(o => o.id === orderDetail[0]?.order_id)?.payment_method,
                            sub_total: list.find(o => o.id === orderDetail[0]?.order_id)?.sub_total,
                            save_discount: list.find(o => o.id === orderDetail[0]?.order_id)?.save_discount,
                            total: list.find(o => o.id === orderDetail[0]?.order_id)?.total,
                            total_paid: list.find(o => o.id === orderDetail[0]?.order_id)?.total_paid
                        }}
                        cashier={user?.name}
                    />
                </div>
            )}
            <Table
                dataSource={list}
                columns={[
                    {
                        key: "order_no",
                        title: "Order No",
                        dataIndex: "order_no",
                    },
                    {
                        key: "customer_name",
                        title: "Customer",
                        dataIndex: "customer_name",
                        render: (value, data) => (
                            <div>
                                <div style={{ fontWeight: "bold" }}>{data.customer_name}</div>
                                <div>{data.customer_tel}</div>
                                <div>{data.customer_address}</div>
                            </div>
                        ),
                    },
                    {
                        key: "total_amount",
                        title: "Total",
                        dataIndex: "total_amount",
                    },
                    {
                        key: "paid_amount",
                        title: "Paid",
                        dataIndex: "paid_amount",
                        render: (value) => (
                            <div style={{ fontWeight: "bold", color: "green" }}>{value}</div>
                        ),
                    },
                    {
                        key: "Due",
                        title: "Due",
                        render: (value, data) => (
                            <Tag color="red">
                                {(Number(data.total_amount) - Number(data.paid_amount)).toFixed(
                                    2
                                )}
                            </Tag>
                        ),
                    },
                    {
                        key: "payment_method",
                        title: "Payment Method",
                        dataIndex: "payment_method",
                    },
                    {
                        key: "remark",
                        title: "Remark",
                        dataIndex: "remark",
                    },
                    {
                        key: "create_by",
                        title: "User",
                        dataIndex: "create_by",
                    },
                    {
                        key: "create_at",
                        title: "Order Date",
                        dataIndex: "create_at",
                        render: (value) => formatDateClient(value, "DD/MM/YYYY h:mm A"),
                    },
                    {
                        key: "Action",
                        title: "Action",
                        align: "center",
                        render: (item, data, index) => (
                            <Space>
                                <EyeOutlined
                                    style={{ color: "rgb(12, 59, 4)", fontSize: 20 }}
                                    type="primary"
                                    icon={<IoMdEye />}
                                    onClick={() => getOrderDetail(data, index)}
                                />
                                <DeleteOutlined
                                    danger
                                    type="primary"
                                    icon={<MdDelete />}
                                    onClick={() => onClickDelete(data)}
                                    style={{ color: "red", fontSize: 20 }}
                                />
                            </Space>
                        ),
                    },
                ]}
            />
        </MainPage>
    );
}

export default OrderPage;