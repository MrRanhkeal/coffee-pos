// import React from 'react'

// function RegisterPage() {
//   return (
//     <div>RegisterPage</div>
//   )
// }

// export default RegisterPage
import React from 'react';
import { Form, Input, Button, Checkbox, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { request } from '../../util/helper';
import { setAccesToken, setProfile } from '../../store/profile.store';




function RegisterPage() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    //const [formRef] = Form.useForm();
    const onRegister = async(item) => {
        var param = {
            name: item.name,
            role_id: item.role_id,
            username: item.username,
            password: item.password,
            is_active: item.is_active
        };
        const res = await request("auth/register", "post", param);
        if (res && !res.error) {
            setAccesToken(res.access_token);
            setProfile(JSON.stringify(res.profile));
            navigate("/login");
        }
        else {
            alert(JSON.stringify(res));
        }
    }
    return (
        <div>
            <h1 className='login-register'>Register</h1>
            <Form layout='vertical' className='register-form' form={form} onFinish={onRegister}>
                <Form.Item name="name" label="Name">
                    <Input placeholder='name' />
                </Form.Item>
                <Form.Item name="username" label="Username">
                    <Input placeholder='Username' />
                </Form.Item>
                <Form.Item name="password" label="Password">
                    <Input placeholder='Password' type='password'/>
                </Form.Item>
                <Form.Item name="role_id" label="Role">
                    <Input placeholder='Role' />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked" >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item >
                    <Space>
                        <Button type="primary" htmlType="submit"  className='btn-register'>
                            Register
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
            
        
            {/* <Alert type="error" message="Error text" banner /> */}
    
        </div>
    )
}

export default RegisterPage