import { Row } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import ReportList from './components/ReportList'
import { giveNumberData } from '../../constants/interface'

type Props = {}

const ReportPage: React.FC = (props: Props) => {
    const date = new Date();
    const day = moment(date);
    console.log(day)
    const giveNumberData: giveNumberData[] = [];
    for (let i = 0; i < 46; i++) {
        giveNumberData.push({
            key: '20100' + i,
            name: 'Nguyễn Văn ' + i,
            serviceName: 'Dịch vụ ' + i,
            date: day.format('h:mm - DD/MM/YYYY'),
            hsd: day.format('h:mm - DD/MM/YYYY'),
            active: 'Hoạt động ' + i,
            nguoncap: 'Kiosk ' + i,
        });
    }
    const [data, setData] = useState<giveNumberData[]>(giveNumberData)
    return (
        <Row>
            <Route path='/admin/report' exact>
                <ReportList data={data} />
            </Route>
        </Row>
    )
}

export default ReportPage