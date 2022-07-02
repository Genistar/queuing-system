import { Col, Row, Typography } from 'antd'
import React from 'react'
import EquipmentList from '../../components/Equipment/EquipmentList'

type Props = {}

const EquipmentPage = (props: Props) => {
  return (
    <Row>
      <EquipmentList />
    </Row>
  )
}

export default EquipmentPage