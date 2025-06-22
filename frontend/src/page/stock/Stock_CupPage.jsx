import { useState, useEffect, useCallback } from 'react';
import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    InputNumber,
    message,
    Select,
    Space,
    Tag
} from 'antd';
import { EditOutlined, DeleteOutlined, FileAddFilled } from '@ant-design/icons';
import { request } from '../../util/helper';
import { MdDelete, MdEdit } from 'react-icons/md';

function Stock_CupPage() {
    const [state, setState] = useState({
        loading: false,
        data: [],
    });
    const [suppliers, setSuppliers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingId, setEditingId] = useState(null);

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
    }, []);

    // Fetch stock list
    const getList = useCallback(async () => {
        try {
            setState((p) => ({
                ...p,
                loading: true
            }));
            const res = await request('stock_cup', 'get');
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
            const payload = {
                name: values.name,
                qty: values.qty,
                supplier_id: values.supplier_id,
                description: values.description,
                status: values.status || 1
            };
            
            if (method === "put") {
                payload.id = editingId;
            }

            const res = await request('stock_cup', method, payload);
            
            if (res && !res.error) {
                message.success(`Stock ${editingId ? 'updated' : 'created'} successfully`);
                setIsModalVisible(false);
                form.resetFields();
                setEditingId(null);
                getList();
            } else {
                throw new Error(res.error || 'Failed to save stock');
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
    
    // Handle delete
    // const handleDelete = async (data) => {
    //     try {
    //         Modal.confirm({
    //             title: 'Delete Stock',
    //             content: `Are you sure you want to delete this stock ${data.name}?`,
    //             okText: 'Yes',
    //             okType: 'danger',
    //             cancelText: 'No',
    //             onOk: async () => {
    //                 const res = await request('stock_cup', 'delete', { data });
    //                 if (res && !res.error) {
    //                     message.success('Stock deleted successfully');
    //                     getList();
    //                 }
    //             }
    //         })
    //     } catch (error) {
    //         message.error(`Delete failed: ${error.message}`);
    //     }
    // };

    const handleDelete = async (id) => {
        try {
            Modal.confirm({
                title: 'Delete Stock',
                content: `Are you sure you want to delete this stock ${id} ?`,
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk: async () => {
                    const res = await request('stock_cup', 'delete', {id});
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
    const handleEdit = (record) => {
        form.setFieldsValue({
            name: record.name,
            qty: record.qty,
            supplier_id: record.supplier_id,
            description: record.description,
            status: record.status
        });
        setEditingId(record.id);
        setIsModalVisible(true);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
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
            render:(state) => (state == 1 ? (
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
                        onClick={() => handleDelete(record.id)}
                        icon={<MdDelete/>}
                        style={{ color: "red", fontSize: 20 }}
                    />

                    {/* <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        size="small"
                    > Edit
                    </Button> */}
                    {/* <Button
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
                        size="small"
                    >
                        Delete
                    </Button> */}
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: 24 }}>
            <div style={{ marginBottom: 16 }}>
                <Button
                    type="primary"
                    style={{padding:"10px",marginBottom:"10px",marginLeft: "auto"}}
                    // style={{padding:"10px",marginBottom:"10px",marginLeft: "auto"}} 
                    onClick={() => {
                        form.resetFields();
                        setEditingId(null);
                        setIsModalVisible(true);
                    }}
                >
                    <FileAddFilled style={{padding:"10px",marginBottom:"10px",marginLeft: "auto"}}/>New
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
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please input name!' }]}
                    >
                        <Input placeholder="Enter stock name" />
                    </Form.Item>
                    
                    <Form.Item
                        name="qty"
                        label="Quantity"
                        rules={[{ required: true, message: 'Please input quantity!' }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} placeholder="Enter quantity" />
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

                    <Form.Item>
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

export default Stock_CupPage;