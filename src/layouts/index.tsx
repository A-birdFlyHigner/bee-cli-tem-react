import React, { Component, Suspense } from 'react'
import { Layout, Card, Spin } from 'antd'
import Header from './components/Header'
import { hot } from 'react-hot-loader'
import { SiderMenu, BanmaLogo } from '@bee/layout'
import { Route, Switch, Redirect } from 'react-router-dom'
import routers from '../router'
import menuData from './menu'
import NoMatch from '@views/404'
const { Content, Sider } = Layout

interface State {
  collapsed: boolean
}
class LayoutView extends Component<any, State> {
  state = {
    collapsed: false
  }
  render() {
    return (
      <Layout>
        <Sider breakpoint="sm" className="global_sider">
          <BanmaLogo />
          <SiderMenu menuData={menuData} />
        </Sider>
        <Content style={{ margin: '80px 0 0 200px' }}>
          <Header />
          <Card className="application_main">
            <Suspense fallback={<Spin size="large" tip="Loading..." className="global_loading" />}>
              <Switch>
                <Route path="/404" component={NoMatch} />
                {routers.map(item => {
                  return <Route key={item.path} path={item.path} component={item.component} />
                })}
                <Redirect to="/404" />
              </Switch>
            </Suspense>
          </Card>
        </Content>
      </Layout>
    )
  }
}
export default hot(module)(LayoutView)
