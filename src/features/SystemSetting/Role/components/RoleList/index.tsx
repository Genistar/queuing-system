import React, { useState } from 'react';
import { Col, Input, Row, Select, Typography, Space, Table, Card, Badge, Form, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { CaretDownOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { roleData } from '../../../../../constants/interface'
import 'antd/dist/antd.css';
import { titlePageStyle } from '../../../../GiveNumber/components/GiveNumberList/Style';
import { textStyle } from '../../../../Service/components/ServiceList/Style';
import { addDeviceStyle, addTextStyle, cardButtonAddStyle, iconAddStyle } from '../../../../Devices/components/DevicesList/Style';
import { Link } from 'react-router-dom';
const { Title, Text } = Typography;
const { Option } = Select;

interface Props {
    data: roleData[]
}

const columns: ColumnsType<roleData> = [
    {
        title: 'Tên vai trò',
        dataIndex: 'roleName',
        key: 'roleName'
    },
    {
        title: 'Số người dùng',
        dataIndex: '',
        key: '',
    },
    {
        title: 'Mô tả',
        dataIndex: 'roleDecription',
        key: 'roleDecription',
    },
    {
        key: 'action',
        render: (_, record) => {
            return (
                <Space size="middle">
                    <Link to={`/admin/role/update/${record.key}`}>Cập nhật</Link>
                </Space>
            )
        }
    },
];
const RoleList: React.FC<Props> = (props: Props) => {
    const { data } = props;
    return (
        <div>
            <Title level={3} style={{ position: 'absolute', left: 224, top: 114, fontWeight: 700, color: '#ff7506' }}>
                Quản lý cấp số
            </Title>
            <Row style={{ width: 1200, position: 'absolute', top: 106, left: 24 }}>
                <Form layout='inline' style={{ width: 500 }}>
                    <Col span={4} style={{ position: 'absolute', left: 966, width: 320 }}>
                        <Col span={6} style={{ position: 'absolute', left: '70%', width: 310 }}>
                            <Text style={{ width: 200, fontSize: 16 }}>Từ khóa</Text>
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
                        position: 'absolute', top: 204, left: 224, width: 1152,
                        filter: 'drop-shadow(2px 2px 8px rgba(232, 239, 244, 0.8))', backgroundColor: '#f9sdj9',
                    }}
                    bordered
                    pagination={{ position: ["bottomRight"], pageSize: 7 }}
                />
            </Row>
            <Link style={addDeviceStyle} to='/admin/role/add'>
                <Card style={cardButtonAddStyle}>
                    <PlusOutlined style={iconAddStyle} />
                </Card>
                <Text style={addTextStyle}>Thêm <br />vai trò</Text>
            </Link>
        </div>
    )
}

export default RoleList