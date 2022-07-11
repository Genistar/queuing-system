import { Row } from 'antd'
import React from 'react'
import { Route } from 'react-router-dom'
import { rolesData } from '../../../constants/data'
import RoleAction from './components/RoleAction'
import RoleList from './components/RoleList'

type Props = {}

const RolePage: React.FC = (props: Props) => {
    return (
        <Row>
            <Route path='/admin/role' exact>
                <RoleList data={rolesData} />
            </Route>
            <Route path='/admin/role/add'>
                <RoleAction />
            </Route>
            <Route path='/admin/role/update/:key'>
                <RoleAction />
            </Route>
        </Row>
    )
}

export default RolePage