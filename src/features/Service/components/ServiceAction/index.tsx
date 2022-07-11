import React, { useState } from 'react'
import { Card, Col, Typography, Form, Input, Button, Select, Checkbox } from 'antd'
import { titlePageStyle } from '../../../Devices/components/DevicesList/Style';
import { buttonAddstyle, buttonCancelstyle, buttonstyle, formLeftStyle, inputStyle, titlePageStyle as T } from '../../../Devices/components/DevicesAction/Style';
import { formBottomStyle } from './Style';
import { layoutStyle } from '../../../Devices/components/DevicesAction/Style';
import { useHistory } from 'react-router-dom';
import { devicesData } from '../../../../constants/interface';
import { useParams } from 'react-router-dom'
const { Title, Text } = Typography;
const { Option } = Select;
type QuizParams = {
    key: string;
};

type Props = {}

const ServiceAction: React.FC = (props: Props) => {
    let history = useHistory();
    let { key } = useParams<QuizParams>();
    const onBack = () => {
        history.goBack()
    }
    return (
        <div>
            <Title level={3} style={titlePageStyle}>
                Danh Sách dịch vụ
            </Title>
            <Card style={layoutStyle}>
                <Title level={4} style={T}>
                    {key ? 'Cập nhật thiết bị' : 'Thông tin dịch vụ'}
                </Title>
                <Col span={6}>
                    <Form layout='vertical' style={formLeftStyle}>
                        <Form.Item
                            name='serviceId'
                            label='Mã dịch vụ'
                            rules={[{ required: true }]}>
                            <Input
                                name='devicesId'
                                style={inputStyle}
                                placeholder='Nhập mã dịch vụ'
                            />
                        </Form.Item>
                        <Form.Item
                            name='serviceName'
                            label='Tên dịch vụ'
                            rules={[{ required: true }]}
                            style={{ marginTop: -10 }}
                        >
                            <Input
                                name='deviceName'
                                style={inputStyle}
                                placeholder='Nhập tên dịch vụ'
                            />
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={6}>
                    <Form layout='vertical' style={{ left: 556, height: 164, position: 'absolute', width: 553, top: 36 }}>
                        <Form.Item
                            name='serviceDecription'
                            label='Mô tả dịch vụ'
                            rules={[{ required: true }]}
                        >
                            <Input.TextArea style={{ height: 132, width: 553, borderRadius: 8 }}>
                            </Input.TextArea>
                        </Form.Item>
                    </Form>

                </Col>
                <Title level={4} style={{ position: 'absolute', left: 24, top: 238, fontWeight: 700, color: '#ff7506', lineHeight: '30px' }}>
                    Quy tắc cấp số
                </Title>
                <Form layout='inline' style={formBottomStyle}>
                    <Checkbox>
                        <Form.Item
                            label='Tăng tự động từ:'
                        >
                            <Input
                                style={{ borderRadius: 8, color: '#D4D4D7', fontSize: 14, height: 44, width: 64, top: -5, position: 'absolute' }}>
                            </Input>
                            <Text style={{ fontWeight: 600, position: 'absolute', left: 70, top: 5 }}>đến</Text>
                            <Input
                                style={{ borderRadius: 8, color: '#D4D4D7', fontSize: 14, height: 44, width: 64, top: -5, position: 'absolute', left: 100 }}>
                            </Input>
                        </Form.Item>
                    </Checkbox>
                    <Checkbox style={{ marginTop: 52, marginLeft: -178 }}>
                        <Form.Item
                            label='Prefix:'
                        >
                            <Input
                                style={{ borderRadius: 8, color: '#D4D4D7', fontSize: 14, height: 44, width: 64, top: -5, position: 'absolute', left: 74 }}>
                            </Input>
                        </Form.Item>
                    </Checkbox>
                    <Checkbox style={{ marginTop: 104, marginLeft: -103 }}>
                        <Form.Item
                            label='Surfix:'
                        >
                            <Input
                                style={{ borderRadius: 8, color: '#D4D4D7', fontSize: 14, height: 44, width: 64, top: -5, position: 'absolute', left: 73 }}>
                            </Input>
                        </Form.Item>
                    </Checkbox>
                    <Checkbox style={{ marginTop: 152, marginLeft: -104 }}>
                        <Text style={{ fontWeight: 600, marginTop: -17 }}>Reset theo ngày</Text>
                    </Checkbox>
                </Form>
                <Form style={{ position: 'absolute', top: 462 }}>
                    <Form.Item name='batbuoc' rules={[{ required: true }]} label=' '>
                        <Text style={{ fontWeight: 400, fontSize: 14, color: '#7E7D88', width: 300, marginTop: -12 }}>
                            Là trường thông tin bắt buộc
                        </Text>
                    </Form.Item>
                </Form>
            </Card>
            <Form layout='inline' style={{ top: 680, left: 634.5, position: 'absolute' }}>
                <Form.Item>
                    <Button style={buttonCancelstyle} onClick={onBack}>Hủy</Button>
                </Form.Item>
                <Form.Item>
                    <Button style={buttonAddstyle}>{key ? 'Cập nhật' : 'Thêm dịch vụ'}</Button>
                </Form.Item>
            </Form>
        </div >
    )
}

export default ServiceAction