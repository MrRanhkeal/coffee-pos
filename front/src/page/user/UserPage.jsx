//import React from 'react'
//import MainPage from '../../components/layout/MainPage'
import { Modal, Form, Table, Tag, Button, Input, Select, Space, message } from 'antd';
import { MdAdd } from "react-icons/md";
import { request } from "../../util/helper";
import { useEffect, useState } from "react";
function UserPage() {
    const [formRef] = Form.useForm();
    //const [List, setList] = useState([]);
    //const [loading, setLoading] = useState(false); //loading mainpage when data connected stay on MianPage
    const [state, setState] = useState({
        role: [],
        list: [],
        loading: false,
        visible: false,
        // name: "",
        // username: "",
        // phone: "",
        // sex: "",
        // status: "",
    })
    //effect use handle the side effects such as fetching data and updating the DOM
    useEffect(() => {
        getList();
    }, []);
    //get list user
    const getList = async () => {
        const res = await request("auth", "get");

        if (res && !res.error) {
            setState((pre) => ({
                ...pre,
                list: res.list,
                role: res.role
            }));
            //setList(res.list);
        }
    };
    const onClickDelete = () => [];
    const onClickEdit = () => [];

    const onCloseModal = () => {
        setState((pre) => ({
            ...pre,
            visible: false
        }));
        formRef.resetFields();
    }

    const onOpenModal = () => {
        setState((pre) => ({
            ...pre,
            visible: true,
        }));
    }
    //finish
    const onFinish = async (items) => {
        try {
            if(items.password !== items.confirm_password){
                message.warning("Password not match");
                return;
            }
            var data = {
                ...items,
            }
            const res = await request("auth", "post", data);
            if (res && !res.error) {
                message.success(res.message);
                getList();
                onCloseModal();
            }
            else{
                message.warning(res.message);
            }
        }
        catch (error) {
            console.log("something when wrong", error)
        }
    };
    return (
        // <div>UserPage</div>
        <div >
            <Button type="primary" className="btn-add" icon={<MdAdd />} onClick={onOpenModal}>New</Button>
            <Modal
                open={state.visible}
                //title={formRef.getFieldValue("id") ? "Edit User" : "New User"}
                footer={null}
                onCancel={onCloseModal}
            >
                <Form layout="vertical" onFinish={onFinish} form={formRef}>
                    <Form.Item name={"name"} label="Name">
                        <Input placeholder="name" />
                    </Form.Item>
                    <Form.Item name={"username"} label="Username">
                    <Input type='email' placeholder="@gmail.com" />
                    </Form.Item>
                    <Form.Item name={"password"} label="Password" >
                        <Input type='password' hidden placeholder="Password" />
                    </Form.Item>
                    <Form.Item name={"confirm_password"} label="Confirm Password" >
                        <Input type='password' hidden placeholder="Confirm Password" />
                    </Form.Item>
                    <Form.Item name={"sex"} label="Sex" >
                        <Select placeholder="select sex"
                            options={[
                                {
                                    label: "Male",
                                    value: "male"
                                },
                                {
                                    label: "Female",
                                    value: "female"
                                }
                            ]}
                        />
                    </Form.Item>
                    <Form.Item name={"phone"} label="phone" >
                        <Input placeholder="phone" />
                    </Form.Item>
                    <Form.Item name={"role_id"} label="Role" >
                        <Select placeholder="select role" options={state.role} />
                    </Form.Item>
                    <Form.Item name={"status"} label="status">
                        <Select placeholder="select status"
                            options={[
                                {
                                    label: "Active",
                                    value: 1
                                },
                                {
                                    label: "InActive",
                                    value: 0
                                }
                            ]}
                        />
                    </Form.Item>
                    <Form.Item style={{ textAlign: "right" }}>
                        <Space>
                            <Button onClick={onCloseModal}>Cancel</Button>
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                        </Space>
                    </Form.Item>
                    
                </Form>
            </Modal>
            <Table className="table"
                dataSource={state.list}
                columns={[
                    {
                        key: "No",
                        title: "No",
                        render: (text, record, index) => index + 1,
                    },
                    {
                        key: "id",
                        title: "Id",
                        dataIndex: "id"
                    },
                    {
                        key: "name",
                        title: "Name",
                        dataIndex: "name"
                    },
                    {
                        key: "username",
                        title: "Username",
                        dataIndex: "username"
                    },
                    {
                        key: "phone",
                        title: "Phone",
                        dataIndex: "phone"
                    },
                    {
                        key: "sex",
                        title: "Sex",
                        dataIndex: "sex"
                    },
                    {
                        key: "role",
                        title: "Role",
                        dataIndex: "role"
                    },
                    {
                        key: "status",
                        title: "Status",
                        dataIndex: "status",
                        render: (Status) =>
                            Status == 1 ? (
                                <Tag color="green">Active</Tag>
                            ) : (
                                <Tag color="red">InActive</Tag>
                            )

                    },
                    {
                        key: "action",
                        title: "Action",
                        align: "center",
                        render: (item, data, index) => (
                            <Space>
                                <Button onClick={() => onClickEdit(data,index)} type='primary'>
                                    Edit
                                </Button>
                                <Button onClick={() => onClickDelete(data)} type='primary' danger>
                                    Delete
                                </Button>
                            </Space>
                        )
                    }
                ]}
            />
        </div>
    )
}

export default UserPage