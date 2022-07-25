import { Row } from 'antd'
import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import GiveNumberList from './components/GiveNumberList'
import { giveNumberData } from '../../constants/interface'
import moment from 'moment'
import GiveNumberAction from './components/GiveNumberAction'
import GiveNumberDetail from './components/GiveNumberDetail'

type Props = {}

const GiveNumberPage: React.FC = (props: Props) => {

    return (
        <Row>
            <Routes>
                <Route path='/' element={<GiveNumberList />} />
                <Route path='/add' element={<GiveNumberAction />} />
                <Route path='/detail/:key' element={<GiveNumberDetail />} />
            </Routes>

        </Row>
    )
}

export default GiveNumberPage