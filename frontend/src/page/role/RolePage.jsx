import React, { useEffect, useState } from "react";
import { request } from "../../util/helper";
import { Button, Form, Input, message, Modal, Space, Table, Tag, Select } from "antd";
import { DeleteOutlined, EditOutlined, FileAddFilled } from "@ant-design/icons";
import { } from "react-icons/md";

function RolePage() {
    // Define available routes for permission selection
    // const availableRoutes = [
    //     { value: 'order', label: 'Order' },
    //     { value: 'product', label: 'Product' },
    //     { value: 'report', label: 'Report' },
    //     // Add more routes as needed
    // ];
    const [state, setState] = useState({
        list: [],
        loading: true,
        visible: false
    });
    const [form] = Form.useForm();

    useEffect(() => {
        getList();
    }, []);

    // Get list of roles
    const getList = async () => {
        setState(pre => ({ ...pre, loading: true }));
        try {
            const res = await request("role", "get");
            if (res?.data) {
                setState(pre => ({
                    ...pre,
                    list: res.data
                }));
            }
        } catch {
            message.error("Failed to get roles");
        } finally {
            setState(pre => ({ ...pre, loading: false }));
        }
    };

    // Handle edit button click
    const handleEdit = (record) => {
        // let permission = record.permission;
        // try {
        //     if (typeof permission === 'string') {
        //         permission = JSON.parse(permission);
        //     }
        //     if (!Array.isArray(permission)) {
        //         permission = [];
        //     }
        // } catch {
        //     permission = [];
        // }

        form.setFieldsValue({
            id: record.id,
            name: record.name,
           // permission: permission
        });
        setState(pre => ({ ...pre, visible: true }));
    };

    // Handle delete button click
    const handleDelete = (record) => {
        Modal.confirm({
            title: "Delete Role",
            content: `Are you sure! you want to delete ${record.name}?`,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk: async () => {
                try {
                    const res = await request("role", "delete", { id: record.id });
                    if (res) {
                        message.success("Role deleted successfully");
                        getList();
                    }
                } catch {
                    message.error("Failed to delete role");
                }
            }
        });
    };

    // Handle form submission (create/update)
    const onFinish = async (values) => {
        const method = form.getFieldValue("id") ? "put" : "post";
        try {
            // Use permission array directly
            const permission = Array.isArray(values.permission) ? values.permission : [];

            const data = {
                name: values.name,
                permission: JSON.stringify(permission)
            };

            // Add id for update operation
            if (method === "put") {
                data.id = form.getFieldValue("id");
            }

            const res = await request("role", method, data);
            if (res) {
                message.success(`Role ${method === "put" ? "updated" : "created"} successfully`);
                handleCancel();
                getList();
            }
        } catch {
            message.error(`Failed to ${method === "put" ? "update" : "create"} role`);
        }
    };

    // Handle modal cancel
    const handleCancel = () => {
        form.resetFields();
        setState(pre => ({ ...pre, visible: false }));
    };

    // Table columns configuration
    const columns = [
        {
            title: "No",
            key: "index",
            width: 70,
            render: (_, __, index) => index + 1
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            style: {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
            }
        },
        // {
        //     title: "Permission",
        //     dataIndex: "permission",
        //     key: "permission",
        //     render: (permission) => {
        //         if (!permission) return '-';
        //         try {
        //             const permArray = typeof permission === 'string'
        //                 ? JSON.parse(permission)
        //                 : permission;

        //             if (Array.isArray(permArray) && permArray.length > 0) {
        //                 return permArray.map((perm, idx) => (
        //                     <Tag color="blue" key={`${perm}-${idx}`}>{perm}</Tag>
        //                 ));
        //             }
        //         } catch {
        //             console.error('Invalid permission format:', permission);
        //         }
        //         return '-';
        //     }
        // },
        {
            title: "Action",
            key: "action",
            width: 150,
            render: (_, record) => (
                <Space>
                    <EditOutlined type="primary" style={{ color: "green", fontSize: 20 }} onClick={() => handleEdit(record)}>
                        Edit
                    </EditOutlined>
                    <DeleteOutlined danger style={{ color: "red", fontSize: 20 }} onClick={() => handleDelete(record)}>
                        Delete
                    </DeleteOutlined>
                </Space>
            )
        }
    ];

    return (
        <div className="page-content" >
            <div className="page-header" style={{ display: "flex" }}>
                <h3>Role Management</h3>
                <Button type="primary" onClick={() => setState(pre => ({ ...pre, visible: true }))} style={{ padding: "10px", marginBottom: "10px", marginLeft: "auto" }}
                // icon={<FileAddTwoTone />}
                // style={{
                //     marginLeft: "auto",
                //     fontSize: 40,
                //     color: "green",
                // }}
                >
                    <FileAddFilled />
                    New
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={state.list}
                rowKey="id"
                loading={state.loading}
                pagination={{ pageSize: 10 }}
            />

            <Modal
                title={form.getFieldValue("id") ? "Edit Role" : "Create Role"}
                open={state.visible}
                onCancel={handleCancel}
                footer={null}
                destroyOnClose
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish} 
                >
                    <Form.Item name="id" hidden>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="name"
                        label="Role Name"
                        rules={[{ required: true, message: "Please input role name" }]}
                    >
                        <Input />
                    </Form.Item>

                    {/* <Form.Item
                        name="permission"
                        label="Permission"
                        rules={[{ required: true, message: "Please select at least one permission" }]}
                        help="Select allowed routes for this role"
                    >
                        <Select
                            mode="multiple"
                            options={availableRoutes}
                            placeholder="Select permissions"
                        />
                    </Form.Item> */}

                    <Form.Item style={{ textAlign: "right" }}>
                        <Button type="primary" htmlType="submit" >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default RolePage;