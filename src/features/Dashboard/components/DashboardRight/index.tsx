import { Layout, Col, Row, Typography, Card, Calendar, Radio, Select, Button, Badge } from 'antd';
import { Calendar as Cal } from '@hassanmojab/react-modern-calendar-datepicker';
import React, { useEffect, useState } from 'react'
import { RadialBar } from '@ant-design/plots';
import { DesktopOutlined, CommentOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { boxcalendarStyle, calendarStyle, cardStyle, numberStyle, statusStyle, titleRadiarServiceStyle, titleRadiarStyle } from './Style';
import type { CalendarMode } from 'antd/lib/calendar/generateCalendar';
import type { Moment } from 'moment';
import { getAll, giveNumberSelector } from '../../../GiveNumber/giveNumberSlice';
import { getAll as getService, serviceSelector } from '../../../Service/serviceSlice'
import { deviceSelector, getAll as getDevice } from '../../../Devices/deviceSlice'
import { useAppDispatch, useAppSelector } from '../../../../store';
import DashboardMain from '../DashboardMain';
import { Link } from 'react-router-dom';
import moment from 'moment';
const { Title, Text } = Typography;
type Props = {}

const DashboardRight: React.FC = (props: Props) => {
  const { giveNumbers } = useAppSelector(giveNumberSelector);
  const { devices } = useAppSelector(deviceSelector);
  const { services } = useAppSelector(serviceSelector);
  const [value, setValue] = useState(moment());
  const [selectedValue, setSelectedValue] = useState(moment());
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAll());
    dispatch(getDevice());
    dispatch(getService());
  }, [])
  const data = [
    {
      name: true,
      star: devices.filter(
        (value) => value.isActive == true
      ).length,
    },

    {
      name: false,
      star: devices.filter(
        (value) => value.isActive == false
      ).length,
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
      if (data.name === true) {
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
      name: true,
      star: services.filter(
        (value) => value.isActive == true
      ).length,
    },

    {
      name: false,
      star: services.filter(
        (value) => value.isActive == false
      ).length,
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
      if (data.name === true) {
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
      name: 'waiting',
      star: giveNumbers.filter(
        (value) => value.status == 'waiting'
      ).length,
    },

    {
      name: 'used',
      star: giveNumbers.filter(
        (value) => value.status == 'used'
      ).length,
    },
    {
      name: 'skip',
      star: giveNumbers.filter(
        (value) => value.status == 'skip'
      ).length,
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
      if (data.name === 'waiting') {
        return "#35C75A";
      }
      if (data.name === 'skip') {
        return "#7E7D88"
      }
      else {
        return '#F178B6'
      }

    },
    barBackground: {},
  };
  const onPanelChange = (value: Moment, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  const onSelect = (date: Moment) => {
    setValue(date);
    setSelectedValue(date);
    console.log(value.format('DD-MM-YYYY'))
  }
  return (
    <div>
      <DashboardMain />
      <Col style={{ backgroundColor: '#FFF', height: 765, width: 401, marginTop: -85, position: 'absolute', marginLeft: 832 }}>
        <Title level={3} style={{ color: '#FF7506', marginTop: 104, marginLeft: 24 }}>Tổng quan</Title>
        <div style={{ marginTop: 110 }}>
          <Card style={cardStyle}>
            <Link to='/admin/devices'>
              <Row>
                <Col span={8} >
                  <RadialBar width={60} height={60} {...config} style={{ margin: '-10px 0 -20px -70px' }} />
                  <div style={{ position: 'absolute' }}>
                    <Title level={3} style={{ marginLeft: 60, marginTop: -40, }}>{devices.length}</Title>
                    <p style={titleRadiarStyle}><DesktopOutlined style={{ marginRight: 2 }} />Thiết bị</p>
                  </div>

                </Col>
                <Col span={14}>
                  <div style={{ position: 'absolute', marginTop: -10, marginLeft: 40 }}>
                    <Badge className='.barge-size' color="#ff7506" text="Đang hoạt động" style={{ fontSize: 12 }} />
                    <h5 style={numberStyle} className='number-style'>
                      {devices.filter(
                        (value) => value.isActive == true
                      ).length}
                    </h5>
                  </div>
                  <div style={{ position: 'absolute', marginTop: 15, marginLeft: 40 }}>
                    <Badge className='.barge-size' color="#ff7506" text="Ngừng hoạt động" style={{ fontSize: 12 }} />
                    <h5 style={numberStyle} className='number-style'>
                      {devices.filter(
                        (value) => value.isActive == false
                      ).length}
                    </h5>
                  </div>
                </Col>
              </Row>
            </Link>

          </Card>
          <Card style={cardStyle}>
            <Link to='/admin/service'>
              <Row>
                <Col span={8}>
                  <RadialBar {...serviceConfig} width={60} height={60} style={{ margin: '-10px 0 -20px -70px' }} />
                  <div style={{ position: 'absolute' }}>
                    <Title level={3} style={{ marginLeft: 60, marginTop: -40 }}>{services.length}</Title>
                    <p style={titleRadiarServiceStyle}><CommentOutlined style={{ marginRight: 2 }} />Dịch vụ</p>
                  </div>
                </Col>
                <Col span={14} >
                  <div style={{ position: 'absolute', marginTop: -10, marginLeft: 40 }}>
                    <Badge className='.barge-size' color="#4277FF" text="Đang hoạt động" style={{ fontSize: 12 }} />
                    <h5 style={{ color: '#4277FF' }} className='number-style'>
                      {services.filter(
                        (value) => value.isActive == true
                      ).length}
                    </h5>
                  </div>
                  <div style={{ position: 'absolute', marginTop: 15, marginLeft: 40 }}>
                    <Badge className='.barge-size' color="#4277FF" text="Ngừng hoạt động" style={{ fontSize: 12 }} />
                    <h5 style={{ color: '#4277FF' }} className='number-style'>
                      {services.filter(
                        (value) => value.isActive == false
                      ).length}
                    </h5>
                  </div>
                </Col>
              </Row>
            </Link>

          </Card>
          <Card style={cardStyle}>
            <Link to='/admin/givenumber'>
              <Row>
                <Col span={8}>
                  <RadialBar {...numberConfig} width={60} height={60} style={{ margin: '-10px 0 -20px -70px' }} />
                  <div style={{ position: 'absolute' }}>
                    <Title level={3} style={{ marginLeft: 60, marginTop: -40 }}>{giveNumbers.length}</Title>
                    <p style={{ marginLeft: 55, marginTop: -7, fontSize: 14, color: '#35C75A', width: 300 }}>
                      <FontAwesomeIcon icon={faLayerGroup} style={{ marginRight: 2 }} />Cấp số
                    </p>
                  </div>
                </Col>
                <Col span={14}>

                  <div style={{ position: 'absolute', marginTop: -15, marginLeft: 40 }}>
                    <Badge className='.barge-size' color="#35C75A" text="Đang chờ" style={{ fontSize: 12 }} />
                    <h5 style={{ color: '#35C75A' }} className='number-style'>
                      {giveNumbers.filter(
                        (value) => value.status == 'waiting'
                      ).length}
                    </h5>
                  </div>
                  <div style={{ position: 'absolute', marginTop: 5, marginLeft: 40 }}>
                    <Badge color="#35C75A" text="Đang sử dụng" />
                    <h5 style={{ color: '#35C75A' }} className='number-style'>
                      {giveNumbers.filter(
                        (value) => value.status == 'used'
                      ).length}</h5>
                  </div>
                  <div style={{ position: 'absolute', marginTop: 25, marginLeft: 40 }}>
                    <Badge color="#35C75A" text="Bỏ qua" style={{ fontSize: 12 }} />
                    <h5 style={{ color: '#35C75A' }} className='number-style'>
                      {giveNumbers.filter(
                        (value) => value.status == 'skip'
                      ).length}
                    </h5>
                  </div>
                </Col>
              </Row>
            </Link>

          </Card>
          <Card style={boxcalendarStyle}>
            <Calendar
              style={calendarStyle}
              fullscreen={false}
              onSelect={onSelect}
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
    </div>

  )
}

export default DashboardRight