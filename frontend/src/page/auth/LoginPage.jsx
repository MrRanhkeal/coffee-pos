import React from "react";
import { Form, Button, Modal, message, Input, Space } from "antd";
import { request } from "../../util/helper";
import {
  setAcccessToken,
  setPermission,
  setProfile,
} from "../../store/profile.store";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Checkbox, Flex } from "antd";

function LoginPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onLogin = async (item) => {
    var param = {
      username: item.username, //"adminnit@gmail.com",///"sokdara@gmailcom",
      password: item.password,
    };
    const res = await request("auth/login", "post", param);
    if (res && !res.error) {
      setAcccessToken(res.access_token);
      setProfile(JSON.stringify(res.profile));
      setPermission(JSON.stringify(res.permision));
      message.success("Login Success!");
      navigate("/");
    } else {
      message.error(res.message || "Login failed. Please check your credentials.");
    }
  };
  return (
    <div className="mt-10">
      <div className="loginContainer">
        <div className="txtMain">Login</div>
        <div className="txtSmall mb-4">Login with existing account</div>
        <Form
          name="login"
          initialValues={{
            remember: true,
          }}
          style={
            {
              // maxWidth: 360,
            }
          }
          onFinish={onLogin}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a href="">Forgot password</a>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Log in
            </Button>
            or <a href="/register">Register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
