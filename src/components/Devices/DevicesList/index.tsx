import React from 'react';
import { Col, Input, Row, Select, Typography, Space, Table, Button, Card, Badge } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { CaretDownOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { addDeviceStyle, addTextStyle, cardButtonAddStyle, dropdownIconStyle, iconAddStyle, textStyle, titlePageStyle } from './Style';
import { devicesData } from '../../../config/interface'
import 'antd/dist/antd.css';
import './Style.css'
const { Title, Text } = Typography;

type Props = {}


const columns: ColumnsType<devicesData> = [
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
        dataIndex: 'address',
        key: 'address',
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
        title: 'Trạng thái kết nối',
        dataIndex: 'connect',
        key: 'connect',
        render: (dataIndex) => (
            <span>
                <Badge status={(dataIndex === true) ? 'success' : 'warning'} />
                {dataIndex}
            </span>
        ),
    },
    {
        title: 'Dịch vụ sử dụng',
        dataIndex: 'service',
        key: 'service',
    },
    {
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a href={`/admin/devices/detail/${record.id}`}>Chi tiết</a>
            </Space>
        ),
    },
    {
        key: 'action',
        render: (_, record) => {
            return (
                <Space size="middle">
                    <a href={`/admin/devices/update/${record.id}`}>Cập nhật</a>
                </Space>
            )
        }
    },
];
const data: devicesData[] = [
    {
        id: 1,
        key: 'KIO_01',
        name: 'Kiosk',
        address: '192.168.1.10',
        active: true ? 'Đang hoạt động' : 'Ngừng hoạt động',
        connect: true ? 'Đang kết nối' : 'Mất kết nối',
        service: 'sdsdasdsad'
    },
    {
        id: 2,
        key: 'KIO_01',
        name: 'Kiosk',
        address: '192.168.1.10',
        active: true ? 'Đang hoạt động' : 'Ngừng hoạt động',
        connect: false ? 'Đang kết nối' : 'Mất kết nối',
        service: 'sdsdasdsad'
    },
    {
        id: 3,
        key: 'KIO_01',
        name: 'Kiosk',
        address: '192.168.1.10',
        active: false ? 'Đang hoạt động' : 'Ngừng hoạt động',
        connect: true ? 'Đang kết nối' : 'Mất kết nối',
        service: 'sdsdasdsad'
    },
    {
        id: 4,
        key: 'KIO_01',
        name: 'Kiosk',
        address: '192.168.1.10',
        active: false ? 'Đang hoạt động' : 'Ngừng hoạt động',
        connect: false ? 'Đang kết nối' : 'Mất kết nối',
        service: 'sdsdasdsad'
    },
    {
        id: 5,
        key: 'KIO_01',
        name: 'Kiosk',
        address: '192.168.1.10',
        active: true ? 'Đang hoạt động' : 'Ngừng hoạt động',
        connect: true ? 'Đang kết nối' : 'Mất kết nối',
        service: 'sdsdasdsad'
    }
];


const DevicesList: React.FC = (props: Props) => {
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

export default DevicesList