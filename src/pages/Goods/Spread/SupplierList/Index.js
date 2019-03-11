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
      status
    }
  }

  render() {
    const { status } = this.state
    return (
      <Tabs size="large" defaultActiveKey={status}>
        <TabPane tab="等待推广" key="1">
          <Waiting />
        </TabPane>
        <TabPane tab="推广审核中" key="2">
          <Auditing />
        </TabPane>
        <TabPane tab="推广失败" key="3">
          <Failed />
        </TabPane>
      </Tabs>
    );
  }
}
