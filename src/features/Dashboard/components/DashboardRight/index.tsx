import { Layout, Col, Row, Typography, Card, Calendar, Radio, Select, Button } from 'antd'
import React from 'react'
import { RadialBar } from '@ant-design/plots';
import { DesktopOutlined, CommentOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { boxcalendarStyle, calendarStyle, cardStyle, numberStyle, statusStyle, titleRadiarServiceStyle, titleRadiarStyle } from './Style';
import type { CalendarMode } from 'antd/lib/calendar/generateCalendar';
import type { Moment } from 'moment';
const { Title, Text } = Typography;
type Props = {}

const DashboardRight: React.FC = (props: Props) => {
  const data = [
    {
      name: 'G2',
      star: 297,
    },

    {
      name: 'X6',
      star: 10178,
    },
  ];
  const config = {
    data: data,
    xField: 'name',
    yField: 'star',
    maxAngle: 324,
    radius: 0.8,
    innerRadius: 0.7,
    tooltip: {
      formatter: (datum: any) => {
        return {
          name: 'star',
          value: datum.star,
        };
      },
    },
    color: (data: any) => {
      if (data.name === 'X6') {
        return "#ff7506";
      }
      else {
        return "#7E7D88"
      }

    },
    barBackground: {},
  };
  const serviceData = [
    {
      name: 'G2',
      star: 1597,
    },

    {
      name: 'X6',
      star: 8753,
    },
  ];
  const serviceConfig = {
    data: serviceData,
    xField: 'name',
    yField: 'star',
    maxAngle: 304,
    radius: 0.8,
    innerRadius: 0.7,
    tooltip: {
      formatter: (datum: any) => {
        return {
          name: 'star',
          value: datum.star,
        };
      },
    },
    color: (data: any) => {
      if (data.name === 'X6') {
        return "#4277FF";
      }
      else {
        return "#7E7D88"
      }

    },
    barBackground: {},
  };
  const numberData = [
    {
      name: 'G2',
      star: 1297,
    },

    {
      name: 'X6',
      star: 9178,
    },
  ];
  const numberConfig = {
    data: numberData,
    xField: 'name',
    yField: 'star',
    maxAngle: 314,
    radius: 0.8,
    innerRadius: 0.7,
    tooltip: {
      formatter: (datum: any) => {
        return {
          name: 'star',
          value: datum.star,
        };
      },
    },
    color: (data: any) => {
      if (data.name === 'X6') {
        return "#35C75A";
      }
      else {
        return "#7E7D88"
      }

    },
    barBackground: {},
  };
  const onPanelChange = (value: Moment, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  return (
    <Col style={{ backgroundColor: '#FFF', height: 765, width: 401, marginTop: -225, position: 'absolute', marginLeft: 832 }}>
      <Title level={3} style={{ color: '#FF7506', marginTop: 104, marginLeft: 24 }}>Tổng quan</Title>
      <div style={{ marginTop: 110 }}>
        <Card style={cardStyle}>
          <Row>
            <Col span={8} >
              <RadialBar width={60} height={60} {...config} style={{ margin: '-10px 0 -20px -70px' }} />
              <div style={{ position: 'absolute' }}>
                <Title level={3} style={{ marginLeft: 40, marginTop: -40 }}>123.123</Title>
                <p style={titleRadiarStyle}><DesktopOutlined style={{ marginRight: 2 }} />Thiết bị</p>
              </div>

            </Col>
            <Col span={14}>
              <div style={{ position: 'absolute', marginTop: -10 }}>
                <Text style={statusStyle}>Đang hoạt động <h5 style={numberStyle} className='number-style'>10178</h5></Text>
              </div>
              <div style={{ position: 'absolute', marginTop: 15 }}>
                <Text style={statusStyle}>Ngừng hoạt động <h5 style={numberStyle} className='number-style'>297</h5></Text>
              </div>
            </Col>
          </Row>
        </Card>
        <Card style={cardStyle}>
          <Row>
            <Col span={8}>
              <RadialBar {...serviceConfig} width={60} height={60} style={{ margin: '-10px 0 -20px -70px' }} />
              <div style={{ position: 'absolute' }}>
                <Title level={3} style={{ marginLeft: 40, marginTop: -40 }}>123.123</Title>
                <p style={titleRadiarServiceStyle}><CommentOutlined style={{ marginRight: 2 }} />Dịch vụ</p>
              </div>
            </Col>
            <Col span={14} >
              <div style={{ position: 'absolute', marginTop: -10 }}>
                <Text style={statusStyle}>Đang hoạt động <h5 style={{ color: '#4277FF' }} className='number-style'>9753</h5></Text>
              </div>
              <div style={{ position: 'absolute', marginTop: 15 }}>
                <Text style={statusStyle}>Ngừng hoạt động <h5 style={{ color: '#4277FF' }} className='number-style'>597</h5></Text>
              </div>
            </Col>
          </Row>
        </Card>
        <Card style={cardStyle}>
          <Row>
            <Col span={8}>
              <RadialBar {...numberConfig} width={60} height={60} style={{ margin: '-10px 0 -20px -70px' }} />
              <div style={{ position: 'absolute' }}>
                <Title level={3} style={{ marginLeft: 40, marginTop: -40 }}>123.123</Title>
                <p style={{ marginLeft: 55, marginTop: -7, fontSize: 14, color: '#35C75A', width: 300 }}>
                  <FontAwesomeIcon icon={faLayerGroup} style={{ marginRight: 2 }} />Cấp số
                </p>
              </div>
            </Col>
            <Col span={14}>
              <div style={{ position: 'absolute', marginTop: -10 }}>
                <Text style={statusStyle}>Đang hoạt động <h5 style={{ color: '#35C75A' }} className='number-style'>9178</h5></Text>
              </div>
              <div style={{ position: 'absolute', marginTop: 15 }}>
                <Text style={statusStyle}>Ngừng hoạt động <h5 style={{ color: '#35C75A' }} className='number-style'>1297</h5></Text>
              </div>
            </Col>
          </Row>
        </Card>
        <Card style={boxcalendarStyle}>
          <Calendar
            style={calendarStyle}
            fullscreen={false}
            headerRender={({ value, type, onChange, onTypeChange }) => {
              const current = value.clone();
              // const localeData = value.localeData();
              const increaseMonth = (e: number) => {
                onChange(current.add(e, "month"));
                console.log(current);
              };
              return (
                <div style={{ padding: 8, marginLeft: -30 }}>
                  <Row gutter={8}>
                    <Col span={3}>
                      <Button
                        onClick={() => {
                          increaseMonth(-1);
                        }}
                        style={{ border: "none", width: "50px", marginTop: "-10px", marginLeft: 10 }}
                        icon={<CaretLeftOutlined style={{ marginTop: "-14px", color: '#ff7506' }} />}
                      />
                    </Col>
                    <Col span={18} style={{ textAlign: "center", marginTop: 0, marginLeft: -60 }}>
                      <Typography.Text style={{ fontSize: "18px", fontWeight: "500", color: "#FF7506", width: 150 }} >{String(current.format("DD MMM yyyy"))}</Typography.Text>
                    </Col>
                    <Col span={3}>
                      <Button
                        onClick={() => {
                          increaseMonth(1);
                        }}
                        style={{ border: "none", width: "50px", marginTop: "-10px", marginLeft: 50 }}
                        icon={<CaretRightOutlined style={{ marginTop: "-14px", color: '#ff7506' }} />}
                      />
                    </Col>
                  </Row>
                </div>
              );
            }}
            onPanelChange={onPanelChange}
          />
        </Card>
      </div>

    </Col>
  )
}

export default DashboardRight