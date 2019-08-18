import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'
import LayoutsView from './layouts'

import '@styles/global.index.less'

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" component={LayoutsView} />
        </Switch>
      </HashRouter>
    )
  }
}

const render = (Component: React.ComponentType) => {
  ReactDOM.render(<Component />, document.getElementById('app'))
}
render(App)
