import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'
import LayoutsView from './layouts'
import store from '@stores/index'
import '@styles/global.index.less'
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Switch>
            <Route path="/" component={LayoutsView} />
          </Switch>
        </HashRouter>
      </Provider>
    )
  }
}

const render = (Component: React.ComponentType) => {
  ReactDOM.render(<Component />, document.getElementById('app'))
}
render(App)
