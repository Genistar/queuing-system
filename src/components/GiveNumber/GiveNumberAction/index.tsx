import React, { useState } from 'react';
import { Button, Card, Form, Select, Typography } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom';
import { giveNumberData } from '../../../constants/interface';
import moment from 'moment';
const { Title } = Typography;
interface Props {
    addNewData: any;
}
const serviceData = ['Dịch vụ ngoại khoa', 'Dịch vụ khám răng', 'Dịch vụ khoa sản']
const GiveNumberAction: React.FC<Props> = (props: Props) => {
    const [service, setService] = useState<String>(serviceData[0]);
    let history = useHistory();
    const date = new Date();
    const day = moment(date);
    const { addNewData } = props;
    const onBack = () => {
        history.goBack()
    }
    const addNewNumber = () => {
        const newdata: giveNumberData = {
            key: (201 + Math.floor(Math.random() * 100)).toString(),
            name: 'Trần Trí Trung',
            serviceName: service.toString(),
            date: day.format('DD/MM/YYYY'),
            hsd: day.format('DD/MM/YYYY'),
            active: 'Hoạt động',
            nguoncap: 'Kiosk',
        }
        addNewData(newdata)
        console.log(newdata)
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
                <Select
                    placeholder='Chọn dịch vụ'
                    style={{
                        top: 154, left: 396, justifyContent: 'space-between',
                        position: 'absolute', width: 400, height: 44,
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
                    onChange={(e) => { console.log(e); setService(e) }}
                >
                    {serviceData.map((s, index) => (
                        <Select.Option key={index} value={s}>
                            {s}
                        </Select.Option>
                    ))}
                </Select>
                <Form layout='inline' style={{
                    top: 258, left: 465, position: 'absolute'
                }}>
                    <Form.Item>
                        <Button style={{
                            width: 115, height: 48, color: '#ff7506', backgroundColor: '#FFF2E7', border: '1.5px solid #FF9138',
                            padding: '10px 24px', borderRadius: 8, fontWeight: 700
                        }}
                            onClick={onBack}
                        >
                            Hủy
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            style={{
                                width: 115, height: 48, backgroundColor: '#ff7506', color: '#fff', padding: '10px 24px', borderRadius: 8, fontWeight: 700
                            }}
                            onClick={addNewNumber}
                        >
                            In số
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

        </div>
    )
}

export default GiveNumberAction