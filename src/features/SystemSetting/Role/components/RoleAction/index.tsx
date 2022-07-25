import React, { useEffect, useState } from 'react'
import { Card, Col, Typography, Form, Input, Button, Checkbox, Row, message as notice } from 'antd'
import { buttonAddstyle, buttonCancelstyle, inputStyle, titlePageStyle as T }
    from '../../../../Devices/components/DevicesAction/Style';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { titlePageStyle } from '../../../../Devices/components/DevicesList/Style';
import { roleType } from '../../../../../constants/interface';
import { useAppDispatch, useAppSelector } from '../../../../../store';
import { addRole, roleSelector } from '../../roleSlice';
import { add } from '../../../DairyUser/diarySlice';
import { userSelector } from '../../../Account/userSlice';
import { Timestamp } from 'firebase/firestore';
const { Title } = Typography;
type QuizParams = {
    key: string;
};

type Props = {}

const RoleAction: React.FC = (props: Props) => {
    let navigate = useNavigate();
    let { key } = useParams<QuizParams>();
    const [form] = Form.useForm()
    const dispatch = useAppDispatch();
    const { userLogin } = useAppSelector(userSelector);
    const { loading, role } = useAppSelector(roleSelector)

    useEffect(() => {
        if (key) {
            form.setFieldsValue(role)
        }

    }, [role])

    const onBack = () => {
        navigate('../')
    }
    const onAddRole = (value: roleType) => {
        if (!key) {
            dispatch(
                addRole({
                    ...value,
                    authorityA: value.authorityA ? value.authorityA : [],
                    authorityB: value.authorityB ? value.authorityB : [],
                    authorityC: value.authorityC ? value.authorityC : [],
                })
            ).then((data) => {
                if (data.meta.requestStatus == "fulfilled") {
                    notice.success("Thêm thành công", 3);
                    navigate('../')
                    dispatch(
                        add({
                            username: userLogin ? userLogin.username : '',
                            ip: "127.0.0.1",
                            action: "Thêm vai trò ",
                            time: Timestamp.fromDate(new Date()),
                        })
                    );
                } else {
                    notice.error("Đã xảy ra lỗi", 3);
                }
            });
        }

    }
    return (
        <Form
            layout='vertical'
            form={form}
            onFinish={onAddRole}
        >
            <Title level={3} style={titlePageStyle}>
                Danh sách vai trò
            </Title>
            <Card style={{ width: 1192, height: 500, position: 'absolute', top: 156, left: 224, borderRadius: 16, boxShadow: '2px 2px 8px 0px #E8EFF4CC' }}>
                <Title level={4} style={T}>
                    Thông tin vai trò
                </Title>
                <Row >
                    <Col span={6} style={{ height: 76, width: 540, top: 46, left: 24, position: 'absolute' }}>
                        <Form.Item
                            name='name'
                            label='Tên vai trò'
                            rules={[{ required: true }]}
                            style={{ width: 540 }}
                        >
                            <Input
                                style={inputStyle}
                                placeholder='Nhập tên vai trò'
                            />
                        </Form.Item>
                        {/* <Form layout='vertical' style={{ left: 556, height: 164, position: 'absolute', width: 553, top: 36 }}> */}
                        <Form.Item
                            name='description'
                            label='Mô tả dịch vụ'
                            rules={[{ required: true }]}
                            style={{ width: 540 }}
                        >
                            <Input.TextArea style={{ height: 132, borderRadius: 8 }}>
                            </Input.TextArea>
                        </Form.Item>

                    </Col>
                    <Col span={6} style={{ position: 'absolute', left: 588, top: 40, width: 504 }}>
                        <Form.Item label='Phân quyền chức năng'>
                            <Card
                                style={{
                                    width: 560, height: 420,
                                    position: 'absolute', top: -8,
                                    backgroundColor: '#FFF2E7',
                                    overflowY: 'scroll'
                                }}
                            >
                                <Col style={{ top: 35 }}>
                                    <Title level={4} style={{ position: 'absolute', top: -40, left: 0 }}>Nhóm chức năng A</Title>
                                    <Checkbox >Tất cả</Checkbox>
                                    <Form.Item name='authorityA' style={{ marginTop: 10 }}>
                                        <Checkbox.Group>
                                            <Checkbox value='cnax'>Chức năng x</Checkbox>
                                            <Checkbox value='cnay' style={{ display: 'flex', marginLeft: 0, marginTop: 10 }}>Chức năng y</Checkbox>
                                            <Checkbox value='cnbz' style={{ display: 'flex', marginLeft: 0, marginTop: 10 }}>Chức năng z</Checkbox>
                                        </Checkbox.Group>

                                    </Form.Item>
                                </Col>

                                <Col style={{ top: 75 }}>
                                    <Title level={4} style={{ position: 'absolute', top: -40, left: 0 }}>Nhóm chức năng B</Title>
                                    <Checkbox >Tất cả</Checkbox>
                                    <Form.Item name='authorityB' style={{ marginTop: 10 }}>
                                        <Checkbox.Group>
                                            <Checkbox value='cnbx'>Chức năng x</Checkbox>
                                            <Checkbox value='cnby' style={{ display: 'flex', marginLeft: 0, marginTop: 10 }}>Chức năng y</Checkbox>
                                            <Checkbox value='cnbz' style={{ display: 'flex', marginLeft: 0, marginTop: 10 }}>Chức năng z</Checkbox>
                                        </Checkbox.Group>

                                    </Form.Item>
                                </Col>
                                <Col style={{ top: 110 }}>
                                    <Title level={4} style={{ position: 'absolute', top: -40, left: 0 }}>Nhóm chức năng C</Title>
                                    <Checkbox >Tất cả</Checkbox>
                                    <Form.Item name='authorityC' style={{ marginTop: 10 }}>
                                        <Checkbox.Group>
                                            <Checkbox value='cnbx' style={{ marginTop: 0 }}>Chức năng x</Checkbox>
                                            <Checkbox value='cnby' style={{ display: 'flex', marginLeft: 0, marginTop: 10 }}>Chức năng y</Checkbox>
                                            <Checkbox value='cnbz' style={{ display: 'flex', marginLeft: 0, marginTop: 10 }}>Chức năng z</Checkbox>
                                        </Checkbox.Group>

                                    </Form.Item>
                                </Col>
                            </Card>

                        </Form.Item>


                    </Col>
                </Row>
            </Card>
            <Row style={{ top: 680, left: 634.5, position: 'absolute' }}>
                <Col span={6}>
                    <Button style={buttonCancelstyle} onClick={onBack}>Hủy</Button>
                </Col>
                <Col span={6}>
                    <Button
                        style={{
                            width: 147, height: 48, backgroundColor: '#ff7506', color: '#fff', padding: '10px 24px', borderRadius: 8, fontWeight: 700,
                            left: 80
                        }}
                        htmlType='submit'
                        loading={loading}
                    >
                        {key ? 'Cập nhật' : 'Thêm dịch vụ'}
                    </Button>
                </Col>
            </Row>
        </Form >
    )
}

export default RoleAction