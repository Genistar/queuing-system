import React, { useState } from 'react';
import { Col, Input, Row, Select, Typography, Space, Table, Card, Badge, Form, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { CaretDownOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { addDeviceStyle, addTextStyle, cardButtonAddStyle, dropdownIconStyle, iconAddStyle, textStyle, titlePageStyle } from './Style';
import { giveNumberData } from '../../../../constants/interface'
import 'antd/dist/antd.css';
import './Style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
const { Title, Text } = Typography;
const { Option } = Select;

interface Props {
    data: giveNumberData[]
}

const activeData = ['Tất cả', 'Đang hoạt động', 'Dừng hoạt động'];
const serviceData = ['Tất cả', 'Rặng hàm mặt', 'Khoa sản', 'Phụ sản'];
const nguonCapData = ['Tất cả', 'Kiosk']
const columns: ColumnsType<giveNumberData> = [
    {
        title: 'STT',
        dataIndex: 'key',
        key: 'key'
    },
    {
        title: 'Tên khách hàng',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Tên dịch vụ',
        dataIndex: 'serviceName',
        key: 'serviceName',
    },
    {
        title: 'Thời gian cấp',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Hạn sử dụng',
        dataIndex: 'hsd',
        key: 'hsd',
    },
    {
        title: 'Trạng thái',
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
        title: 'Nguồn cấp',
        dataIndex: 'nguoncap',
        key: 'nguoncap'
    },
    {
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a href={`/admin/givenumber/detail/${record.key}`}>Chi tiết</a>
            </Space>
        ),
    },
];
const GiveNumberList: React.FC<Props> = (props: Props) => {
    const [active, setActive] = useState<String>(activeData[0]);
    const [service, setService] = useState<String>(serviceData[0]);
    const [nguonCap, setNguonCap] = useState<String>(nguonCapData[0]);
    const { data } = props;
    return (
        <div>
            <Title level={3} style={titlePageStyle}>
                Quản lý cấp số
            </Title>
            <Row style={{ width: 1200, position: 'absolute', top: 156, left: 224 }}>
                <Form layout='inline' style={{ width: 500 }}>
                    <Form.Item>
                        <Text style={{ width: 200, left: 0, bottom: 8, fontSize: 16 }}>Trạng thái hoạt động</Text>
                        <Select
                            size='large'
                            style={{ width: 150, position: 'absolute', top: 34 }}
                            value={service}
                            suffixIcon={
                                <CaretDownOutlined
                                    style={dropdownIconStyle}
                                />
                            }
                            onChange={(e) => { setService(e) }}
                        >
                            {serviceData.map(s => (
                                <Option key={s}>{s}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Text style={{ width: 200, left: 169, bottom: 8, fontSize: 16 }}>Tình trạng</Text>
                        <Select
                            size='large'
                            style={{ width: 150, position: 'absolute', top: 34, left: 169 }}
                            value={active}
                            suffixIcon={
                                <CaretDownOutlined
                                    style={dropdownIconStyle}
                                />
                            }
                            onChange={(e) => { setActive(e) }}
                        >
                            {activeData.map(s => (
                                <Option key={s}>{s}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Text style={{ width: 200, left: 334, bottom: 8, fontSize: 16 }}>Nguồn cấp</Text>
                        <Select
                            size='large'
                            style={{ width: 150, position: 'absolute', top: 34, left: 334 }}
                            value={nguonCap}
                            suffixIcon={
                                <CaretDownOutlined
                                    style={dropdownIconStyle}
                                />
                            }
                            onChange={(e) => { setNguonCap(e) }}
                        >
                            {nguonCapData.map(s => (
                                <Option key={s}>{s}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Col span={4} style={{ position: 'absolute', left: 555, width: 320 }}>
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
                </Form>
                <Col span={6} style={{ position: 'absolute', left: 910, width: 240 }}>
                    <Text style={textStyle}>Từ khóa</Text>
                    <Input
                        size='large'
                        style={{ width: 240, position: 'absolute', top: 34, borderRadius: 8, height: 44.15 }}
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
                    dataSource={data}
                    columns={columns}
                    rowClassName={(record: any, index: any) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                    style={{
                        position: 'absolute', top: 244, left: 224, width: 1152,
                        filter: 'drop-shadow(2px 2px 8px rgba(232, 239, 244, 0.8))', backgroundColor: '#f9sdj9',
                    }}
                    bordered
                    pagination={{ position: ["bottomRight"], pageSize: 7 }}
                />
            </Row>
            <a style={addDeviceStyle} href='/admin/givenumber/add'>
                <Card style={cardButtonAddStyle}>
                    <PlusOutlined style={iconAddStyle} />
                </Card>
                <Text style={addTextStyle}>Cấp <br />Số mới</Text>
            </a>
        </div>
    )
}

export default GiveNumberList