import { Row } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import ReportList from './components/ReportList'
import { giveNumberData } from '../../constants/interface'

type Props = {}

const ReportPage: React.FC = (props: Props) => {

    return (
        <Row>
            <Routes>
                <Route path='/' element={<ReportList />} />
            </Routes>

        </Row>
    )
}

export default ReportPage