import { Row } from 'antd'
import { Route, Routes } from 'react-router-dom'
import React from 'react'
import ServiceList from './components/ServiceList'
import ServiceAction from './components/ServiceAction'
import ServiceDetail from './components/ServiceDetail'
import { numberData } from '../../constants/data'

type Props = {}

const ServicePage = (props: Props) => {

    return (
        <Row>
            <Routes>
                <Route path='/' element={<ServiceList />} />
                <Route path='/add' element={<ServiceAction />} />
                <Route path='/detail/:key' element={<ServiceDetail />} />
                <Route path='/update/:key' element={<ServiceAction />} />
            </Routes>

        </Row>
    )
}

export default ServicePage