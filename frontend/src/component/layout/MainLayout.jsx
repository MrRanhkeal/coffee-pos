import React, { useEffect, useState } from "react";
import {
  AccountBookOutlined,
  AlignCenterOutlined,
  AppstoreOutlined,
  DollarOutlined, 
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  SlidersOutlined,
  SnippetsOutlined,
  SortDescendingOutlined,
  StockOutlined,
  TransactionOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Dropdown, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import "./MainLayout.css";
import Logo from "../../assets/v-friends.jpg";
import ImgUser from "../../assets/admin.jpg";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import {
  getPermission,
  getProfile,
  setAcccessToken,
  setProfile,
} from "../../store/profile.store";
import { request } from "../../util/helper";
import { configStore } from "../../store/configStore";
// import { icons } from "antd/es/image/PreviewGroup";
const { Content, Sider } = Layout;

const items_menu = [
  {
    key: "",
    label: "Dashabord",
    children: null,
    icon: <HomeOutlined />
  },
  {
    key: "pos",
    label: "POS",
    children: null,
    icon: <ShopOutlined />
  },
  {
    key: "customer",
    label: "Customer",
    children: null,
    icon: <UsergroupAddOutlined />
  },
  {
    key: "order",
    label: "Order",
    children: null,
    icon: <ShoppingCartOutlined />
  },
  {
    label: "Product",
    children: [
      {
        key: "product",
        label: "List Porduct",
        children: null,
        icon: <UnorderedListOutlined />
      },
      {
        key: "category",
        label: "Category",
        children: null,
        icon: <SortDescendingOutlined />
      },
    ],
    icon: <AppstoreOutlined />
  },
  {
    label: "Purchase",
    children: [
      {
        key: "supplier",
        label: "Supplier",
        children: null,
        icon: <UserSwitchOutlined />
      }
    ],
    icon: <ShoppingOutlined />
  },
  {
    label: "Expanse",
    children: [
      {
        key: "expanse",
        label: "Expanse",
        children: null,
        icon: <DollarOutlined />
      },
    ],
    icon: <TransactionOutlined />
  },
  {
    label: "Stock",
    children: [
      {
        key: "stock-cup",
        label: "Stock_Cup",
        children: null,
        icon: "💹"
        // icon: <StockOutlined/>
      },
      {
        key: "stock-coffee",
        label: "Stock_Coffee",
        children: null,
        // icon: "💹"
        icon: <StockOutlined/>
      },
    ],
    icon: <SlidersOutlined />
  },
  {
    label: "Report",
    children: [
      {
        key: "report_sale_summary",
        label: "Sale summary",
        children: null,
        icon: <AlignCenterOutlined />
      },
      {
        key: "report_expense_summary",
        label: "Expense Summary",
        children: null,
        icon: <AccountBookOutlined />
      }
    ],
    icon: <SnippetsOutlined />
  },

  {
    label: "User",
    children: [
      {
        key: "user",
        label: "User",
        children: null,
        icon: <UserOutlined />
      },
      {
        key: "role",
        label: "Role",
        children: null,
        // icon: <UserDeleteOutlined/>
        icon: "🔐"
      }
    ],
    icon: <UsergroupAddOutlined />
  },

  {
    label: "Setting",
    children: [
      {
        key: "Currency",
        label: "Currency",
        children: null,
        icon: <DollarOutlined />
      } 
    ],
    icon: <SettingOutlined />
  },
];

const MainLayout = () => {
  const permission = getPermission();
  const { setConfig } = configStore();
  const profile = getProfile();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  useEffect(() => {
    getMenuByUser();
    getConfig();
    if (!profile) {
      navigate("/login");
    }
  }, []);

  const getMenuByUser = () => {
    let new_item_menu = [];
    items_menu?.map((item1) => {
      // level one
      const p1 = permission?.findIndex(
        (data1) => data1.web_route_key == "/" + item1.key
      );
      if (p1 != -1) {
        new_item_menu.push(item1);
      }

      // level two
      if (item1?.children && item1?.children.length > 0) {
        let childTmp = [];
        item1?.children.map((data1) => {
          permission?.map((data2) => {
            if (data2.web_route_key == "/" + data1.key) {
              childTmp.push(data1);
            }
          });
        });
        if (childTmp.length > 0) {
          item1.children = childTmp; // update new child dreen
          new_item_menu.push(item1);
        }
      }
    });
    setItems(new_item_menu);
  };

  const getConfig = async () => {
    const res = await request("config", "get");
    if (res) {
      setConfig(res);
    }
  };

  const onClickMenu = (item) => {
    navigate(item.key);
  };
  const onLoginOut = () => {
    setProfile("");
    setAcccessToken("");
    navigate("/login");
  };

  if (!profile) {
    return null;
  }

  const itemsDropdown = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/" style={{ color: "green-yllow", fontSize: 15 }}>
          Profile
        </a>
      ),
      icon: <ProfileOutlined />
    },
    // {
    //   key: "2",
    //   label: (
    //     <a target="_blank" rel="noopener noreferrer" href="/">
    //       chage password
    //     </a>
    //   ),
    //   icon: <SmileOutlined />,
    //   disabled: true,
    // },
    {
      key: "logout",
      danger: true,
      label: "Logout",
      icon: <LogoutOutlined />
    },
  ];

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        {/* {permission?.map((item, index) => (
          <div key={index}>
            <div>
              {item.name}:{item.web_route_key}
            </div>
          </div>
        ))} */}
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={onClickMenu}
        />
      </Sider>
      <Layout>
        <div className="admin-header">
          <div className="admin-header-g1">
            <div>
              <img className="admin-logo" src={Logo} alt="Logo" />
            </div>
            <div>
              <div className="txt-brand-name">Coffee-POS</div>
              {/* <div className="txt-brand-name">Count : {count}</div> */}

              <div>Coffee Shop POS</div>
            </div>
            {/* <div>
              <Input.Search
                style={{ width: 180, marginLeft: 15, marginTop: 10 }}
                size="large"
                placeholder="Search"
              />
            </div> */}
          </div>

          <div className="admin-header-g2">
            <div>
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "en",
                      label: "English",
                    },
                    {
                      key: "kh",
                      label: "Khmer",
                    },
                  ],
                  onClick: (event) => {
                    if (event.key == "en") {
                      setConfig({ lang: "en" });
                    } else if (event.key == "kh") {
                      setConfig({ lang: "kh" });
                    }
                  },
                }}
                trigger={['click']}
                placement="bottomRight"
              >
                <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span>Language</span>
                  <GrLanguage style={{ fontSize: '18px' }} />
                </div>
              </Dropdown>
            </div>
            <div>&nbsp;&nbsp;&nbsp;</div>
            <IoIosNotifications className="icon-notify" style={{ width: 30, height: 30 }} />
            <MdOutlineMarkEmailUnread className="icon-email" style={{ width: 30, height: 30 }} />
            <div>
              <div className="txt-username">{profile?.name}</div>
              <div>{profile?.role_name}</div>
            </div>
            <Dropdown
              menu={{
                items: itemsDropdown,
                onClick: (event) => {
                  if (event.key == "logout") {
                    onLoginOut();
                  }
                },
              }}
            >
              <img className="img-user" src={ImgUser} alt="Logo" style={{ width: 50, height: 50 }} />
            </Dropdown>
          </div>
        </div>
        <Content
          style={{
            margin: "10px",
          }}
        >
          <div
            className="admin-body"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
