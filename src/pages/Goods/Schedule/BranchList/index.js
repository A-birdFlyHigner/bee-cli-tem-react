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
    this.state = {
      tabType: '1',
      cityCode: '',
    }
  }

  componentWillMount(){
    const { tabType, cityCode } = this.store.location.query
    if (tabType) {
      this.setState({
        tabType,
        cityCode
      })
    }
  }
  
  render () {
    const { tabType, cityCode } = this.state

    // 只有直营分公司有【预排期】，加盟分公司没有预排期状态 2 直营 
    const branchJoinType = JSON.parse(window.sessionStorage.getItem('HQBSFORSHOP')).userInfo.branchJoinType? JSON.parse(window.sessionStorage.getItem('HQBSFORSHOP')).userInfo.branchJoinType:''
    return (
      <Tabs size='large' defaultActiveKey={tabType}>
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
          <Scheduled cityCode={cityCode} />
        </TabPane>
      </Tabs>
    )
  }
}
