import React, { Component } from 'react'
import Page from './config/page'
import HeaderTip from './config/header'
import Sty from './index.less'
import '@lib/lepage/lib/index.css'


export default class Detail extends Component {

  constructor(props) {
    super(props)
    const { location } = this.props
    this.state = {
      query: location.query
    }
  }

  render () {
    const { query } = this.state
    return (
      <div>
        <HeaderTip></HeaderTip>
        <Page query={query}></Page>
      </div>
      
    )
  }
}
