import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

import Layouts from './layouts'
import '@styles/global.index.scss'

const render = (Component: React.ComponentType) => {
  ReactDOM.render(<Component />, document.getElementById('app'))
}
render(Layouts)
