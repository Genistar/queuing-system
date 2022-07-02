import React from 'react';
import { Col, Input, Row, Select, Typography, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { CaretDownOutlined, SearchOutlined } from '@ant-design/icons'
import { dropdownIconStyle, textStyle } from './Style';
import { equimentData } from '../../../config/interface'
import 'antd/dist/antd.css';
import './Style.css'
const { Title, Text } = Typography;


type Props = {}

const columns: ColumnsType<equimentData> = [
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
    },
    {
        title: 'Trạng thái kết nối',
        dataIndex: 'connect',
        key: 'connect',
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
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];
const data: equimentData[] = [
    {
        key: 'KIO_01',
        name: 'Kiosk',
        address: '192.168.1.10',
        active: true ? 'Đang hoạt động' : 'Ngừng hoạt động',
        connect: true ? 'Đang kết nối' : 'Mất kết nối',
        service: 'sdsdasdsad'
    },
    {
        key: 'KIO_01',
        name: 'Kiosk',
        address: '192.168.1.10',
        active: true ? 'Đang hoạt động' : 'Ngừng hoạt động',
        connect: false ? 'Đang kết nối' : 'Mất kết nối',
        service: 'sdsdasdsad'
    },
    {
        key: 'KIO_01',
        name: 'Kiosk',
        address: '192.168.1.10',
        active: false ? 'Đang hoạt động' : 'Ngừng hoạt động',
        connect: true ? 'Đang kết nối' : 'Mất kết nối',
        service: 'sdsdasdsad'
    },
    {
        key: 'KIO_01',
        name: 'Kiosk',
        address: '192.168.1.10',
        active: false ? 'Đang hoạt động' : 'Ngừng hoạt động',
        connect: false ? 'Đang kết nối' : 'Mất kết nối',
        service: 'sdsdasdsad'
    },
    {
        key: 'KIO_01',
        name: 'Kiosk',
        address: '192.168.1.10',
        active: true ? 'Đang hoạt động' : 'Ngừng hoạt động',
        connect: true ? 'Đang kết nối' : 'Mất kết nối',
        service: 'sdsdasdsad'
    }
];


const EquipmentList: React.FC = (props: Props) => {
    return (
        <div>
            <Title level={3} style={{ position: 'absolute', left: 224, top: 104, fontWeight: 700 }}>
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
                        position: 'absolute', top: 244, left: 224, width: 1112,
                        filter: 'drop-shadow(2px 2px 8px rgba(232, 239, 244, 0.8))', backgroundColor: '#f9sdj9',
                    }}
                    bordered
                    columns={columns}
                    dataSource={data}
                    pagination={{ position: ["bottomRight"] }}
                />
            </Row>

        </div>
    )
}

export default EquipmentList