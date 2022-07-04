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
      id: 1,
      key: 'KIO_01',
      name: 'Kiosk',
      address: '192.168.1.10',
      active: true ? 'Đang hoạt động' : 'Ngừng hoạt động',
      connect: true ? 'Đang kết nối' : 'Mất kết nối',
      service: 'sdsdasdsad'
    },
    {
      id: 2,
      key: 'KIO_01',
      name: 'Kiosk',
      address: '192.168.1.10',
      active: true ? 'Đang hoạt động' : 'Ngừng hoạt động',
      connect: false ? 'Đang kết nối' : 'Mất kết nối',
      service: 'sdsdasdsad'
    },
    {
      id: 3,
      key: 'KIO_01',
      name: 'Kiosk',
      address: '192.168.1.10',
      active: false ? 'Đang hoạt động' : 'Ngừng hoạt động',
      connect: true ? 'Đang kết nối' : 'Mất kết nối',
      service: 'sdsdasdsad'
    },
    {
      id: 4,
      key: 'KIO_01',
      name: 'Kiosk',
      address: '192.168.1.10',
      active: false ? 'Đang hoạt động' : 'Ngừng hoạt động',
      connect: false ? 'Đang kết nối' : 'Mất kết nối',
      service: 'sdsdasdsad'
    },
    {
      id: 5,
      key: 'KIO_01',
      name: 'Kiosk',
      address: '192.168.1.10',
      active: true ? 'Đang hoạt động' : 'Ngừng hoạt động',
      connect: true ? 'Đang kết nối' : 'Mất kết nối',
      service: 'sdsdasdsad'
    }
  ];
  return (
    <Row>
      <Route path='/admin/devices' exact>
        <DevicesList />
      </Route>
      <Route path='/admin/devices/add'>
        <DevicesAction />
      </Route>
      <Route path='/admin/devices/detail/:id'>
        <DeviceDetail data={data} />
      </Route>
    </Row>
  )
}

export default DevicesPage