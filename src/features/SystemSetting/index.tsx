import { Row } from 'antd'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AccountPage from './Account'
import DairyPage from './DairyUser'
import RolePage from './Role'

const SettingPage = () => {
    return (
        <Row>
            <Routes>
                <Route path='/account/*' element={<AccountPage />} />
                <Route path='/dairy/*' element={<DairyPage />} />
                <Route path='/role/*' element={<RolePage />} />
            </Routes>
        </Row>

    )
}

export default SettingPage