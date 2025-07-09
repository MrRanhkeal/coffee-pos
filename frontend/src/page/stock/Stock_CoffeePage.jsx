import React, { useState, useEffect, useCallback } from 'react';
import { Button, Table, Modal, Form, Input, message, Select, Tag, Space, InputNumber } from 'antd';
import { request } from '../../util/helper';
import { DeleteOutlined, EditOutlined, FileAddFilled } from '@ant-design/icons';
import { MdDelete, MdEdit } from 'react-icons/md';
import { configStore } from '../../store/configStore';



function Stock_CoffeePage() {
    const [state, setState] = useState({
        loading: false,
        data: [],
    });
    const { config } = configStore();
    const [suppliers, setSuppliers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingId, setEditingId] = useState({ id: null, status: null });

    const [filter, setFilter] = useState({
        product_name: "",
        txtSearch: "",
    });
    // var param = {
    //     txtSearch: state.txtSearch,
    //     product_name: filter.product_name,
    // };
    // Fetch suppliers list
    const getSuppliers = useCallback(async () => {
        try {
            const res = await request('supplier', 'get', {});
            if (res && !res.error && res.list) {
                setSuppliers(res.list);
            }
        } catch (error) {
            console.error('Failed to fetch suppliers:', error);
        }
    }, [setState, filter.product_name]);

    // Fetch stock list
    const getList = useCallback(async () => {
        try {
            setState((p) => ({
                ...p,
                loading: true
            }));
            const res = await request('stock_coffee', 'get');
            if (res && !res.error) {
                setState((p) => ({
                    ...p,
                    data: res.data,
                    loading: false
                }))
            }
        }
        catch (error) {
            message.error(`Failed to fetch stock list: ${error.message}`);
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

            const payload = {
                // name: values.name,
                product_name: values.product_name,
                qty: updatedQty,
                supplier_id: values.supplier_id,
                description: values.description,
                status: values.status
            };

            if (method === "put") {
                payload.id = editingId;
            }

            const res = await request('stock_coffee', method, payload);

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
    // const openModal = () => {
    //     form.setFieldsValue({
    //         name: '',
    //         qty: 0,
    //         newQty: 0,
    //         supplier_id: undefined,
    //         description: '',
    //         status: 1
    //     });
    //     setEditingId(null);
    //     setIsModalVisible(true);
    // };
    const openModal = () => {
        form.setFieldsValue({
            // name: '',
            product_name: '',
            qty: 0,
            newQty: 0,
            supplier_id: undefined,
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
                content: `Are you sure you want to delete this stock ${record.product_name} ?`,
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk: async () => {
                    const res = await request('stock_coffee', 'delete', { id: record.id });
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
            // name: record.name,
            product_name: record.product_name,
            qty: record.qty,
            newQty: 0,  // Initialize additional quantity to 0
            supplier_id: record.supplier_id,
            description: record.description,
            status: record.status
        });
        setEditingId(record.id);
        setIsModalVisible(true);
    };

    const columns = [
        {
            key: "No",
            title: "No",
            render: (item, data, index) => index + 1,
        },
        {
            title: 'Product Name',
            dataIndex: 'product_name',
            key: 'product_name',
        },
        {
            title: 'Quantity',
            dataIndex: 'qty',
            key: 'qty',
        },
        {
            title: 'Supplier',
            dataIndex: 'supplier_id',
            key: 'supplier_id',
            render: (supplierId) => getSupplierName(supplierId),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (state) => (state == 1 ? (
                <Tag color="green">Active</Tag>
            ) : (
                <Tag color="red">InActive</Tag>
            )),
        },
        {
            title: 'Actions',
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
        <div style={{ margin: 0, padding: 0, fontSize: "20px", color: "rgb(237, 53, 53)", fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }} >Stock Coffee
            <div style={{ marginBottom: 16, textAlign: "right" }}>
                <Button
                    Button type="primary"
                    onClick={openModal}
                    style={{ padding: "10px", marginBottom: "10px", marginLeft: "auto" }}
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
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="product_name"
                        label="Product Name"
                        rules={[
                            {
                                required: true,
                                message: "Product Name required!",
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select product name"
                            showSearch
                            allowClear
                            options={Object.entries(config.product_name || {}).flatMap(([category, items]) =>
                                items.map(item => ({
                                    label: `${category} - ${item.label}`,
                                    value: item.value
                                }))
                            )}
                            onChange={(value) => {
                                setFilter(prev => ({
                                    ...prev,
                                    product_name: value
                                }));
                                getList();
                            }}
                            disabled={state.isReadOnly}
                        />

                    </Form.Item>

                    <Form.Item
                        name="qty"
                        label="Current Quantity"
                    >
                        <InputNumber disabled min={0} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="newQty"
                        label="Quantity to Add"
                        rules={[{ required: true, message: 'Please input quantity to add!' }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} placeholder="Enter additional quantity" />
                    </Form.Item>

                    <Form.Item
                        name="supplier_id"
                        label="Supplier"
                        rules={[{ required: true, message: 'Please select a supplier!' }]}
                    >
                        <Select
                            placeholder="Select a supplier"
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            {suppliers.map(supplier => (
                                <Select.Option key={supplier.id} value={supplier.id}>
                                    {supplier.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please input description!' }]}
                    >
                        <Input.TextArea
                            rows={3}
                            placeholder="Enter description"
                        />
                    </Form.Item>

                    <Form.Item
                        name="status"
                        label="Status"
                        initialValue={1}
                    >
                        <Select placeholder="Select status">
                            <Select.Option value={1}>Active</Select.Option>
                            <Select.Option value={0}>Inactive</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        style={{ textAlign: "right" }}>
                        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }} loading={state.loading}>
                            {editingId ? 'Update' : 'Create'}
                        </Button>

                        <Button onClick={() => {
                            setIsModalVisible(false);
                            form.resetFields();
                            setEditingId(null);
                        }}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Stock_CoffeePage;