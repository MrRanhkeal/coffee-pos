import React from 'react';
import { setAccesToken, setPermission, setProfile } from '../../store/profile.store';
import { request } from '../../util/helper';
import { Button, Checkbox, Flex, Form, Input, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onLogin = async (items) => {
        
        var params = {
            username: items.username,
            password: items.password
        };
        const res = await request("auth/login", "post", params);
        if(res && !res.error){
            //setAccessToken(res.access_token);
            setAccesToken(res.access_token);
            //convert json to string: convert obj to string json
            setPermission(JSON.stringify(res.permission));
            setProfile(JSON.stringify(res.profile));
            navigate("/");
        }
        else{
            alert(JSON.stringify(res));
        }
        
    }
    return (
        // <div>LoginPage</div>
        <div >
            <h1 className='login-register'>Login</h1>
            <Form 
                name='login'
                initialValues={{ 
                    remember: true ,
                }}
                onFinish={onLogin}
                layout='vertical' className='register-form' >
                <Form.Item name="username" label="Username" >
                    <Input placeholder='Username' />
                </Form.Item>
                <Form.Item name="password" label="Password">
                    <Input placeholder='Password' type='password'/>
                </Form.Item>
                <Form.Item>
                    <Flex justify='space-between' align='center'>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>
                                Remember me
                            </Checkbox>
                        </Form.Item>
                    </Flex>
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit" className='btn-login' >
                            Login
                        </Button>
                        <Button type="primary" className='btn-register' onClick={() => navigate("/register")}>
                            Register  
                        </Button>
                    </Space>
                </Form.Item>
                
            </Form>
        </div>
    )
}

export default LoginPage