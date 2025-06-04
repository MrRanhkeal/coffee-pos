import { useCallback, useEffect, useState } from "react";
import { Button, Form, Input, message, Modal, Select, Space, Table, Tag } from "antd";
import { MdDelete, MdEdit } from "react-icons/md";
import MainPage from "../../component/layout/MainPage";
import { request } from "../../util/helper";
import { DeleteOutlined, EditOutlined, EyeOutlined, FileAddFilled } from "@ant-design/icons";
// import PropTypes from "prop-types";
import { IoMdEye } from "react-icons/io";
function CustomerPage() {
  const [form] = Form.useForm();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    visibleModal: false,
    id: null,
    name: "",
    descriptoin: "",
    status: "",
    parentId: null,
    txtSearch: "",
  });

  const getList = useCallback(async () => {
    setLoading(true);
    var param = {
      txtSearch: state.txtSearch,
    };
    const res = await request("customer", "get", param);
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
      title: "Delete Customer",
      content: `Are you sure! you want to remove customer ${data.name}?`,
      okText: "Yes",
      onOk: async () => {
        const res = await request("customer", "delete", {
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
      parent_id: 0,
    };
    var method = "post";
    if (form.getFieldValue("id")) {
      // case update
      method = "put";
    }
    const res = await request("customer", method, data);
    if (res && !res.error) {
      // message.success(res.message);
      message.success(`Customer ${method === "put" ? "updated" : "created"} successfully`);
      getList();
      onCloseModal();
    }
  };
  return (
    <MainPage loading={loading}>
      <div className="pageHeader">
        <Space>
          <div>Customer List </div>
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
        <Button type="primary" style={{padding:"10px",marginBottom:"10px",marginLeft: "auto"}} onClick={onClickAddBtn} >
          <FileAddFilled/> New
        </Button> 
      </div>
      <Modal
        open={state.visibleModal}
        title={state.isReadOnly ? "View Customer" : (state.id ? "Edit Customer" : "New Customer")}
        footer={null}
        onCancel={onCloseModal}
      >
        <Form layout="vertical" onFinish={onFinish} form={form} initialValues={{
            status: 1
          }}>
          <Form.Item 
            name="name" 
            label="Customer name"
            rules={[{ required: true, message: 'Please input customer name!' }]}
          >
            <Input placeholder="Input Customer name" disabled={state.isReadOnly} />
          </Form.Item>
          <Form.Item 
            name="phone" 
            label="Customer phone"
            rules={[{ required: true, message: 'Please input customer phone!' }]}
          >
            <Input placeholder="Input Customer phone" disabled={state.isReadOnly} />
          </Form.Item>
          <Form.Item 
            name="email" 
            label="Customer email"
            rules={[{ required: true, message: 'Please input customer email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
          >
            <Input placeholder="Input Customer email" disabled={state.isReadOnly} />
          </Form.Item>
          <Form.Item name={"address"} label="Customer address">
            <Input placeholder="Input Customer address" name="address" disabled={state.isReadOnly} />
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
              <Button type="default"  onClick={onCloseModal} >Close</Button>
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
            title: "name",
            dataIndex: "name",
          },
          {
            key: "phone",
            title: "phone",
            dataIndex: "phone",
          },
          {
            key: "email",
            title: "email",
            dataIndex: "email",
          },
          {
            key: "address",
            title: "address",
            dataIndex: "address",
          },
          {
            key: "status",
            title: "status",
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

export default CustomerPage;
