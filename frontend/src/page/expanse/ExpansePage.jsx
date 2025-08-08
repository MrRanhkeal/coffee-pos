import { useCallback, useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, message, Modal, Select, Space, Table } from "antd";
import { request } from "../../util/helper";
import { MdDelete, MdEdit } from "react-icons/md";
import MainPage from "../../component/layout/MainPage";
import { DeleteOutlined, EditOutlined, EyeOutlined, FileAddOutlined } from "@ant-design/icons";
import { IoMdEye } from "react-icons/io";
import { configStore } from "../../store/configStore";
import Link from "antd/es/typography/Link";

function ExpansePage() {
  const [formRef] = Form.useForm();
  const [list, setList] = useState([]);
  const { config } = configStore();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    visibleModal: false,
    isReadOnly: false,
    id: null,
    expense_type: null,
    vendor_payee: "",
    payment_method: "",
    expense_date: "",
    amount: null,
    descriptoin: "",
    status: "",
    txtSearch: "",
  });
  const getList = useCallback(async () => {
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
  });
  useEffect(() => {
    getList();
  }, []);
  const [filter, setFilter] = useState({
    txtSearch: "",
    expense_type: "",
  })
  const onClickView = (data) => {
    if (!state.visibleModal) {
      setState({
        ...state,
        visibleModal: true,
        isReadOnly: true,
        id: data.id,
      });
      formRef.setFieldsValue({
        id: data.id,
        expense_type: data.expense_type,
        vendor_payee: data.vendor_payee,
        amount: data.amount,
        payment_method: data.payment_method,
        description: data.description,
        expense_date: data.expense_date,
      });
    }
  };

  const openModal = () => {
    setState({
      // ...state,
      id: null,
      expense_type: "",
      vendor_payee: "",
      amount: '',
      payment_method: "",
      description: "",
      expense_date: "",
      isReadOnly: false,
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
    formRef.resetFields();
  };

  const onFinish = async (items) => {
    var data = {
      id: formRef.getFieldValue("id"),
      expense_type: items.expense_type,
      vendor_payee: items.vendor_payee,
      amount: items.amount,
      payment_method: items.payment_method,
      description: items.description,
      // expense_date: items.expense_date,
    };
    var method = "post";
    if (formRef.getFieldValue("id")) {
      // case update
      method = "put";
    }
    const res = await request("expense", method, data);
    if (res && !res.error) {
      message.success(res.message);
      getList();
      onCloseModal();
    }
  };
  const onClickEdit = (data) => {
    setState({
      ...state,
      visibleModal: true,
      id: data.id,
    });
    formRef.setFieldsValue({
      id: data.id,
      expense_type: data.expense_type,
      vendor_payee: data.vendor_payee,
      amount: data.amount,
      payment_method: data.payment_method,
      description: data.description,
      // expense_date: data.expense_date,
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
        <Button
          type="primary"
          onClick={openModal}
          style={{ padding: "10px", marginBottom: "10px", marginLeft: "auto" }}
        >
          <FileAddOutlined /> New Expense
        </Button>
      </div>
      <Modal
        open={state.visibleModal}
        title={state.isReadOnly ? "View Expense" : (state.id ? "Edit Expense" : "New Expense")}
        footer={null}
        onCancel={onCloseModal}
      >
        <Form
          form={formRef}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name={"expense_type"}
            label="Expense Type"
            rules={[
              {
                required: true,
                message: 'Please input expense type!'
              }
            ]}
          >
            <Select
              placeholder="Select expense type"
              showSearch
              allowClear
              options={(config.expense_type || []).map(item => ({
                label: item.label,
                value: item.value
              }))}
              onChange={(value) => {
                setFilter(prev => ({
                  ...prev,
                  expense_type: value
                }));
                getList();
              }}
              disabled={state.isReadOnly}
            />
          </Form.Item>
          <Form.Item name={"amount"} label="Amount" rules={[{ required: true, message: 'Please input amount!' }]}>
            <InputNumber
              min={0}
              style={{ width: '100%' }}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              step={0.5}
              disabled={state.isReadOnly}
            />
          </Form.Item>
          <Form.Item
            name={"vendor_payee"}
            label="Vendor Payee"
            rules={[
              {
                required: true,
                message: 'Please input vendor payee!'
              }
            ]}
          >
            <Select
              placeholder="Select vendor payee"
              showSearch
              allowClear
              options={(config.vendor_payee || []).map(item => ({
                label: item.label,
                value: item.value
              }))}
              onChange={(value) => {
                setFilter(prev => ({
                  ...prev,
                  vendor_payee: value
                }));
                getList();
              }}
              disabled={state.isReadOnly} />
          </Form.Item>
          <Form.Item
            name={"payment_method"}
            label="Payment Method"
            rules={[
              {
                required: true,
                message: 'Please input payment_method!'
              }
            ]}
          >
            <Select
              placeholder="Select payment method"
              showSearch
              allowClear
              options={(config.payment_method || []).map(item => ({
                label: item.label,
                value: item.value
              }))}
              onChange={(value) => {
                setFilter(prev => ({
                  ...prev,
                  payment_method: value
                }));
                getList();
              }}
              disabled={state.isReadOnly} />
          </Form.Item>
          <Form.Item name={"description"} label="Description" rules={[{ required: true, message: 'Please input description!' }]}>
            <Input.TextArea placeholder="Description" disabled={state.isReadOnly} />
          </Form.Item>
          {/* <Form.Item name={"expense_date"} label="Expense Date" rules={[{ required: true, message: 'Please input expense date!' }]}>
            <Input type="date" placeholder="Expense Date" disabled={state.isReadOnly} />
          </Form.Item> */}
          <Form.Item style={{ textAlign: "right" }}>
            <Button onClick={onCloseModal} >Close</Button> &nbsp;
            {!state.isReadOnly && (
              <Button type="primary" htmlType="submit" >
                {formRef.getFieldValue("id") ? "Update" : "Save"}
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
      <Table
        dataSource={list}
        columns={[
          // {
          //   key: "No",
          //   title: "No",
          //   render: (item, data, index) => index + 1,
          // },
          {
            title: "Expense ID",
            dataIndex: "id",
            key: "id",
            render: (item, data, index) => <Link style={{ color: '#cc2121ff', fontSize: "14px" }}>{'EXP-' + ''.padStart(2, '0') + index}</Link>,
            //' + 1,
            //render: (id) => <Link to={`/expanse/${id}`} style={{ color: 'rgba(206, 19, 13, 1)', fontSize: "14px" }}>{'EXP' + '-' + ''.padStart(2, '0')}{id}</Link>
          },
          {
            key: "expense_type",
            title: "Expense Type",
            dataIndex: "expense_type",
          },
          {
            key: "vendor_payee",
            title: "Vendor/Payee",
            dataIndex: "vendor_payee",
          },
          {
            key: "amount",
            title: "Amount",
            dataIndex: "amount",
            render: (amount) => '$' + amount
          },
          {
            key: "payment_method",
            title: "Payment Method",
            dataIndex: "payment_method",
          },
          {
            key: "description",
            title: "Description",
            dataIndex: "description",
          },
          {
            key: "expense_date",
            title: "Expense Date",
            dataIndex: "expense_date",
            render: (date) => new Date(date).toLocaleDateString("en-GB", { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            //render: (date) => new Date(date).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
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
