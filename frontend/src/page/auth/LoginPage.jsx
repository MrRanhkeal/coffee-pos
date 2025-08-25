import React, { useEffect } from "react";
import { Form, Button, message, Input, Checkbox } from "antd";
import { request } from "../../util/helper";
import { setAcccessToken, setPermission, setProfile } from "../../store/profile.store";
import { useNavigate } from "react-router-dom";
import { LoginOutlined } from "@ant-design/icons";
import { FcLock } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
// import "./LoginPage.css";
import backgroundImage from '../../assets/coffee_Image_backgorund.png';

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
    <div className="login-page" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#f6fbf6ff' }}>
      <div className="login-container" style={{ padding: '10px', borderRadius: '10px', boxShadow: '0 6px 8px #121010ff', backgroundColor: '#3c3838ff', width: '400px', alignItems: 'center' }}>
        <h2 style={{ color: '#06D6A0', fontSize: "40px", alignItems: 'center', justifyContent: 'center', margin: '0 0 0 120px' }}>LOGIN</h2>
        
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
            // className="khmer-search"
            className="input-field"
            label={<span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif', fontWeight: 'bold', color: '#f6fbf6ff' }}>ឈ្មោះអ្នកប្រើ</span>}
            rules={[{
              required: true,
              message: "សូមបញ្ចូលអុីម៉ែលអ្នកប្រើប្រាស់ !"
            }]}
          >
            <Input
              prefix={<FcBusinessman />}
              className="khmer-search"
              placeholder="បញ្ចូលអុីម៉ែលអ្នកប្រើប្រាស់"
              type="email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            className="khmer-search"
            label={<span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif', fontWeight: 'bold', color: '#f6fbf6ff' }}>ពាក្យសម្ងាត់</span>}
            rules={[{
              required: true,
              message: "សូមបញ្ចូលពាក្យសម្ងាត់ !"
            }]}
          >
            <Input.Password
              prefix={<FcLock />}
              className="khmer-search"
              placeholder="បញ្ចូលពាក្យសម្ងាត់"
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
        
        
        
        
        
        
        {/*<Form
          form={form}
          name="login"
          initialValues={{ remember: true }}
          onFinish={onLogin}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            className="khmer-search"
            label={<span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif', fontWeight: 'bold', color: '#f6fbf6ff' }}>ឈ្មោះអ្នកប្រើ</span>}
            rules={[{
              required: true,
              message: "សូមបញ្ចូលអុីម៉ែលអ្នកប្រើប្រាស់ !"
            }]}
          >
            <Input
              prefix={<FcBusinessman />}
              className="khmer-search"
              placeholder="បញ្ចូលអុីម៉ែលអ្នកប្រើប្រាស់"
              type="email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            className="khmer-search"
            label={<span style={{ fontFamily: 'Noto Sans Khmer, Roboto, sans-serif', fontWeight: 'bold', color: '#f6fbf6ff' }}>ពាក្យសម្ងាត់</span>}
            rules={[{
              required: true,
              message: "សូមបញ្ចូលពាក្យសម្ងាត់ !"
            }]}
          >
            <Input.Password
              prefix={<FcLock />}
              className="khmer-search"
              placeholder="បញ្ចូលពាក្យសម្ងាត់"
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
        </Form> */}
      </div>
    </div>
  );
}

export default LoginPage;
