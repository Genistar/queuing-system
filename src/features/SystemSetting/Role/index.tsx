import { Row } from 'antd'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { rolesData } from '../../../constants/data'
import RoleAction from './components/RoleAction'
import RoleList from './components/RoleList'

type Props = {}

const RolePage: React.FC = (props: Props) => {
    return (
        <Row>
            <Routes>
                <Route path='/' element={<RoleList />} />
                <Route path='/add' element={<RoleAction />} />
                <Route path='/update/:key' element={<RoleAction />} />
            </Routes>

        </Row>
    )
}

export default RolePage