import React from 'react'
import { Spin } from 'antd'
interface PageProps {
  spinning: boolean
  children?: any
}

class Loading extends React.Component<PageProps> {
  render() {
    const { spinning, children } = this.props

    return (
      <Spin wrapperClassName="lepage-loading" spinning={spinning} size="large">
        {children}
      </Spin>
    )
  }
}
export default Loading
