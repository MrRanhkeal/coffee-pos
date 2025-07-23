import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Space,
  Table
} from "antd";
import { request } from "../../util/helper";
import { MdDelete, MdEdit } from "react-icons/md";
import MainPage from "../../component/layout/MainPage";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { IoMdEye } from "react-icons/io";
import { configStore } from "../../store/configStore";
function ExpansePage() {
  const [formRef] = Form.useForm();
  const [list, setList] = useState([]);
  const {config ,setConfig}= configStore();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    visibleModal: false,
    isReadOnly: false,
    id: null, 
    amount: "",
    descriptoin: "",
    status: "",
    txtSearch: "",
  });

  //const { config, setConfig } = configStore();

  useEffect(() => {
    // Always fetch config on mount
    request("config", "get").then((res) => {
      if (res) {
        let newConfig = { ...res };
        if (res.expsanse_type) {
          newConfig.expense_type = res.expsanse_type;
        }
        setConfig(newConfig);
      }
    });
    getList();
  }, []);
  const [filter, setFilter] = useState({
    txtSearch: "",
    expense_type: "", 
  })
  const getList = async () => {
    setLoading(true);
    var param = {
      txtSearch: state.txtSearch, 
      expense_type: filter.expense_type, 
    };
    const res = await request("expense", "get", param);
    setLoading(false);
    if (res) {
      setList(res.list);
    }
  };

  const onClickView = (data) => {
    formRef.setFieldsValue({
      ...data,
      id: data.id,
    });
    setState({
      ...state,
      visibleModal: true,
      isReadOnly: true,
    });
  };

  const openModal = () => {
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
      isReadOnly: false,
    });
    formRef.resetFields();
  };

  const onFinish = async (items) => {
    var method = "post";
    if (formRef.getFieldValue("id")) {
      method = "put";
    }
    setState({ ...state, visibleModal: false });
    const res = await request("expense", method, {
      ...items,
      id: formRef.getFieldValue("id"),
    });
    if (res && !res.error) {
      message.success(`Expense ${method === "put" ? "updated" : "created"} successfully`);
      getList();
      onCloseModal();
    }
  };
  const onClickEdit = (data) => {
    formRef.setFieldsValue({
      ...data,
      id: data.id
    });
    setState({
      ...state,
      visibleModal: true,
      isReadOnly: false,
    });
  };
  const onClickDelete = async (data) => {
    Modal.confirm({
      title: "Delete Expense",
      content: `Are you sure you want to delete this expense ${data.expense_type} ?`, 
      onText: "Delete",
      cancelText: "Cancel",
      okType: "danger",
      icon: <MdDelete style={{ color: "red", fontSize: 20 }} />,
      onOk: async () => {
        const res = await request('expense', 'delete', { id: data.id });
        if (res && !res.error) {
          message.success(res.message);
          const newList = list.filter((item) => item.id != data.id);
          setList(newList);
        }
      },
    });
  };
  return (
    <MainPage loading={loading}>
      <div className="pageHeader">
        <Space>
          <div>Expense</div>
          <Input.Search
            onChange={(value) =>
              setState((p) => ({ ...p, txtSearch: value.target.value }))
            }
            allowClear
            onSearch={getList}
            placeholder="Search"
          />
          <Button type="primary" onClick={getList}>
            Filter
          </Button>
        </Space>
        <Button type="primary" onClick={openModal} style={{ padding: "10px", marginBottom: "10px", marginLeft: "auto" }}>
          NEW
        </Button>
      </div>
      <Modal
        open={state.visibleModal}
        title={formRef.isReadOnly ? "View Expense" : (formRef.getFieldValue("id") ? "Update Expense" : "Add Expense")}
        onCancel={onCloseModal}
        footer={null}
      >
        <Form layout="vertical" onFinish={onFinish} form={formRef}>
          <Form.Item name={"expense_type"} label="Expense Type" rules={[{ required: true, message: 'Please input expense type!' }]}>
            {/* <Input placeholder="Expense Type" /> */}
            <Select
              placeholder="Select expense type"
              showSearch
              allowClear
              optionFilterProp="children"
              options={config.expense_type}
              loading={!config.expense_type}
              disabled={!config.expense_type}
              // options={Object.entries(config.expense_type || {}).flatMap(([expense_type, items])=>
              //   items.map(item => ({
              //     label: `${expense_type} - ${item.label}`,
              //     value: item.value,
              //   }))
              // )}
              onChange={(value) => {
                setFilter ((pre) => ({ 
                  ...pre, 
                  expense_type: value 
                }));
                getList();
              }}
              value={filter.expense_type}
            />
          </Form.Item>
          <Form.Item name={"amount"} label="Amount" rules={[{ required: true, message: 'Please input amount!' }]}>
            <InputNumber type="number" placeholder="Amount" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name={"description"} label="Description" rules={[{ required: true, message: 'Please input description!' }]}>
            <Input.TextArea placeholder="Description" />
          </Form.Item>
          <Form.Item name={"expense_date"} label="Expense Date" rules={[{ required: true, message: 'Please input expense date!' }]}>
            <Input type="date" placeholder="Expense Date" />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button onClick={onCloseModal} >Cancel</Button> &nbsp;
            <Button type="primary" htmlType="submit" >
              {formRef.getFieldValue("id") ? "Update" : "Save"}
            </Button>
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
            key: "expense_type",
            title: "Expense Type",
            dataIndex: "expense_type",
          }, 
          {
            key: "description",
            title: "Description",
            dataIndex: "description",
          },
          {
            key: "amount",
            title: "Amount",
            dataIndex: "amount",
          },
          {
            key: "expense_date",
            title: "Expense Date",
            dataIndex: "expense_date",
            render: (date) => new Date(date).toLocaleDateString(),
          },
          {
            key: "create_by",
            title: "Create By",
            dataIndex: "create_by",
          },
          {
            key: "Action",
            title: "Action",
            align: "center",
            render: (item, data, index) => (
              <Space>
                <EditOutlined
                  type="primary"
                  icon={<MdEdit />}
                  style={{ color: "green", fontSize: 20 }}
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
                  style={{ color: "rgb(12, 59, 4)", fontSize: 20 }}
                  icon={<IoMdEye />}
                  onClick={() => onClickView(data, index)}
                />
              </Space>
            ),
          },
        ]}
      />
    </MainPage>
  );
}

export default ExpansePage;
