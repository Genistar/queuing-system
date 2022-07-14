import { Row } from 'antd'
import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import { accountData, userType } from '../../../constants/interface'
import { useAppDispatch, useAppSelector } from '../../../store'
import AccountAction from './Components/AccountAction'
import AccountList from './Components/AccountList'
type Props = {}



const AccountPage = (props: Props) => {
    return (
        <Row>
            <Route path='/admin/account' exact>
                <AccountList />
            </Route>
            <Route path='/admin/account/add'>
                <AccountAction />
            </Route>
            <Route path='/admin/account/update/:key'>
                <AccountAction />
            </Route>
        </Row>
    )
}

export default AccountPage