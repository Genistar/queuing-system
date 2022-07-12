import React, { useState } from 'react';
import { Col, Input, Row, Typography, Table, Card, Form, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { dairyData } from '../../../../../constants/interface'
import 'antd/dist/antd.css';
import { addDeviceStyle, addTextStyle, cardButtonAddStyle, dropdownIconStyle, iconAddStyle } from '../../../../Devices/components/DevicesList/Style';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
interface Props {
    data: dairyData[]
}
const roleData = ['Tất cả', 'Kế toán', 'Thu ngân', 'Quản lý']
const columns: ColumnsType<dairyData> = [
    {
        title: 'Tên đăng nhập',
        dataIndex: 'userName',
        key: 'userName'
    },
    {
        title: 'Thời gian tác động',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: 'IP thực hiện',
        dataIndex: 'ipAddress',
        key: 'ipAddress',
    },
    {
        title: 'Thao tác thực hiện',
        dataIndex: 'manipulate',
        key: 'manipulate',
    },
];
const DairyList: React.FC<Props> = (props: Props) => {
    const { data } = props;
    return (
        <div>
            <Title level={3} style={{ position: 'absolute', left: 224, top: 104, fontWeight: 700, color: '#ff7506' }}>
                Quản lý cấp số
            </Title>
            <Row style={{ width: 1200, position: 'absolute', top: 131, left: 24 }}>
                <Form layout='vertical' style={{ position: 'absolute', top: 5, left: 204 }}>
                    <Form.Item
                        name='role'
                        label='Chọn thời gian'
                    >
                        <RangePicker showTime suffixIcon={<FontAwesomeIcon icon={faCalendar} />} />
                    </Form.Item>
                </Form>
                <Form layout='inline' style={{ width: 500 }}>
                    <Col span={4} style={{ position: 'absolute', left: 966, width: 320 }}>
                        <Col span={6} style={{ position: 'absolute', left: '70%', width: 310 }}>
                            <Text style={{ width: 200, fontSize: 16, marginTop: 5 }}>Từ khóa</Text>
                            <Input
                                size='large'
                                style={{ width: 240, top: 34, height: 44.15, borderRadius: 8 }}
                                placeholder='Nhập từ khóa'
                                suffix={
                                    <SearchOutlined
                                        style={{ color: '#FF7506', fontSize: 20 }}
                                    />
                                }
                            />
                        </Col>
                    </Col>
                </Form>
            </Row>
            <Row>
                <Table
                    dataSource={data}
                    columns={columns}
                    rowClassName={(record: any, index: any) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                    style={{
                        position: 'absolute', top: 224, left: 224, width: 1152,
                        filter: 'drop-shadow(2px 2px 8px rgba(232, 239, 244, 0.8))', backgroundColor: '#f9sdj9',
                    }}
                    bordered
                    pagination={{ position: ["bottomRight"], pageSize: 7 }}
                />
            </Row>
            <Link style={addDeviceStyle} to='/admin/account/add'>
                <Card style={cardButtonAddStyle}>
                    <PlusOutlined style={iconAddStyle} />
                </Card>
                <Text style={addTextStyle}>Thêm <br />tài khoản</Text>
            </Link>
        </div>
    )
}

export default DairyList