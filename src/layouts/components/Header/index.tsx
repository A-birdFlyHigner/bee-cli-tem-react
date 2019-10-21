import React, { Component } from 'react'
import { Layout, Modal, Avatar, Popover, Button } from 'antd'
const { Header } = Layout
import './style.less'
interface Props {
  userInfo?: object
  store?: any
}
export default class HeaderLayout extends Component<Props> {
  handleExit = () => {
    Modal.confirm({
      title: '提示',
      content: '是否确认退出系统？',
      maskClosable: true,
      onOk: () => {}
    })
  }
  render() {
    return (
      <Header className="global_header">
        <h2>xx系统</h2>
        <Popover
          content={
            <Button type="primary" onClick={this.handleExit}>
              退出账户
            </Button>
          }
          placement="bottom"
        >
          <Avatar style={{ color: '#fff', backgroundColor: '#1a1a1a' }}>xx</Avatar>
        </Popover>
      </Header>
    )
  }
}
