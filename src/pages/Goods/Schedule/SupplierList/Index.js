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
      status
    }
  }

  render() {
    const { status } = this.state
    return (
      <Tabs size="large" defaultActiveKey={status}>
        <TabPane tab="今日在售" key="1">
          <TodayList />
        </TabPane>
        <TabPane tab="已排期" key="2">
          <ScheduleList />
        </TabPane>
        <TabPane tab="未排期" key="3">
          <NoScheduleList />
        </TabPane>
      </Tabs>
    );
  }
}
