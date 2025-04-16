import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Modal, Select, Space, Table, Tag, Upload } from "antd";
import { MdAdd, MdCancel, MdDelete, MdEdit } from "react-icons/md";
import { request } from "../../util/helper";
import MainPage from "../../components/layout/MainPage";

function CategoryPage() {
    const [formRef] = Form.useForm();
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        visibleModal: false,
        name: "",
        description: "",
        status: "",
        parent_id: null
    });

    useEffect(() => {
        getList();
    }, []);
    //getlist
    const getList = async () => {
        setLoading(true);
        const res = await request("category", "get");
        setLoading(false);
        if (res) {
            setList(res.list);
        }
    };
    //add new
    const onClickAddBtn = () => {
        try {
            setState({
                ...state,
                visibleModal: true
            })
        }
        catch (error) {
            console.log("something when wrong", error)
        }
    };
    //edit
    const onClickEdit = (data) => {
        try {
            setState({
                ...state,
                visibleModal: true,
            });
            formRef.setFieldsValue({
                id: data.id, //hide id on(save or update)
                name: data.name,
                description: data.description,
                status: data.status,

            });
        }
        catch (error) {
            console.log("something when wrong", error)
        }
    };
    //delete
    const onClickDelete = async (data) => {
        try {
            Modal.confirm({
                title: "Are you sure delete this category?",
                // description: "are you soure?",
                //onText: "Ok",
                okText: "Yes",
                okType: "danger",
                cancelText: "No",
                onOk: async () => {
                    const res = await request("category", "delete", { id: data.id });
                    if (res && !res.error) {
                        message.success(res.message);
                        const newList = list.filter((item) => item.id != data.id);
                        setList(newList);
                    }
                }
            });
        }
        catch (error) {
            console.log("something when wrong", error)
        }
    };
    //close
    const onCloseModal = () => {
        formRef.resetFields();
        setState({
            ...state,
            visibleModal: false,
            id: null
        })

    };
    //finish
    const onFinish = async (items) => {
        try {
            var data = {
                id: formRef.getFieldValue("id"),
                name: items.name,
                description: items.description,
                status: items.status,
                code: items.code,
                parent_id: 0
            };
            var method = "post";
            if (formRef.getFieldValue("id")) {
                method = "put";
            }
            const res = await request("category", method, data);
            if (res && !res.error) {
                message.success(res.message);
                getList();
                onCloseModal();
            }
        }
        catch (err) {
            console.log("something when wrong", err)
        }
    };

    return (
        // <div>CategoryPage</div>
        <MainPage loading={loading}>
            <Button type="primary" className="btn-add" icon={<MdAdd />} onClick={onClickAddBtn}>New</Button>
            <Modal
                open={state.visibleModal}
                title={formRef.getFieldValue("id") ? "Edit category" : "Add new category"}
                footer={null}
                onCancel={onCloseModal}
            >
                <Form layout="vertical" onFinish={onFinish} form={formRef}>
                    <Form.Item name={"name"} label=" category name">
                        <Input placeholder="category name" />
                    </Form.Item>
                    <Form.Item name={"description"} label="description">
                        <Input.TextArea placeholder="description" />
                    </Form.Item>
                    <Form.Item name={"code"} label="code">
                        <Input placeholder="code" />
                    </Form.Item>
                    <Form.Item name={"image"} label="Image" >
                        <Upload
                            customRequest={(options) => {
                                options.onSuccess();
                            }}
                            maxCount={1}
                            listType="picture"
                        //onPreview={handlePreview}
                        //onChange={handleChangeImageDefault}
                        >
                            <div>+UPload</div>
                        </Upload>
                    </Form.Item>
                    <Form.Item name={"status"} label={"status"}>
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
                    <Space>
                        <Button key={"back"} onClick={onCloseModal} icon={<MdCancel />}>Cancel</Button>
                        <Button type="primary" htmlType="submit" >{formRef.getFieldValue("id") ? "Update" : "Save"}</Button>
                    </Space>
                </Form>
            </Modal>
            <Table className="table"
                dataSource={state.list}
                columns={[
                    {
                        key: "No",
                        title: "No",
                        render: (item, data, index) => index + 1
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
                        key: "code",
                        title: "Code",
                        dataIndex: "code"
                    },
                    {
                        key: "description",
                        title: "Description",
                        dataIndex: "description"
                    },
                    {
                        key: "name",
                        title: "Image",
                        dataIndex: "image",
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
                                <Button type="primary" icon={<MdEdit />} onClick={() => onClickEdit(data, index)} />
                                <Button type="primary"
                                    danger
                                    icon={<MdDelete />} onClick={() => onClickDelete(data, index)} />
                            </Space>
                        ),
                    },
                ]}
            />
        </MainPage>
    );
}

export default CategoryPage;