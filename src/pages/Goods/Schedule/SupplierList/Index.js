import React, { Component } from 'react'
import { Tabs } from 'antd'
import Scheduled from './scheduled'
import Prescheduled from './prescheduled'
import Noscheduled from './noscheduled'

const  { TabPane } = Tabs

export default class SpreadList extends Component {

  constructor(props) {
    super()
    this.store = props
  }
  
  render () {
    return (
      <Tabs size='large' defaultActiveKey="1">
        <TabPane tab="未排期" key="1">
          <Noscheduled />
        </TabPane>
        <TabPane tab="预排期" key="2">
          <Prescheduled />
        </TabPane>
        <TabPane tab="已排期" key="3">
          <Scheduled />
        </TabPane>
      </Tabs>
    )
  }
}
