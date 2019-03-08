import React, { Component } from 'react'
import CityList from './cityList'

export default class BranchCityList extends Component {

  constructor(props) {
    super()
    this.store = props
  }
  
  render () {
    return (
      <div>
        <CityList />        
      </div>
    )
  }
}
