import { useCallback, useEffect, useState } from "react";
import { Button, Form, Input, message, Modal, Select, Space, Table, Tag } from "antd";
import { MdDelete, MdEdit } from "react-icons/md";
import MainPage from "../../component/layout/MainPage";
import { request } from "../../util/helper";
import { DeleteOutlined, EditOutlined, EyeOutlined, FileAddFilled } from "@ant-design/icons";
// import PropTypes from "prop-types";
import { IoMdEye } from "react-icons/io";
import dayjs from "dayjs";
function SupplierPage() {
    const [form] = Form.useForm();
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        visibleModal: false,
        id: null,
        name: "",
        phone: "",
        email: "",
        address: "",
        descriptoin: "",
        status: "",
        txtSearch: "",
    });

    const getList = useCallback(async () => {
        setLoading(true);
        var param = {
            txtSearch: state.txtSearch,
        };
        const res = await request("supplier", "get", param);
        setLoading(false);
        if (res) {
            setList(res.list);
        }
    }, [state, setLoading, setList]);

    useEffect(() => {
        getList();
    }, [getList]);
    const onClickEdit = (data) => {
        setState({
            ...state,
            visibleModal: true,
            id: data.id,
        });
        form.setFieldsValue({
            id: data.id, // hiden id (save? | update?)
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
            description: data.description,
            status: data.status,
        });
        //
        // formRef.getFieldValue("id")
    };
    const clickReadOnly = (data) => {
        setState({
            ...state,
            visibleModal: true,
            isReadOnly: true,
            id: data.id
        });
        form.setFieldsValue({
            id: data.id,
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
            description: data.description,
            status: data.status,
        });
    }
    const onClickDelete = async (data) => {
        Modal.confirm({
            title: "Delete Supplier",
            content: `Are you sure! you want to remove supplier ${data.name}?`,
            okText: "Yes",
            onOk: async () => {
                const res = await request("supplier", "delete", {
                    id: data.id,
                });
                if (res && !res.error) {
                    // getList(); // request to api response
                    // remove in local
                    message.success(res.message);
                    const newList = list.filter((item) => item.id != data.id);
                    setList(newList);
                }
            },
        });
    };
    const onClickAddBtn = () => {
        setState({
            ...state,
            visibleModal: true,
        });
    };
    const onCloseModal = () => {
        form.resetFields();
        setState({
            ...state,
            visibleModal: false,
            id: null,
            isReadOnly: false
        });
    };

    const onFinish = async (items) => {
        var data = {
            id: form.getFieldValue("id"),
            name: items.name,
            phone: items.phone,
            email: items.email,
            address: items.address,
            description: items.description,
            status: items.status,
        };
        var method = "post";
        if (form.getFieldValue("id")) {
            // case update
            method = "put";
        }
        const res = await request("supplier", method, data);
        if (res && !res.error) {
            // message.success(res.message);
            message.success(`Supplier ${method === "put" ? "updated" : "created"} successfully`);
            getList();
            onCloseModal();
        }
    };
    return (
        <MainPage loading={loading}>
            <div className="pageHeader">
                <Space>
                    {/* <div>Supplier List </div> */}
                    <Input.Search
                        onChange={(value) =>
                            setState((p) => ({ ...p, txtSearch: value.target.value }))
                        }
                        allowClear
                        onSearch={getList}
                        placeholder="Search"
                    />
                    <Button type="primary" onClick={getList}>
                        Search
                    </Button>
                </Space>
                <Button type="primary" style={{ padding: "10px", marginBottom: "10px", marginLeft: "auto" }} onClick={onClickAddBtn} >
                    <FileAddFilled /> New
                </Button>
            </div>
            <Modal
                open={state.visibleModal}
                title={state.isReadOnly ? "View Supplier" : (state.id ? "Edit Supplier" : "New Supplier")}
                footer={null}
                onCancel={onCloseModal}  
                height={300} 
            >
                <Form
                    layout="vertical"
                    onFinish={onFinish} form={form}
                    initialValues={{
                        status: 1
                    }} 
                >
                    <Form.Item
                        name="name"
                        label="Supplier name"
                        rules={[{ required: true, message: 'Please input supplier name!' }]}
                    >
                        <Input placeholder="Input Supplier name" disabled={state.isReadOnly} />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Supplier phone"
                        rules={[{ required: true, message: 'Please input supplier phone!' }]}
                    >
                        <Input placeholder="Input Supplier phone" disabled={state.isReadOnly} />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Supplier email"
                        rules={[{ required: true, message: 'Please input supplier email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
                    >
                        <Input placeholder="Input Supplier email" disabled={state.isReadOnly} />
                    </Form.Item>
                    <Form.Item name={"address"} label="Supplier address">
                        <Input placeholder="Input Supplier address" name="address" disabled={state.isReadOnly} />
                    </Form.Item>
                    <Form.Item name={"description"} label="description">
                        <Input.TextArea placeholder="description" disabled={state.isReadOnly} />
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{ required: true, message: 'Please select a status!' }]}
                    >
                        <Select
                            placeholder="Select status"
                            disabled={state.isReadOnly}
                            options={[
                                {
                                    label: "Active",
                                    value: 1,
                                },
                                {
                                    label: "InActive",
                                    value: 0,
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item style={{ textAlign: "right" }}>
                        <Space>
                            <Button type="default" onClick={onCloseModal} >Close</Button>
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
                dataSource={list}
                columns={[
                    {
                        key: "No",
                        title: "No",
                        render: (item, data, index) => index + 1,
                    },
                    {
                        key: "name",
                        title: "Name",
                        dataIndex: "name",
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
                        key: "created_at",
                        title: "Created At",
                        dataIndex: "created_at",
                        render: (created_at) => dayjs(created_at).format("YYYY-MM-DD")
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
        </MainPage>
    );
}

export default SupplierPage;
