import { Layout, Col, Row, Typography, Card, Calendar, Radio, Select } from 'antd'
import React from 'react'
import { RadialBar } from '@ant-design/plots';
import { DesktopOutlined, CommentOutlined } from '@ant-design/icons'
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
    <Col style={{ backgroundColor: '#FFF', height: 765, width: 401, marginTop: -205, position: 'absolute', marginLeft: 832 }}>
      <Title level={3} style={{ color: '#FF7506', marginTop: 104, marginLeft: 24 }}>Tổng quan</Title>
      <div style={{ marginTop: 120 }}>
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
              const start = 0;
              const end = 12;
              const monthOptions = [];

              const current = value.clone();
              const localeData = value.localeData();
              const months = [];
              for (let i = 0; i < 12; i++) {
                current.month(i);
                months.push(localeData.monthsShort(current));
              }

              for (let index = start; index < end; index++) {
                monthOptions.push(
                  <Select.Option className="month-item" key={`${index}`}>
                    {months[index]}
                  </Select.Option>,
                );
              }
              const month = value.month();

              const year = value.year();
              const options = [];
              for (let i = year - 10; i < year + 10; i += 1) {
                options.push(
                  <Select.Option key={i} value={i} className="year-item">
                    {i}
                  </Select.Option>,
                );
              }
              return (
                <div style={{ padding: 8 }}>
                  <Row gutter={8}>
                    <Col>
                      <Radio.Group
                        size="small"
                        onChange={e => onTypeChange(e.target.value)}
                        value={type}
                      >
                        <Radio.Button value="month">Month</Radio.Button>
                        <Radio.Button value="year">Year</Radio.Button>
                      </Radio.Group>
                    </Col>
                    <Col>
                      <Select
                        size="small"
                        dropdownMatchSelectWidth={false}
                        className="my-year-select"
                        onChange={newYear => {
                          const now = value.clone().year(Number(newYear));
                          onChange(now);
                        }}
                        value={String(year)}
                      >
                        {options}
                      </Select>
                    </Col>
                    <Col>
                      <Select
                        size="small"
                        dropdownMatchSelectWidth={false}
                        value={String(month)}
                        onChange={selectedMonth => {
                          const newValue = value.clone();
                          newValue.month(parseInt(selectedMonth, 10));
                          onChange(newValue);
                        }}
                      >
                        {monthOptions}
                      </Select>
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