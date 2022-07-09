import React, { useState } from 'react';
import { Col, Input, Row, Select, Typography, Space, Table, Card, Badge, Form, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { CaretDownOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { addDeviceStyle, addTextStyle, cardButtonAddStyle, dropdownIconStyle, iconAddStyle, textStyle, titlePageStyle } from './Style';
import { serviceData } from '../../../constants/interface'
import 'antd/dist/antd.css';
import './Style.css';
const { Title, Text } = Typography;
const { Option } = Select;

interface Props {
    data: serviceData[]
}

const activeData = ['Tất cả', 'Ngưng hoạt động', 'Hoạt động']
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
                <a href={`/admin/service/detail/${record.key}`}>Chi tiết</a>
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
    const { data } = props;
    const [active, setActive] = useState<String>(activeData[0])
    return (
        <div style={{ width: 700 }}>
            <Title level={3} style={titlePageStyle}>
                Danh Sách dịch vụ
            </Title>
            <Row style={{ width: '82%', position: 'absolute', top: 156, left: 224 }}>
                <Col span={4} style={{ position: 'absolute', left: 0, width: '100%' }}>
                    <Text style={textStyle}>Trạng thái hoạt động</Text>
                    <Select
                        size='large'
                        style={{ width: '145%', position: 'absolute', top: 34 }}
                        value={active}
                        suffixIcon={
                            <CaretDownOutlined
                                style={dropdownIconStyle}
                            />
                        }
                    >
                        {activeData.map(s => (
                            <Option key={s}>{s}</Option>
                        ))}
                    </Select>
                </Col>
                <Col span={4} style={{ position: 'absolute', left: 320, width: 320 }}>
                    <Text style={textStyle}>Chọn thời gian</Text>
                    <Form layout='inline' style={{ width: 335, position: 'absolute', top: 34 }}>
                        <Form.Item style={{ width: 150 }}>
                            <DatePicker
                                suffixIcon={<FontAwesomeIcon icon={faCalendarDay}
                                    style={{ marginLeft: '-100px', marginBottom: 3, color: '#FF7506' }} />}
                                placeholder='7/7/2022'
                            />
                        </Form.Item>
                        <Form.Item style={{ width: 150 }}>
                            <DatePicker
                                placeholder='8/7/2022'
                                suffixIcon={<FontAwesomeIcon icon={faCalendarDay}
                                    style={{ marginLeft: '-100px', marginBottom: 3, color: '#FF7506' }}
                                />}
                            />
                        </Form.Item>
                    </Form>

                </Col>
                <Col span={6} style={{ position: 'absolute', left: '70%', width: 310 }}>
                    <Text style={textStyle}>Từ khóa</Text>
                    <Input
                        size='large'
                        style={{ width: '100%', position: 'absolute', top: 34, borderRadius: 8, height: 44.15 }}
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
                        position: 'absolute', top: 244, left: 224, width: '78%',
                        filter: 'drop-shadow(2px 2px 8px rgba(232, 239, 244, 0.8))', backgroundColor: '#f9sdj9',
                    }}
                    bordered
                    columns={columns}
                    dataSource={data}
                    pagination={{ position: ["bottomRight"] }}
                />
            </Row>
            <a style={addDeviceStyle} href='/admin/service/add'>
                <Card style={cardButtonAddStyle}>
                    <PlusOutlined style={iconAddStyle} />
                </Card>
                <Text style={addTextStyle}>Thêm <br />dịch vụ</Text>
            </a>
        </div>
    )
}

export default ServiceList