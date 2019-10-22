import React, { Component, createElement } from 'react'
import { Result, Button } from 'antd'
export default class NoMatch extends Component {
  render() {
    return (
      <Result
        status="404"
        title="404"
        subTitle="抱歉，你访问的页面不存在"
        extra={createElement('a', { to: '/#/home', href: '/#/home' }, <Button type="primary">返回首页</Button>)}
      />
    )
  }
}
