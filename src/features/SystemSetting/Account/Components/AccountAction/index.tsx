import React, { useEffect, useState } from 'react'
import { Card, Col, Typography, Form, Input, Button, Select } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import { dropdownIconStyle, titlePageStyle } from '../../../../Devices/components/DevicesList/Style';
import { buttonAddstyle, buttonCancelstyle, buttonstyle, formBottomStyle, formLeftStyle, formRightStyle, inputStyle, titlePageStyle as T } from './Style';
import { layoutStyle } from './Style';
import { useHistory } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { accountData } from '../../../../../constants/interface';
import { useParams } from 'react-router-dom'
const { Title, Text } = Typography;
const { Option } = Select;
type QuizParams = {
    key: string;
};
interface Props {
    data: accountData[],
    addNewData: any
}

const roleData = ['Kế toán', 'Thu ngân', 'Quản lý']
const activeData = ['Đang hoạt động', 'Ngừng hoạt động']

const AccountAction: React.FC<Props> = (props: Props) => {
    const [userName, setUserName] = useState(String)
    const [email, setEmail] = useState(String);
    const [fullName, setFullName] = useState(String);
    const [phoneNumber, setPhoneNumber] = useState(String);
    const [password, setPassword] = useState(String);
    const [retypePassword, setReTypePassword] = useState(String);
    const [role, setRole] = useState(String);
    const [active, setActive] = useState<Boolean>()
    let history = useHistory();
    let { key } = useParams<QuizParams>();
    const { addNewData, data } = props
    const onBack = () => {
        history.goBack()
    }

    useEffect(() => {
        for (let i = 0; i < 46; i++) {
            if (key === (data[i].key).toString()) {
                setUserName(data[i].userName)
            }
        }
    }, [])
    const onAddDevice = () => {
        const device = {
            userName: userName,
            fullName: fullName,
            phoneNumber: phoneNumber,
            email: email,
            role: 'Kế Toán',
            password: password,
            active: active
        }
        addNewData(device)
        console.log(device)
        console.log(userName)
    }
    return (
        <div>
            <Title level={3} style={titlePageStyle}>
                Quản lý tài khoản
            </Title>
            <Card style={layoutStyle}>
                <Title level={4} style={T}>
                    Thông tin tài khoản
                </Title>
                <Col span={6}>
                    <Form layout='vertical' style={formLeftStyle}>
                        <Form.Item
                            name='fullName'
                            label='Họ tên'
                            rules={[{ required: true }]}>
                            <Input
                                name='fullName'
                                style={inputStyle}
                                placeholder='Nhập họ tên'
                                onChange={(e) => { setFullName(e.target.value) }}
                            />
                        </Form.Item>
                        <Form.Item
                            name='phoneNumber'
                            label='Số điện thoại'
                            rules={[{ required: true }]}
                        >
                            <Input
                                name='phoneNumber'
                                style={inputStyle}
                                placeholder='Nhập số điện thoại'
                                onChange={(e) => { setPhoneNumber(e.target.value) }}
                            />
                        </Form.Item>
                        <Form.Item
                            name='Email'
                            label='Email'
                            rules={[{ required: true }]}
                        >
                            <Input
                                name='email'
                                style={inputStyle}
                                placeholder='Nhập địa chỉ email'
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                        </Form.Item>
                        <Form.Item
                            name='role'
                            label='Vai trò'
                            rules={[{ required: true }]}
                        >
                            <Select
                                placeholder='Chọn vai trò'
                                size='middle'
                                suffixIcon={
                                    <CaretDownOutlined
                                        style={dropdownIconStyle}
                                    />
                                }
                                onChange={(e) => setRole(e)}
                                style={{ height: 44.15 }}
                            >
                                {roleData.map((role) => (
                                    <Option key={role} value={role}>{role}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={6}>
                    <Form layout='vertical' style={formRightStyle}>
                        <Form.Item
                            name='userName'
                            label='Tên đăng nhập'
                            rules={[{ required: true }]}
                        >
                            <Input
                                name='userName'
                                style={inputStyle}
                                placeholder='Nhập tên đăng nhập'
                                onChange={(e) => { setUserName(e.target.value) }}
                            />
                        </Form.Item>
                        <Form.Item
                            label='Mật khẩu'
                            name='user'
                            rules={[{ required: true }]}
                        >
                            <Input.Password
                                name='password'
                                size='large'
                                placeholder="Nhập mật khẩu"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                style={{
                                    borderRadius: 8, color: '#D4D4D7', border: '1.5px solid #D4D4D7', fontSize: 14, height: 44.15, marginTop: -7
                                }}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            label='Nhập lại mật khẩu'
                            rules={[{ required: true }]}
                        >
                            <Input.Password
                                name='password'
                                size='large'
                                placeholder="nhập lại mật khẩu"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                style={{
                                    borderRadius: 8, color: '#D4D4D7', border: '1.5px solid #D4D4D7', fontSize: 14, height: 44.15
                                }}
                                onChange={(e) => { setReTypePassword(e.target.value) }}
                            />
                        </Form.Item>
                        <Form.Item
                            name='active'
                            label='Tình trạng'
                            rules={[{ required: true }]}
                            style={{ marginTop: 30 }}
                        >
                            <Select
                                placeholder='Chọn tình trạng'
                                size='middle'
                                suffixIcon={
                                    <CaretDownOutlined
                                        style={dropdownIconStyle}
                                    />
                                }
                                style={{ height: 44.15 }}
                                onChange={(e) => setActive(e)}
                            >
                                {activeData.map((active) => (
                                    <Option key={active} value={active === 'Đang hoạt động' ? true : false}>{active}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>

                </Col>
                <Form style={{ position: 'absolute', top: 442 }}>
                    <Form.Item name='batbuoc' rules={[{ required: true }]} label=' '> <Text style={{ fontWeight: 400, width: 300, marginTop: -10 }}>Là trường thông tin bắt buộc</Text></Form.Item>
                </Form>
            </Card>
            <Form layout='inline' style={buttonstyle}>
                <Form.Item>
                    <Button style={buttonCancelstyle} onClick={onBack}>Hủy</Button>
                </Form.Item>
                <Form.Item>
                    <Button style={buttonAddstyle} onClick={onAddDevice}>{key ? 'Cập nhật' : 'Thêm tài khoản'}</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AccountAction
