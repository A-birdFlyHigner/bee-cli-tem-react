import React, { Component } from 'react';
import { Tabs } from 'antd';
import Waiting from './waiting';
import Auditing from './auditing';
import Failed from './failed';

const {TabPane} = Tabs;

export default class SpreadList extends Component {
  constructor(props) {
    super(props)
    const { location } = this.props
    const { query } = location
    const { status = '1' } = query
    this.state = {
      status,
      refList: {
        '1': 'wait',
        '2': 'audit',
        '3': 'fail'
      }
    }
  }

  onChange = (activeKey) => {
    const {refs} = this
    const {refList} = this.state
    const pageRef = refs[refList[activeKey]]
    if (!pageRef || !pageRef.leList) return
    pageRef.leList.refresh()
  }

  render() {
    const { status, refList } = this.state
    return (
      <Tabs size="large" defaultActiveKey={status} onChange={this.onChange}>
        <TabPane tab="等待推广" key="1">
          <Waiting ref={refList['1']} />
        </TabPane>
        <TabPane tab="推广审核中" key="2">
          <Auditing ref={refList['2']} />
        </TabPane>
        <TabPane tab="推广失败" key="3">
          <Failed ref={refList['3']} />
        </TabPane>
      </Tabs>
    );
  }
}
