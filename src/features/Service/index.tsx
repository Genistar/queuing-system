import { Row } from 'antd'
import { Route } from 'react-router-dom'
import React from 'react'
import ServiceList from './components/ServiceList'
import ServiceAction from './components/ServiceAction'
import ServiceDetail from './components/ServiceDetail'
import { numberData } from '../../constants/data'

type Props = {}

const ServicePage = (props: Props) => {

    return (
        <Row>
            <Route path='/admin/service' exact>
                <ServiceList />
            </Route>
            <Route path='/admin/service/add'>
                <ServiceAction />
            </Route>
            <Route path='/admin/service/detail/:key'>
                <ServiceDetail data={numberData} />
            </Route>
            <Route path='/admin/services/update/:key'>
                <ServiceAction />
            </Route>
        </Row>
    )
}

export default ServicePage