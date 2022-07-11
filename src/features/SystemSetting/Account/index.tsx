import { Row } from 'antd'
import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import { accountData } from '../../../constants/interface'
import AccountAction from './Components/AccountAction'
import AccountList from './Components/AccountList'

type Props = {}



const AccountPage = (props: Props) => {
    const accountData: accountData[] = [];
    for (let i = 0; i < 46; i++) {
        accountData.push({
            key: i,
            userName: 'chunhyttt' + i,
            fullName: 'Nguyễn văn' + i,
            phoneNumber: '091578013' + i,
            email: 'ngVan' + 1 + '@gmail.com',
            role: 'Kế Toán',
            password: '12345',
            active: (i % 2 === 0) ? true : false
        });
    }
    const [data, setData] = useState<accountData[]>(accountData)
    const addNewData = (newdata: accountData[]) => {
        setData(newdata)
        console.log(newdata)
    }
    return (
        <Row>
            <Route path='/admin/account' exact>
                <AccountList data={data} />
            </Route>
            <Route path='/admin/account/add'>
                <AccountAction addNewData={addNewData} data={data} />
            </Route>
            <Route path='/admin/account/update/:key'>
                <AccountAction addNewData={addNewData} data={data} />
            </Route>
        </Row>
    )
}

export default AccountPage