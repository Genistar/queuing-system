import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, Redirect, useHistory } from 'react-router-dom';

type Props = {}

const LoginForm = (props: Props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()
    const onHandleLogin = (e: any) => {
        e.preventDefault();
        var login = {
            username: username,
            password: password
        }
        console.log(login)
        history.push('/admin')
        window.location.reload()
    }
    return (
        <Form
            name="basic"
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            autoComplete="off"
            layout='vertical'
            style={{ width: '100%', marginLeft: '16%', marginTop: '8%' }}
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
                    name='username' size='large' placeholder="input username" style={{ borderRadius: '6px', marginTop: '10px', height: '44px' }}
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
                    name='password'
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
                <a style={{ color: 'red', fontSize: '14px' }} href="/login/forgetpassword">
                    Quên mật khẩu?
                </a>

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
                    onClick={(e) => onHandleLogin(e)}
                >
                    Đăng nhập
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm