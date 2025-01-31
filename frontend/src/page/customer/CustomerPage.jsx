import { Button, Form, Input, Modal, Space, Table,message  } from 'antd';
import { useEffect, useState } from 'react';
import { request } from '../../util/helper';
import { MdAdd, MdCancel, MdDelete, MdEdit } from 'react-icons/md';
function CustomerPage() {
    const [formRef] = Form.useForm();
    const {List, setList} = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(({
        visibleModal: false,
        name: "",
        phone: "",
        address: "",
        
    }))
    //use handle the side effects such as fetching data and updating the DOM
    useEffect(() => {
        getList();
    })
    //list
    const getList = async () => {
        setLoading(true);
        const res = await request("customer", "get");
        setLoading(false);
        if (res) {
            setList(res);
        }
    }
    //add new
    const onClickAddBtn = () => {
        try {
            setStatus({
                ...status,
                visibleModal: true
            })
        }
        catch (error) {
            console.log("something when wrong", error)
        }
    }
    //edit
    const onClickEdit = (data) => {
        try {
            setStatus({
                ...status,
                visibleModal: true,
            });
            formRef.setFieldValue({
                id: data.id, //hide id on(save or update)
                name: data.name,
                phone: data.phone,
                address: data.address
            });
        }
        catch (error) {
            console.log("something when wrong", error)
        }
    }
    //delete
    const onClickDelete = (data) => {
        try {
            Modal.confirm({
                title: "Are you sure delete this category?",
                okText: "Yes",
                okType: "danger",
                cancelText: "No",
                onOk: async () => {
                    const res = await request("customer", "delete", { id: data.id });
                    if (res && !res.error) {
                        message.success(res.message);
                        const newList = List.filter((item) => item.id !== data.id);
                        setList(newList);
                    }
                }
            });
        }
        catch (error) {
            console.log("something when wrong", error)
        }
    }
    //close
    const onCloseModal = () => {
        formRef.resetFields();
        setStatus({
            ...status,
            visibleModal: false,
            id: null
        })
    }
    //finish
    const onFinish = async (items) => {
        try{
            var data ={
                id: formRef.getFieldValue("id"),
                name: items.name,
                phone: items.phone,
                address: items.address
            };
            var method = "post";
            if(formRef.getFieldValue("id")){
                method = "put";
            }
            const res = await request("customer", method, data);
            if(res && !res.error){
                message.success(res.message);
                getList();
                onCloseModal();
            }
        }
        catch(err){
            console.log("something when wrong", err)
        }
    }

    return (
        // <div>CustomerPage</div>
        <div loading={loading}>
        <Button type='primary' className='btn-add' icon={<MdAdd />} onClick={onClickAddBtn}>New</Button>
            <Modal 
                open={status.visibleModal} //stant for form popup
                title={formRef.getFieldValue("id") ? "Edit" : "New Cusotmer"} //stand for form name
                onCancel={onCloseModal}
                footer={null} //stand for footer close or save btn
            >
                <Form layout='vertical' onFinish={onFinish} form={formRef}>
                    <Form.Item name={"name"} label="name">
                        <Input placeholder="name" />
                    </Form.Item>
                    <Form.Item name={"phone"} label={"phone"}>
                        <Input placeholder="phone" />
                    </Form.Item>
                    <Form.Item name={"address"} label={"address"}>
                        <Input placeholder="address" />
                    </Form.Item>
                </Form>
                <Space>
                    <Button type="primary" icon={<MdCancel />} onClick={onCloseModal}>Cancel</Button>
                    <Button type='primary' htmlType='submit'>{formRef.getFieldValue("id") ? "Update" : "Save"}</Button>
                </Space>
            </Modal>
            <Table className='table'
                columns={[
                    {
                        key: 'No',
                        title: 'No',
                        render: (text, record, index) => index + 1
                    },
                    {
                        key: 'id',
                        title: 'Id',
                        dataIndex: 'id',
                    },
                    {
                        key: 'name',
                        title: 'Name',
                        dataIndex: 'name',
                    },
                    {
                        key: 'phone',
                        title: 'Phone',
                        dataIndex: 'phone',
                    },
                    {
                        key: 'address',
                        title: 'Address',
                        dataIndex: 'address',
                    },
                    {
                        key: 'action',
                        title: 'Action',
                        render: (text, record) => (
                            <Space>
                                <Button type='primary' icon={<MdEdit />} onClick={() => onClickEdit(record)}>Edit</Button>
                                <Button type='primary' icon={<MdDelete />} onClick={() => onClickDelete(record)}>Delete</Button>
                            </Space>
                        )
                    }
                ]}
            />
        </div>
    )
}

export default CustomerPage