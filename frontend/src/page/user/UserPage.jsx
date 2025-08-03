import { useEffect, useState } from "react";
import { request } from "../../util/helper";
import { Button, Form, Input, message, Modal, Select, Space, Table, Tag, } from "antd";
// import { resetWarned } from "antd/es/_util/warning";
// import { configStore } from "../../store/configStore";
import { MdDelete, MdEdit } from "react-icons/md";
import { DeleteOutlined, EditOutlined, EyeOutlined, FileAddFilled } from "@ant-design/icons";
import { IoMdEye } from "react-icons/io";


function UserPage() {
    const [form] = Form.useForm();
    // const { config } = configStore();
    const [list, setList] = useState([]);
    const [roles, setRoles] = useState([]);
    const [state, setState] = useState({
        list: [],
        role_id: null,
        loading: true,
        isEdit: false,
        editingUser: null,
        isReadOnly: false
    });
    useEffect(() => {
        getList();
        gethRoles();
    }, []);
    const getList = async () => {
        setState((prev) => ({ ...prev, loading: true }));
        try {
            const res = await request("auth/get-list", "get");
            if (res && !res.error) {
                setList(res.data || []); // Changed from res.list to res.data to match backend response
                setState(prev => ({
                    ...prev,
                    role: res.roles || [] // Store roles from the response
                }));
            }
        } catch (error) {
            // console.error("Failed to get list:", error);
            message.error("Failed to get user list", error);
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    };

    const gethRoles = async () => {
        try {
            const res = await request("role", "get");
            if (res?.data) {
                setRoles(res.data);
            }
        } catch (error) {
            // console.error("Failed to get roles:", error);
            message.error("Failed to get roles", error);
        }
    };
    const clickBtnEdit = (record) => {
        form.setFieldsValue({
            id: record.id,
            name: record.name,
            username: record.username, 
            // role_id: record.role_id,
            role_id: record.role_id,
            is_active: record.is_active
        });
        setState(prev => ({
            ...prev,
            visible: true,
            isEdit: true,
            editingUser: record
        }));
    };
    const clickReadOnly = (record) => {
        form.setFieldsValue({
            id: record.id,
            name: record.name,
            username: record.username,
            // role_id: record.role_id,
            role_id: record.role_id ? record.role_id : null,
            is_active: record.is_active
        });
        setState(prev => ({
            ...prev,
            visible: true,
            isEdit: false,
            isReadOnly: true,
            editingUser: record
        }));
    };
    const clickBtnDelete = async (record) => {
        try {
            Modal.confirm({
                title: "Delete User",
                content: `Are you sure! you want to delete user ${record.name}?`,
                okText: "Ok",
                onOk: async () => {
                    const res = await request(`auth/delete/${record.id}`, "delete");
                    if (res && !res.error) {
                        message.success("User deleted successfully");
                        getList();
                    } else {
                        message.error(res.message || "Failed to delete user");
                    }
                }
            })
        }
        catch (error) {
            // console.error("Delete error:", error);
            message.error("Failed to delete user",error);
        }
    };

    const handleCloseModal = () => {
        form.resetFields();
        setState((pre) => ({
            ...pre,
            visible: false,
            isEdit: false,
            editingUser: null,
            isReadOnly: false
        }));
        form.resetFields();
    };

    const handleOpenModal = () => {
        setState((pre) => ({
            ...pre,
            visible: true,
        }));
    };

    const onFinish = async (item) => {
        if (!state.isEdit && item.password !== item.confirm_password) {
            message.warning("Password and Confirm Password do not match!");
            return;
        }

        // Get the current user's name from the profile
        const currentUser = JSON.parse(localStorage.getItem('profile')) || {};
        const create_by = currentUser.name || 'system';

        const data = {
            ...item,
            role_id: state.role_id || item.role_id,
            create_by: state.isEdit ? undefined : create_by, // Only set create_by for new users
        };

        try {
            let res;
            if (state.isEdit) {
                // Update existing user
                res = await request("auth/update", "put", {
                    ...data,
                    id: state.editingUser.id
                });
            } else {
                // Create new user
                res = await request("auth/register", "post", data);
            }

            if (res && !res.error) {
                message.success(res.message || (state.isEdit ? "Update successful" : "Registration successful"));
                getList();
                handleCloseModal();
            } else {
                message.warning(res.message || (state.isEdit ? "Update failed" : "Registration failed"));
            }
        } catch (err) {
            console.error(state.isEdit ? "Update error:" : "Registration error:", err);
            message.error(`Something went wrong during ${state.isEdit ? "update" : "registration"}!`);
        }
    };


    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingBottom: 10,
                }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div>User</div>
                    <Input.Search style={{ marginLeft: 10 }} placeholder="Search" />
                </div>
                <Button type="primary" style={{ padding: "10px", marginBottom: "10px", marginLeft: "auto" }} onClick={handleOpenModal} >
                    <FileAddFilled />New
                </Button>
            </div>
            <Modal
                open={state.visible}
                title={state.isReadOnly ? "View User" : (state.isEdit ? "Edit User" : "New User")}
                onCancel={handleCloseModal}
                footer={null}
            >
                <Form layout="vertical" form={form} onFinish={onFinish}>
                    <Form.Item
                        name={"name"}
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: "Please fill in name",
                            },
                        ]}
                    >
                        <Input placeholder="Input name" disabled={state.isReadOnly} />
                    </Form.Item>
                    <Form.Item
                        name={"username"}
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: "Please fill in email",
                            },
                        ]}
                    >
                        <Input placeholder="Input email" disabled={state.isReadOnly} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: 'Please input the password!' }]}
                    >
                        <Input.Password placeholder="Input password" disabled={state.isReadOnly} visibilityToggle />
                    </Form.Item>

                    {/* <Form.Item
                        name={"password"}
                        label="password"
                        rules={[
                            {
                                required: true,
                                message: "Please fill in password",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Input password" disabled={state.isReadOnly} />
                    </Form.Item> */}
                    <Form.Item
                        name={"confirm_password"}
                        label="Confirm Password"
                        rules={[
                            {
                                required: true,
                                message: "Please fill in confirm password",
                            },
                        ]}
                    >
                        <Input.Password placeholder="confirm password" disabled={state.isReadOnly} />
                    </Form.Item>

                    <Form.Item
                        name="role_id"
                        label="Role"
                        rules={[
                            {
                                required: true,
                                message: "Please select role",
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select role"
                            disabled={state.isReadOnly}
                            options={roles.map(role => ({
                                label: role.name,
                                value: role.id,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        name={"is_active"}
                        label="Status"
                        rules={[
                            {
                                required: true,
                                message: "Please select status",
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select Status"
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
                            <Button onClick={handleCloseModal}>{state.isReadOnly ? 'Close' : 'Cancel'}</Button>
                            {!state.isReadOnly && (
                                <Button type="primary" htmlType="submit">
                                    {state.isEdit ? 'Update' : 'Save'}
                                </Button>
                            )}
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
            <Table
                // dataSource={state.list}
                dataSource={list}
                loading={state.loading}
                columns={[
                    {
                        key: "no",
                        title: "No",
                        render: (value, data, index) => index + 1,
                    },
                    {
                        key: "name",
                        title: "Name",
                        dataIndex: "name",
                    },
                    {
                        key: "username",
                        title: "Username",
                        dataIndex: "username",
                    },
                    {
                        key: "role_name",
                        title: "Role Name",
                        dataIndex: "role_name",
                    },
                    {
                        key: "is_active",
                        title: "Status",
                        dataIndex: "is_active",
                        render: (value) =>
                            value ? (
                                <Tag color="green">Active</Tag>
                            ) : (
                                <Tag color="red">In Active</Tag>
                            ),
                    },
                    {
                        key: "create_by",
                        title: "Create By",
                        dataIndex: "create_by",
                    },
                    {
                        key: "action",
                        title: "Action",
                        align: "center",
                        render: (value, data) => (
                            <Space>
                                <EditOutlined
                                    icon={<MdEdit />}
                                    style={{ color: "green", fontSize: 20 }}
                                    onClick={() => clickBtnEdit(data)}
                                    type="primary">
                                </EditOutlined>
                                <DeleteOutlined
                                    onClick={() => clickBtnDelete(data)}
                                    danger
                                    style={{ color: "red", fontSize: 20 }}
                                    type="primary"
                                    icon={<MdDelete />}
                                >
                                </DeleteOutlined>
                                <EyeOutlined
                                    icon={<IoMdEye />}
                                    style={{ color: 'rgb(12, 59, 4)', fontSize: 20 }}
                                    onClick={() => clickReadOnly(data)}
                                >
                                </EyeOutlined>
                            </Space>
                        ),
                    },
                ]}
            />
        </div>
    );
}

export default UserPage;
