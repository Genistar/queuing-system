import React, { useEffect, useState } from 'react';
import { Area } from '@ant-design/plots';
import { CalendarOutlined, CaretDownOutlined, ArrowUpOutlined, ArrowDownOutlined, StarOutlined } from '@ant-design/icons';
import { faCalendarCheck, faBookmark } from '@fortawesome/free-regular-svg-icons';
import { Col, Row, Typography, Card, Tag, Select } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { areaStyle, AreaStyle, cardAreaStyle, cardStyle, diagramStyle, frame1Style, frame2Style, frame3Style, frameStyle, iconGreenStyle, iconOrangeStyle, iconStyle, labelStyle, selectAreaStyle, tagPercentStyle, tagStyle, textAreaStyle, textLabelStyle, titleAreaStyle } from './Style';
import { dropdownIconStyle } from '../../../Devices/components/DevicesList/Style';
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
            <Title level={3} style={{ width: 200 }}>Biểu đồ cấp số</Title>
            <Row>
                <Col span={3} style={frameStyle}>
                    <Card style={cardStyle}>
                        <div style={labelStyle}>
                            <Tag style={tagStyle} color='blue'>
                                <CalendarOutlined style={iconStyle} />
                                <Text style={textLabelStyle}>Số thứ tự <p style={{ marginTop: -5 }}> đã cấp</p></Text>
                            </Tag>
                        </div>
                        <Title level={2} style={{ marginTop: 10, marginLeft: -10 }}>45.000</Title>
                        <Tag color="orange" style={tagPercentStyle}>
                            <Text style={{ marginTop: -5, marginLeft: 0, color: '#FF9138' }}>
                                <ArrowUpOutlined style={{ marginRight: 1, fontSize: 6, top: -3 }} />
                                42.8%
                            </Text>
                        </Tag>
                    </Card>
                </Col>
                <Col span={3} style={frame1Style}>
                    <Card style={cardStyle}>
                        <div style={labelStyle}>
                            <Tag style={tagStyle} color='green'>
                                <FontAwesomeIcon icon={faCalendarCheck as IconProp} style={iconGreenStyle} />
                                <Text style={textLabelStyle}>Số thứ tự <p style={{ marginTop: -5 }}>đã sử dụng</p></Text>
                            </Tag>
                        </div>
                        <Title level={2} style={{ marginTop: 10, marginLeft: -10 }}>45.000</Title>
                        <Tag color="red" style={tagPercentStyle}>
                            <Text style={{ marginTop: -5, marginLeft: 0, color: '#E73F3F' }}>
                                <ArrowDownOutlined style={{ marginRight: 1, fontSize: 6, top: -3 }} />
                                42.8%
                            </Text>
                        </Tag>
                    </Card>
                </Col>
                <Col span={3} style={frame2Style}>
                    <Card style={cardStyle}>
                        <div style={labelStyle}>
                            <Tag style={tagStyle} color='orange'>
                                <CalendarOutlined style={iconOrangeStyle} />
                                <Text style={textLabelStyle}>Số thứ tự <p style={{ marginTop: -5 }}> đang chờ</p></Text>
                            </Tag>
                        </div>
                        <Title level={2} style={{ marginTop: 10, marginLeft: -10 }}>45.000</Title>
                        <Tag color="red" style={tagPercentStyle}>

                            <Text style={{ marginTop: -5, marginLeft: 0, color: '#E73F3F' }}>
                                <ArrowDownOutlined style={{ marginRight: 1, fontSize: 6, top: -3 }} />
                                42.8%
                            </Text>
                        </Tag>
                    </Card>
                </Col>
                <Col span={3} style={frame3Style}>
                    <Card style={cardStyle}>
                        <div style={labelStyle}>
                            <Tag style={tagStyle} color='red'>
                                <FontAwesomeIcon
                                    icon={faBookmark as IconProp}
                                    style={{ fontSize: 24, color: '#F86D6D', marginLeft: 8, marginTop: 11 }}
                                />
                                <StarOutlined style={{ marginLeft: -14.5, color: '#F86D6D', position: 'absolute', top: 13 }} />
                                <Text style={textLabelStyle}>Số thứ tự <p style={{ marginTop: -5 }}> đã bỏ qua</p></Text>
                            </Tag>
                        </div>
                        <Title level={2} style={{ marginTop: 10, marginLeft: -10 }}>45.000</Title>
                        <Tag color="orange" style={tagPercentStyle}>
                            <Text style={{ marginTop: -5, marginLeft: 0, color: '#FF9138' }}>
                                <ArrowUpOutlined style={{ marginRight: 1, fontSize: 6, top: -3 }} />
                                42.8%
                            </Text>
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
                            suffixIcon={
                                <CaretDownOutlined
                                    style={dropdownIconStyle}
                                />
                            }
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