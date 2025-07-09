import React, { useState, useEffect, useCallback } from 'react';
import { Button, Table, Modal, Form, Input, message, Select, Tag, Space, InputNumber } from 'antd';
import useProductList from './useProductList';
import { request } from '../../util/helper';
import { DeleteOutlined, EditOutlined, FileAddFilled } from '@ant-design/icons';
import { MdDelete, MdEdit } from 'react-icons/md';


function Stock_ProductPage() {
    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Khmer:wght@400;700&family=Roboto:wght@400;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        return () => { document.head.removeChild(link); };
    }, []);
    const [state, setState] = useState({
        loading: false,
        data: [],
    });
    const [suppliers, setSuppliers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingId, setEditingId] = useState({ id: null, status: null });
    const { products, loading: productLoading } = useProductList();

    // get suppliers list
    const getSuppliers = useCallback(async () => {
        try {
            const res = await request('supplier', 'get', {});
            if (res && !res.error && res.list) {
                setSuppliers(res.list);
            }
        } catch (error) {
            console.error('Failed to get suppliers:', error);
        }
    }, []);

    // Fetch stock list
    const getList = useCallback(async () => {
        try {
            setState((p) => ({
                ...p,
                loading: true
            }));
            const res = await request('stock_product', 'get');
            if (res && !res.error) {
                setState((p) => ({
                    ...p,
                    data: res.data,
                    loading: false
                }))
            }
        }
        catch (error) {
            message.error(`Failed to get stock list: ${error.message}`);
            setState((p) => ({
                ...p,
                loading: false
            }));
        }
    }, []);

    useEffect(() => {
        getList();
        getSuppliers();
    }, [getList, getSuppliers]);

    // Helper function to get supplier name by ID
    const getSupplierName = (supplierId) => {
        const supplier = suppliers.find(s => s.id === supplierId);
        return supplier ? supplier.name : `ID: ${supplierId}`;
    };

    // Handle form submission for both create and update
    const onFinish = async (values) => {
        try {
            setState((p) => ({
                ...p,
                loading: true
            }));

            const method = editingId ? "put" : "post";

            // Calculate new total quantity
            const updatedQty = parseInt(values.qty) + parseInt(values.newQty || 0);
            //const newQty = parseInt(values.newQty || 0);

            const payload = {
                name: values.name,
                //newQty: newQty,
                qty: updatedQty,
                supplier_id: values.supplier_id,
                product_id: values.product_id,
                description: values.description,
                status: values.status
            };

            if (method === "put") {
                payload.id = editingId;
            }

            const res = await request('stock_product', method, payload);

            if (res && !res.error) {
                message.success(`Stock ${editingId ? 'updated' : 'created'} successfully`);
                setIsModalVisible(false);
                form.resetFields();
                setEditingId(null);
                getList();
            } else {
                message.error(res.error || 'Failed to save stock');
            }
        } catch (error) {
            message.error(error.message);
        } finally {
            setState((p) => ({
                ...p,
                loading: false
            }));
        }
    };
    //check product is exist or not then continue
    const openModal = () => {
        form.setFieldsValue({
            name: '',
            qty: 0,
            newQty: 0,
            supplier_id: undefined,
            product_id: undefined,
            description: '',
            status: 1
        });
        setEditingId(null);
        setIsModalVisible(true);
    };
    const handleDelete = async (record) => {
        try {
            Modal.confirm({
                title: 'Delete Stock',
                content: `Are you sure you want to delete this stock ${record.name} ?`,
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk: async () => {
                    const res = await request('stock_product', 'delete', { id: record.id });
                    if (res && !res.error) {
                        message.success('Stock deleted successfully');
                        getList();
                    }
                }
            })
        } catch (error) {
            message.error(`Delete failed: ${error.message}`);
        }
    };
    //upadte stock current qty + new qty
    const handleEdit = (record) => {
        form.setFieldsValue({
            name: record.name,
            qty: record.qty,
            newQty: 0,  // Initialize additional quantity to 0
            supplier_id: record.supplier_id,
            product_id: record.product_id,
            description: record.description,
            status: record.status
        });
        setEditingId(record.id);
        setIsModalVisible(true);
    };

    const columns = [
        {
            key: 'No',
            title: <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>ល.រ</span>,
            render: (item, data, index) => index + 1,
        },
        {
            title: <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>ឈ្មោះ</span>,
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>{text}</span>,
        },
        {
            title: <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>ឈ្មោះផលិតផល</span>,
            dataIndex: 'product_id',
            key: 'product_id',
            render: (text) => <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>{text}</span>,
        },
        {
            title: <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>ចំនួន</span>,
            dataIndex: 'qty',
            key: 'qty',
        },
        {
            title: <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>អ្នកផ្គត់ផ្គង់</span>,
            dataIndex: 'supplier_id',
            key: 'supplier_id',
            render: (supplierId) => <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>{getSupplierName(supplierId)}</span>,
        },
        {
            title: <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>មតិយោបល់</span>,
            dataIndex: 'description',
            key: 'description',
            render: (text) => <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>{text}</span>,
        },
        {
            title: <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>សកម្មភាព</span>,
            dataIndex: 'status',
            key: 'status',
            render: (state) => (state == 1 ? (
                <Tag color="green" style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>Active</Tag>
            ) : (
                <Tag color="red" style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>InActive</Tag>
            )),
        },
        {
            title: <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>ស្ថានភាព</span>,
            key: 'actions',
            render: (_, record) => (
                <Space >
                    <EditOutlined
                        type='primary'
                        onClick={() => handleEdit(record)}
                        icon={<MdEdit />}
                        style={{ color: "green", fontSize: 20 }}
                    />
                    <DeleteOutlined
                        type='primary'
                        danger
                        onClick={() => handleDelete(record)}
                        icon={<MdDelete />}
                        style={{ color: "red", fontSize: 20 }}
                    />
                </Space>
            ),
        },
    ];

    return (
        <div style={{ margin: 0, padding: 0, fontSize: "20px", color: "rgb(237, 53, 53)", fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }} >Stock Products
            <div style={{ marginBottom: 16, textAlign: "right", fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>
                <Button
                    Button type="primary"
                    onClick={openModal}
                    style={{ padding: "10px", marginBottom: "10px", marginLeft: "auto", fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}
                >
                    <FileAddFilled />New
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={state.data}
                rowKey="id"
                loading={state.loading}
            />

            <Modal
                title={editingId ? 'Edit Stock' : 'Add New Stock'}
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                    setEditingId(null);
                }}
                footer={null}
                style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="name"
                        label="ឈ្មោះ"
                        rules={[{ required: true, message: 'Please input name!' }]}
                        style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}
                    >
                        <Input placeholder="Enter stock name" style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }} />
                    </Form.Item> 
                    <Form.Item
                        name="qty"
                        label="ចំនួន"
                        style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}
                    >
                        <InputNumber disabled min={0} style={{ width: '100%', fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }} />
                    </Form.Item>

                    <Form.Item
                        name="newQty"
                        label="ចំនួនបន្ថែម"
                        rules={[{ required: true, message: 'Please input quantity to add!' }]}
                        style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}
                    >
                        <InputNumber min={0} style={{ width: '100%', fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }} placeholder="Enter additional quantity" />
                    </Form.Item>

                    <Form.Item
                        name="supplier_id"
                        label="អ្នកផ្គត់ផ្គង់"
                        rules={[{ required: true, message: 'Please select a supplier!' }]}
                        style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}
                    >
                        <Select
                            placeholder="ជ្រើសអ្នកផ្គត់ផ្គង់"
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}
                        >
                            {suppliers.map(supplier => (
                                <Select.Option key={supplier.id} value={supplier.id} style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>
                                    {supplier.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="product_id"
                        label="ផលិតផល"
                        rules={[{ required: true, message: 'Please select a product!' }]}
                        style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}
                    >
                        <Select
                            placeholder="ជ្រើសផលិតផល"
                            loading={productLoading}
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}
                        >
                            {products.map(product => (
                                <Select.Option key={product.id} value={product.id} style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>
                                    {product.name} (ID: {product.id})
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="មតិយោបល់"
                        rules={[{ required: true, message: 'Please input description!' }]}
                        style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}
                    >
                        <Input.TextArea
                            rows={3}
                            placeholder="Enter description"
                            style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="status"
                        label="សកម្មភាព"
                        initialValue={1}
                        style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}
                    >
                        <Select placeholder="ជ្រើសសកម្មភាព" style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>
                            <Select.Option value={1} style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>Active</Select.Option>
                            <Select.Option value={0} style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>Inactive</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        style={{ textAlign: "right", fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}
                    >
                        <Button type="primary" htmlType="submit" style={{ marginRight: 8, fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }} loading={state.loading}>
                            {editingId ? 'កែប្រែ' : 'បន្ថែមថ្មី'}
                        </Button>

                        <Button onClick={() => {
                            setIsModalVisible(false);
                            form.resetFields();
                            setEditingId(null);
                        }} style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>
                            បិទ
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Stock_ProductPage;