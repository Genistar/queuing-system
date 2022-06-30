import { Layout, Col, Row, Typography, Card, Tag } from 'antd'
import React from 'react'
import { RadialBar } from '@ant-design/plots';
import { CalendarOutlined } from '@ant-design/icons'
import type { CalendarMode } from 'antd/lib/calendar/generateCalendar';
import type { Moment } from 'moment';
import DashboardRight from '../../components/DashboardRight';
import { cardStyle, diagramStyle, frame1Style, frame2Style, frame3Style, frameStyle, tagStyle } from './Style';
const { Title, Text } = Typography;
type Props = {}

const DashBoard: React.FC = (props: Props) => {

    return (
        <Layout>
            <Row>
                <Col style={diagramStyle}>
                    <Title level={3}>Biểu đồ cấp số</Title>
                    <Row>
                        <Col span={3} style={frameStyle}>
                            <Card style={cardStyle}>
                                <div style={{ width: 120.02, height: 48, marginTop: -15 }}>
                                    <Tag style={tagStyle} color='#00ffff'>
                                        <CalendarOutlined style={{ fontSize: 24, color: '#6493F9', marginLeft: 5, marginTop: 10 }} />
                                        <Text style={{ fontSize: 14, left: 52.02, position: 'absolute', fontWeight: 700 }}>Số thứ tự <br /> đã cấp</Text>
                                    </Tag>
                                </div>
                                <Title level={2} style={{ marginTop: 10, marginLeft: -10 }}>45.000</Title>
                                <Tag color="orange" style={{ height: 14.98, fontSize: 8, borderRadius: 7.18, position: 'absolute', left: 130.3, top: 85.53 }}>
                                    42.8%
                                </Tag>
                            </Card>
                        </Col>
                        <Col span={3} style={frame1Style}>
                            <Card style={cardStyle}>
                                <div style={{ width: 120.02, height: 48, marginTop: -15 }}>
                                    <Tag style={tagStyle} color='#00ffff'>
                                        <CalendarOutlined style={{ fontSize: 24, color: '#6493F9', marginLeft: 5, marginTop: 10 }} />
                                        <Text style={{ fontSize: 14, left: 52.02, position: 'absolute', fontWeight: 700 }}>Số thứ tự <br /> đã cấp</Text>
                                    </Tag>
                                </div>
                                <Title level={2} style={{ marginTop: 10, marginLeft: -10 }}>45.000</Title>
                                <Tag color="orange" style={{ height: 14.98, fontSize: 8, borderRadius: 7.18, position: 'absolute', left: 130.3, top: 85.53 }}>
                                    42.8%
                                </Tag>
                            </Card>
                        </Col>
                        <Col span={3} style={frame2Style}>
                            <Card style={cardStyle}>
                                <div style={{ width: 120.02, height: 48, marginTop: -15 }}>
                                    <Tag style={tagStyle} color='#00ffff'>
                                        <CalendarOutlined style={{ fontSize: 24, color: '#6493F9', marginLeft: 5, marginTop: 10 }} />
                                        <Text style={{ fontSize: 14, left: 52.02, position: 'absolute', fontWeight: 700 }}>Số thứ tự <br /> đã cấp</Text>
                                    </Tag>
                                </div>
                                <Title level={2} style={{ marginTop: 10, marginLeft: -10 }}>45.000</Title>
                                <Tag color="orange" style={{ height: 14.98, fontSize: 8, borderRadius: 7.18, position: 'absolute', left: 130.3, top: 85.53 }}>
                                    42.8%
                                </Tag>
                            </Card>
                        </Col>
                        <Col span={3} style={frame3Style}>
                            <Card style={cardStyle}>
                                <div style={{ width: 120.02, height: 48, marginTop: -15 }}>
                                    <Tag style={tagStyle} color='#00ffff'>
                                        <CalendarOutlined style={{ fontSize: 24, color: '#6493F9', marginLeft: 5, marginTop: 10 }} />
                                        <Text style={{ fontSize: 14, left: 52.02, position: 'absolute', fontWeight: 700 }}>Số thứ tự <br /> đã cấp</Text>
                                    </Tag>
                                </div>
                                <Title level={2} style={{ marginTop: 10, marginLeft: -10 }}>45.000</Title>
                                <Tag color="orange" style={{ height: 14.98, fontSize: 8, borderRadius: 7.18, position: 'absolute', left: 130.3, top: 85.53 }}>
                                    42.8%
                                </Tag>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <DashboardRight />
            </Row>
        </Layout>
    )
}

export default DashBoard