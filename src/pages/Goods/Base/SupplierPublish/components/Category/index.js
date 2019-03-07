import React, { Component } from 'react';
import { Cascader, Button } from 'antd';
import PropTypes from 'prop-types';
import './index.less';

const FN = () => {};

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          isLeaf: false,
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          isLeaf: false,
        },
      ],
    };
  }

  onChange = (value, selectedOptions) => {
    window.console.log(value, selectedOptions);
  };

  loadData = selectedOptions => {
    const { state } = this;
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    // load options lazily
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: 'dynamic1',
          isLeaf: false,
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: 'dynamic2',
        },
      ];
      this.setState({
        options: [...state.options],
      });
    }, 500);
  };

  handleCacel() {
    const { props } = this;
    props.onCancel();
  }

  handleOK() {
    const { props } = this;
    props.onOK();
  }

  render() {
    const { state } = this;
    return (
      <div className="category-warp">
        <div className="header">
          <span className="title">新建基础商品/选择类目</span>
          {/* <span className='btns'></span> */}
          {/* <span className='msg'></span> */}
        </div>
        <div className="content">
          <Cascader
            options={state.options}
            loadData={this.loadData}
            onChange={this.onChange}
            placeholder="请选择商品类目"
            autoFocus
          />
        </div>
        <div className="footer">
          <Button
            onClick={() => {
              this.handleCacel();
            }}
          >
            取消
          </Button>
          <Button
            onClick={() => {
              this.handleOK();
            }}
          >
            下一步，填写商品信息
          </Button>
        </div>
      </div>
    );
  }
}

Category.propTypes = {
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

Category.defaultProps = {
  onOk: FN,
  onCancel: FN,
};

export default Category;
