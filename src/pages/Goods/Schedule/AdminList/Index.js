import React, { Component } from 'react'
import { Tabs } from 'antd'
import Saleing from './saleing'
import Prescheduled from './prescheduled'
import Noscheduled from './noscheduled'

const TabPane = Tabs.TabPane

export default class SpreadList extends Component {

  constructor(props) {
    super()
    this.store = props
  }
  
  render () {
    return (
      <Tabs size='large' defaultActiveKey="1">
        <TabPane tab="出售中" key="1">
          <Saleing />
        </TabPane>
        <TabPane tab="已排期" key="2">
          <Saleing />
        </TabPane>
        <TabPane tab="预排期" key="3">
          <Prescheduled />
        </TabPane>
        <TabPane tab="未排期" key="4">
          <Noscheduled />
        </TabPane>
      </Tabs>
    )
  }
}
