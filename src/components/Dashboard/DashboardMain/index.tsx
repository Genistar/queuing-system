import React, { useEffect, useState } from 'react'
import { Area } from '@ant-design/plots';
import { CalendarOutlined } from '@ant-design/icons'
import { Col, Row, Typography, Card, Tag, Select } from 'antd';
import { areaStyle, AreaStyle, cardAreaStyle, cardStyle, diagramStyle, frame1Style, frame2Style, frame3Style, frameStyle, iconStyle, labelStyle, selectAreaStyle, tagPercentStyle, tagStyle, textAreaStyle, textLabelStyle, titleAreaStyle } from './Style';
const { Title, Text } = Typography;
const { Option } = Select;
type Props = {}
const selectData = ['Ngày', 'Tháng', 'Năm']
const DashboardMain = (props: Props) => {
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
                <Card style={cardAreaStyle}>
                    <Title level={4} style={titleAreaStyle}>Bảng thống kê theo ngày</Title>
                    <Text style={textAreaStyle}>Tháng 11/2022</Text>
                    <div style={AreaStyle}>
                        <Title level={5} style={{ fontWeight: 600 }}>Xem thêm</Title>
                        <Select
                            defaultValue={selectData[0]}
                            style={selectAreaStyle}
                            size='middle'
                            onChange={handleChange}
                        >
                            {selectData.map(s => (
                                <Option key={s}>{s}</Option>
                            ))}
                        </Select>
                    </div>

                    <Area {...config} style={areaStyle} />
                </Card>
            </Row>
        </Col>
    )
}

export default DashboardMain