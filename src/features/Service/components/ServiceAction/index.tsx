import React, { useEffect, useState } from 'react'
import { Card, Col, Typography, Form, Input, Button, Select, Checkbox, Row, message as notice } from 'antd'
import { titlePageStyle } from '../../../Devices/components/DevicesList/Style';
import { buttonAddstyle, buttonCancelstyle, buttonstyle, formLeftStyle, inputStyle, titlePageStyle as T } from '../../../Devices/components/DevicesAction/Style';
import { formBottomStyle } from './Style';
import { layoutStyle } from '../../../Devices/components/DevicesAction/Style';
import { useNavigate } from 'react-router-dom';
import { devicesData, serviceType } from '../../../../constants/interface';
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../store';
import { add, get, serviceSelector, update } from '../../serviceSlice';
import { add as addDiary } from '../../../SystemSetting/DairyUser/diarySlice'
import { userSelector } from '../../../SystemSetting/Account/userSlice';
import { Timestamp } from 'firebase/firestore';
const { Title, Text } = Typography;
const { Option } = Select;
type QuizParams = {
    key: any;
};

type Props = {}

const ServiceAction: React.FC = (props: Props) => {
    let navigate = useNavigate();
    let { key } = useParams<QuizParams>();
    const [increase, setIncrease] = useState<boolean>(false);
    const [prefix, setPrefix] = useState<boolean>(false);
    const [surfix, setSurfix] = useState<boolean>(false);
    const [reset, setReset] = useState<boolean>(false);
    const [form] = Form.useForm()
    const dispatch = useAppDispatch();
    const { service } = useAppSelector(serviceSelector);
    const { userLogin } = useAppSelector(userSelector)

    useEffect(() => {
        if (key) {
            form.setFieldsValue({
                ...service
            })
            setIncrease(service?.start != null && service.end != null ? true : false)
            setPrefix(service?.prefix !== null ? true : false)
            setSurfix(service?.surfix !== null ? true : false)
            setReset(service?.reset === true ? true : false)
        }

    }, [service])
    useEffect(() => {
        if (key) {
            dispatch(get(key))
        }

    }, [key])



    const onBack = () => {
        navigate('../')
    }
    const onAddNewService = (value: serviceType) => {
        console.log(value)
        if (!key) {
            dispatch(add({
                ...value,
                prefix: prefix === true ? value.prefix : '',
                surfix: surfix === true ? value.surfix : '',
                reset: reset === true ? true : false,
                isActive: true
            })).then(
                (data) => {
                    if (data.meta.requestStatus === 'fulfilled') {
                        notice.success('Th??m th??nh c??ng ', 3);
                        dispatch(addDiary({
                            username: userLogin ? userLogin.username : '',
                            ip: '192.168.1.1',
                            action: `Th??m ${value.name}`,
                            time: Timestamp.fromDate(new Date())
                        }))
                        navigate('../')
                    }
                    else {

                        notice.success('???? x???y ra l???i', 2)
                        dispatch(addDiary({
                            username: userLogin ? userLogin.username : '',
                            ip: '192.168.1.1',
                            action: `Th??m ${value.name}`,
                            time: Timestamp.fromDate(new Date())
                        }))

                    }
                }
            )
        }
        else {
            dispatch(update({
                id: key,
                ...value,
                prefix: prefix === true ? value.prefix : '',
                surfix: surfix === true ? value.surfix : '',
                reset: reset === true ? true : false
            })).then((data) => {
                if (data.meta.requestStatus === 'fulfilled') {
                    dispatch(get(key))
                    notice.success('C???p nh???t th??nh c??ng ', 3);
                    dispatch(addDiary({
                        username: userLogin ? userLogin.username : '',
                        ip: '192.168.1.1',
                        action: `C???p nh???t ${value.name}`,
                        time: Timestamp.fromDate(new Date())
                    }))
                    navigate('../')
                }
                else {
                    notice.success('???? x???y ra l???i', 2)
                }
            })
        }
    }
    return (
        <div>
            <Title level={3} style={titlePageStyle}>
                Danh S??ch d???ch v???
            </Title>
            <Form
                layout='vertical'
                onFinish={onAddNewService}
                form={form}
            >
                <Card style={layoutStyle}>
                    <Title level={4} style={T}>
                        {key ? 'C???p nh???t thi???t b???' : 'Th??ng tin d???ch v???'}
                    </Title>
                    <Col span={6} style={
                        { height: 76, width: 540, top: 48, left: 24, position: 'absolute' }
                    }>

                        <Form.Item
                            name='serviceId'
                            label='M?? d???ch v???'
                            rules={[{ required: true }]}
                            style={{ width: 540 }}
                        >

                            <Input
                                style={inputStyle}
                                value={service?.serviceId}
                                placeholder='Nh???p m?? d???ch v???'
                            />
                        </Form.Item>
                        <Form.Item
                            name='name'
                            label='T??n d???ch v???'
                            rules={[{ required: true }]}
                            style={{ marginTop: -10, width: 540 }}
                        >
                            <Input
                                style={inputStyle}
                                placeholder='Nh???p t??n d???ch v???'
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6} style={{ left: 581, height: 164, position: 'absolute', width: 553, top: 48 }}>
                        <Form.Item
                            name='description'
                            label='M?? t??? d???ch v???'
                            rules={[{ required: true }]}
                            style={{ width: 553 }}
                        >
                            <Input.TextArea style={{ height: 132, width: 553, borderRadius: 8 }} />

                        </Form.Item>

                    </Col>
                    <Title level={4} style={{ position: 'absolute', left: 24, top: 238, fontWeight: 700, color: '#ff7506', lineHeight: '30px' }}>
                        Quy t???c c???p s???
                    </Title>
                    <Col style={formBottomStyle}>
                        <Checkbox
                            checked={increase}
                            onChange={() => { setIncrease(!increase) }}
                        >
                            <Form.Item
                                label='T??ng t??? ?????ng t??? :'
                                name='start'
                            >
                                <Input
                                    style={{
                                        borderRadius: 8, color: '#D4D4D7', fontSize: 14,
                                        height: 44, width: 64, top: -40, left: 140, position: 'absolute'
                                    }}
                                />
                            </Form.Item>

                            <Text style={{ fontWeight: 600, position: 'absolute', left: 240, top: 0 }}>?????n</Text>
                            <Form.Item
                                name='end'
                            >
                                <Input
                                    style={{
                                        borderRadius: 8, color: '#D4D4D7', fontSize: 14,
                                        height: 44, width: 64, top: -96, position: 'absolute', left: 250
                                    }}
                                />
                            </Form.Item>
                        </Checkbox>
                        <Checkbox
                            checked={prefix}
                            style={{ position: 'absolute', left: -8, top: 50 }}
                            onChange={() => { setPrefix(!prefix) }}
                        >
                            <Form.Item
                                label='Prefix:'
                                name='prefix'
                                style={{ borderRadius: 8, color: '#D4D4D7', fontSize: 14, height: 44, width: 64, top: -1, position: 'absolute', left: 24 }}
                            >
                                <Input style={{ marginLeft: 95 }} />
                            </Form.Item>
                        </Checkbox>
                        <Checkbox
                            checked={surfix}
                            style={{ position: 'absolute', left: -8, top: 103 }}
                            onChange={() => setSurfix(!surfix)}
                        >
                            <Form.Item
                                label='Surfix:'
                                name='surfix'
                                style={{ borderRadius: 8, color: '#D4D4D7', fontSize: 14, height: 44, width: 64, top: -1, position: 'absolute', left: 24 }}
                            >
                                <Input style={{ marginLeft: 94 }} />
                            </Form.Item>
                        </Checkbox>
                        <Checkbox
                            checked={reset}
                            style={{ position: 'absolute', left: -8, top: 153 }}
                            onChange={() => setReset(!reset)}
                        >
                            <Form.Item
                                noStyle
                                name="reset"
                                valuePropName="checked"
                            >
                                <Text style={{ fontWeight: 600, marginTop: -15, width: 200, fontSize: 16 }}>Reset theo ng??y</Text>
                            </Form.Item>

                        </Checkbox>
                    </Col>
                    <Form style={{ position: 'absolute', top: 467 }}>
                        <Form.Item name='batbuoc' rules={[{ required: true }]} label=' '>
                            <Text style={{ fontWeight: 400, fontSize: 14, color: '#7E7D88', width: 300, marginTop: -48, left: 24 }}>
                                L?? tr?????ng th??ng tin b???t bu???c
                            </Text>
                        </Form.Item>
                    </Form>
                    <Row style={{ top: 520, left: 434.5, position: 'absolute' }}>
                        <Col span={6}>
                            <Button style={buttonCancelstyle} onClick={onBack}>H???y</Button>
                        </Col>
                        <Col span={6} style={{ marginLeft: 70 }}>
                            <Button
                                style={buttonAddstyle}
                                htmlType='submit'
                            >
                                {key ? 'C???p nh???t' : 'Th??m d???ch v???'}
                            </Button>
                        </Col>
                    </Row>
                </Card>
            </Form>

        </div >
    )
}

export default ServiceAction