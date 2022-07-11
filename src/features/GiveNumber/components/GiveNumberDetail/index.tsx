import { Card, Col, Form, Row, Typography } from 'antd'
import React from 'react'
import { addDeviceStyle } from '../../../Devices/components/DevicesList/Style'
import { addTextStyle, cardButtonAddStyle, iconAddStyle } from '../GiveNumberList/Style'
import { RollbackOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import { giveNumberData } from '../../../../constants/interface'
const { Title, Text } = Typography;
type QuizParams = {
    key: string;
};
interface Props {
    data: giveNumberData[]
}

const GiveNumberDetail: React.FC<Props> = (props: Props) => {
    let { key } = useParams<QuizParams>();
    const { data } = props;
    const Detail = data?.map(number => {
        if (key === number.key) {
            return (
                <div>
                    <Col span={7}>
                        <Form style={{ height: 76, top: 38, left: 16, position: 'absolute' }}>
                            <Form.Item
                                name='serviceId'
                                label='Họ tên'
                            >
                                {number.name}
                            </Form.Item>
                            <Form.Item
                                name='serviceName'
                                label='Tên dịch vụ'
                                style={{ marginTop: -10 }}
                            >
                                {number.serviceName}
                            </Form.Item>
                            <Form.Item
                                name='decriptionService'
                                label='Số thứ tự'
                                style={{ marginTop: -10 }}
                            >
                                {number.key}
                            </Form.Item>
                            <Form.Item
                                name='decriptionService'
                                label='Thời gian cấp'
                                style={{ marginTop: -10 }}
                            >
                                {number.date}
                            </Form.Item>
                            <Form.Item
                                name='decriptionService'
                                label='Hạn sử dụng'
                                style={{ marginTop: -10 }}
                            >
                                {number.hsd}
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={7} style={{ left: 568 }}>
                        <Form style={{ height: 76, top: 58, left: 16, position: 'absolute' }}>
                            <Form.Item
                                name='serviceId'
                                label='Nguồn cấp'
                            >
                                {number.nguoncap}
                            </Form.Item>
                            <Form.Item
                                name='serviceName'
                                label='Trạng thái'
                                style={{ marginTop: -10 }}
                            >
                                {number.active}
                            </Form.Item>
                            <Form.Item
                                name='decriptionService'
                                label='Số điện thoại'
                                style={{ marginTop: -10 }}
                            >
                                0946150333
                            </Form.Item>
                            <Form.Item
                                name='decriptionService'
                                label='Địa chỉ email'
                                style={{ marginTop: -10 }}
                            >
                                tritrung.tr@gmail.com
                            </Form.Item>
                        </Form>
                    </Col>
                </div>
            )
        }
    })
    return (
        <div>
            <Title level={3} style={{
                position: 'absolute', left: 224, top: 104, fontWeight: 700, color: '#ff7506'
            }}>
                Quản lý cấp số
            </Title>
            <Row style={{ position: 'absolute', top: 120 }}>

                <Card style={{ width: 1112, left: -28 }}>
                    <Title level={4} style={{ top: 16 }}>
                        Thông tin cấp số
                    </Title>
                    {Detail}
                </Card>

            </Row>
            <a style={addDeviceStyle} href='/admin/givenumber'>
                <Card style={cardButtonAddStyle}>
                    <RollbackOutlined style={iconAddStyle} />
                </Card>
                <Text style={addTextStyle}>Quay lại</Text>
            </a>
        </div>
    )
}

export default GiveNumberDetail