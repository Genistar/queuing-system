import React from 'react';
import { Input, Form, Image, Button } from 'antd'
import { inputStyle, itemStyle, labelStyle } from './Style';
import { CameraOutlined } from '@ant-design/icons';
var image = require('../../assets/HKicon.png')
type Props = {}
const DetailUserPage: React.FC = (props: Props) => {
    const [form] = Form.useForm();
    return (
        <Form
            layout='inline'
            form={form}
            className='site-layout-background'
            style={{
                padding: 24,
                minHeight: 360,
                borderRadius: 20,
            }}
        >
            <Form>
                <Form.Item>
                    <Image
                        style={{ borderRadius: '100%', marginTop: '5%', position: 'absolute' }}
                        src={image}
                        width={248}
                        height={248}
                        preview={false}
                    />
                    <Button icon={<CameraOutlined style={{ color: '#ffffff' }} />} style={{
                        backgroundColor: '#FF7506',
                        border: '2px solid #FFFFFF',
                        borderRadius: '100%',
                        position: 'absolute',
                        margin: '85% -30% 0',
                        height: 45,
                        width: 45
                    }}></Button>
                </Form.Item>
                <Form.Item style={{ marginTop: '5%' }}>
                    <label style={labelStyle}> Trần Trí Trung</label>
                </Form.Item>
            </Form>

            <Form layout='vertical'>
                <Form.Item style={itemStyle} label='Tên người dùng'>
                    <Input name='name' size='large' disabled={true} placeholder='Trần Trí Trung' style={inputStyle} />
                </Form.Item>
                <Form.Item style={itemStyle} label='Số điện thoại'>
                    <Input name='name' size='large' disabled={true} placeholder='Trần Trí Trung' style={inputStyle} />
                </Form.Item>
                <Form.Item style={itemStyle} label='Email'>
                    <Input name='name' size='large' disabled={true} placeholder='Trần Trí Trung' style={inputStyle} />
                </Form.Item>
            </Form>
            <Form layout='vertical'>
                <Form.Item style={itemStyle} label='Tên đăng nhập'>
                    <Input name='name' size='large' disabled={true} placeholder='Trần Trí Trung' style={inputStyle} />
                </Form.Item>
                <Form.Item style={itemStyle} label='Mật khẩu'>
                    <Input name='name' size='large' disabled={true} placeholder='Trần Trí Trung' style={inputStyle} />
                </Form.Item>
                <Form.Item style={itemStyle} label='Vai trò'>
                    <Input name='name' size='large' disabled={true} placeholder='Trần Trí Trung' style={inputStyle} />
                </Form.Item>
            </Form>

        </Form>
    )
}

export default DetailUserPage