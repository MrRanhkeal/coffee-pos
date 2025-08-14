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

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Khmer:wght@400;700&family=Roboto:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

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
  const onClickDelete = async (data) => {
    Modal.confirm({
      title: <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>លុប{data.name}</span>,
      content: <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif', fontWeight: 'bold', color: '#e42020ff' }}>តើអ្នកចង់លុប {data.name} មែនទេ ?</span>,
      okText: <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif', fontWeight: 'bold', color: '#e42020ff' }}>បាទ/ចាស</span>,
      okType: 'danger',
      cancelText: <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif', fontWeight: 'bold', color: '#25a331ff' }}>ទេ!</span>,
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
    <MainPage loading={loading} className="pag_my_header">
      <div
        className="pageHeader"
      >
        <Space>
          <Flex style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>
            <Input
              style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}
              onChange={(value) =>
                setState((p) => ({ ...p, txtSearch: value.target.value }))
              }
              allowClear
              onSearch={getList}
              placeholder="ស្វែងរក"
              className="khmer-search"
            />
          </Flex>
          <Button type="primary" onClick={getList} style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>
            <FaSearch style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }} /> ស្វែងរក
          </Button>
        </Space>
        <Button type="primary" onClick={onClickAddBtn} style={{ padding: "10px", marginBottom: "10px", marginLeft: "auto", fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>
          <FileAddFilled style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }} />បញ្ចូលថ្មី
        </Button>
      </div>
      <div style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif', fontWeight: 'bold', margin: '0 0 10px 0' }}>តារាងប្រភេទទំនិញ</div>
      <Modal
        open={state.visibleModal}
        style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}
        // title={formRef.getFieldValue("id") ? "Edit Category" : "New Category"}
        title={state.isReadOnly ? "មើល" : (formRef.getFieldValue("id") ? "កែប្រែ" : "បញ្ចូលថ្មី")}
        footer={null}
        onCancel={onCloseModal}
      >
        <Form layout="vertical" onFinish={onFinish} form={formRef}>
          <Form.Item name={"name"} label={<span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>ឈ្មោះប្រភេទទំនិញ</span>}>
            <Input placeholder="បញ្ចូល ឈ្មោះប្រភេទទំនិញ" disabled={state.isReadOnly} style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }} />
          </Form.Item>
          <Form.Item name={"description"} label={<span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>ពណ៌នា</span>}>
            <Input.TextArea placeholder="ពណ៌នា" disabled={state.isReadOnly} style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }} />
          </Form.Item>
          <Form.Item
            style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}
            name="status"
            label={<span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>ស្ថានភាព</span>}
          >
            <Select
              style={{ fontWeight: "bold", fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}
              placeholder="ជ្រើសរើសសកម្មភាព"
              disabled={state.isReadOnly}
              options={[
                {
                  label: "សកម្ម",
                  value: 1,
                  style: { fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' },
                },
                {
                  label: "អសកម្ម",
                  value: 0,
                  style: { fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' },
                },
              ]}
            />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={onCloseModal} style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>{state.isReadOnly ? "បិទ" : "បោះបង់"}</Button>
              {!state.isReadOnly && (
                <Button type="primary" htmlType="submit" style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>
                  {formRef.getFieldValue("id") ? "កែប្រែ" : "រក្សាទុក"}
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
            //title: "ល.រ",
            title: <span style={{ fontWeight: "bold", fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>ល.រ</span>,
            render: (item, data, index) => index + 1,
          },
          {
            key: "name",
            title: <span style={{ fontWeight: "bold", fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>ឈ្មោះ</span>,
            dataIndex: "name",
            render: (text) => <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>{text}</span>,
          },
          {
            key: "description",
            title: <span style={{ fontWeight: "bold", fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>ការពណ៌នា</span>,
            dataIndex: "description",
            render: (text) => <span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>{text}</span>,
          },
          // {
          //   key: "create_by",
          //   title: "create_by",
          //   dataIndex: "create_by",
          // },
          {
            key: "status",
            title: <span style={{ fontWeight: "bold", fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>ស្ថានភាព</span>,
            dataIndex: "status",
            render: (status) =>
              status == 1 ? (
                <Tag color="green" style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>សកម្ម</Tag>
              ) : (
                <Tag color="red" style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>អសកម្ម</Tag>
              ),
          },
          {
            key: "Action",
            title: <span style={{ fontWeight: "bold", fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' }}>សកម្មភាព</span>,
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
