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
  
  render () {
    const { tabType } = this.state
    return (
      <Tabs size='large' defaultActiveKey={tabType}>
        <TabPane tab="推广审核中" key="1">
          <Examining />
        </TabPane>
        <TabPane tab="推广失败" key="2">
          <SpreadFailure />
        </TabPane>
      </Tabs>
    )
  }
}
