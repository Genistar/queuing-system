import { Col, Row, Typography } from 'antd'
import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import DevicesAction from '../../components/Devices/DevicesAction'
import DeviceDetail from '../../components/Devices/DevicesDetail'
import DevicesList from '../../components/Devices/DevicesList'

type Props = {}

const DevicesPage = (props: Props) => {
  const data = [
    {
      key: 'KIO_01',
      name: 'Kiosk',
      address: '192.168.1.10',
      active: true ? 'Đang hoạt động' : 'Ngừng hoạt động',
      connect: true ? 'Đang kết nối' : 'Mất kết nối',
      service: 'sdsdasdsad',
      user: 'trung',
      password: '1506'
    },
    {
      key: 'KIO_02',
      name: 'Kiosk',
      address: '192.168.1.10',
      active: true ? 'Đang hoạt động' : 'Ngừng hoạt động',
      connect: false ? 'Đang kết nối' : 'Mất kết nối',
      service: 'sdsdasdsad',
      user: 'thanh',
      password: '2311'
    },
    {
      key: 'KIO_03',
      name: 'Kiosk',
      address: '192.168.1.10',
      active: false ? 'Đang hoạt động' : 'Ngừng hoạt động',
      connect: true ? 'Đang kết nối' : 'Mất kết nối',
      service: 'sdsdasdsad',
      user: 'thanh',
      password: '2311'
    },
    {
      key: 'KIO_04',
      name: 'Kiosk',
      address: '192.168.1.10',
      active: false ? 'Đang hoạt động' : 'Ngừng hoạt động',
      connect: false ? 'Đang kết nối' : 'Mất kết nối',
      service: 'sdsdasdsad',
      user: 'trung',
      password: '2315'
    },
    {
      key: 'KIO_05',
      name: 'Kiosk',
      address: '192.168.1.10',
      active: true ? 'Đang hoạt động' : 'Ngừng hoạt động',
      connect: true ? 'Đang kết nối' : 'Mất kết nối',
      service: 'sdsdasdsad',
      user: 'trung',
      password: '2315'
    }
  ];
  return (
    <Row>
      <Route path='/admin/devices' exact>
        <DevicesList data={data} />
      </Route>
      <Route path='/admin/devices/add'>
        <DevicesAction />
      </Route>
      <Route path='/admin/devices/detail/:key'>
        <DeviceDetail data={data} />
      </Route>
      <Route path='/admin/devices/update/:key'>
        <DevicesAction />
      </Route>
    </Row>
  )
}

export default DevicesPage