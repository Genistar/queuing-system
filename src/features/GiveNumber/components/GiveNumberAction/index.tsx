import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Modal, Select, Typography, Row, Col, message as notice } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { serviceSelector } from '../../../Service/serviceSlice';
import { getAll as getServices, get as getService } from '../../../Service/serviceSlice';
import { addGiveNumber, get, getAll, giveNumberSelector } from '../../giveNumberSlice';
import { Timestamp } from 'firebase/firestore';
import { add as addDiary } from '../../../SystemSetting/DairyUser/diarySlice'
import moment from 'moment';
import { userSelector } from '../../../SystemSetting/Account/userSlice';
const { Title, Text } = Typography;
interface form {
    service: string
}
interface Props {
    addNewData: any;
}


const GiveNumberAction: React.FC<Props> = (props: Props) => {
    const [serviceId, setServiceId] = useState<any>();
    const [isModalVisible, setIsModalVisible] = useState(false)
    let [form] = Form.useForm()
    let history = useHistory();
    const time = new Date();
    const date = new Date();
    const dispatch = useAppDispatch()
    const { services, service } = useAppSelector(serviceSelector);
    const { loading, giveNumber } = useAppSelector(giveNumberSelector);
    const { userLogin } = useAppSelector(userSelector)
    useEffect(() => {
        dispatch(getServices())
        dispatch(getAll())
    }, [])
    useEffect(() => {
        dispatch(getService(serviceId))
    }, [serviceId])
    const onBack = () => {
        history.goBack()
    }
    const addNewNumber = (value: form) => {
        date.setHours(time.getHours() + 3);
        dispatch(addGiveNumber({
            service: serviceId,
            status: 'waiting',
            stt: 0,
            source: 'Kiosk',
            timeGet: Timestamp.fromDate(time),
            date: Timestamp.fromDate(date),
            phoneNumber: '0946150383',
            email: 'tritrung@gmail.com',
            name: 'Trần Trí Trung',
            number: `${service?.serviceId}`,
            serviceName: service?.name

        })).then(data => {
            if (data.payload) {
                const id = data.payload as string;
                dispatch(get(id)).then(() => setIsModalVisible(!isModalVisible))
                notice.success('Cấp số thành công', 3)
                dispatch(addDiary({
                    username: userLogin ? userLogin.username : '',
                    ip: '192.168.1.1',
                    action: `Cấp số thành công`,
                    time: Timestamp.fromDate(new Date())
                }))
            }
            else {
                notice.success('Đã xảy ra lỗi')
            }
        })
        console.log(value)
    }


    return (
        <div>
            <Title level={3} style={{
                position: 'absolute', left: 224, top: 104, fontWeight: 700, color: '#ff7506'
            }}>
                Quản lý cấp số
            </Title>
            <Card
                style={{ width: 1192, height: 594, position: 'absolute', top: 154, left: 224, borderRadius: 16 }}
            >
                <Title level={2} style={{
                    position: 'absolute', left: 501, top: 44, fontWeight: 700, color: '#ff7506', lineHeight: '30px'
                }}>
                    CẤP SỐ MỚI
                </Title>
                <Title level={4} style={{
                    position: 'absolute', left: 464, top: 92, fontWeight: 700, color: '#535261'
                }}>
                    Dịch vụ khách hàng lựa chọn
                </Title>
                <Form
                    onFinish={addNewNumber}
                    form={form}>
                    <Form.Item
                        style={{
                            top: 154, left: 396, justifyContent: 'space-between',
                            position: 'absolute', width: 400
                        }}
                        name='service'
                    >
                        <Select
                            placeholder='Chọn dịch vụ'
                            style={{
                                height: 44,
                            }}
                            suffixIcon={
                                <CaretDownOutlined
                                    style={{
                                        color: '#FF7506',
                                        fontSize: 20,
                                        right: 10,
                                        position: 'absolute'
                                    }}
                                />
                            }
                            onChange={(e) => { console.log(e); setServiceId(e) }}
                        >
                            {services.map((s) => (
                                <Select.Option key={s?.id} value={s?.id}>
                                    {s?.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Row style={{
                        top: 258, left: 465, position: 'absolute'
                    }}>
                        <Col span={6}>
                            <Button style={{
                                width: 115, height: 48, color: '#ff7506', backgroundColor: '#FFF2E7', border: '1.5px solid #FF9138',
                                padding: '10px 24px', borderRadius: 8, fontWeight: 700
                            }}
                                onClick={onBack}
                            >
                                Hủy
                            </Button>
                        </Col>
                        <Col span={6}>
                            <Button
                                style={{
                                    width: 115, height: 48, backgroundColor: '#ff7506', color: '#fff',
                                    padding: '10px 24px', borderRadius: 8, fontWeight: 700, marginLeft: 60
                                }}
                                htmlType='submit'
                            >
                                In số
                            </Button>
                            <Modal
                                title={
                                    <div style={{ height: 170, width: 469, backgroundColor: '#fff', marginLeft: -24 }}>
                                        <Title
                                            level={3}
                                            style={{ position: 'absolute', top: 48, left: 115 }}
                                        >
                                            Số thứ tự được cấp
                                        </Title>
                                        <Title
                                            level={2}
                                            style={{ color: '#ff7506', top: 70, left: 157, position: 'absolute' }}
                                        >
                                            {giveNumber?.number}
                                        </Title>
                                        <Text
                                            style={{ top: 164, left: 84, position: 'absolute' }}
                                        >
                                            DV: {giveNumber?.serviceName} tại quầy số 1
                                        </Text>
                                    </div>
                                }
                                visible={isModalVisible}
                                onOk={() => { setIsModalVisible(false) }}
                                onCancel={() => { setIsModalVisible(false) }}
                                style={{
                                    borderRadius: 24,
                                    top: 156
                                }}
                                width={469}
                                footer={null}
                                bodyStyle={{
                                    backgroundColor: '#FF7506'
                                }}
                            >
                                Thời gian cấp :{moment(giveNumber?.timeGet.toDate()).format('HH:mm - DD/MM/YYYY')} <br />
                                Hạn sử dụng :{moment(giveNumber?.date.toDate()).format('HH:mm - DD/MM/YYYY')}
                            </Modal>
                        </Col>
                    </Row>
                </Form>


            </Card>

        </div>
    )
}

export default GiveNumberAction