import React, { useEffect, useState } from 'react'
import { Card, Col, Typography, Form, Input, Button, Select, message as notice } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import { dropdownIconStyle, titlePageStyle } from '../DevicesList/Style';
import { buttonAddstyle, buttonCancelstyle, buttonstyle, formBottomStyle, formLeftStyle, formRightStyle, inputStyle, titlePageStyle as T } from './Style';
import { layoutStyle } from './Style';
import { useParams, useNavigate } from 'react-router-dom';
import tagRender from './tagProps';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { add, deviceSelector, get, update } from '../../deviceSlice';
import { add as addDiary } from '../../../SystemSetting/DairyUser/diarySlice'
import { deviceType } from '../../../../constants/interface';
import { userSelector } from '../../../SystemSetting/Account/userSlice';
import { Timestamp } from 'firebase/firestore';
const { Title, Text } = Typography;
const { Option } = Select;
type Props = {
}

const deviceTypeData = ['Kiosk', 'Display counter', 'Endoscopy device'];
const serviceData = [
    {
        value: 'Khám tim mạch',
    },
    {
        value: 'Khám Sản - Phụ Khoa',
    },
    {
        value: 'Khám răng hàm mặt',
    },
    {
        value: 'Khám hô hấp',
    },
    {
        value: 'Khám tổng quát'
    }
];

const DevicesAction: React.FC<Props> = (props: Props) => {
    const [deviceType, setDeviceType] = useState(String)
    const [deviceId, setDeviceId] = useState(String);
    const [name, setName] = useState(String);
    const [ipAddress, setIpAddress] = useState(String);
    const [user, setUser] = useState(String);
    const [password, setPassword] = useState(String);
    const [service, setService] = useState<string[]>([]);
    const { userLogin } = useAppSelector(userSelector)
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const { device } = useAppSelector(deviceSelector)
    let navigate = useNavigate();
    let { key } = useParams();
    const onBack = () => {
        navigate('../')
    }
    const handleChange = (value: any) => {
        setDeviceType(value)
    }
    const onAddDevice = () => {
        const newDevice: deviceType = {
            name: name,
            type: deviceType,
            deviceId: deviceId,
            ip: ipAddress,
            username: user,
            password: password,
            services: service,
            isActive: false,
            isConnect: true
        }
        if (!key) {
            dispatch(add(newDevice)).then((data) => {
                if (data.meta.requestStatus === 'fulfilled') {
                    notice.success('Thêm thành công ', 3);
                    dispatch(addDiary({
                        username: userLogin ? userLogin.username : '',
                        ip: newDevice.ip,
                        action: `Thêm thiết bị ${newDevice.name}`,
                        time: Timestamp.fromDate(new Date())
                    }))
                    navigate('../')
                }
                else {
                    notice.success('Đã xảy ra lỗi', 2);
                }
            })
        } else {
            dispatch(update({
                id: key,
                ...newDevice
            })).then((data) => {
                if (data.meta.requestStatus === 'fulfilled') {
                    notice.success('Cập nhật thành công ', 3);
                    dispatch(addDiary({
                        username: userLogin ? userLogin.username : '',
                        ip: newDevice.ip,
                        action: `Cập nhật thiết bị ${newDevice.name}`,
                        time: Timestamp.fromDate(new Date())
                    }))
                    navigate('../')
                }
                else {
                    notice.success('Đã xảy ra lỗi', 2)
                }
            })
        }

    }
    useEffect(() => {
        if (key) {
            form.setFieldsValue(device)
        }

    }, [device])
    useEffect(() => {
        if (key) {
            dispatch(get(key))
        }
    }, [key])
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
                    <Form layout='vertical' style={formLeftStyle} form={form}>
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
                            name='name'
                            label='Tên thiết bị'
                            rules={[{ required: true }]}
                        >
                            <Input
                                name='name'
                                style={inputStyle}
                                placeholder='Nhập mã thiết bị'
                                onChange={(e) => { setName(e.target.value) }}
                            />
                        </Form.Item>
                        <Form.Item
                            name='ip'
                            label='Địa chỉ IP'
                            rules={[{ required: true }]}
                        >
                            <Input
                                name='ip'
                                style={inputStyle}
                                placeholder='Nhập mã thiết bị'
                                onChange={(e) => { setIpAddress(e.target.value) }}
                            />
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={6}>
                    <Form layout='vertical' style={formRightStyle} form={form}>
                        <Form.Item
                            name='type'
                            label='Loại Thiết bị'
                            rules={[{ required: true }]}
                            style={{ marginTop: -5 }}
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
                                style={{ marginTop: -4 }}
                            >
                                {deviceTypeData.map((type) => (
                                    <Option key={type} value={type}>{type}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='Tên đăng nhập'
                            name='username'
                            rules={[{ required: true }]}
                            style={{ marginTop: 28 }}
                        >
                            <Input
                                name='username'
                                style={inputStyle}
                                placeholder='Nhập mã thiết bị'
                                onChange={(e) => { setUser(e.target.value) }}
                            />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            label='Mật khẩu'
                            rules={[{ required: true }]}
                            style={{ marginTop: 21 }}
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
                <Form layout='vertical' style={formBottomStyle} form={form}>
                    <Form.Item
                        name='services'
                        label='Dịch vụ sử dụng'
                        rules={[{ required: true }]}
                    >
                        <Select
                            mode="multiple"
                            showArrow
                            tagRender={tagRender}
                            style={{ width: '100%' }}
                            options={serviceData}
                            onChange={(e) => { setService(e) }}
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
