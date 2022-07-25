import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

type Props = {
}

const ForgetPassword: React.FC<Props> = (props: Props) => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate()
  const onGetEmail = (e: any) => {
    e.preventDefault()
    console.log(email)
    navigate('/auth/renewpassword')
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
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <h5 style={{ fontSize: '22px', textAlignLast: 'center' }}>Đặt lại mật khẩu</h5>
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        style={{ marginTop: '-10px' }}
      >
        <label style={{ fontSize: '18px' }}>Vui lòng nhập email để đặt lại mật khẩu của bạn *</label>
        <Input
          name='email'
          size='large'
          placeholder="Nhập địa chỉ email"
          style={{ borderRadius: '6px', marginTop: '5px', height: '44px' }}
          onChange={(e) => setEmail(e.target.value)}
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
          size='large'
          style={{ backgroundColor: '#F7F7F7', borderColor: '#FF9138', borderRadius: '10px', width: '25%', fontSize: '16px', marginLeft: '-10%', color: '#FF9138' }}
          onClick={() => { navigate('../login') }}
        >
          Quay lại
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          size='large'
          style={{ backgroundColor: '#FF9138', borderRadius: '10px', width: '25%', fontSize: '16px', marginTop: '-10px', marginLeft: '15px', borderColor: 'white' }}
          onClick={(e) => onGetEmail(e)}
        >
          Tiếp tục
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ForgetPassword