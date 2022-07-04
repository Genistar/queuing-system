import React from 'react'
import { useParams } from 'react-router-dom'
import { Card, Col, Typography, Form, Input, Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { buttonAddstyle, buttonCancelstyle, buttonstyle, formBottomStyle, formLeftStyle, formRightStyle, inputStyle, layoutStyle, titlePageStyle as T, titlePageStyle } from './Style';
import { addDeviceStyle, addTextStyle, cardButtonAddStyle, iconAddStyle } from '../DevicesList/Style';
const { Title, Text } = Typography;
type QuizParams = {
    id: string;
};
interface Props {
    data: {
        id: number;
        key: string;
        name: string;
        address: string;
        active: string;
        connect: string;
        service: string;
    }[]
}
const DeviceDetail: React.FC<Props> = (props: Props) => {
    let { data } = props
    let { id } = useParams<QuizParams>();
    const Detail = data?.map(d => {
        if (id === d.id.toString()) {
            return (
                <Card style={layoutStyle}>
                    <Title level={4} style={T}>
                        Thông tin thiết bị
                    </Title>
                    <Col span={6}>
                        <Form style={formLeftStyle}>
                            <Form.Item
                                name='deviceId'
                                label='Mã Thiết bị'
                                rules={[{ required: true }]}>
                                <Text>{d.key}</Text>
                            </Form.Item>
                            <Form.Item
                                name='deviceName'
                                label='Tên thiết bị'
                                rules={[{ required: true }]}
                            >
                                <Text>{d.name}</Text>
                            </Form.Item>
                            <Form.Item
                                name='ipaddress'
                                label='Địa chỉ IP'
                                rules={[{ required: true }]}
                            >
                                <Text>{d.address}</Text>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={6}>
                        <Form style={formRightStyle}>
                            <Form.Item
                                name='loaithietbi'
                                label='Loại Thiết bị'
                                rules={[{ required: true }]}
                            >
                                <Text>{d.name}</Text>
                            </Form.Item>
                            <Form.Item
                                label='Tên đăng nhập'
                                name='user'
                                rules={[{ required: true }]}
                            >
                                <Text>{d.name}</Text>
                            </Form.Item>
                            <Form.Item
                                name='password'
                                label='Mật khẩu'
                                rules={[{ required: true }]}
                            >
                                <Text>{d.connect}</Text>
                            </Form.Item>
                        </Form>

                    </Col>
                    <Form style={formBottomStyle}>
                        <Form.Item
                            name='service'
                            label='Dịch vụ sử dụng'
                            rules={[{ required: true }]}
                        >
                            <Text>{d.service}</Text>
                        </Form.Item>

                    </Form>
                </Card>
            )
        }

    })
    return (
        <div>
            <Title level={3} style={titlePageStyle}>
                Danh Sách Thiết Bị
            </Title>
            {Detail}
            <a style={addDeviceStyle} href='/admin/devices/add'>
                <Card style={cardButtonAddStyle}>
                    <EditOutlined style={iconAddStyle} />
                </Card>
                <Text style={addTextStyle}>Cập nhật <br />thiết bị</Text>
            </a>
        </div>
    )
}

export default DeviceDetail