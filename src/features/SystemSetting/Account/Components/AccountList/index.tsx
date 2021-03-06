import React, { useEffect, useState } from 'react';
import { Col, Input, Row, Select, Typography, Space, Table, Card, Badge, Form } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { CaretDownOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { userType } from '../../../../../constants/interface';
import { userSelector, getAll } from '../../userSlice';
import 'antd/dist/antd.css';
import { addDeviceStyle, addTextStyle, cardButtonAddStyle, dropdownIconStyle, iconAddStyle } from '../../../../Devices/components/DevicesList/Style';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../store';
import { roleSelector } from '../../../Role/roleSlice';
import { getAll as getRoles } from '../../../Role/roleSlice'
const { Title, Text } = Typography;
const { Option } = Select;

interface Props {
}
const columns: ColumnsType<userType> = [
    {
        title: 'Tên đăng nhập',
        dataIndex: 'username',
        key: 'username'
    },
    {
        title: 'Họ tên',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Vai trò',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: 'Trạng thái hoạt động',
        dataIndex: 'isActive',
        key: 'isActive',
        render: (dataIndex) => (
            <span>
                <Badge status={dataIndex ? 'success' : 'warning'} />
                {dataIndex === true ? 'Đang hoạt động' : 'Ngừng hoạt động'}
            </span>
        ),
    },
    {
        key: 'action',
        render: (_, record) => {
            return (
                <Space size="middle">
                    <Link to={`/admin/setting/account/update/${record.id}`}>Cập nhật</Link>
                </Space>
            )
        }
    },
];
const AccountList: React.FC<Props> = (props: Props) => {
    const [role, setRole] = useState(null);
    const [keywords, setKeywords] = useState<string>("");
    const dispatch = useAppDispatch();
    const { authLoading, users } = useAppSelector(userSelector);
    const { roles } = useAppSelector(roleSelector);
    useEffect(() => {
        dispatch(getRoles())
    }, [])
    useEffect(() => {
        console.log(users)
        dispatch(getAll({ keywords, role }))
    }, [keywords, role])
    return (
        <div>
            <Title level={3} style={{ position: 'absolute', left: 224, top: 104, fontWeight: 700, color: '#ff7506' }}>
                Danh sách tài khoản
            </Title>
            <Row style={{ width: 1200, position: 'absolute', top: 131, left: 24 }}>
                <Form layout='vertical' style={{ position: 'absolute', top: 5, left: 204 }}>
                    <Form.Item
                        name='role'
                        label='Vai trò'
                    >
                        <Select
                            placeholder={role}
                            size='middle'
                            suffixIcon={
                                <CaretDownOutlined
                                    style={dropdownIconStyle}
                                />
                            }
                            defaultValue={null}
                            style={{ height: 44.15, width: 300, marginTop: -5 }}
                            onChange={(e) => setRole(e)}
                        >
                            <Option value={null}>Tất cả</Option>
                            {roles.map((role) => (
                                <Option key={role.id} value={role.name}>{role?.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
                <Form layout='inline' style={{ width: 500 }}>
                    <Col span={4} style={{ position: 'absolute', left: 966, width: 320 }}>
                        <Col span={6} style={{ position: 'absolute', left: '70%', width: 310 }}>
                            <Text style={{ width: 200, fontSize: 16, marginTop: 5 }}>Từ khóa</Text>
                            <Input
                                size='large'
                                style={{ width: 240, top: 34, height: 44.15, borderRadius: 8 }}
                                placeholder='Nhập từ khóa'
                                suffix={
                                    <SearchOutlined
                                        style={{ color: '#FF7506', fontSize: 20 }}
                                    />
                                }
                                onChange={(e) => { setKeywords(e.target.value) }}
                            />
                        </Col>
                    </Col>
                </Form>
            </Row>
            <Row>
                <Table
                    dataSource={users.map((user) => ({
                        key: user.id,
                        ...user
                    }))}
                    loading={authLoading}
                    columns={columns}
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
            <Link style={addDeviceStyle} to='/admin/setting/account/add'>
                <Card style={cardButtonAddStyle}>
                    <PlusOutlined style={iconAddStyle} />
                </Card>
                <Text style={addTextStyle}>Thêm <br />tài khoản</Text>
            </Link>
        </div>
    )
}

export default AccountList