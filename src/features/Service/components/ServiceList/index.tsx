import React, { useEffect, useState } from 'react';
import { Col, Input, Row, Select, Typography, Space, Table, Card, Badge, Form, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { CaretDownOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { addDeviceStyle, addTextStyle, cardButtonAddStyle, dropdownIconStyle, iconAddStyle, textStyle, titlePageStyle } from './Style';
import { serviceData, serviceType } from '../../../../constants/interface'
import 'antd/dist/antd.css';
import './Style.css';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { getAll, serviceSelector } from '../../serviceSlice';
const { Title, Text } = Typography;
const { Option } = Select;

interface Props {
}

const columns: ColumnsType<serviceType> = [
    {
        title: 'Mã dịch vụ',
        dataIndex: 'serviceId',
        key: 'serviceId'
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
        dataIndex: 'isActive',
        key: 'isActive',
        render: (dataIndex) => (
            <span>
                <Badge status={dataIndex === true ? 'success' : 'warning'} />
                {dataIndex === true ? 'Đang hoạt động' : 'Ngừng hoạt động'}
            </span>
        ),
    },
    {
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Link to={`/admin/service/detail/${record.id}`}>Chi tiết</Link>
            </Space>
        ),
    },
    {
        key: 'action',
        render: (_, record) => {
            return (
                <Space size="middle">
                    <Link to={`/admin/services/update/${record.id}`}>Cập nhật</Link>
                </Space>
            )
        }
    },
];
const ServiceList: React.FC<Props> = (props: Props) => {
    const [active, setActive] = useState<boolean | null>(null);
    const [keywords, setKeywords] = useState<string>("")
    const dispatch = useAppDispatch();
    const { loading, services } = useAppSelector(serviceSelector)
    useEffect(() => {
        dispatch(getAll({ keywords, active }))
    }, [keywords, active])
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
                        defaultValue={null}
                        suffixIcon={
                            <CaretDownOutlined
                                style={dropdownIconStyle}
                            />
                        }
                        onChange={(e) => { setActive(e) }}
                    >
                        <Option value={null}>
                            Tất cả
                        </Option>
                        <Option value={true}>
                            Đang hoạt động
                        </Option>
                        <Option value={false}>
                            Ngưng hoạt động
                        </Option>
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
                        onChange={(e) => setKeywords(e.target.value)}
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
                    dataSource={
                        services.map(service => ({
                            key: service.id,
                            ...service
                        }))
                    }
                    loading={loading}
                    pagination={{ position: ["bottomRight"] }}
                />
            </Row>
            <Link style={addDeviceStyle} to='/admin/service/add'>
                <Card style={cardButtonAddStyle}>
                    <PlusOutlined style={iconAddStyle} />
                </Card>
                <Text style={addTextStyle}>Thêm <br />dịch vụ</Text>
            </Link>
        </div>
    )
}

export default ServiceList