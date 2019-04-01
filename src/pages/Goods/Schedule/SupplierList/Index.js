import React, { Component } from 'react';
import { Tabs } from 'antd';
import TodayList from './todayList';
import ScheduleList from './scheduleList';
import NoScheduleList from './noScheduleList';

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
        '1': 'today',
        '2': 'sche',
        '3': 'noSche',
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
        <TabPane tab="今日在售" key="1">
          <TodayList ref={refList['1']} />
        </TabPane>
        <TabPane tab="已排期" key="2">
          <ScheduleList ref={refList['2']} />
        </TabPane>
        <TabPane tab="未排期" key="3">
          <NoScheduleList ref={refList['3']} />
        </TabPane>
      </Tabs>
    );
  }
}
