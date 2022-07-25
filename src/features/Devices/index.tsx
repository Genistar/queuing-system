import { Col, Row, Typography } from 'antd'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DevicesAction from './components/DevicesAction'
import DeviceDetail from './components/DevicesDetail'
import DevicesList from './components/DevicesList'

type Props = {}

const DevicesPage = (props: Props) => {

  return (
    <Row>
      <Routes>
        <Route path='/' element={<DevicesList />} />

        <Route path='/add' element={<DevicesAction />} />

        <Route path='/detail/:key' element={<DeviceDetail />} />
        <Route path='/update/:key' element={<DevicesAction />} />
      </Routes>
    </Row>

  )
}

export default DevicesPage