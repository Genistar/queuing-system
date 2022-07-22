import { Col, Row, Typography } from 'antd'
import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import DevicesAction from './components/DevicesAction'
import DeviceDetail from './components/DevicesDetail'
import DevicesList from './components/DevicesList'

type Props = {}

const DevicesPage = (props: Props) => {

  return (
    <Row>
      <Route path='/admin/devices' exact>
        <DevicesList />
      </Route>
      <Route path='/admin/devices/add'>
        <DevicesAction />
      </Route>
      <Route path='/admin/devices/detail/:key'>
        <DeviceDetail />
      </Route>
      <Route path='/admin/devices/update/:key'>
        <DevicesAction />
      </Route>
    </Row>
  )
}

export default DevicesPage