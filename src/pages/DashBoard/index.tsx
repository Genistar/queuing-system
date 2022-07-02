import { Layout, Row } from 'antd'
import React from 'react'
import DashboardMain from '../../components/Dashboard/DashboardMain'
import DashboardRight from '../../components/Dashboard/DashboardRight'
type Props = {}
const DashBoard: React.FC = (props: Props) => {
    return (
        <Layout>
            <Row>
                <DashboardMain />
                <DashboardRight />
            </Row>
        </Layout>
    )
}

export default DashBoard