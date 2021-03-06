import React, { useEffect, useState } from 'react'
import { Badge, Card, Col, DatePicker, Form, Input, Row, Select, Table, Typography } from 'antd'
import { CaretDownOutlined, SearchOutlined, EditOutlined, RollbackOutlined, CaretRightOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { addDeviceStyle, addTextStyle, cardButtonAddStyle, dropdownIconStyle, iconAddStyle, textStyle, titlePageStyle } from '../ServiceList/Style'
import './Style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { giveNumberType, numberData, serviceType } from '../../../../constants/interface';
import { ColumnsType } from 'antd/lib/table';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store';
import serviceReducer, { get, serviceSelector } from '../../serviceSlice';
import { getByIdService, giveNumberSelector } from '../../../GiveNumber/giveNumberSlice';
import { RangePickerProps } from 'antd/lib/date-picker';
import { RangeValue } from "rc-picker/lib/interface";
import moment, { Moment } from 'moment';
const { Title, Text } = Typography;
const { Option } = Select;
type QuizParams = {
    key: any;
};
const { RangePicker } = DatePicker;
interface Props {
}
const dateFormat = 'DD/MM/YYYY';
const ServiceDetail: React.FC<Props> = (props: Props) => {
    let { key } = useParams<QuizParams>();
    const [status, setStatus] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<RangeValue<Moment>>(null);
    const [keywords, setKeywords] = useState<string>("");
    const dispatch = useAppDispatch();
    const { service } = useAppSelector(serviceSelector);
    const { loading, giveNumbersFilter } = useAppSelector(giveNumberSelector);
    useEffect(() => {
        dispatch(get(key))
    }, [key])
    useEffect(() => {
        if (key) {
            dispatch(getByIdService({
                key,
                filter: {
                    status,
                    keywords,
                    dateRange: dateRange ? [dateRange[0] as Moment, dateRange[1] as Moment] : null
                }
            }))
        }
    }, [key, status, dateRange])
    const onChange: RangePickerProps['onChange'] = (dates, dateStrings) => {
        if (dates) {
            console.log('From: ', dates[0], ', to: ', moment(dates[1]).format('HH:mm DD/MM/YYYY'));
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
            setDateRange([dates[0], dates[1]])
        } else {
            console.log('Clear');
        }
    };
    const columns = [
        {
            title: 'Số thứ tự',
            dataIndex: `number`,
            key: 'number'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (dataIndex: any) => (
                <span>
                    <Badge status={dataIndex === 'waiting' ? 'processing' : (dataIndex === 'used' ? 'default' : 'warning')} />
                    {dataIndex === 'waiting' ? 'Đang chờ' : (dataIndex === 'used' ? 'Đã sử dụng' : 'Bỏ qua')}
                </span>
            ),
        }
    ]
    return (
        <div>
            <Title level={3} style={titlePageStyle}>
                Quản lý dịch vụ
            </Title>
            <Row style={{ position: 'absolute', top: 120 }}>
                <Col span={5}>
                    <Card style={{ width: 370, left: -28 }}>
                        <Title level={4} style={{ top: 16 }}>
                            Thông tin dịch vụ
                        </Title>
                        <Form style={{ height: 76, top: 58, left: 16, position: 'absolute' }}>
                            <Form.Item
                                name='serviceId'
                                label='Mã dịch vụ'
                            >
                                {service?.serviceId}
                            </Form.Item>
                            <Form.Item
                                name='serviceName'
                                label='Tên dịch vụ'
                                style={{ marginTop: -10 }}
                            >
                                {service?.name}
                            </Form.Item>
                            <Form.Item
                                name='decriptionService'
                                label='Mô tả'
                                style={{ marginTop: -10 }}
                            >
                                {service?.description}
                            </Form.Item>
                        </Form>
                        <Title level={4} style={{ top: 190 }}>
                            Quy tắc cấp số
                        </Title>
                        <Form style={{ position: 'absolute', left: 16, top: 232 }}>
                            <Form.Item
                                label='Tăng tự động từ:'
                            >
                                <Input style={{ width: 64 }} value={service?.start} />

                                <Text style={{ fontWeight: 600, position: 'absolute', left: 70, top: 5, fontSize: 16 }}>đến</Text>
                                <Input
                                    style={{ left: 40, width: 64 }}
                                    value={service?.end}
                                />

                            </Form.Item>
                            <Form.Item
                                label='Prefix:'
                            >
                                <Input
                                    style={{ left: 72, width: 64 }}
                                    value={service?.prefix}
                                />


                            </Form.Item>
                            <Form.Item
                                label='Surfix:'
                            >
                                <Input
                                    style={{ left: 72, width: 64 }}
                                    value={service?.surfix}
                                />

                            </Form.Item>
                            <Text style={{ fontWeight: 600, fontSize: 16 }}>
                                {service?.reset === true ? 'Reset theo ngày' : ''}
                            </Text>
                        </Form>
                    </Card>
                </Col>
                <Col span={7}>
                    <Card style={{ width: 718, left: 168 }}>
                        <Row style={{ width: '82%', position: 'absolute', top: 0, left: 24 }}>
                            <Col span={4} style={{ position: 'absolute', left: 0, width: '100%' }}>
                                <Text style={{ fontSize: 16 }}>Trạng thái</Text>
                                <Select
                                    size='large'
                                    style={{ width: 160, position: 'absolute', top: 34 }}
                                    suffixIcon={
                                        <CaretDownOutlined
                                            style={dropdownIconStyle}
                                        />
                                    }
                                    onChange={(e) => { setStatus(e) }}
                                    defaultValue={null}
                                >
                                    <Option key={1} value={null}> Tất cả</Option>
                                    <Option key={2} value='waiting'> Đang chờ</Option>
                                    <Option key={3} value='used'> Đã sử dụng</Option>
                                    <Option key={4} value='skip'> Bỏ qua</Option>
                                </Select>
                            </Col>
                            <Col span={4} style={{ position: 'absolute', left: 175, width: 320 }}>
                                <Text style={{ fontSize: 16, width: 200 }}>Chọn thời gian</Text>
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
                                        style={{ backgroundColor: '#ffffff', left: -12 }}
                                        prevIcon={<LeftOutlined style={{ color: '#ff7506', fontWeight: 700, marginLeft: 20 }} />}
                                        nextIcon={<RightOutlined style={{ color: '#ff7506', fontWeight: 700, marginRight: 20 }} />}
                                        onChange={onChange}
                                    />
                                </Form>

                            </Col>
                            <Col span={6} style={{ position: 'absolute', left: '80%', width: 310 }}>
                                <Text style={{ fontSize: 16 }}>Từ khóa</Text>
                                <Input
                                    size='large'
                                    style={{ width: 206, position: 'absolute', top: 34, borderRadius: 8, height: 45 }}
                                    placeholder='Nhập từ khóa'
                                    suffix={
                                        <SearchOutlined
                                            style={{ color: '#FF7506', fontSize: 20, left: 100 }}
                                        />
                                    }
                                    onChange={(e) => { setKeywords(e.target.value) }}
                                />
                            </Col>
                        </Row>
                        <Table
                            style={{ width: 669, position: 'absolute', top: 100 }}
                            rowClassName={(record: any, index: any) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                            bordered
                            pagination={{
                                defaultPageSize: 8,
                                position: ["bottomRight"],
                                showLessItems: true,
                                showSizeChanger: false,
                            }}
                            columns={columns}
                            loading={loading}
                            dataSource={
                                giveNumbersFilter.map(gn => ({
                                    key: gn.id,
                                    number: gn.number,
                                    status: gn.status
                                }))
                            }
                            size='middle'
                        />
                    </Card>
                </Col>
            </Row>
            <Link style={addDeviceStyle} to='/admin/service/update/:key'>
                <Card style={cardButtonAddStyle}>
                    <EditOutlined style={iconAddStyle} />
                </Card>
                <Text style={addTextStyle}>Cập nhật <br />danh sách</Text>
            </Link>
            <Link style={{
                position: 'absolute', top: 344, left: 1406, width: 80, height: 80, padding: '12 4', backgroundColor: '#FFF2E7', border: 'none'
            }} to='/admin/service'>
                <Card style={cardButtonAddStyle}>
                    <RollbackOutlined style={iconAddStyle} />
                </Card>
                <Text style={addTextStyle}>Quay lại</Text>
            </Link>
        </div>
    )
}

export default ServiceDetail