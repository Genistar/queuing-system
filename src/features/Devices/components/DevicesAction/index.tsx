import React, { useState } from 'react'
import { Card, Col, Typography, Form, Input, Button, Select } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import { dropdownIconStyle, titlePageStyle } from '../DevicesList/Style';
import { buttonAddstyle, buttonCancelstyle, buttonstyle, formBottomStyle, formLeftStyle, formRightStyle, inputStyle, titlePageStyle as T } from './Style';
import { layoutStyle } from './Style';
import { useHistory } from 'react-router-dom';
import { devicesData } from '../../../../constants/interface';
import { useParams } from 'react-router-dom'
const { Title, Text } = Typography;
const { Option } = Select;
type QuizParams = {
    key: string;
};
type Props = {
}

const deviceTypeData = ['Kiosk', 'Display counter', 'Endoscopy device']

const DevicesAction: React.FC<Props> = (props: Props) => {
    const [deviceType, setDeviceType] = useState(String)
    const [deviceId, setDeviceId] = useState(String);
    const [name, setName] = useState(String);
    const [ipAddress, setIpAddress] = useState(String);
    const [user, setUser] = useState(String);
    const [password, setPassword] = useState(String);
    const [service, setService] = useState(String)
    let history = useHistory();
    let { key } = useParams<QuizParams>();
    const onBack = () => {
        history.goBack()
    }
    const handleChange = (value: any) => {
        setDeviceType(value)
    }
    const onAddDevice = () => {
        const device = {
            deviceName: name,
            deviceType: deviceType,
            deviceId: deviceId,
            ipAddress: ipAddress,
            user: user,
            password: password,
            service: service
        }
        if (key === deviceId) {
            console.log('Cập nhật thiết bị : ' + device.deviceName)
        }
        else {
            console.log('Thêm thiết bị')
        }

    }
    return (
        <div>
            <Title level={3} style={titlePageStyle}>
                Danh Sách Thiết Bị
            </Title>
            <Card style={layoutStyle}>
                <Title level={4} style={T}>
                    {key ? 'Cập nhật thiết bị' : 'Thông tin thiết bị'}
                </Title>
                <Col span={6}>
                    <Form layout='vertical' style={formLeftStyle}>
                        <Form.Item
                            name='deviceId'
                            label='Mã Thiết bị'
                            rules={[{ required: true }]}>
                            <Input
                                name='devicesId'
                                style={inputStyle}
                                placeholder='Nhập mã thiết bị'
                                onChange={(e) => { setDeviceId(e.target.value) }}
                            />
                        </Form.Item>
                        <Form.Item
                            name='deviceName'
                            label='Tên thiết bị'
                            rules={[{ required: true }]}
                        >
                            <Input
                                name='deviceName'
                                style={inputStyle}
                                placeholder='Nhập mã thiết bị'
                                onChange={(e) => { setName(e.target.value) }}
                            />
                        </Form.Item>
                        <Form.Item
                            name='ipaddress'
                            label='Địa chỉ IP'
                            rules={[{ required: true }]}
                        >
                            <Input
                                name='ipaddress'
                                style={inputStyle}
                                placeholder='Nhập mã thiết bị'
                                onChange={(e) => { setIpAddress(e.target.value) }}
                            />
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={6}>
                    <Form layout='vertical' style={formRightStyle}>
                        <Form.Item
                            name='loaithietbi'
                            label='Loại Thiết bị'
                            rules={[{ required: true }]}
                        >
                            <Select
                                placeholder='Chọn loại thiết bị'
                                size='middle'
                                suffixIcon={
                                    <CaretDownOutlined
                                        style={dropdownIconStyle}
                                    />
                                }
                                value={deviceType}
                                onChange={handleChange}
                            >
                                {deviceTypeData.map((type) => (
                                    <Option key={type} value={type}>{type}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='Tên đăng nhập'
                            name='user'
                            rules={[{ required: true }]}
                        >
                            <Input
                                name='user'
                                style={inputStyle}
                                placeholder='Nhập mã thiết bị'
                                onChange={(e) => { setUser(e.target.value) }}
                            />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            label='Mật khẩu'
                            rules={[{ required: true }]}
                        >
                            <Input
                                name='password'
                                style={inputStyle}
                                placeholder='Nhập mã thiết bị'
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </Form.Item>
                    </Form>

                </Col>
                <Form layout='vertical' style={formBottomStyle}>
                    <Form.Item
                        name='service'
                        label='Dịch vụ sử dụng'
                        rules={[{ required: true }]}
                    >
                        <Input
                            name='service'
                            style={inputStyle}
                            placeholder='Nhập mã thiết bị'
                            onChange={(e) => { setService(e.target.value) }}
                        />
                    </Form.Item>

                </Form>
                <Form style={{ position: 'absolute', top: 442 }}>
                    <Form.Item name='batbuoc' rules={[{ required: true }]} label=' '> <Text style={{ fontWeight: 400, width: 300, marginTop: -10 }}>Là trường thông tin bắt buộc</Text></Form.Item>
                </Form>
            </Card>
            <Form layout='inline' style={buttonstyle}>
                <Form.Item>
                    <Button style={buttonCancelstyle} onClick={onBack}>Hủy</Button>
                </Form.Item>
                <Form.Item>
                    <Button style={buttonAddstyle} onClick={onAddDevice}>{key ? 'Cập nhật' : 'Thêm thiết bị'}</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default DevicesAction
