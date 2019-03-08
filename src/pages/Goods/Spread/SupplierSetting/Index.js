import React, { Component } from 'react'
import Page from './config/page'
import HeaderTip from './config/header'


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
        <HeaderTip />
        <Page query={query} />
      </div>
      
    )
  }
}
