import React, { useCallback, useEffect, useState } from "react";
import { Button, Flex, Form, Input, message, Modal, Select, Space, Table, Tag } from "antd";
import { request } from "../../util/helper";
import { MdDelete, MdEdit } from "react-icons/md";
import MainPage from "../../component/layout/MainPage";
import { DeleteOutlined, EditOutlined, EyeOutlined, FileAddFilled } from "@ant-design/icons";
import { IoMdEye } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
// import { use } from "react";
// import { configStore } from "../../store/configStore";
function CategoryPage() {
  // const { config } = configStore();
  const [formRef] = Form.useForm();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState({
    loading: true,
    visibleModal: false,
  });
  const [state, setState] = useState({
    visibleModal: false,
    id: null,
    name: "",
    descriptoin: "",
    status: "",
    parentId: null,
    txtSearch: "",
    isReadOnly: false,
  });

  const getList = useCallback(async () => {
    setLoading(true);
    var param = {
      txtSearch: state.txtSearch,
    };
    const res = await request("category", "get", param);
    setLoading(false);
    if (res) {
      setList(res.list);
    }
  }, [state, setLoading, setList]);
  useEffect(() => {
    getList();
  }, [state, setLoading, setList]);

  const onClickEdit = (data) => {
    setState({
      ...state,
      visibleModal: true,
    });
    formRef.setFieldsValue({
      id: data.id, // hiden id (save? | update?)
      // name: data.name,
      name: data.name,
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
      isReadOnly: true
    });
    formRef.setFieldsValue({
      id: data.id,
      name: data.name,
      description: data.description,
      status: data.status,
    });
  };
  const onClickDelete = async (data,) => {
    Modal.confirm({
      title: "Delete Category",
      content: `Are you sure! you want to remove category ${data.name}?`,
      okText: "Ok",
      onOk: async () => {
        const res = await request("category", "delete", {
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
    formRef.resetFields();
    setState({
      ...state,
      visibleModal: false,
      id: null,
      isReadOnly: false,
    });
  };

  const onFinish = async (items) => {
    // Get the current user's name from the profile
    const profileData = localStorage.getItem('profile');
    console.log('Profile data from localStorage:', profileData);

    const currentUser = profileData ? JSON.parse(profileData) : {};
    console.log('Parsed user data:', currentUser);

    // Try to get user name from different possible properties
    const userName = currentUser?.user?.name || currentUser?.name || currentUser?.username || 'system';
    console.log('Selected username:', userName);

    const isEdit = formRef.getFieldValue("id") != null;

    var data = {
      ...items,
      id: formRef.getFieldValue("id"),
      name: items.name,
      description: items.description,
      status: items.status,
      parent_id: 0,
      // Only set create_by for new categories
      create_by: isEdit ? undefined : userName,
    };
    var method = "post";
    if (formRef.getFieldValue("id")) {
      // case update
      method = "put";
    }
    const res = await request("category", method, data);
    if (res && !res.error) {
      // message.success(res.message);
      message.success(`Category ${method === "put" ? "updated" : "created"} successfully`);
      getList();
      onCloseModal();
    }
  };

  return (
    <MainPage loading={loading}>
      <div className="pageHeader">
        <Space>
          <div>Category</div>
          <Flex>
            <Input
              onChange={(value) =>
                setState((p) => ({ ...p, txtSearch: value.target.value }))
              }
              allowClear
              onSearch={getList}
              placeholder="Search"
            />
          </Flex>
          <Button type="primary" onClick={getList}>
            <FaSearch /> Search
          </Button>
        </Space>
        <Button type="primary" onClick={onClickAddBtn} style={{ padding: "10px", marginBottom: "10px", marginLeft: "auto" }}>
          <FileAddFilled />New
        </Button>
      </div>
      <Modal
        open={state.visibleModal}
        // title={formRef.getFieldValue("id") ? "Edit Category" : "New Category"}
        title={state.isReadOnly ? "View Category" : (formRef.getFieldValue("id") ? "Edit Category" : "New Category")}
        footer={null}
        onCancel={onCloseModal}
      >
        <Form layout="vertical" onFinish={onFinish} form={formRef}>
          <Form.Item name={"name"} label="Category name">
            <Input placeholder="Input Category name" disabled={state.isReadOnly} />
          </Form.Item>
          <Form.Item name={"description"} label="description">
            <Input.TextArea placeholder="description" disabled={state.isReadOnly} />
          </Form.Item>
          <Form.Item name={"status"} label="status">
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
              <Button onClick={onCloseModal}>{state.isReadOnly ? "Close" : "Cancel"}</Button>
              {!state.isReadOnly && (
                <Button type="primary" htmlType="submit">
                  {formRef.getFieldValue("id") ? "Update" : "Save"}
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
            key: "description",
            title: "description",
            dataIndex: "description",
          },
          // {
          //   key: "create_by",
          //   title: "create_by",
          //   dataIndex: "create_by",
          // },
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

export default CategoryPage;
