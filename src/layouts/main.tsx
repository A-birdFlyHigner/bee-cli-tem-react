import React, { Component } from 'react'
import { Layout, Card } from 'antd'
import Header from './components/Header'
import { hot } from 'react-hot-loader'
import { SiderMenu, BanmaLogo } from '@bee/layout'
import { Route, Switch } from 'react-router-dom'
import routers from '../routers'
import menuData from './menu'
const { Content, Sider } = Layout
interface State {
  collapsed: boolean
}
class LayoutView extends Component<any, State> {
  state = {
    collapsed: false
  }
  onCollapse = collapsed => {
    this.setState({ collapsed })
  }
  logout = () => {
    return
  }
  render() {
    const { collapsed } = this.state
    return (
      <Layout>
        <Sider breakpoint="sm">
          <BanmaLogo />
          <SiderMenu collapsed={collapsed} menuData={menuData} />
        </Sider>
        <Content>
          <Header logout={this.logout} />
          <Card className="application-main">
            <Switch>
              {routers.map(item => {
                return <Route key={item.path} path={item.path} component={item.compoent} />
              })}
            </Switch>
          </Card>
        </Content>
      </Layout>
    )
  }
}
export default hot(module)(LayoutView)
