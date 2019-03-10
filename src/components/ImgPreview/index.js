import React, { Component } from 'react';
import { LeDialog } from '@lib/lepage';
import Sty from './index.less'


export default class ImgPreview extends Component {
  constructor (props) {
    super(props)
    const { url } = this.props
    this.state = {
      imgUrl: url
    }
  };

  handleClick = () => {
    const { imgUrl } = this.state
    LeDialog.show({
      width: '800px',
      closable: false,
      content () {
        return (
          <div className={Sty.imgContent}>
            <img src={imgUrl} alt="1" />
          </div>
        )
      },
      maskClosable: true,
      footer() {
        return null;
      },
    })
  }

  render () {
    const { imgUrl } = this.state
    return <img className={Sty.imgView} onClick={this.handleClick} src={imgUrl} alt="1" />
  }
}