import React, { Component } from 'react'
// // import { NavLink } from 'react-router-dom'
import { Layout, Modal } from 'antd'
const { Header } = Layout

export interface Props {
  username: string
  logout: () => void
}

export default class HeaderLayout extends Component<Props> {
  constructor(props) {
    super(props)
  }
  static defaultProps = {
    username: ''
  }
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
    const { username, logout } = this.props
    return (
      <Header className="header-wrapper">
        <div className="container">
          <span className="headerName"> 鲁班管理</span>
        </div>
        {username && (
          <div className="user">
            <span>
              你好，
              {username}
            </span>
            <span className="logout" onClick={logout}>
              退出
            </span>
          </div>
        )}
      </Header>
    )
  }
}
