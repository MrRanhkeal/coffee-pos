import { Button, Form, message, Modal, Space, Table,Image, Tag } from 'antd';
import { MdDelete } from 'react-icons/md';
import { request } from '../../util/helper';
import { useEffect, useState } from 'react';
import { Config } from '../../util/config';
function OrderPage() {
    const [fromRef] = Form.useForm();
    const [List, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(({
        visibleModal: false,
        name: "",
        description: "",
        status: "",
        parent_id: null
    }))

    const getList = async () => {
        setLoading(true);
        const res = await request("order", "get");
        setLoading(false);
        if (res) {
            setList(res);
        }
    }
    useEffect(() => {
        getList();
    })
    // const onClickAddBtn = () => {
    //     setStatus({
    //         ...status,
    //         visibleModal: true
    //     })
    // }
    const onCloseModal = () => {
        fromRef.resetFields();
        setStatus({
            ...status,
            visibleModal: false,
            id: null
        })
    }
    const onClickDelete = (data) => {
        try{
            Modal.confirm({
                title: "Are you sure delete this category?",
                okText: "Yes",
                okType: "danger",
                cancelText: "No",
                onOk: async () => {
                    const res = await request("order", "delete", { id: data.id });
                    if (res && !res.error) {
                        message.success(res.message);
                        const newList = List.filter((item) => item.id !== data.id);
                        setList(newList);
                    }
                }
            })
        
        }
        catch(err){
            console.log("something when wrong", err);
            
        }
    }
    return (
        // <div>OrderPage</div>
        <div loading={loading}>
            {/* <div>
                <Space>
                    <Button type='primary' icon={<MdAdd />} onClick={onClickAddBtn}>New</Button>
                </Space>
            </div> */}
            <Modal
                open={status.visibleModal}
                onCancel={onCloseModal}
            >
                <Form layout='vertical'>
                    
                </Form>

            </Modal>
            <Table className='table'
                columns={[
                    {
                        key: "No",
                        title: "No",
                        render: (text, record, index) => index + 1,
                    },
                    {
                        key: "product_name",
                        title: "Product",
                        dataIndex: "product_name",
                        render: (value)=>(
                            <Image
                                src={Config.imaage_path + value} //get image from backend
                                alt=''
                                style={{ width: 100, height: 100 }}
                            />
                        )
                    },
                    {
                        key: "product_image",
                        title: "Image",
                        dataIndex: "product_image",
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
                    },
                    {
                        key: "discount",
                        title: "Discount",
                        dataIndex: "discount",
                        render: (value) => <Tag color="green">{value}%</Tag>
                    },
                    {
                        key: "total",
                        title: "Total",
                        dataIndex: "total",
                    },
                    {
                        key: "order_no",
                        title: "Order No",
                        dataIndex: "order_no",
                    },
                    {
                        key: "customer_name",
                        title: "Customer Name",
                        dataIndex: "customer_name",
                    },
                    {
                        key: "total_amount",
                        title: "Total Amount",
                        dataIndex: "total_amount",
                    },
                    {
                        key: "paid_amount",
                        title: "Paid Amount",
                        dataIndex: "padd_amount",
                    },
                    {
                        key: "mayment_method",
                        title: "Payment Method",
                        dataIndex: "payment_method",
                    },
                    {
                        key: "remark",
                        title: "Remark",
                        dataIndex: "remark",
                    },
                    {
                        key: "action",
                        title: "Action",
                        dataIndex: "action",
                        render : (item, data, index) => (
                            <Space>
                                <Button type='primary' danger icon={<MdDelete />} onClick={()=> onClickDelete(data, index)}/>
                            </Space>
                        )
                    },
                ]}

            />
        </div>
    )
}

export default OrderPage