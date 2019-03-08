import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

export default class ImgForTable extends Component {
  static propTypes = {
    src: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
  };
  state = {
    currentImage: '',
    visible: false,
  };
  showImage = src => {
    this.setState({
      currentImage: src,
      visible: true,
    });
  };
  onCancel = () => {
    this.setState({
      visible: false,
      currentImage: '',
    });
  };
  render() {
    const { src, width = '180px', height = '180px' } = this.props;
    const { visible, currentImage } = this.state;
    return (
      <div
        style={{ display: 'inline-block', width, height, lineHeight: height, overflow: 'hidden' }}
      >
        <Modal
          visible={visible}
          onCancel={this.onCancel}
          footer={null}
          closable={false}
          maskClosable
        >
          <img src={currentImage} style={{ maxWidth: '100%' }} />
        </Modal>
        <img
          onClick={() => this.showImage(src)}
          style={{ maxWidth: '100%', maxHeight: '100%', cursor: 'pointer' }}
          src={src}
        />
      </div>
    );
  }
}

export { ImgForTable };
