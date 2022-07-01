import { Layout, Col, Row, Typography, Card, Tag, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { Area } from '@ant-design/plots';
import { CalendarOutlined } from '@ant-design/icons'
import type { CalendarMode } from 'antd/lib/calendar/generateCalendar';
import type { Moment } from 'moment';
import DashboardRight from '../../components/DashboardRight';
import { cardStyle, diagramStyle, frame1Style, frame2Style, frame3Style, frameStyle, iconStyle, labelStyle, tagPercentStyle, tagStyle, textLabelStyle } from './Style';

const { Title, Text } = Typography;
const { Option } = Select;
type Props = {}
const selectData = ['Ngày', 'Tháng', 'Năm']
const DashBoard: React.FC = (props: Props) => {
    const [data, setData] = useState([]);
    const [select, setSelect] = useState(selectData[0]);
    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };
    useEffect(() => {
        asyncFetch()
    }, [])
    const config = {
        data,
        xField: 'timePeriod',
        yField: 'value',
        xAxis: {
            range: [0, 1],
        },
    };
    const handleChange = (value: any) => {
        setSelect(selectData[value])
    }
    return (
        <Layout>
            <Row>
                <Col style={diagramStyle}>
                    <Title level={3}>Biểu đồ cấp số</Title>
                    <Row>
                        <Col span={3} style={frameStyle}>
                            <Card style={cardStyle}>
                                <div style={labelStyle}>
                                    <Tag style={tagStyle} color='#00ffff'>
                                        <CalendarOutlined style={iconStyle} />
                                        <Text style={textLabelStyle}>Số thứ tự <br /> đã cấp</Text>
                                    </Tag>
                                </div>
                                <Title level={2} style={{ marginTop: 10, marginLeft: -10 }}>45.000</Title>
                                <Tag color="orange" style={tagPercentStyle}>
                                    42.8%
                                </Tag>
                            </Card>
                        </Col>
                        <Col span={3} style={frame1Style}>
                            <Card style={cardStyle}>
                                <div style={labelStyle}>
                                    <Tag style={tagStyle} color='#00ffff'>
                                        <CalendarOutlined style={iconStyle} />
                                        <Text style={textLabelStyle}>Số thứ tự <br /> đã cấp</Text>
                                    </Tag>
                                </div>
                                <Title level={2} style={{ marginTop: 10, marginLeft: -10 }}>45.000</Title>
                                <Tag color="orange" style={tagPercentStyle}>
                                    42.8%
                                </Tag>
                            </Card>
                        </Col>
                        <Col span={3} style={frame2Style}>
                            <Card style={cardStyle}>
                                <div style={labelStyle}>
                                    <Tag style={tagStyle} color='#00ffff'>
                                        <CalendarOutlined style={iconStyle} />
                                        <Text style={textLabelStyle}>Số thứ tự <br /> đã cấp</Text>
                                    </Tag>
                                </div>
                                <Title level={2} style={{ marginTop: 10, marginLeft: -10 }}>45.000</Title>
                                <Tag color="orange" style={tagPercentStyle}>
                                    42.8%
                                </Tag>
                            </Card>
                        </Col>
                        <Col span={3} style={frame3Style}>
                            <Card style={cardStyle}>
                                <div style={labelStyle}>
                                    <Tag style={tagStyle} color='#00ffff'>
                                        <CalendarOutlined style={iconStyle} />
                                        <Text style={textLabelStyle}>Số thứ tự <br /> đã cấp</Text>
                                    </Tag>
                                </div>
                                <Title level={2} style={{ marginTop: 10, marginLeft: -10 }}>45.000</Title>
                                <Tag color="orange" style={tagPercentStyle}>
                                    42.8%
                                </Tag>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Card style={{ top: 175, left: 4, height: 484, width: 794, position: 'absolute', filter: 'drop-shadow(2px 2px 15px rgba(70, 64, 67, 0.1))', borderRadius: 12 }}>
                            <Title level={4} style={{ fontWeight: 700, top: 24, left: 24, position: 'absolute' }}>Bảng thống kê theo ngày</Title>
                            <Text style={{ position: 'absolute', top: 58, left: 24, }}>Tháng 11/2022</Text>
                            <div style={{ float: 'right', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', left: '73.7%', right: '3.03%', top: '-45%', bottom: '36%' }}>
                                <Title level={5} style={{ fontWeight: 600 }}>Xem thêm</Title>
                                <Select
                                    defaultValue={selectData[0]}
                                    style={{ width: 106, height: 42, borderRadius: 8, padding: '10 12', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', border: '1.5px solid #D4D4D7' }}
                                    size='middle'
                                    onChange={handleChange}
                                >
                                    {selectData.map(s => (
                                        <Option key={s}>{s}</Option>
                                    ))}
                                </Select>
                            </div>

                            <Area {...config} style={{ height: 373, width: 754, top: 98, left: 24, position: 'absolute' }} />
                        </Card>
                    </Row>
                </Col>
                <DashboardRight />
            </Row>
        </Layout>
    )
}

export default DashBoard