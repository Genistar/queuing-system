import React, { useEffect, useState } from 'react';
import { Col, Input, Row, Select, Typography, Space, Table, Button, Card, Badge } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { CaretDownOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { addDeviceStyle, addTextStyle, cardButtonAddStyle, dropdownIconStyle, iconAddStyle, textStyle, titlePageStyle } from './Style';
import { devicesData, deviceType } from '../../../../constants/interface'
import 'antd/dist/antd.css';
import './Style.css';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { deviceSelector, getAll } from '../../deviceSlice';
import { connect } from 'http2';
import { servicesVersion } from 'typescript';
const { Title, Text } = Typography;
const { Option } = Select;

interface Props {
    data: devicesData[]
}


const columns: ColumnsType<deviceType> = [
    {
        title: 'Mã thiết bị',
        dataIndex: 'key',
        key: 'key'
    },
    {
        title: 'Tên thiết bị',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Địa chỉ IP',
        dataIndex: 'ip',
        key: 'ip',
    },
    {
        title: 'Trạng thái hoạt động',
        dataIndex: 'isActive',
        key: 'isActive',
        render: (dataIndex) => (
            <span>
                <Badge status={dataIndex === true ? 'success' : 'warning'} />
                {dataIndex === true ? 'Đang hoạt động' : 'Ngưng hoạt động'}
            </span>
        ),
    },
    {
        title: 'Trạng thái kết nối',
        dataIndex: 'isConnect',
        key: 'isConnect',
        render: (dataIndex) => (
            <span>
                <Badge status={(dataIndex === true) ? 'success' : 'warning'} />
                {dataIndex === true ? 'Đang kết nối' : 'Ngưng kết nối'}
            </span>
        ),
    },
    {
        title: 'Dịch vụ sử dụng',
        dataIndex: 'services',
        key: 'services',
        render: (dataIndex) => (
            <span>
                {
                    dataIndex.lenght < 20 ?
                        dataIndex.map((datas: any) => {
                            return dataIndex.find(
                                (data: any) => data === datas
                            )
                        }).join(', ') : dataIndex.map((datas: any) => {
                            return dataIndex.find(
                                (data: any) => data === datas
                            )
                        }).join(', ').substring(0, 20)
                }...<a style={{ textDecorationLine: 'underline' }}>Xem thêm</a>
            </span>
        ),
    },
    {
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Link to={`/admin/devices/detail/${record.id}`} >Chi tiết</Link>
            </Space>
        ),
    },
    {
        key: 'action',
        render: (_, record) => {
            return (
                <Space size="middle">
                    <Link to={`/admin/devices/update/${record.id}`}>Cập nhật</Link>
                </Space>
            )
        }
    },
];
const DevicesList: React.FC<Props> = (props: Props) => {
    const [active, setActive] = useState<boolean | null>(null)
    const [connect, setConnect] = useState<boolean | null>(null)
    const [keywords, setKeywords] = useState<string>("");
    const dispatch = useAppDispatch()
    const { loading, devices } = useAppSelector(deviceSelector)
    useEffect(() => {
        dispatch(getAll({ active, connect, keywords }))
    }, [active, connect, keywords])
    return (
        <div>
            <Title level={3} style={titlePageStyle}>
                Danh Sách Thiết Bị
            </Title>
            <Row style={{ width: 1200, position: 'absolute', top: 156, left: 224 }}>
                <Col span={4} style={{ position: 'absolute', left: 0, width: 310 }}>
                    <Text style={textStyle}>Trạng thái hoạt động</Text>
                    <Select
                        size='large'
                        style={{ width: 300, position: 'absolute', top: 34 }}
                        defaultValue={null}
                        value={active}
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
                <Col span={4} style={{ position: 'absolute', left: 320, width: 310 }}>
                    <Text style={textStyle}>Trạng thái kết nối</Text>
                    <Select
                        size='large'
                        style={{ width: 300, position: 'absolute', top: 34 }}
                        defaultValue={null}
                        value={connect}
                        onChange={(e) => { console.log(e); setConnect(e) }}
                        suffixIcon={
                            <CaretDownOutlined
                                style={dropdownIconStyle}
                            />
                        }
                    >
                        <Option value={null}>
                            Tất cả
                        </Option>
                        <Option value={true}>
                            Đang kết nối
                        </Option>
                        <Option value={false}>
                            Mất kết nối
                        </Option>
                    </Select>
                </Col>
                <Col span={6} style={{ position: 'absolute', left: 740, width: 310 }}>
                    <Text style={textStyle}>Từ khóa</Text>
                    <Input
                        size='large'
                        style={{ width: 300, position: 'absolute', top: 34, borderRadius: 8, height: 44.15 }}
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
                    rowClassName={(record: any, index: any) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                    style={{
                        position: 'absolute', top: 244, left: 224, width: 1152,
                        filter: 'drop-shadow(2px 2px 8px rgba(232, 239, 244, 0.8))', backgroundColor: '#f9sdj9',
                    }}
                    bordered
                    loading={loading}
                    columns={columns}
                    dataSource={devices.map((device) => ({
                        key: device.deviceId,
                        ...device
                    }))}
                    pagination={{ position: ["bottomRight"] }}
                />
            </Row>
            <Link style={addDeviceStyle} to='/admin/devices/add'>
                <Card style={cardButtonAddStyle}>
                    <PlusOutlined style={iconAddStyle} />
                </Card>
                <Text style={addTextStyle}>Thêm <br />thiết bị</Text>
            </Link>
        </div>
    )
}

export default DevicesList