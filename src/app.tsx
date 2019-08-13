import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
// import 'moment/locale/zh-cn'
import Layouts from './layouts'
console.log(React, 909090)
moment.locale('zh-cn')
import '@/styles/global.index.scss'

ReactDOM.render(<Layouts />, document.querySelector('#app'))
