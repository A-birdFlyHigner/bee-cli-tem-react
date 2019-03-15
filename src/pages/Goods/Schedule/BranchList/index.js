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
    const branchJoinType = window.sessionStorage.getItem('HQBSFORSHOP').userInfo.branchJoinType? window.sessionStorage.getItem('HQBSFORSHOP').userInfo.branchJoinType:''
    return (
      <Tabs size='large' defaultActiveKey="1">
        <TabPane tab="未排期" key="1">
          <Noscheduled />
        </TabPane>
        {
          branchJoinType && branchJoinType===2 
          ?
            <TabPane tab="预排期" key="2">
              <Prescheduled />
            </TabPane>
          : 
            null
        }
        <TabPane tab="已排期" key="3">
          <Scheduled />
        </TabPane>
      </Tabs>
    )
  }
}
