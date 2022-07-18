import { Card, Col, Form, Row, Typography } from 'antd'
import React, { useEffect } from 'react'
import { addDeviceStyle } from '../../../Devices/components/DevicesList/Style'
import { addTextStyle, cardButtonAddStyle, iconAddStyle } from '../GiveNumberList/Style'
import { RollbackOutlined } from '@ant-design/icons'
import { Link, useParams } from 'react-router-dom'
import { giveNumberData } from '../../../../constants/interface'
import { useAppDispatch, useAppSelector } from '../../../../store'
import { get, giveNumberSelector } from '../../giveNumberSlice'
import moment from 'moment'
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
    const dispatch = useAppDispatch();
    const { giveNumber } = useAppSelector(giveNumberSelector)
    useEffect(() => {
        dispatch(get(key))
    }, [key])
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
                    <div>
                        <Col span={7}>
                            <Form style={{ height: 76, top: 38, left: 16, position: 'absolute' }}>
                                <Form.Item
                                    name='serviceId'
                                    label='Họ tên'
                                >
                                    {giveNumber?.name}
                                </Form.Item>
                                <Form.Item
                                    name='serviceName'
                                    label='Tên dịch vụ'
                                    style={{ marginTop: -10 }}
                                >
                                    {giveNumber?.service}
                                </Form.Item>
                                <Form.Item
                                    name='decriptionService'
                                    label='Số thứ tự'
                                    style={{ marginTop: -10 }}
                                >
                                    {giveNumber?.number}
                                </Form.Item>
                                <Form.Item
                                    name='decriptionService'
                                    label='Thời gian cấp'
                                    style={{ marginTop: -10 }}
                                >
                                    {
                                        moment(
                                            giveNumber?.timeGet.toDate()
                                        ).format("HH:mm - DD/MM/YYYY")
                                    }
                                </Form.Item>
                                <Form.Item
                                    name='decriptionService'
                                    label='Hạn sử dụng'
                                    style={{ marginTop: -10 }}
                                >
                                    {
                                        moment(
                                            giveNumber?.date.toDate()
                                        ).format("HH:mm - DD/MM/YYYY")
                                    }
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col span={7} style={{ left: 568 }}>
                            <Form style={{ height: 76, top: 58, left: 16, position: 'absolute' }}>
                                <Form.Item
                                    name='serviceId'
                                    label='Nguồn cấp'
                                >
                                    {giveNumber?.source}
                                </Form.Item>
                                <Form.Item
                                    name='serviceName'
                                    label='Trạng thái'
                                    style={{ marginTop: -10 }}
                                >
                                    {giveNumber?.status === 'waiting' ?
                                        'Đang chờ' : (giveNumber?.status === 'used' ? 'Đã sử dụng' : 'Bỏ qua')}
                                </Form.Item>
                                <Form.Item
                                    name='decriptionService'
                                    label='Số điện thoại'
                                    style={{ marginTop: -10 }}
                                >
                                    {giveNumber?.phoneNumber}
                                </Form.Item>
                                <Form.Item
                                    name='decriptionService'
                                    label='Địa chỉ email'
                                    style={{ marginTop: -10 }}
                                >
                                    {giveNumber?.email}
                                </Form.Item>
                            </Form>
                        </Col>
                    </div>
                </Card>

            </Row>
            <Link style={addDeviceStyle} to='/admin/givenumber'>
                <Card style={cardButtonAddStyle}>
                    <RollbackOutlined style={iconAddStyle} />
                </Card>
                <Text style={addTextStyle}>Quay lại</Text>
            </Link>
        </div>
    )
}

export default GiveNumberDetail