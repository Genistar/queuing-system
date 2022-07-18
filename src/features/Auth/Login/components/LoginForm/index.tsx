import { Button, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../store';
import { load, login, userSelector } from '../../../../SystemSetting/Account/userSlice';

interface loginform {
    username: string;
    password: string;
}
type Props = {
}
const LoginForm: React.FC<Props> = (props: Props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [form] = Form.useForm()
    const history = useHistory()
    const dispatch = useAppDispatch();
    const { authLoading, message, userLogin } = useAppSelector(userSelector);
    const onHandleLogin = (e: any) => {
        const value = {
            username: username,
            password: password
        }
        dispatch(login(value)).then(() => dispatch(load()));
        console.log(value)
    }
    useEffect(() => {
        dispatch(load())
    }, []);

    useEffect(() => {
        if (userLogin) {
            history.push("/admin/dashboard");
        }
    }, [userLogin]);
    return (
        <Form
            name="login"
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            autoComplete="off"
            layout='vertical'
            style={{ width: '100%', marginLeft: '16%', marginTop: '8%' }}
            form={form}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <label style={{ fontSize: '18px' }}>Tên đăng nhập *</label>
                <Input
                    size='large' placeholder="input username" style={{ borderRadius: '6px', marginTop: '10px', height: '44px' }}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                style={{ marginTop: '-10px' }}
            >
                <label style={{ fontSize: '18px' }}>Mật khẩu *</label>
                <Input.Password
                    size='large'
                    placeholder="input password"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    style={{ borderRadius: '6px', marginTop: '5px', height: '44px' }}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 0,
                    span: 0,
                }}
                style={{ marginTop: '-15px' }}
            >
                <Link style={{ color: 'red', fontSize: '14px' }} to="/login/forgetpassword">
                    Quên mật khẩu?
                </Link>

            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 5,
                    span: 0,
                }}
            >
                <Button
                    type="primary"
                    htmlType="submit"
                    size='large'
                    style={{ backgroundColor: '#FF9138', borderRadius: '10px', width: '30%', fontSize: '16px', marginTop: '-10px' }}
                    loading={authLoading}
                    onClick={onHandleLogin}
                >
                    Đăng nhập
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm