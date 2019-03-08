import React, { Component } from 'react'
import CityList from './cityList'

export default class AdminCityList extends Component {

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
