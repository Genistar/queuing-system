import React, { useEffect, useState } from 'react';
import { Col, Input, Row, Select, Typography, Space, Table, Card, Badge, Form, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { CaretDownOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { giveNumberData, giveNumberType } from '../../../../constants/interface'
import 'antd/dist/antd.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { addTextStyle, titlePageStyle } from '../../../GiveNumber/components/GiveNumberList/Style';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { getAll, giveNumberSelector } from '../../../GiveNumber/giveNumberSlice';
import moment from 'moment';
const { Title, Text } = Typography;
const { Option } = Select;

interface Props {
}

const activeData = ['Tất cả', 'Đang hoạt động', 'Dừng hoạt động'];
const serviceData = ['Tất cả', 'Rặng hàm mặt', 'Khoa sản', 'Phụ sản'];
const nguonCapData = ['Tất cả', 'Kiosk']
const columns: ColumnsType<giveNumberType> = [
    {
        title: 'STT',
        dataIndex: 'key',
        key: 'key'
    },
    {
        title: 'Tên dịch vụ',
        dataIndex: 'serviceNamet',
        key: 'serviceNamet',
    },
    {
        title: 'Thời gian cấp',
        dataIndex: 'time',
        key: 'time',
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
    }
];
const ReportList: React.FC<Props> = (props: Props) => {
    const [active, setActive] = useState<String>(activeData[0]);
    const [service, setService] = useState<String>(serviceData[0]);
    const [nguonCap, setNguonCap] = useState<String>(nguonCapData[0]);
    const { giveNumbers, loading } = useAppSelector(giveNumberSelector)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getAll())
    }, [])
    return (
        <div>
            <Title level={3} style={titlePageStyle}>
                Quản lý cấp số
            </Title>
            <Row style={{ width: 1200, position: 'absolute', top: 136, left: 24 }}>
                <Form layout='inline' style={{ width: 500 }}>
                    <Col span={4} style={{ position: 'absolute', left: 200, width: 320 }}>
                        <Text style={addTextStyle}>Chọn thời gian</Text>
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
            </Row>
            <Row>
                <Table
                    dataSource={giveNumbers.map(giveNumber => ({
                        key: giveNumber.number,
                        time: moment(
                            giveNumber.timeGet.toDate()
                        ).format("HH:mm - DD/MM/YYYY"),
                        serviceNamet: giveNumber.serviceName,
                        ...giveNumber
                    }))}
                    columns={
                        columns
                    }
                    loading={loading}
                    rowClassName={(record: any, index: any) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                    style={{
                        position: 'absolute', top: 224, left: 224, width: 1152,
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
        </div>
    )
}

export default ReportList