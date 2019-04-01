import React, { Component } from 'react'
import { Tabs } from 'antd'
import Examining from './examining'
import SpreadFailure from './spreadFailure'

const { TabPane } = Tabs

export default class ExaminList extends Component {

  constructor(props) {
    super()
    this.store = props
    this.state = {
      tabType: '1',
      refList: {
        '1': 'examining',
        '2': 'spreadFailure',
      }
    }
  }

  componentWillMount(){
    const { tabType } = this.store.location.query
    if (tabType) {
      this.setState({
        tabType
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
    const { tabType, refList } = this.state
    return (
      <Tabs size='large' defaultActiveKey={tabType} onChange={this.onChange}>
        <TabPane tab="推广审核中" key="1">
          <Examining ref={refList['1']} />
        </TabPane>
        <TabPane tab="推广失败" key="2">
          <SpreadFailure ref={refList['2']} />
        </TabPane>
      </Tabs>
    )
  }
}
