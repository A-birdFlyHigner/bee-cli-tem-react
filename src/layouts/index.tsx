import React from 'react'
// import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Loading from './components/Loading'

import MainRoot from './main'
class LayoutView extends React.Component {
  render() {
    return (
      <HashRouter>
        <Loading spinning={false}>
          <div className="mars-container">
            <Switch>
              <Route path="/" component={MainRoot} />
            </Switch>
          </div>
        </Loading>
      </HashRouter>
    )
  }
}

export default LayoutView
