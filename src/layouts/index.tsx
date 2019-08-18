import React, { Component } from 'react'
import { Layout, Card } from 'antd'
import Header from './components/Header'
import { hot } from 'react-hot-loader'
import { SiderMenu, BanmaLogo } from '@bee/layout'
import { Route, Switch, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import routers from '../routers'
import menuData from './menu'
import NoMatch from '@views/404'
const { Content, Sider } = Layout

interface State {
  collapsed: boolean
}
@inject('store')
@observer
class LayoutView extends Component<any, State> {
  state = {
    collapsed: false
  }
  async componentDidMount() {
    await this.props.store.globalStore.setMenu(menuData)
    await this.props.store.globalStore.setUserName('太一')
  }
  render() {
    const { menu } = this.props.store.globalStore
    return (
      <Layout>
        <Sider breakpoint="sm" className="global_sider">
          <BanmaLogo />
          <SiderMenu menuData={menu} />
        </Sider>
        <Content style={{ margin: '80px 0 0 200px' }}>
          <Header />
          <Card className="application_main">
            <Switch>
              <Route path="/404" component={NoMatch} />
              {routers.map(item => {
                return <Route key={item.path} path={item.path} component={item.compoent} />
              })}
              <Redirect to="/404" />
            </Switch>
          </Card>
        </Content>
      </Layout>
    )
  }
}
export default hot(module)(LayoutView)
