import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

type Props = {}
const ResetPassword = (props: Props) => {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [required, setRequired] = useState(Boolean);
    const [message, setMessage] = useState('');
    let navigate = useNavigate()
    const onChangePassword = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (password && passwordConfirm) {
            setRequired(false)
            if (password === passwordConfirm) {
                console.log('Cấp lại mật khẩu thành công mật khẩu mới của bạn là' + password)
                navigate('/auth/login')
                window.location.reload()
            }
            else {
                setRequired(true)
                setMessage('Mật khẩu và xác nhận mật khẩu khác nhau!')
            }
        }
        else {
            setRequired(true)
            setMessage('Chưa nhập đầy đủ thông tin')
        }
        console.log(required)

    }
    const onFailed = (errorInfor: any) => {
        console.log(errorInfor)
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
            layout='vertical'
            style={{ width: '100%', marginLeft: '16%', marginTop: '8%' }}
            onFinishFailed={onFailed}
            autoComplete="off"
        >
            <Form.Item
            >
                <h5 style={{ fontSize: '22px', textAlignLast: 'center' }}>Đặt lại mật khẩu mới *</h5>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{
                    required: required,
                    message: ''
                }
                ]}
                style={{ marginTop: '-30px' }}
            >
                <label style={{ fontSize: '18px' }}>Mật khẩu</label>
                <Input.Password
                    name='password'
                    size='large'
                    placeholder="Nhập mật khẩu"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    style={{ borderRadius: '6px', marginTop: '5px', height: '44px' }}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Item>
            <Form.Item
                name="passwordRetype"
                rules={[{
                    required: required,
                    message: message
                }
                ]}
                style={{ marginTop: '-10px' }}
            >
                <label style={{ fontSize: '18px' }}>Nhập lại mật khẩu</label>
                <Input.Password
                    size='large'
                    name="passwordConfirm"
                    placeholder="Nhập xác nhập mật khẩu"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    style={{ borderRadius: '6px', marginTop: '5px', height: '44px' }}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                />
            </Form.Item>
            <Form.Item
                name="button"
                wrapperCol={{
                    offset: 5,
                    span: 0,
                }}
            >
                <Button
                    type="primary"
                    htmlType="submit"
                    size='large'
                    style={{ backgroundColor: '#FF9138', borderRadius: '10px', width: '25%', fontSize: '16px', marginTop: '10px', marginLeft: '15px', borderColor: 'white' }}
                    onClick={(e) => onChangePassword(e)}
                >
                    Tiếp tục
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ResetPassword