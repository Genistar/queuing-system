import { Layout, Row } from 'antd'
import React from 'react'
import DashboardRight from './components/DashboardRight'
type Props = {}
const DashBoard: React.FC = (props: Props) => {
    return (
        <Layout>
            <Row>
                <DashboardRight />
            </Row>
        </Layout>
    )
}

export default DashBoard