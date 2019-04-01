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
      refList: {
        '1': 'noscheduled',
        '2': 'prescheduled',
        '3': 'scheduled',
      }
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

  onChange = (activeKey) => {
    const {refs} = this
    const {refList} = this.state
    const pageRef = refs[refList[activeKey]]
    if (!pageRef || !pageRef.leList) return
    pageRef.leList.refresh()
  }
  
  render () {
    const { tabType, cityCode, refList } = this.state
    // 只有直营分公司有【预排期】，加盟分公司没有预排期状态 2 直营 
    const branchJoinType = JSON.parse(window.sessionStorage.getItem('HQBSFORSHOP')).userInfo.branchJoinType? JSON.parse(window.sessionStorage.getItem('HQBSFORSHOP')).userInfo.branchJoinType:''
    return (
      <Tabs size='large' defaultActiveKey={tabType} onChange={this.onChange}>
        <TabPane tab="未排期" key="1">
          <Noscheduled ref={refList['1']} />
        </TabPane>
        {
          branchJoinType && branchJoinType===2
          ?
            <TabPane tab="预排期" key="2">
              <Prescheduled ref={refList['2']} />
            </TabPane>
          : 
            null
        }
        <TabPane tab="已排期" key="3">
          <Scheduled ref={refList['3']} cityCode={cityCode} />
        </TabPane>
      </Tabs>
    )
  }
}
