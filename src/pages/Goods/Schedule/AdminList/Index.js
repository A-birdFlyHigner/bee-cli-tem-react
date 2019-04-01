import React, { Component } from 'react'
import { Tabs } from 'antd'
import Saleing from './saleing'
import Schedule from './schedule'
import Prescheduled from './prescheduled'
import Noscheduled from './noscheduled'

const { TabPane } = Tabs

export default class SpreadList extends Component {

  constructor(props) {
    super()
    this.store = props
    this.state = {
      tabType: '1',
      cityCode: '',
      provinceCode: '',
      refList: {
        '1': 'saleing',
        '2': 'schedule',
        '3': 'prescheduled',
        '4': 'noscheduled'
      }
    }
  }

  componentWillMount(){
    const { tabType, cityCode, provinceCode } = this.store.location.query
    if (tabType) {
      this.setState({
        tabType,
        cityCode,
        provinceCode
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
    const { tabType, cityCode, provinceCode, refList } = this.state
    
    return (
      <Tabs size='large' defaultActiveKey={tabType} onChange={this.onChange}>
        <TabPane tab="出售中" key="1">
          <Saleing ref={refList['1']} />
        </TabPane>
        <TabPane tab="已排期" key="2">
          <Schedule ref={refList['2']} cityCode={cityCode} provinceCode={provinceCode} />
        </TabPane>
        <TabPane tab="预排期" key="3">
          <Prescheduled ref={refList['3']} />
        </TabPane>
        <TabPane tab="未排期" key="4">
          <Noscheduled ref={refList['4']} />
        </TabPane>
      </Tabs>
    )
  }
}
