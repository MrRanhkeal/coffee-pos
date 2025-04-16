import { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  message,
  Modal,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { formatDateClient, formatDateServer, request } from "../../util/helper";
import { MdDelete, MdEdit } from "react-icons/md";
import MainPage from "../../component/layout/MainPage";
import { IoMdEye } from "react-icons/io";
import { Config } from "../../util/config";
import dayjs from "dayjs";
function OrderPage() {
  const [formRef] = Form.useForm();
  const [list, setList] = useState([]);
  const [orderDetail, setOrderDetails] = useState([]);

  const [summary, setSummary] = useState(null);
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

  const [filter, setFiler] = useState({
    from_date: dayjs(), // current
    to_date: dayjs(), // current
  });

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    var param = {
      txtSearch: state.txtSearch,
      from_date: formatDateServer(filter.from_date), // 2024-11-20
      to_date: formatDateServer(filter.to_date), // 2024-11-22
    };
    setLoading(true);
    const res = await request("order", "get", param);
    setLoading(false);
    if (res) {
      setList(res.list);
      setSummary(res.summary);
    }
  };
  const getOrderDetail = async (data) => {
    setLoading(true);
    const res = await request("order_detail/" + data.id, "get");
    setLoading(false);
    if (res) {
      setOrderDetails(res.list);
      setState({
        ...state,
        visibleModal: true,
      });
    }

    // formRef.setFieldsValue({
    //   id: data.id, // hiden id (save? | update?)
    //   name: data.name,
    //   description: data.description,
    //   status: data.status,
    // });
    //
    // formRef.getFieldValue("id")
  };
  const onClickDelete = async (data) => {
    Modal.confirm({
      title: "លុ​ប",
      descriptoin: "Are you sure to remove?",
      okText: "យល់ព្រម",
      onOk: async () => {
        const res = await request("order", "delete", {
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
    });
  };

  const onFinish = async (items) => {
    var data = {
      id: formRef.getFieldValue("id"),
      name: items.name,
      description: items.description,
      status: items.status,
      parent_id: 0,
    };
    var method = "post";
    if (formRef.getFieldValue("id")) {
      // case update
      method = "put";
    }
    const res = await request("order", method, data);
    if (res && !res.error) {
      message.success(res.message);
      getList();
      onCloseModal();
    }
  };
  return (
    <MainPage loading={loading}>
      <div className="pageHeader">
        <Space>
          <div>
            <div style={{ fontWeight: "bold" }}>Order</div>
            <div>
              Total : {summary?.total_order || 0} Order |{" "}
              {summary?.total_amount || 0}$
            </div>
          </div>
          <Input.Search
            onChange={(value) =>
              setState((p) => ({ ...p, txtSearch: value.target.value }))
            }
            allowClear
            onSearch={getList}
            placeholder="Search"
          />
          <DatePicker.RangePicker
            defaultValue={[
              dayjs(filter.from_date, "DD/MM/YYYY"),
              dayjs(filter.to_date, "DD/MM/YYYY"),
            ]}
            format={"DD/MM/YYYY"}
            onChange={(value) => {
              setFiler((p) => ({
                ...p,
                from_date: value[0],
                to_date: value[1],
              }));
            }}
          />
          <Button type="primary" onClick={getList}>
            Filter
          </Button>
        </Space>
        <Button type="primary" onClick={onClickAddBtn}>
          NEW
        </Button>
      </div>
      <Modal
        open={state.visibleModal}
        title={"Order Details"}
        footer={null}
        onCancel={onCloseModal}
        width={800}
      >
        <Table
          dataSource={orderDetail}
          pagination={false}
          columns={[
            {
              key: "p_name",
              title: "Product",
              dataIndex: "p_name",
              render: (item, data) => (
                <div>
                  <div style={{ fontWeight: "bold" }}>{data.p_name}</div>
                  <div>
                    {data.p_category_name} | {data.p_brand}
                  </div>
                  <div>{data.p_des}</div>
                </div>
              ),
            },
            {
              key: "p_image",
              title: "Image",
              dataIndex: "p_image",
              render: (value) => (
                <Image
                  src={Config.image_path + value}
                  alt=""
                  style={{ width: 80 }}
                />
              ),
            },

            {
              key: "qty",
              title: "Qty",
              dataIndex: "qty",
            },
            {
              key: "price",
              title: "Price",
              dataIndex: "price",
              render: (value) => <Tag color="green">{value}$</Tag>,
            },
            {
              key: "discount",
              title: "Discount",
              dataIndex: "discount",
              render: (value) => <Tag color="red">{value}%</Tag>,
            },
            {
              key: "total",
              title: "Total",
              dataIndex: "total",
              render: (value) => <Tag color="green">{value}$</Tag>,
            },
          ]}
        />
      </Modal>
      <Table
        dataSource={list}
        columns={[
          {
            key: "order_no",
            title: "Order No",
            dataIndex: "order_no",
          },
          {
            key: "customer_name",
            title: "Customer",
            dataIndex: "customer_name",
            render: (value, data) => (
              <div>
                <div style={{ fontWeight: "bold" }}>{data.customer_name}</div>
                <div>{data.customer_tel}</div>
                <div>{data.customer_address}</div>
              </div>
            ),
          },
          {
            key: "total_amount",
            title: "Total",
            dataIndex: "total_amount",
          },
          {
            key: "paid_amount",
            title: "Paid",
            dataIndex: "paid_amount",
            render: (value) => (
              <div style={{ fontWeight: "bold", color: "green" }}>{value}</div>
            ),
          },
          {
            key: "Due",
            title: "Due",
            render: (value, data) => (
              <Tag color="red">
                {(Number(data.total_amount) - Number(data.paid_amount)).toFixed(
                  2
                )}
              </Tag>
            ),
          },
          {
            key: "payment_method",
            title: "Payment Method",
            dataIndex: "payment_method",
          },
          {
            key: "remark",
            title: "Remark",
            dataIndex: "remark",
          },
          {
            key: "create_by",
            title: "User",
            dataIndex: "create_by",
          },
          {
            key: "create_at",
            title: "Order Date",
            dataIndex: "create_at",
            render: (value) => formatDateClient(value, "DD/MM/YYYY h:mm A"),
          },
          {
            key: "Action",
            title: "Action",
            align: "center",
            render: (item, data, index) => (
              <Space>
                <Button
                  type="primary"
                  icon={<IoMdEye />}
                  onClick={() => getOrderDetail(data, index)}
                />
              </Space>
            ),
          },
        ]}
      />
    </MainPage>
  );
}

export default OrderPage;
