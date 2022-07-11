import { Row } from 'antd'
import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import GiveNumberList from './components/GiveNumberList'
import { giveNumberData } from '../../constants/interface'
import moment from 'moment'
import GiveNumberAction from './components/GiveNumberAction'
import GiveNumberDetail from './components/GiveNumberDetail'

type Props = {}

const GiveNumberPage: React.FC = (props: Props) => {

    const date = new Date();
    const day = moment(date);
    const giveNumberData: giveNumberData[] = [];
    for (let i = 0; i < 46; i++) {
        giveNumberData.push({
            key: '20100' + i,
            name: 'Nguyễn Văn ' + i,
            serviceName: 'Dịch vụ ' + i,
            date: day.format('DD/MM/YYYY'),
            hsd: day.format('DD/MM/YYYY'),
            active: 'Hoạt động ' + i,
            nguoncap: 'Kiosk ' + i,
        });
    }
    const [data, setData] = useState<giveNumberData[]>(giveNumberData)
    const addNewData = (newdata: giveNumberData[]) => {
        setData(newdata)
        console.log(newdata)
    }
    return (
        <Row>
            <Route path='/admin/givenumber' exact>
                <GiveNumberList data={data} />
            </Route>
            <Route path='/admin/givenumber/add'>
                <GiveNumberAction addNewData={addNewData} />
            </Route>
            <Route path='/admin/givenumber/detail/:key'>
                <GiveNumberDetail data={data} />
            </Route>
            <Route path='/admin/givenumber/update/:key'>
                Cập nhật update
            </Route>
        </Row>
    )
}

export default GiveNumberPage