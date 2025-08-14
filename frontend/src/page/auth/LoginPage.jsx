import React, { useEffect} from "react";
import { Form, Button, message, Input, Checkbox } from "antd";
import { request } from "../../util/helper";
import { setAcccessToken, setPermission, setProfile } from "../../store/profile.store";
import { useNavigate } from "react-router-dom";
import { LockOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import "./LoginPage.css";

function LoginPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onLogin = async (values) => {
    try {
      const res = await request("auth/login", "post", values);
      if (res && res.error) {
        message.error(res.error?.message || "Login failed. Please try again.");

      } else if (res && res.access_token) {
        setAcccessToken(res.access_token);
        setProfile(JSON.stringify(res.profile));
        setPermission(JSON.stringify(res.permission));
        message.success("Login ជោគជ័យ!");
        navigate("/");
      } else {
        message.error("An unknown error occurred.");
      }
    } catch (err) {
      console.error("Login error:", err);
      message.error("An unexpected error occurred. Please try again.");
    }
  };
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Khmer:wght@400;700&family=Roboto:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);
  return (
    <div className="login-page">
      <div className="login-container" style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 6px 8px #f0f0f0' }}>
        <h2 style={{ color: '#06D6A0', fontSize: "40px" }}>LOGIN</h2>
        <Form
          form={form}
          name="login"
          initialValues={{ remember: true }}
          onFinish={onLogin}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            label={<span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' , fontWeight: 'bold', color: '#f6fbf6ff' }}>ឈ្មោះអ្នកប្រើ</span>}
            rules={[{
              required: true,
              message: "សូមបញ្ចូលឈ្មោះអ្នកប្រើប្រាស់ !"
            }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: '#c0b3b8ff' }} />}
              className="khmer-search"
              placeholder="ឈ្មោះអ្នកប្រើប្រាស់"
              type="email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif' , fontWeight: 'bold', color: '#f6fbf6ff'}}>ពាក្យសម្ងាត់</span>}
            rules={[{
              required: true,
              message: "សូមបញ្ចូលពាក្យសម្ងាត់ !"
            }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#c0b3b8ff' }} />} 
              className="khmer-search"
              placeholder="ពាក្យសម្ងាត់"
              size="large"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item>
            <div className="login-options">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a className="forgot-link" href="#">Forgot password?</a>
            </div>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit" size="large" style={{ color: '#61E786' }}>
              <LoginOutlined />
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
