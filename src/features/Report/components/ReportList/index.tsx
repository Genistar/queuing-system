import React, { useEffect, useState } from 'react';
import { Col, Input, Row, Select, Typography, Space, Table, Card, Badge, Form, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { CaretRightOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { giveNumberData, giveNumberType } from '../../../../constants/interface'
import 'antd/dist/antd.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { addTextStyle, titlePageStyle } from '../../../GiveNumber/components/GiveNumberList/Style';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { getAll, giveNumberSelector } from '../../../GiveNumber/giveNumberSlice';
import { RangeValue } from "rc-picker/lib/interface";
import moment, { Moment } from 'moment';
import { RangePickerProps } from 'antd/lib/date-picker';
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface Props {
}

const dateFormat = 'DD/MM/YYYY';
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
    const [dateRange, setDateRange] = useState<RangeValue<Moment>>(null);
    const [keywords, setKeywords] = useState('')
    const { giveNumbers, loading } = useAppSelector(giveNumberSelector)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getAll({ keywords, dateRange: dateRange ? [dateRange[0] as Moment, dateRange[1] as Moment] : null }))
    }, [dateRange])
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
        <div>
            <Title level={3} style={titlePageStyle}>
                Quản lý cấp số
            </Title>
            <Row style={{ width: 1200, position: 'absolute', top: 116, left: 24 }}>
                <Form layout='inline' style={{ width: 500 }}>
                    <Col span={4} style={{ position: 'absolute', left: 200, width: 320 }}>
                        <Text style={addTextStyle}>Chọn thời gian</Text>
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
                        position: 'absolute', top: 204, left: 224, width: 1152,
                        filter: 'drop-shadow(2px 2px 8px rgba(232, 239, 244, 0.8))', backgroundColor: '#f9sdj9',
                    }}
                    bordered
                    pagination={{
                        defaultPageSize: 7,
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