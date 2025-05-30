import { useState, useEffect, useCallback } from 'react';
import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    InputNumber,
    message,
    Upload,
    Select,
    Space
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { request } from '../../util/helper';
import {configStore} from '../../store/configStore';
import { MdEdit } from 'react-icons/md';

function StockPage() {
    const [state, setState] = useState({
        loading: false,
        data: [],
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [list, setList] = useState(null);
    const { config } = configStore();
    const [filter, setFilter] = useState({
        list: [],
        category: '',
        name: '',
        stock_qty: '',
        brand: '',
        barcode: '',
        image: ''
    });

    // Fetch stock list
    const getList = useCallback(async () => {
        try {
            setState((p) => ({
                ...p,
                loading: true
            }));
            const res = await request('stock', 'get', { filter });
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
        }
    }, [filter]);

    useEffect(() => {
        getList();
    }, [getList]);

    // Handle form submission for both create and update
    const onFinish = async (values) => {
        try {
            setState((p) => ({
                ...p,
                loading: true
            }));
            
            const method = list ? "put" : "post";
            const payload = {
                ...values
            };
            
            if (method === "put") {
                payload.id = list;
            }

            const res = await request('stock', method, payload);
            
            if (res && !res.error) {
                message.success(`Stock ${list ? 'updated' : 'created'} successfully`);
                setIsModalVisible(false);
                form.resetFields();
                setList(null);
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
    const handleDelete = async (id) => {
        try {
            Modal.confirm({
                title: 'Delete Stock',
                content: 'Are you sure you want to delete this stock?',
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk: async () => {
                    const res = await request('stock', 'delete', { id });
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
            ...record
        });
        setState((p)=>({
            ...p,
            visibleModal: true
        }))
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        
        {
            title: 'Stock Qty',
            dataIndex: 'stock_qty',
            key: 'stock_qty',
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: 'Barcode',
            dataIndex: 'barcode',
            key: 'barcode',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (value, data) => (
                <Space>
                    <EditOutlined
                        type="primary"
                        icon={<MdEdit />}
                        onClick={() => handleEdit(data)}
                        style={{ color: "green" , fontSize: 20}}
                    />

                    <DeleteOutlined
                        type="primary"
                        danger
                        title='Are you sure you want to delete this item?'
                        style={{ color: "red", fontSize: 20 }}
                        onClick={() => handleDelete(data)}
                        
                        
                    />
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: 24 }}>
            <div style={{ marginBottom: 16 }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        form.resetFields();
                        setList(null);
                        setIsModalVisible(true);
                    }}
                >
                    Add New Stock
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={state.data}
                rowKey="id"
                loading={state.loading}
            />

            <Modal
                title={list ? 'Edit Stock' : 'Add New Stock'}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
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
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        label="Category"
                        rules={[{ required: true,
                        message: 'Please input category!' },
                        ]}
                    >
                        <Select
                            placeholder="Select a category"
                            options={config.category}
                            onChange={(value)=>{
                                setFilter((pre)=>({
                                    ...pre,
                                    category: value
                                }))
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="stock_qty"
                        label="Stock Quantity"
                        rules={[{ required: true, message: 'Please input stock quantity!' }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="brand"
                        label="Brand"
                        rules={[{ required: true, message: 'Please input brand!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="barcode"
                        label="Barcode"
                        rules={[{ required: true, message: 'Please input barcode!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="image"
                        label="Image"
                    >
                        <Upload
                            maxCount={1}
                            beforeUpload={() => false}
                            listType="picture"
                        >
                            <Button icon={<UploadOutlined />}>Upload Image</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
                            {list ? 'Update' : 'Create'}
                        </Button>
                        <Button onClick={() => setIsModalVisible(false)}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default StockPage;