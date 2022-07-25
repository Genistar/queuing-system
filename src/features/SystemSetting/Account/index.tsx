import { Row } from 'antd'
import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { accountData, userType } from '../../../constants/interface'
import { useAppDispatch, useAppSelector } from '../../../store'
import AccountAction from './Components/AccountAction'
import AccountList from './Components/AccountList'
type Props = {}



const AccountPage = (props: Props) => {
    return (
        <Row>
            <Routes>
                <Route path='/' element={<AccountList />} />
                <Route path='/add' element={<AccountAction />} />
                <Route path='/update/:key' element={<AccountAction />} />
            </Routes>

        </Row>
    )
}

export default AccountPage