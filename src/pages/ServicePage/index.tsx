import { Row } from 'antd'
import { Route } from 'react-router-dom'
import React from 'react'
import ServiceList from '../../components/Service/ServiceList'
import ServiceAction from '../../components/Service/ServiceAction'
import ServiceDetail from '../../components/Service/ServiceDetail'
import { numberData } from '../../constants/data'

type Props = {}

const ServicePage = (props: Props) => {
    const data = [
        {
            key: '200',
            name: 'Khám phụ khoa - phụ sản',
            description: 'Khám sản phụ khoa',
            active: true ? 'Đang hoạt động' : 'Ngừng hoạt động',
        },
        {
            key: '201',
            name: 'Khám dịch vụ',
            description: 'dịch vụ',
            active: false ? 'Đang hoạt động' : 'Ngừng hoạt động',
        },
        {
            key: '202',
            name: 'Khám răng hàm mặt',
            description: 'răng hàm mặt',
            active: true ? 'Đang hoạt động' : 'Ngừng hoạt động',
        },
        {
            key: '203',
            name: 'Khám tai mũi họng',
            description: 'tai mũi họng',
            active: true ? 'Đang hoạt động' : 'Ngừng hoạt động',
        },
        {
            key: '204',
            name: 'Khám tổng quát',
            description: 'Tổng quát',
            active: false ? 'Đang hoạt động' : 'Ngừng hoạt động',
        },
        {
            key: '205',
            name: 'Khám tai mũi họng',
            description: 'tai mũi họng',
            active: true ? 'Đang hoạt động' : 'Ngừng hoạt động',
        }
    ];
    return (
        <Row>
            <Route path='/admin/service' exact>
                <ServiceList data={data} />
            </Route>
            <Route path='/admin/service/add'>
                <ServiceAction />
            </Route>
            <Route path='/admin/service/detail/:key'>
                <ServiceDetail data={numberData} />
            </Route>
            <Route path='/admin/devices/update/:key'>
                Cập nhật
            </Route>
        </Row>
    )
}

export default ServicePage