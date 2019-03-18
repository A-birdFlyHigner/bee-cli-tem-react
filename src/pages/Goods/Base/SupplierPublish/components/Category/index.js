import React, { Component } from 'react'
import { Cascader, Button, message as messageApi } from 'antd'
import PropTypes from 'prop-types'
import { queryCategoryList } from '@/services/common';
import Sty from './index.less';

const FN = () => {}
async function fetchData (parentId = 0) {
  const resData = await queryCategoryList({ parentId })
  if (!resData) {
    messageApi.error('获取类目失败!')
    return null
  }

  return resData
}

const makeItem = (list) => {
  return list.map(item => {
    return {
      label: item.name,
      value: item.id,
      isLeaf: item.isLeaf,
    };
  })
}

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: []
    }
  }

  async componentWillMount () {
    const resData = await fetchData()
    if (!resData) return

    const options = makeItem(resData)
    this.setState({
      options
    })
  }

  handleChange = (values, selectedOptions) => {
    this.selected = {
      categoryId: values[values.length -1],
      treeValues: values,
      treeLabels: selectedOptions.map(option => option.label)
    }
  }

  handleCacel = () => {
    const { props } = this
    this.selected = null
    props.onCancel()
  }

  handleOK = () => {
    const { props, selected = null } = this

    if (selected === null) {
      messageApi.error('请选择商品类目')
      return
    }

    this.selected = null
    props.onOk(selected)
  }

  loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    const parentId = targetOption.value
    const resData = await fetchData(parentId)
    if (!resData) return

    targetOption.loading = false;
    targetOption.children = makeItem(resData)

    const { options = [] } = this.state
    this.setState({
      options: [...options],
    });
  }

  render () {
    const { props, state } = this
    return (

      <div className={Sty.categoryWarp}>
        {/* <div className={Sty.header}>
          <span className={Sty.title}>新建基础商品/选择类目</span>
          <span className='btns'></span>
          <span className='msg'></span>
        </div> */}
        <div className={Sty.content}>
          <Cascader
            className={Sty.cascader}
            options={state.options}
            loadData={this.loadData}
            onChange={this.handleChange}
            placeholder='请选择商品类目'
            autoFocus
          />
        </div>
        <div className={Sty.footer}>
          <Button
            className={Sty.buttonCancel}
            hidden={!props.showCancel}
            onClick={this.handleCacel}
          >取消
          </Button>
          <Button
            className={Sty.buttonOk}
            onClick={this.handleOK}
          >下一步，填写商品信息
          </Button>
        </div>
      </div>
    );
  }
}

Category.propTypes = {
  showCancel: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

Category.defaultProps = {
  showCancel: false,
  onOk: FN,
  onCancel: FN,
};

export default Category;
