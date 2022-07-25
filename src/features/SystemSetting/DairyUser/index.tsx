import { Row } from 'antd'
import moment from 'moment'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DairyList from './components/DairyList'

type Props = {}

const DairyPage = (props: Props) => {
    return (
        <Row>
            <Routes>
                <Route path='/' element={<DairyList />} />
            </Routes>
        </Row>
    )
}

export default DairyPage