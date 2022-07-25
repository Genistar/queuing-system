import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, Col, Typography, Form, Input, Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { formBottomStyle, formLeftStyle, formRightStyle, layoutStyle, textStyle, titlePageStyle as T, titlePageStyle } from './Style';
import { addDeviceStyle, addTextStyle, cardButtonAddStyle, iconAddStyle } from '../DevicesList/Style';
import { devicesData } from '../../../../constants/interface';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { deviceSelector, get } from '../../deviceSlice';
import { useForm } from 'rc-field-form';
const { Title, Text } = Typography;
type QuizParams = {
    key: any;
};
interface Props {
}
const DeviceDetail: React.FC<Props> = (props: Props) => {
    let { key } = useParams<QuizParams>();
    const [form] = Form.useForm();
    const dispatch = useAppDispatch()
    const { loading, device } = useAppSelector(deviceSelector)
    useEffect(() => {
        dispatch(get(key))
        console.log(device)
    }, [key])
    return (
        <div>
            <Title level={3} style={titlePageStyle}>
                Danh Sách Thiết Bị
            </Title>
            <Card style={layoutStyle}>
                <Title level={4}>
                    Thông tin thiết bị
                </Title>
                <Col span={6}>
                    <Form style={formLeftStyle}>
                        <Form.Item
                            name='deviceId'
                            label='Mã Thiết bị'
                            rules={[{ required: true }]}>
                            <Text style={textStyle}>{device?.deviceId}</Text>
                        </Form.Item>
                        <Form.Item
                            name='name'
                            label='Tên thiết bị'
                            rules={[{ required: true }]}
                        >
                            <Text style={textStyle}>{device?.name}</Text>
                        </Form.Item>
                        <Form.Item
                            name='ip'
                            label='Địa chỉ IP'
                            rules={[{ required: true }]}
                        >
                            <Text style={textStyle}>{device?.ip}</Text>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={6}>
                    <Form style={formRightStyle}>
                        <Form.Item
                            name='type'
                            label='Loại Thiết bị'
                            rules={[{ required: true }]}
                        >
                            <Text style={textStyle}>{device?.type}</Text>
                        </Form.Item>
                        <Form.Item
                            label='Tên đăng nhập'
                            name='username'
                            rules={[{ required: true }]}
                        >
                            <Text style={textStyle}>{device?.username}</Text>
                        </Form.Item>
                        <Form.Item
                            name='password'
                            label='Mật khẩu'
                            rules={[{ required: true }]}
                        >
                            <Text style={textStyle}>{device?.password}</Text>
                        </Form.Item>
                    </Form>

                </Col>
                <Form style={formBottomStyle}>
                    <Form.Item
                        name='service'
                        label='Dịch vụ sử dụng'
                        rules={[{ required: true }]}
                    >
                        <Text style={textStyle}>
                            {

                                device?.services.map((datas: any) => {
                                    return device?.services.find(
                                        (data: any) => data === datas
                                    )
                                }).join(', ')
                            }

                        </Text>
                    </Form.Item>

                </Form>
            </Card>

            <Link style={addDeviceStyle} to='/admin/devices/update/:key'>
                <Card style={cardButtonAddStyle}>
                    <EditOutlined style={iconAddStyle} />
                </Card>
                <Text style={addTextStyle}>Cập nhật <br />thiết bị</Text>
            </Link>
        </div>
    )
}

export default DeviceDetail