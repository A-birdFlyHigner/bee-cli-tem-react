import React, { Component } from 'react'
import { Layout, Modal, Avatar, Popover, Button } from 'antd'
const { Header } = Layout
import { inject, observer } from 'mobx-react'
import './style.scss'
interface Props {
  userInfo?: object
}
@inject('store')
@observer
export default class HeaderLayout extends Component<Props> {
  handleExit = () => {
    Modal.confirm({
      title: '提示',
      content: '是否确认退出系统？',
      maskClosable: true,
      onOk: () => {
        console.log('退出 => mobx')
      }
    })
  }
  render() {
    return (
      <Header className="global_header">
        <h2>鲁班系统</h2>
        <Popover
          content={
            <Button type="primary" onClick={this.handleExit}>
              退出账户
            </Button>
          }
          placement="bottom"
        >
          <Avatar style={{ color: '#fff', backgroundColor: '#1a1a1a' }}>{this.props.store.globalStore.userName}</Avatar>
        </Popover>
      </Header>
    )
  }
}
