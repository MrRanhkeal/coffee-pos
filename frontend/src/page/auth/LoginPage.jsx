import React from 'react';
import { setAccesToken, setProfile } from '../../store/profile.store';
import { request } from '../../util/helper';
import { Button, Form, Input, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onLogin = async (items) => {
        try{
            var params = {
                username: items.username,
                password: items.password
            }
            const res = await request("auth/login", "post", params);
            if(res && !res.error){
                //setAccessToken(res.access_token);
                setAccesToken(res.access_token);
                //convert json to string: convert obj to string json
                setProfile(JSON.stringify(res.profile));
                navigate("/");
            }
            else{
                alert(JSON.stringify(res));
            }
        }
        catch(error){
            console.log("err",error)
        }
    }
    return (
        // <div>LoginPage</div>
        <div >
            <h1 className='login-register'>Login</h1>
            <Form layout='vertical' className='register-form' form={form} onFinish={onLogin}>
                <Form.Item name="username" label="Username" >
                    <Input placeholder='Username' />
                </Form.Item>
                <Form.Item name="password" label="Password">
                    <Input placeholder='Password' type='password'/>
                </Form.Item>

                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit" className='btn-login' >
                            Login
                        </Button>
                    </Space>
                </Form.Item>

            </Form>
        </div>
    )
}

export default LoginPage