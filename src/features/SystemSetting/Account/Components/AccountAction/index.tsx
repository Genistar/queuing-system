import React, { useEffect, useState } from 'react'
import { Card, Col, Typography, Form, Input, Button, Select, message as notice } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import { dropdownIconStyle, titlePageStyle } from '../../../../Devices/components/DevicesList/Style';
import { buttonAddstyle, buttonCancelstyle, buttonstyle, formLeftStyle, formRightStyle, inputStyle, titlePageStyle as T } from './Style';
import { layoutStyle } from './Style';
import { useHistory } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { userType } from '../../../../../constants/interface';
import { add, get, update, userSelector } from '../../userSlice'
import { add as addDiary } from '../../../DairyUser/diarySlice'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../../store';
import { Timestamp } from 'firebase/firestore';
import { getAll, roleSelector } from '../../../Role/roleSlice';
const { Title, Text } = Typography;
const { Option } = Select;
type QuizParams = {
    key: string;
};
interface Props {
}

const roleData = ['Kế toán', 'Thu ngân', 'Quản lý']
const activeData = ['Đang hoạt động', 'Ngừng hoạt động']

const AccountAction: React.FC<Props> = (props: Props) => {
    const [userName, setUserName] = useState(String)
    const [email, setEmail] = useState(String);
    const [fullName, setFullName] = useState(String);
    const [phoneNumber, setPhoneNumber] = useState(String);
    const [password, setPassword] = useState(String);
    const [retypePassword, setReTypePassword] = useState(String);
    const [role, setRole] = useState(String);
    const [active, setActive] = useState<boolean>(false)
    let history = useHistory();
    let { key } = useParams<QuizParams>();
    const [form] = Form.useForm()
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(userSelector);
    const { userLogin } = useAppSelector(userSelector);
    const { roles } = useAppSelector(roleSelector)
    const onBack = () => {
        history.goBack()
    }
    useEffect(() => {
        dispatch(getAll())
    }, [])
    useEffect(() => {
        form.setFieldsValue({
            ...user,
            retypePassword: user?.password,
        });
        console.log(user)
    }, [user])
    useEffect(() => {
        if (key) {
            dispatch(get(key))
        }
    }, [key])

    const onAddDevice = () => {
        const user: userType = {
            username: userName,
            name: fullName,
            phone: phoneNumber,
            email: email,
            role: role,
            password: password,
            isActive: active
        }
        if (!key) {
            dispatch(add(user)).then((data) => {
                if (data.meta.requestStatus === 'fulfilled') {
                    notice.success('Thêm thành công', 3)
                    dispatch(addDiary({
                        username: userLogin ? userLogin.username : '',
                        ip: '192.168.1.1',
                        action: `Thêm người dùng ${user.name}`,
                        time: Timestamp.fromDate(new Date())
                    }))
                } else {
                    notice.success('Đã xảy ra lỗi', 3)
                }
            })
            history.goBack()
        }
        else {
            dispatch(update({
                id: key,
                ...user
            })).then((data) => {
                if (data.meta.requestStatus === 'fulfilled') {
                    dispatch(get(key))
                    notice.success('Cập nhật thành công', 3)
                    dispatch(addDiary({
                        username: userLogin ? userLogin.username : '',
                        ip: '192.168.1.1',
                        action: `Cập nhật người dùng ${user.name}`,
                        time: Timestamp.fromDate(new Date())
                    }))
                } else {
                    notice.success('Đã xảy ra lỗi', 3)
                }
            })
            history.goBack()
        }
    }
    return (
        <div>
            <Title level={3} style={titlePageStyle}>
                Quản lý tài khoản
            </Title>
            <Card style={layoutStyle}>
                <Title level={4} style={T}>
                    Thông tin tài khoản
                </Title>
                <Col span={6}>
                    <Form
                        layout='vertical'
                        style={formLeftStyle}
                        form={key ? form : undefined}
                    >
                        <Form.Item
                            name='name'
                            label='Họ tên'
                            rules={[{ required: true }]}>
                            <Input
                                name='fullName'
                                style={inputStyle}
                                placeholder='Nhập họ tên'
                                onChange={(e) => { setFullName(e.target.value) }}
                            />
                        </Form.Item>
                        <Form.Item
                            name='phone'
                            label='Số điện thoại'
                            rules={[{ required: true }]}
                        >
                            <Input
                                name='phone'
                                style={inputStyle}
                                placeholder='Nhập số điện thoại'
                                onChange={(e) => { setPhoneNumber(e.target.value) }}
                            />
                        </Form.Item>
                        <Form.Item
                            name='email'
                            label='Email'
                            rules={[{ required: true }]}
                        >
                            <Input
                                name='email'
                                style={inputStyle}
                                placeholder='Nhập địa chỉ email'
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                        </Form.Item>
                        <Form.Item
                            name='role'
                            label='Vai trò'
                            rules={[{ required: true }]}
                        >
                            <Select
                                placeholder='Chọn vai trò'
                                size='middle'
                                suffixIcon={
                                    <CaretDownOutlined
                                        style={dropdownIconStyle}
                                    />
                                }
                                onChange={(e) => setRole(e)}
                                style={{ height: 44.15 }}
                            >
                                {roles.map((role) => (
                                    <Option key={role.id} value={role.name}>{role.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={6}>
                    <Form
                        layout='vertical'
                        style={formRightStyle}
                        form={key ? form : undefined}
                    >
                        <Form.Item
                            name='username'
                            label='Tên đăng nhập'
                            rules={[{ required: true }]}
                        >
                            <Input
                                name='userName'
                                style={inputStyle}
                                placeholder='Nhập tên đăng nhập'
                                onChange={(e) => { setUserName(e.target.value) }}
                            />
                        </Form.Item>
                        <Form.Item
                            label='Mật khẩu'
                            name='password'
                            rules={[{ required: true }]}
                        >
                            <Input.Password
                                name='password'
                                size='large'
                                placeholder="Nhập mật khẩu"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                style={{
                                    borderRadius: 8, color: '#000', border: '1.5px solid #D4D4D7', fontSize: 14, height: 44.15, marginTop: -7
                                }}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </Form.Item>
                        <Form.Item
                            name='retypePassword'
                            label='Nhập lại mật khẩu'
                            rules={[{ required: true }]}
                        >
                            <Input.Password
                                name='password'
                                size='large'
                                placeholder="nhập lại mật khẩu"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                style={{
                                    borderRadius: 8, color: '#D4D4D7', border: '1.5px solid #D4D4D7', fontSize: 14, height: 44.15
                                }}
                                onChange={(e) => { setReTypePassword(e.target.value) }}
                            />
                        </Form.Item>
                        <Form.Item
                            name='isActive'
                            label='Tình trạng'
                            rules={[{ required: true }]}
                            style={{ marginTop: 30 }}
                        >
                            <Select
                                placeholder='Chọn tình trạng'
                                size='middle'
                                suffixIcon={
                                    <CaretDownOutlined
                                        style={dropdownIconStyle}
                                    />
                                }
                                style={{ height: 44.15 }}
                                onChange={(e) => setActive(e)}
                            >
                                {activeData.map((active) => (
                                    <Option key={active} value={active === 'Đang hoạt động' ? true : false}>{active}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>

                </Col>
                <Form style={{ position: 'absolute', top: 442 }}>
                    <Form.Item name='batbuoc' rules={[{ required: true }]} label=' '> <Text style={{ fontWeight: 400, width: 300, marginTop: -10 }}>Là trường thông tin bắt buộc</Text></Form.Item>
                </Form>
            </Card>
            <Form layout='inline' style={buttonstyle}>
                <Form.Item>
                    <Button style={buttonCancelstyle} onClick={onBack}>Hủy</Button>
                </Form.Item>
                <Form.Item>
                    <Button style={buttonAddstyle} onClick={onAddDevice}>{key ? 'Cập nhật' : 'Thêm tài khoản'}</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AccountAction
