import React, { useEffect, useMemo, useState } from 'react';
import { Area } from '@ant-design/plots';
import { CalendarOutlined, CaretDownOutlined, ArrowUpOutlined, ArrowDownOutlined, StarOutlined } from '@ant-design/icons';
import { faCalendarCheck, faBookmark } from '@fortawesome/free-regular-svg-icons';
import { Col, Row, Typography, Card, Tag, Select } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { areaStyle, AreaStyle, cardAreaStyle, cardStyle, diagramStyle, frame1Style, frame2Style, frame3Style, frameStyle, iconGreenStyle, iconOrangeStyle, iconStyle, labelStyle, selectAreaStyle, tagPercentStyle, tagStyle, textAreaStyle, textLabelStyle, titleAreaStyle } from './Style';
import { dropdownIconStyle } from '../../../Devices/components/DevicesList/Style';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { getAll, giveNumberSelector } from '../../../GiveNumber/giveNumberSlice';
import { DayRange } from '@hassanmojab/react-modern-calendar-datepicker';
import { deviceSelector } from '../../../Devices/deviceSlice';
import { serviceSelector } from '../../../Service/serviceSlice';
const { Title, Text } = Typography;
const { Option } = Select;
type Props = {}
const selectData = ['Ngày', 'Tháng', 'Năm']
const DashboardMain = (props: Props) => {
    const [select, setSelect] = useState("date");
    const { giveNumbers } = useAppSelector(giveNumberSelector);
    const { devices } = useAppSelector(deviceSelector);
    const { services } = useAppSelector(serviceSelector);
    const [calendarValue, setCalendarValue] = useState<DayRange>({
        from: null,
        to: null,
    });
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAll());
    }, [])

    const handleChange = (value: any) => {
        setSelect(selectData[value])
    }
    const data = useMemo(() => {
        let start = calendarValue.from ? calendarValue.from.day : 0;
        let end = calendarValue.to ? calendarValue.to.day : 30;
        let month = calendarValue.to
            ? calendarValue.to.month
            : new Date().getMonth() + 1;
        let data1 = [];
        switch (select) {
            case "date":
                for (let i = start; i <= end; i++) {
                    data1.push({
                        xField: i,
                        value: giveNumbers.filter((providerNumber) => {
                            return (
                                providerNumber.timeGet.toDate().getDate() ===
                                i &&
                                providerNumber.timeGet.toDate().getMonth() +
                                1 ==
                                month
                            );
                        }).length,
                    });
                }
                return data1;
            case "week":
                for (let i = 1; i <= 5; i++) {
                    data1.push({
                        xField: "Tuần " + i,
                        value: giveNumbers.filter((providerNumber) => {
                            return (
                                providerNumber.timeGet.toDate().getMonth() +
                                1 ==
                                month &&
                                providerNumber.timeGet.toDate().getDate() >
                                (i - 1) * 7 &&
                                providerNumber.timeGet.toDate().getDate() <=
                                i * 7
                            );
                        }).length,
                    });
                }
                return data1;
            default:
                for (let i = 1; i <= 12; i++) {
                    data1.push({
                        xField: i,
                        value: giveNumbers.filter((providerNumber) => {
                            return (
                                providerNumber.timeGet.toDate().getMonth() +
                                1 ===
                                i
                            );
                        }).length,
                    });
                }
                console.log(data1);
                return data1;
        }
    }, [select, calendarValue, giveNumbers]);

    const config = {
        data,
        xField: "xField",
        yField: "value",
        smooth: true,
        xAxis: {
            range: [0, 1],
        },
        tooltip: {
            position: "top" as "left" | "right" | "top" | "bottom" | undefined,
            domStyles: {
                "g2-tooltip": {
                    width: "100px",
                    padding: "5px",
                    backgroundColor: "#5185F7",
                    borderRadius: "8px",
                    color: "#fff",
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: 700,
                },
            },
            customContent: (title: any, items: any): any => {
                return <span>{items[0]?.value}</span>;
            },
        },
        areaStyle: () => {
            return {
                fill: "l(90) 0:#5185F7 0.5:#5185F7 1:#fff",
            };
        },
    };

    return (
        <Col style={diagramStyle}>
            <Title level={3} style={{ width: 200, color: '#ff7506' }}>Biểu đồ cấp số</Title>
            <Row >
                <Col span={3} style={frameStyle}>
                    <Card style={cardStyle}>
                        <div style={labelStyle}>
                            <Tag style={tagStyle} color='blue'>
                                <CalendarOutlined style={iconStyle} />
                                <Text style={textLabelStyle}>Số thứ tự <p style={{ marginTop: -5 }}> đã cấp</p></Text>
                            </Tag>
                        </div>
                        <Title level={2} style={{ marginTop: 10, marginLeft: -10 }}>
                            {giveNumbers.length}
                        </Title>
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
                        <Title level={2} style={{ marginTop: 10, marginLeft: -10 }}>
                            {giveNumbers.filter(
                                (value) => value.status == 'used'
                            ).length}
                        </Title>
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
                        <Title level={2} style={{ marginTop: 10, marginLeft: -10 }}>
                            {giveNumbers.filter(
                                (value) => value.status == 'waiting'
                            ).length}
                        </Title>
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
                        <Title level={2} style={{ marginTop: 10, marginLeft: -10 }}>
                            {giveNumbers.filter(
                                (value) => value.status == 'skip'
                            ).length}
                        </Title>
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
                            <Option key='1' value='date'>Ngày</Option>
                            <Option key='2' value='week'>Tuần</Option>
                            <Option key='3' value='month'>Tháng</Option>
                        </Select>
                    </div>

                    <Area {...config} style={areaStyle} />
                </Card>
            </Row>
        </Col>
    )
}

export default DashboardMain