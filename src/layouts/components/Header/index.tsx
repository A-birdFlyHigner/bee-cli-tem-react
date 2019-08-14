import React, { Component } from 'react'
// // import { NavLink } from 'react-router-dom'
import { Icon, Button, Modal } from 'antd'
export default class Header extends Component {
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
      <section>
        <span className="mars-header__icon">
          <Icon type={1 ? 'menu-unfold' : 'menu-fold'} />
          <Button>89deeessseeddu</Button>
        </span>
      </section>
    )
  }
}
