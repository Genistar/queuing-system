import React, { useEffect, useState } from 'react';
import { Col, Input, Row, Select, Typography, Space, Table, Card, Badge, Form, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { CaretDownOutlined, SearchOutlined, PlusOutlined, CaretRightOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { addDeviceStyle, addTextStyle, cardButtonAddStyle, dropdownIconStyle, iconAddStyle, textStyle, titlePageStyle } from './Style';
import { serviceData, serviceType } from '../../../../constants/interface';
import { RangePickerProps } from 'antd/lib/date-picker';
import { RangeValue } from "rc-picker/lib/interface";
import 'antd/dist/antd.css';
import './Style.css';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { getAll, serviceSelector } from '../../serviceSlice';
import moment, { Moment } from 'moment';
const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface Props {
}

const dateFormat = 'DD/MM/YYYY';
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
                    <Link to={`/admin/service/update/${record.id}`}>Cập nhật</Link>
                </Space>
            )
        }
    },
];
const ServiceList: React.FC<Props> = (props: Props) => {
    const [dateRange, setDateRange] = useState<RangeValue<Moment>>(null);
    const [active, setActive] = useState<boolean | null>(null);
    const [keywords, setKeywords] = useState<string>("")
    const dispatch = useAppDispatch();
    const { loading, services } = useAppSelector(serviceSelector)
    useEffect(() => {
        dispatch(getAll({ keywords, active }))
    }, [keywords, active])
    const onChange: RangePickerProps['onChange'] = (dates, dateStrings) => {
        if (dates) {
            console.log('From: ', dates[0], ', to: ', moment(dates[1]).format('HH:mm DD/MM/YYYY'));
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
            setDateRange([dates[0], dates[1]])
        } else {
            console.log('Clear');
        }
    };
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
                        <RangePicker
                            showTime
                            suffixIcon={
                                <div style={{ zIndex: 100 }}>
                                    <FontAwesomeIcon
                                        icon={faCalendar}
                                        style={{ marginLeft: -280, color: '#ff7506', zIndex: 100 }}
                                    />
                                    <FontAwesomeIcon
                                        icon={faCalendar}
                                        style={{ marginLeft: 147, color: '#ff7506', zIndex: 100 }}
                                    />
                                </div>


                            }
                            defaultValue={[moment('26/07/2022', dateFormat), moment('27/07/2022', dateFormat)]}
                            separator={<CaretRightOutlined />}
                            style={{ backgroundColor: '#f0f2f5', left: -12 }}
                            prevIcon={<LeftOutlined style={{ color: '#ff7506', fontWeight: 700, marginLeft: 20 }} />}
                            nextIcon={<RightOutlined style={{ color: '#ff7506', fontWeight: 700, marginRight: 20 }} />}
                            onChange={onChange}
                        />
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
                    pagination={{
                        defaultPageSize: 8,
                        position: ["bottomRight"],
                        showLessItems: true,
                        showSizeChanger: false,
                    }}
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