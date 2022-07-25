import { Button, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
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
    const [required, setRequired] = useState(Boolean);
    const [messageInput, setMessageInput] = useState<any>('');
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const { authLoading, message, userLogin } = useAppSelector(userSelector);
    const onHandleLogin = (e: any) => {

        const value = {
            username: username,
            password: password
        }
        dispatch(login(value)).then(() => dispatch(load()));
        console.log(messageInput)

    }
    useEffect(() => {
        dispatch(load())
    }, []);

    useEffect(() => {
        if (userLogin) {
            navigate('/admin/dashboard')
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
                        required: message.fail,
                        message: '',
                    },
                ]}
            >
                <label style={{ fontSize: '18px' }}>Tên đăng nhập *</label>
                <Input
                    size='large' placeholder="Nhập tài khoản" style={{ borderRadius: '6px', marginTop: '10px', height: '44px' }}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    {
                        required: message.fail,
                        message: message.text,
                    },
                ]}
                style={{ marginTop: '-10px' }}
            >
                <label style={{ fontSize: '18px' }}>Mật khẩu *</label>
                <Input.Password
                    size='large'
                    placeholder="Nhập mật khẩu"
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
                style={{ top: message.fail === false ? 451 : 521, left: message.fail === false ? 104 : 257, position: 'absolute' }}
            >
                <Link style={{ color: 'red', fontSize: '14px' }} to="/auth/forgetpassword">
                    Quên mật khẩu?
                </Link>

            </Form.Item>
            <Button
                type="primary"
                htmlType="submit"
                size='large'
                style={{ backgroundColor: '#FF9138', borderRadius: '10px', width: 162, height: 40, fontSize: '16px', marginTop: 10, marginLeft: 120 }}
                loading={authLoading}
                onClick={onHandleLogin}
            >
                Đăng nhập
            </Button>
        </Form>
    )
}

export default LoginForm