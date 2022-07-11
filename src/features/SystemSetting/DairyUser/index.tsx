import { Row } from 'antd'
import moment from 'moment'
import React from 'react'
import { Route } from 'react-router-dom'
import DairyList from './components/DairyList'

type Props = {}

const DairyPage = (props: Props) => {
    const accountData = [];
    const day = new Date();
    for (let i = 0; i < 46; i++) {
        accountData.push({
            key: i,
            userName: 'chunhyttt' + i,
            fullName: 'Nguyễn văn' + i,
            phoneNumber: '091578013' + i,
            email: 'ngVan' + 1 + '@gmail.com',
            role: 'Kế Toán',
            password: '12345',
            active: (i % 2 === 0) ? true : false,
            ipAddress: '191.18.3.1',
            manipulate: 'Cập nhật thông tin dịch vụ',
            time: moment(day).format('DD/MM/YYYY hh:mm:ss')
        })
    }
    return (
        <Row>
            <Route path='/admin/dairy' exact>
                <DairyList data={accountData} />
            </Route>
        </Row>
    )
}

export default DairyPage