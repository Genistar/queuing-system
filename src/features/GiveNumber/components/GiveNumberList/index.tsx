import React, { useEffect, useState } from 'react';
import { Col, Input, Row, Select, Typography, Space, Table, Card, Badge, Form, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { CaretDownOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { addDeviceStyle, addTextStyle, cardButtonAddStyle, dropdownIconStyle, iconAddStyle, textStyle, titlePageStyle } from './Style';
import { giveNumberData, giveNumberType } from '../../../../constants/interface'
import 'antd/dist/antd.css';
import './Style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { getAll, giveNumberSelector } from '../../giveNumberSlice';
import moment from 'moment';
import { get, serviceSelector, getAll as getServices } from '../../../Service/serviceSlice';
const { Title, Text } = Typography;
const { Option } = Select;

interface Props {

}

const nguonCapData = ['Tất cả', 'Kiosk']
const columns: ColumnsType<giveNumberType> = [
    {
        title: 'STT',
        dataIndex: 'number',
        key: 'number'
    },
    {
        title: 'Tên khách hàng',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Tên dịch vụ',
        dataIndex: 'serviceName',
        key: 'serviceNamet',
    },
    {
        title: 'Thời gian cấp',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: 'Hạn sử dụng',
        dataIndex: 'dat',
        key: 'dat',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (dataIndex) => (
            <span>
                <Badge status={dataIndex === 'waiting' ? 'processing' : (dataIndex === 'used' ? 'default' : 'warning')} />
                {dataIndex === 'waiting' ? 'Đang chờ' : (dataIndex === 'used' ? 'Đã sử dụng' : 'Bỏ qua')}
            </span>
        ),
    },
    {
        title: 'Nguồn cấp',
        dataIndex: 'source',
        key: 'source'
    },
    {
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Link to={`/admin/givenumber/detail/${record.id}`}>Chi tiết</Link>
            </Space>
        ),
    },
];
const GiveNumberList: React.FC<Props> = (props: Props) => {
    const [status, setStatus] = useState<string | null>(null);
    const [service, setService] = useState<string | null>(null);
    const [source, setSource] = useState<string | null>(null);
    const [keywords, setKeywords] = useState<string>("");
    const dispatch = useAppDispatch();
    const { loading, giveNumbers } = useAppSelector(giveNumberSelector);
    const { services } = useAppSelector(serviceSelector)
    useEffect(() => {
        dispatch(getAll({ keywords, service, status, source }))
    }, [keywords, service, status, source])
    useEffect(() => {
        dispatch(getServices())
    }, [])
    console.log(status)
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
                            defaultValue={null}
                        >
                            <Option key={1} value={null}> Tất cả</Option>
                            {services.map(s => (
                                <Option key={s.id} value={s.name}>{s.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Text style={{ width: 200, left: 169, bottom: 8, fontSize: 16 }}>Tình trạng</Text>
                        <Select
                            size='large'
                            style={{ width: 150, position: 'absolute', top: 34, left: 169 }}
                            value={status}
                            suffixIcon={
                                <CaretDownOutlined
                                    style={dropdownIconStyle}
                                />
                            }
                            defaultValue={null}
                            onChange={(e) => { setStatus(e) }}
                        >
                            <Option key='1' value={null}>Tất cả</Option>
                            <Option key='2' value={"waiting"}>Đang chờ</Option>
                            <Option key='3' value={"used"}>Đã sử dụng</Option>
                            <Option key='4' value={"skip"}>Bỏ qua</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Text style={{ width: 200, left: 334, bottom: 8, fontSize: 16 }}>Nguồn cấp</Text>
                        <Select
                            size='large'
                            style={{ width: 150, position: 'absolute', top: 34, left: 334 }}
                            value={source}
                            suffixIcon={
                                <CaretDownOutlined
                                    style={dropdownIconStyle}
                                />
                            }
                            defaultValue={null}
                            onChange={(e) => { setSource(e) }}
                        >
                            <Option value={null}>Tất cả</Option>
                            <Option value={'Kiosk'}>Kiosk</Option>
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
                        onChange={(e) => setKeywords(e.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Table
                    columns={columns}
                    dataSource={
                        giveNumbers.map(giveNumber => ({
                            key: giveNumber.number,
                            time: moment(
                                giveNumber.timeGet.toDate()
                            ).format("HH:mm - DD/MM/YYYY"),
                            dat: moment(
                                giveNumber.date.toDate()
                            ).format("HH:mm - DD/MM/YYYY"),
                            serviceNamet: giveNumber.serviceName,
                            ...giveNumber
                        }))
                    }
                    loading={loading}

                    rowClassName={(record: any, index: any) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                    style={{
                        position: 'absolute', top: 244, left: 224, width: 1152,
                        filter: 'drop-shadow(2px 2px 8px rgba(232, 239, 244, 0.8))', backgroundColor: '#f9sdj9',
                    }}
                    bordered
                    pagination={{
                        defaultPageSize: 8,
                        position: ["bottomRight"],
                        showLessItems: true,
                        showSizeChanger: false,
                    }}
                />
            </Row>
            <Link style={addDeviceStyle} to='/admin/givenumber/add'>
                <Card style={cardButtonAddStyle}>
                    <PlusOutlined style={iconAddStyle} />
                </Card>
                <Text style={addTextStyle}>Cấp <br />Số mới</Text>
            </Link>
        </div>
    )
}

export default GiveNumberList