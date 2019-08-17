import React, { Component } from 'react'
import { Layout, Modal, Avatar } from 'antd'
const { Header } = Layout
export interface Props {
  username: string
  logout: () => void
}

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
        {/* <div>
          <span> 鲁班管理</span>
        </div> */}
        <div>
          <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>太一</Avatar>
        </div>
      </Header>
    )
  }
}
