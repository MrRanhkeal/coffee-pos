import { useEffect, useState, useCallback } from "react";
import { request } from "../../util/helper";
import MainPage from "../../component/layout/MainPage";
import { Button, Form, Input, message, Modal, Space, Table, Select } from "antd";
import dayjs from "dayjs";
import { configStore } from "../../store/configStore";
import { MdDelete, MdEdit } from "react-icons/md";
import { DeleteOutlined, EditOutlined, EyeOutlined, FileAddFilled } from "@ant-design/icons";
import { IoMdEye } from "react-icons/io";
function SupplierPage() {
    const [form] = Form.useForm();
    const { config } = configStore();
    const [state, setState] = useState({
        list: [],
        loading: false,
        visible: false,
        txtSearch: "",
        isReadOnly: false,
    });
    const [filter, setFilter] = useState({
        txtSearch: "",
        product_type: "",
        code: "",
    });
    const getList = useCallback(async () => {
        // ?txtSearch=VN-101 query paramter
        setState((p) => ({
            ...p,
            loading: true,
        }));
        var param = {
            txtSearch: state.txtSearch,
            product_type: filter.product_type,
        };
        const res = await request("supplier", "get", param);
        if (res && !res.error) {
            setState((p) => ({
                ...p,
                list: res.list,
                loading: false,
            }));
        }
    }, [state.txtSearch, setState, filter.product_type]);

    useEffect(() => {
        getList();
    }, [getList]);

    const openModal = () => {
        setState((p) => ({
            ...p,
            visible: true,
        }));
    };

    const closeModal = () => {
        setState((p) => ({
            ...p,
            visible: false,
            isReadOnly: false
        }));
        form.resetFields();
    };

    const onFinish = async (items) => {
        var method = "post";
        if (form.getFieldValue("id")) {
            method = "put";
        }
        setState((p) => ({
            ...p,
            loading: true,
        }));
        const res = await request("supplier", method, {
            ...items,
            id: form.getFieldValue("id"),
        });
        if (res && !res.error) {
            getList();
            closeModal();
            // message.success(res.message);
            message.success(`Supplier ${method === "put" ? "updated" : "created"} successfully`);
        }
    };
    const onClickBtnEdit = (items) => {
        form.setFieldsValue({
            ...items,
            id: items.id,
        });
        openModal();
    };
    const clickReadOnly = (items) => {
        form.setFieldsValue({
            ...items,
            id: items.id,
        });
        setState(p => ({
            ...p,
            visible: true,
            isReadOnly: true
        }));
    };

    
    const onClickBtnDelete = (items) => {
        Modal.confirm({
            title: "Delete Supplier",
            content: `Are you sure! you want to delete supplier ${items.name}?`,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk: async () => {
                try{
                    const res = await request("supplier", "delete", { id: items.id });
                    if (res) {
                        message.success("Supplier deleted successfully");
                        getList();
                    }
                }catch{
                    message.error("Failed to delete supplier");
                }
            },
        });
    };

    return (
        <MainPage loading={state.loading}>
            <div className="pageHeader">
                <Space>
                    <div>Supplier</div>
                    <Input.Search
                        onChange={(value) =>
                            setState((p) => ({ ...p, txtSearch: value.target.value }))
                        }
                        allowClear
                        onSearch={getList}
                        placeholder="Search"
                    />
                </Space>
                <Button type="primary" onClick={openModal} style={{padding:"10px",marginBottom:"10px",marginLeft: "auto"}}>
                <FileAddFilled/>New
                </Button>
            </div>
            <Modal
                open={state.visible}
                title={state.isReadOnly ? "View Supplier" : (form.getFieldValue("id") ? "Edit Supplier" : "New Supplier")}
                onCancel={closeModal}
                footer={null}
            >
                <Form layout="vertical" form={form} onFinish={onFinish}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: "Name required!",
                            },
                        ]}
                    >
                        <Input placeholder="Enter supplier name" disabled={state.isReadOnly} />
                    </Form.Item>
                    <Form.Item
                        name="product_type"
                        label="Product Type"
                        rules={[
                            {
                                required: true,
                                message: "Product type required!",
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select product type"
                            showSearch
                            allowClear
                            options={Object.entries(config.product_type || {}).flatMap(([category, items]) =>
                                items.map(item => ({
                                    label: `${category} - ${item.label}`,
                                    value: item.value
                                }))
                            )}
                            onChange={(value) => {
                                setFilter(prev => ({
                                    ...prev,
                                    product_type: value
                                }));
                                getList();
                            }}
                            disabled={state.isReadOnly}
                        />
                        
                    </Form.Item>
                    <Form.Item
                        name="code"
                        label="Code"
                        rules={[
                            {
                                required: true,
                                message: "Code required!",
                            },
                        ]}
                    >
                        <Input placeholder="Enter supplier code" disabled={state.isReadOnly} />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[
                            {
                                required: true,
                                message: "Phone number required!",
                            },
                        ]}
                    >
                        <Input placeholder="Enter phone number" disabled={state.isReadOnly} />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: "Email required!",
                                type: "email"
                            },
                        ]}
                    >
                        <Input placeholder="Enter email" disabled={state.isReadOnly} />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Address"
                        rules={[
                            {
                                required: true,
                                message: "Address required!",
                            },
                        ]}
                    >
                        <Input.TextArea placeholder="Enter full address" rows={3} disabled={state.isReadOnly} />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                    >
                        <Input.TextArea placeholder="Description" disabled={state.isReadOnly} />
                    </Form.Item>
                    <Form.Item style={{ textAlign: "right" }}>
                        <Space>
                            <Button onClick={closeModal}>Close</Button>
                            {!state.isReadOnly && (
                                <Button type="primary" htmlType="submit">
                                    {form.getFieldValue("id") ? "Update" : "Save"}
                                </Button>
                            )}
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
            <Table
                dataSource={state.list}
                columns={[
                    {
                        key: "name",
                        title: "Name",
                        dataIndex: "name",
                    },
                    {
                        key: "product_type",
                        title: "Product Type",
                        dataIndex: "product_type",
                    },
                    {
                        key: "code",
                        title: "Code",
                        dataIndex: "code",
                    },
                    {
                        key: "phone",
                        title: "Phone",
                        dataIndex: "phone",
                    },
                    {
                        key: "email",
                        title: "Email",
                        dataIndex: "email",
                    },
                    {
                        key: "address",
                        title: "Address",
                        dataIndex: "address",
                    },
                    {
                        key: "description",
                        title: "Description",
                        dataIndex: "description",
                    },
                    {
                        key: "create_at",
                        title: "create_at",
                        dataIndex: "create_at",
                        render: (value) => dayjs(value).format("DD/MM/YYYY"),
                    },
                    
                    {
                        key: "action",
                        title: "action",
                        render: (value, data) => (
                            <Space>
                                <EditOutlined type="primary" 
                                icon={<MdEdit/>}
                                style={{ color: "green", fontSize: 20 }}
                                onClick={() => onClickBtnEdit(data)}>
                                </EditOutlined>
                                <DeleteOutlined
                                    type="primary"
                                    icon={<MdDelete />}
                                    danger
                                    style={{ color: "red", fontSize: 20 }}
                                    onClick={() => onClickBtnDelete(data)}
                                >
                                </DeleteOutlined>
                                <EyeOutlined
                                style={{ color: 'rgb(12, 59, 4)', fontSize: 20 }}
                                onClick={() => clickReadOnly(data)}
                                icon={<IoMdEye/>}
                                />
                            </Space>
                        ),
                    },
                ]}
            />
        </MainPage>
    );
}

export default SupplierPage;
