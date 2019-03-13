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
    const isArray = Object.prototype.toString.call(imgUrl) === '[object Array]'
    LeDialog.show({
      title: '点击图片看原图',
      width: '800px',
      closable: false,
      content () {
        const imgItem = (img) => {
          return (
            <div className={Sty.imgContent}>
              <a target="blank" href={img}>
                <img src={img} alt="1" />
              </a>
            </div>
          )
        }
        return (
          <div className={Sty.imgContent}>
            {
              !isArray 
              ? imgItem(imgUrl)
              : imgUrl.map(img => {
                return imgItem(img)
              })
            }
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
    const { imgUrl = '' } = this.state
    let url
    if (Object.prototype.toString.call(imgUrl) === '[object Array]' && imgUrl.length) {
      const ind = 0
      url = imgUrl[ind]
    } else {
      url = imgUrl
    }
    return <img className={Sty.imgView} onClick={this.handleClick} src={url} alt="1" />
  }
}