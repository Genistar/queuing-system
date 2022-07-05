import React from 'react';
import { Col, Input, Row, Select, Typography, Space, Table, Button, Card, Badge } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { CaretDownOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { addDeviceStyle, addTextStyle, cardButtonAddStyle, dropdownIconStyle, iconAddStyle, textStyle, titlePageStyle } from './Style';
import { serviceData } from '../../../config/interface'
import 'antd/dist/antd.css';
import './Style.css';
const { Title, Text } = Typography;

interface Props {
    data: serviceData[]
}


const columns: ColumnsType<serviceData> = [
    {
        title: 'Mã dịch vụ',
        dataIndex: 'key',
        key: 'key'
    },
    {
        title: 'Tên dịch vụ',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Trạng thái hoạt động',
        dataIndex: 'active',
        key: 'active',
        render: (dataIndex) => (
            <span>
                <Badge status={dataIndex === true ? 'success' : 'warning'} />
                {dataIndex}
            </span>
        ),
    },
    {
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a href={`/admin/devices/detail/${record.key}`}>Chi tiết</a>
            </Space>
        ),
    },
    {
        key: 'action',
        render: (_, record) => {
            return (
                <Space size="middle">
                    <a href={`/admin/devices/update/${record.key}`}>Cập nhật</a>
                </Space>
            )
        }
    },
];
const ServiceList: React.FC<Props> = (props: Props) => {
    const { data } = props
    return (
        <div>
            <Title level={3} style={titlePageStyle}>
                Danh Sách dịch vụ
            </Title>
            <Row style={{ width: 1200, position: 'absolute', top: 156, left: 224 }}>
                <Col span={4} style={{ position: 'absolute', left: 0, width: 310 }}>
                    <Text style={textStyle}>Trạng thái hoạt động</Text>
                    <Select
                        size='large'
                        style={{ width: 300, position: 'absolute', top: 34 }}
                        suffixIcon={
                            <CaretDownOutlined
                                style={dropdownIconStyle}
                            />
                        }
                    >
                    </Select>
                </Col>
                <Col span={4} style={{ position: 'absolute', left: 320, width: 310 }}>
                    <Text style={textStyle}>Trạng thái kết nối</Text>
                    <Select
                        size='large'
                        style={{ width: 300, position: 'absolute', top: 34 }}
                        suffixIcon={
                            <CaretDownOutlined
                                style={dropdownIconStyle}
                            />
                        }
                    >

                    </Select>
                </Col>
                <Col span={6} style={{ position: 'absolute', left: 740, width: 310 }}>
                    <Text style={textStyle}>Từ khóa</Text>
                    <Input
                        size='large'
                        style={{ width: 300, position: 'absolute', top: 34, borderRadius: 8 }}
                        placeholder='Nhập từ khóa'
                        suffix={
                            <SearchOutlined
                                style={{ color: '#FF7506', fontSize: 20 }}
                            />
                        }
                    />
                </Col>
            </Row>
            <Row>
                <Table
                    rowClassName={(record: any, index: any) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                    style={{
                        position: 'absolute', top: 244, left: 224, width: 1152,
                        filter: 'drop-shadow(2px 2px 8px rgba(232, 239, 244, 0.8))', backgroundColor: '#f9sdj9',
                    }}
                    bordered
                    columns={columns}
                    dataSource={data}
                    pagination={{ position: ["bottomRight"] }}
                />
            </Row>
            <a style={addDeviceStyle} href='/admin/devices/add'>
                <Card style={cardButtonAddStyle}>
                    <PlusOutlined style={iconAddStyle} />
                </Card>
                <Text style={addTextStyle}>Thêm <br />thiết bị</Text>
            </a>
        </div>
    )
}

export default ServiceList