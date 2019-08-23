import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route, match } from 'react-router-dom'
import LayoutsView from './layouts'
import '@styles/global.index.less'
import { Location, History } from 'history'
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

export interface PageProps<Params> {
  match: match<Params>
  location: Location
  history: History
}
