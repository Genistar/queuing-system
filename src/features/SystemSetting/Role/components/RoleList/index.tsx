import React, { useEffect } from 'react';
import { Col, Input, Row, Select, Typography, Space, Table, Card, Badge, Form, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { roleData, roleType } from '../../../../../constants/interface'
import 'antd/dist/antd.css';
import { addDeviceStyle, addTextStyle, cardButtonAddStyle, iconAddStyle } from '../../../../Devices/components/DevicesList/Style';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../store';
import { getAll, roleSelector } from '../../roleSlice';
const { Title, Text } = Typography;
const { Option } = Select;

interface Props {
}

const columns: ColumnsType<roleType> = [
    {
        title: 'Tên vai trò',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Số người dùng',
        dataIndex: 'amountOfUser',
        key: 'amountOfUser',
    },
    {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
    },
    {
        key: 'action',
        render: (_, record) => {
            return (
                <Space size="middle">
                    <Link to={`/admin/setting/role/update/${record.id}`}>Cập nhật</Link>
                </Space>
            )
        }
    },
];
const RoleList: React.FC<Props> = (props: Props) => {
    const { roles, loading } = useAppSelector(roleSelector);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAll())
    }, [])
    return (
        <div>
            <Title level={3} style={{ position: 'absolute', left: 224, top: 114, fontWeight: 700, color: '#ff7506' }}>
                Quản lý cấp số
            </Title>
            <Row style={{ width: 1200, position: 'absolute', top: 106, left: 24 }}>
                <Form layout='inline' style={{ width: 500 }}>
                    <Col span={4} style={{ position: 'absolute', left: 966, width: 320 }}>
                        <Col span={6} style={{ position: 'absolute', left: '70%', width: 310 }}>
                            <Text style={{ width: 200, fontSize: 16 }}>Từ khóa</Text>
                            <Input
                                size='large'
                                style={{ width: 240, top: 34, height: 44.15, borderRadius: 8 }}
                                placeholder='Nhập từ khóa'
                                suffix={
                                    <SearchOutlined
                                        style={{ color: '#FF7506', fontSize: 20 }}
                                    />
                                }
                            />
                        </Col>
                    </Col>
                </Form>
            </Row>
            <Row>
                <Table
                    dataSource={
                        roles.map(role => ({
                            ...role,
                            amountOfUser: role.amountOfUser
                        }))
                    }
                    columns={columns}
                    rowClassName={(record: any, index: any) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                    style={{
                        position: 'absolute', top: 204, left: 224, width: 1152,
                        filter: 'drop-shadow(2px 2px 8px rgba(232, 239, 244, 0.8))', backgroundColor: '#f9sdj9',
                    }}
                    bordered
                    loading={loading}
                    pagination={{
                        defaultPageSize: 8,
                        position: ["bottomRight"],
                        showLessItems: true,
                        showSizeChanger: false,
                    }}
                />
            </Row>
            <Link style={addDeviceStyle} to='/admin/role/add'>
                <Card style={cardButtonAddStyle}>
                    <PlusOutlined style={iconAddStyle} />
                </Card>
                <Text style={addTextStyle}>Thêm <br />vai trò</Text>
            </Link>
        </div>
    )
}

export default RoleList