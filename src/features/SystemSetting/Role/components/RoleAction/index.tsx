import React, { useState } from 'react'
import { Card, Col, Typography, Form, Input, Button, Checkbox } from 'antd'
import { buttonAddstyle, buttonCancelstyle, formLeftStyle, inputStyle, titlePageStyle as T }
    from '../../../../Devices/components/DevicesAction/Style';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { titlePageStyle } from '../../../../Devices/components/DevicesList/Style';
const { Title } = Typography;
type QuizParams = {
    key: string;
};

type Props = {}

const RoleAction: React.FC = (props: Props) => {
    let history = useHistory();
    let { key } = useParams<QuizParams>();
    const onBack = () => {
        history.goBack()
    }
    return (
        <div>
            <Title level={3} style={titlePageStyle}>
                Danh sách vai trò
            </Title>
            <Card style={{ width: 1192, height: 500, position: 'absolute', top: 156, left: 224, borderRadius: 16, boxShadow: '2px 2px 8px 0px #E8EFF4CC' }}>
                <Title level={4} style={T}>
                    Thông tin vai trò
                </Title>
                <Col span={6}>
                    <Form layout='vertical' style={formLeftStyle}>
                        <Form.Item
                            name='serviceId'
                            label='Tên vai trò'
                            rules={[{ required: true }]}>
                            <Input
                                name='devicesId'
                                style={inputStyle}
                                placeholder='Nhập mã dịch vụ'
                            />
                        </Form.Item>
                        {/* <Form layout='vertical' style={{ left: 556, height: 164, position: 'absolute', width: 553, top: 36 }}> */}
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
                <Col span={6}>
                    <Form layout='vertical' style={{ position: 'absolute', left: 588, width: 504 }} >
                        <Form.Item label='Phân quyền chức năng'>
                            <Card
                                style={{
                                    width: 560, height: 420,
                                    position: 'absolute', top: -8,
                                    backgroundColor: '#FFF2E7'
                                }}
                            >
                                <Title level={4} style={{ position: 'absolute', top: 16, left: 24 }}>Nhóm chức năng A</Title>
                                <Form.Item style={{ marginTop: 30 }}>
                                    <Checkbox >Tất cả</Checkbox>
                                </Form.Item>
                                <Form.Item style={{ marginTop: -25 }}>
                                    <Checkbox >Chức năng x</Checkbox>
                                </Form.Item>
                                <Form.Item style={{ marginTop: -25 }}>
                                    <Checkbox >Chức năng y</Checkbox>
                                </Form.Item>
                                <Form.Item style={{ marginTop: -25 }}>
                                    <Checkbox >Chức năng z</Checkbox>
                                </Form.Item>
                                <Title level={4} style={{ position: 'absolute', top: 195, left: 24 }}>Nhóm chức năng B</Title>
                                <Form.Item style={{ marginTop: 60 }}>
                                    <Checkbox >Tất cả</Checkbox>
                                </Form.Item>
                                <Form.Item style={{ marginTop: -25 }}>
                                    <Checkbox >Chức năng x</Checkbox>
                                </Form.Item>
                                <Form.Item style={{ marginTop: -25 }}>
                                    <Checkbox >Chức năng y</Checkbox>
                                </Form.Item>
                                <Form.Item style={{ marginTop: -25 }}>
                                    <Checkbox >Chức năng z</Checkbox>
                                </Form.Item>
                            </Card>

                        </Form.Item>

                    </Form>


                </Col>
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

export default RoleAction