import React, { useState, useEffect, useCallback } from 'react';
import { Button, Table, Modal, Form, Input, message, Select, Tag, Space, InputNumber } from 'antd';
import { request } from '../../util/helper';
import { DeleteOutlined, EditOutlined, EyeOutlined, FileAddFilled } from '@ant-design/icons';
import { MdDelete, MdEdit } from 'react-icons/md';
import { configStore } from '../../store/configStore';
import { IoMdEye } from 'react-icons/io';



function Stock_CoffeePage() {
    const [state, setState] = useState({
        loading: false,
        data: [],
    });
    const { config } = configStore();
    const [suppliers, setSuppliers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingId, setEditingId] = useState({
        visibleModal: false,
        id: null,
        product_name: null,
        categories: null, qty: null,
        cost: null,
        supplier_id: null,
        status: null
    });

    const [filter, setFilter] = useState({
        product_name: "",
        categories: "",
        txtSearch: "",
    });
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
    }, [setState, filter.product_name]);

    // get stock list
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

            const payload = {
                // name: values.name,
                product_name: values.product_name,
                categories: values.categories,
                qty: updatedQty,
                cost: values.cost,
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
    const openModal = () => {
        form.setFieldsValue({
            // name: '',
            product_name: '',
            categories: '',
            qty: 0,
            newQty: 0,
            cost: 0,
            supplier_id: undefined,
            description: '',
            status: 1
        });
        setEditingId(null);
        setIsModalVisible(true);
    };
    const onClickDelete = async (record) => {
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
    const clickReadOnly = (record) => {
        setState({
            ...state,
            visibleModal: true,
            isReadOnly: true,
            id: record.id
        });
        form.setFieldsValue({
            id: record.id,
            product_name: record.product_name,
            categories: record.categories,
            qty: record.qty,
            cost: record.cost,
            supplier_id: record.supplier_id,
            description: record.description,
            status: record.status,
        });
    }
    //upadte stock current qty + new qty
    const onClickEdit = (record) => {
        form.setFieldsValue({
            //...record, 
            // name: record.name,
            product_name: record.product_name,
            categories: record.categories,
            qty: record.qty,
            newQty: 0,  // Initialize additional quantity to 0
            cost: record.cost,
            supplier_id: record.supplier_id,
            description: record.description,
            status: record.status
        });
        setEditingId(record.id);
        setIsModalVisible(true);
    };
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
            <Modal
                title={state.isReadOnly ? "View Stock" : (editingId && editingId.id ? "Edit Stock" : "New Stock")}
                open={state.visibleModal || isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    setState(p => ({ ...p, visibleModal: false, isReadOnly: false }));
                    form.resetFields();
                    setEditingId(null);
                }}
                footer={state.isReadOnly ? [
                    <Button key="close" type="primary" onClick={() => {
                        setIsModalVisible(false);
                        setState(p => ({ ...p, visibleModal: false, isReadOnly: false }));
                        form.resetFields();
                        setEditingId(null);
                    }}>
                        Close
                    </Button>
                ] : null}
                width={800}
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
                        name="categories"
                        label="Categories"
                        rules={[{ required: true, message: 'Please select a categories!' }]}
                    >
                        <Select
                            placeholder="Select categories"
                            showSearch
                            allowClear
                            options={(config.categories || []).map(item => ({
                                label: item.label,
                                value: item.value
                            }))}
                            onChange={(value) => {
                                setFilter(prev => ({
                                    ...prev,
                                    categories: value
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
                        name="cost"
                        label="Cost"
                    >
                        <InputNumber enabled min={0} style={{ width: '100%' }} />
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

                    {!state.isReadOnly && (
                        <Form.Item style={{ textAlign: "right" }}>
                            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }} loading={state.loading}>
                                {editingId && editingId.id ? 'Update' : 'Save'}
                            </Button>
                            <Button onClick={() => {
                                setIsModalVisible(false);
                                form.resetFields();
                                setEditingId(null);
                            }}>
                                Cancel
                            </Button>
                        </Form.Item>
                    )}
                </Form>
            </Modal>
            <Table
                dataSource={state.data}
                columns={[
                    {
                        key: "id",
                        title: "ID",
                        dataIndex: "id",
                    },
                    {
                        key: "product_name",
                        title: "Product Name",
                        dataIndex: "product_name",
                    },
                    {
                        key: "categories",
                        title: "Categories",
                        dataIndex: "categories",
                    },
                    {
                        key: "qty",
                        title: "Current Quantity",
                        dataIndex: "qty",
                    },
                    {
                        key: "cost",
                        title: "Cost",
                        dataIndex: "cost",
                    },
                    {
                        key: "supplier_id",
                        title: "Supplier",
                        dataIndex: "supplier_id",
                    },
                    {
                        key: "description",
                        title: "Description",
                        dataIndex: "description",
                    },
                    {
                        key: "status",
                        title: "Status",
                        dataIndex: "status",
                        render: (status) =>
                            status == 1 ? (
                                <Tag color="green">Active</Tag>
                            ) : (
                                <Tag color="red">InActive</Tag>
                            ),
                    },
                    {
                        key: "Action",
                        title: "Action",
                        align: "center",
                        render: (item, data, index) => (
                            <Space>
                                <EditOutlined
                                    type="primary"
                                    style={{ color: "green", fontSize: 20 }}
                                    icon={<MdEdit />}
                                    onClick={() => onClickEdit(data, index)}
                                />
                                <DeleteOutlined
                                    type="primary"
                                    danger
                                    style={{ color: "red", fontSize: 20 }}
                                    icon={<MdDelete />}
                                    onClick={() => onClickDelete(data, index)}
                                />
                                <EyeOutlined
                                    style={{ color: 'rgb(12, 59, 4)', fontSize: 20 }}
                                    onClick={() => clickReadOnly(data)}
                                    icon={<IoMdEye />}
                                />
                            </Space>
                        ),
                    },
                ]}
            />
        </div>
    );
}

export default Stock_CoffeePage;