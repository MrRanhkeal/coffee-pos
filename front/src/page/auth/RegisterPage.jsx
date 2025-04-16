// import React, { useState } from 'react';
// import {Button,Input,Label} from 'antd';
// //import { } from 'react-router-dom';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { AlertCircle } from "lucide-react"
// import { request } from '../../util/helper';

// const RegisterPage = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         username: '',
//         password: '',
//         role_id: '',
//         create_by: '',
//     });
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMessage('');
//         setError('');
//         setLoading(true);

//         try {
//             // const response = await axios.post('/api/auth/register', formData);
//             const response = await request('auth/register', 'post', formData);
//             setMessage(response.data.message);
//             // Optionally, redirect to login or clear form
//             setFormData({
//                 name: '',
//                 username: '',
//                 password: '',
//                 role_id: '',
//                 create_by: '',
//             });

//         } catch (err) {
//             if (err.response && err.response.data) {
//                 setError(err.response.data.error?.message || "Registration Failed");
//             } else {
//                 setError('An unexpected error occurred.');
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
//             <Card className="w-full max-w-md">
//                 <CardHeader>
//                     <CardTitle className="text-center">Register</CardTitle>
//                     <CardDescription className="text-center">Create an account</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div>
//                             <Label htmlFor="name">Name</Label>
//                             <Input
//                                 type="text"
//                                 id="name"
//                                 name="name"
//                                 placeholder="Name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 required
//                                 className="mt-1"
//                                 disabled={loading}
//                             />
//                         </div>
//                         <div>
//                             <Label htmlFor="role_id">Role ID</Label>
//                             <Input
//                                 type="text"
//                                 id="role_id"
//                                 name="role_id"
//                                 placeholder="Role ID"
//                                 value={formData.role_id}
//                                 onChange={handleChange}
//                                 required
//                                 className="mt-1"
//                                 disabled={loading}
//                             />
//                         </div>
//                         <div>
//                             <Label htmlFor="create_by">Created By</Label>
//                             <Input
//                                 type="text"
//                                 id="create_by"
//                                 name="create_by"
//                                 placeholder="Created By"
//                                 value={formData.create_by}
//                                 onChange={handleChange}
//                                 required
//                                 className="mt-1"
//                                 disabled={loading}
//                             />
//                         </div>
//                         <div>
//                             <Label htmlFor="username">Username</Label>
//                             <Input
//                                 type="text"
//                                 id="username"
//                                 name="username"
//                                 placeholder="Username"
//                                 value={formData.username}
//                                 onChange={handleChange}
//                                 required
//                                 className="mt-1"
//                                 disabled={loading}
//                             />
//                         </div>
//                         <div>
//                             <Label htmlFor="password">Password</Label>
//                             <Input
//                                 type="password"
//                                 id="password"
//                                 name="password"
//                                 placeholder="Password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 required
//                                 className="mt-1"
//                                 disabled={loading}
//                             />
//                         </div>
//                         <Button type="submit" className="w-full" disabled={loading}>
//                             {loading ? 'Registering...' : 'Register'}
//                         </Button>
//                     </form>

//                     {message && (
//                         <Alert className="mt-4">
//                             <AlertTitle>Success</AlertTitle>
//                             <AlertDescription>{message}</AlertDescription>
//                         </Alert>
//                     )}
//                     {error && (
//                         <Alert variant="destructive" className="mt-4">
//                             <AlertCircle className="h-4 w-4" />
//                             <AlertTitle>Error</AlertTitle>
//                             <AlertDescription>{error}</AlertDescription>
//                         </Alert>
//                     )}
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };

// export default RegisterPage;



import React from 'react'
import { Form, Input, Button, Checkbox, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { request } from '../../util/helper';
import { setProfile } from '../../store/profile.store';
function RegisterPage() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    //const [formRef] = Form.useForm();
    const onRegister = async (item) => {
        var param = {
            name: item.name,
            // role_id: item.role_id,
            username: item.username,
            password: item.password,
            is_active: item.is_active
        };
        const res = await request("auth/register", "post", param);
        if (res && !res.error) {
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
            <Form layout='vertical' className='register-form' onFinish={onRegister}>
                <Form.Item name="name" label="Name">
                    <Input placeholder='name' />
                </Form.Item>
                <Form.Item name="username" label="Username">
                    <Input placeholder='Username' />
                </Form.Item>
                <Form.Item name="password" label="Password">
                    <Input placeholder='Password' type='password' />
                </Form.Item>
                {/* <Form.Item name="role_id" label="Role">
                    <Input placeholder='Role' />
                </Form.Item> */}
                <Form.Item name="remember" valuePropName="checked" >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item >
                    <Space>
                        <Button type="primary" htmlType="submit" className='btn-register'>
                            Register
                        </Button>

                        <Button type="primary" className='btn-login' onClick={() => navigate("/login")}>
                            Login
                        </Button>
                    </Space>
                </Form.Item>
            </Form>

            {/* <Alert type="error" message="Error text" banner /> */}

        </div>

    )
}

export default RegisterPage
