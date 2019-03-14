
import Reg from '@/utils/reg'
import { DatePicker, message } from 'antd'
import { LeDialog, LeForm } from '@lib/lepage'
import moment from 'moment'
import React from 'react'
import * as Sty from './index.less'
import { backOff, addOrUpdate, updateSortNumber, getProductGroupCombo, addProductToProductGroup, revokeProductSpeard,
  setProductReviewStatus, revokeProductPromotion, forceBackProductList     
} from '@/services/goods'

const { RangePicker } = DatePicker

// rangepicker的 时间禁用 
// const disabledDate = (current) => {
//   return current && current < moment().endOf('day')
// }

// 过滤
const filterData = (input, option) => {
  return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

const changeTime = (e, leFormCore) => {
  const startTime = moment(e[0]._d).format('YYYY-MM-DD HH:mm:ss')
  const endTime = moment(e[1]._d).format('YYYY-MM-DD HH:mm:ss')

  leFormCore.setValue('scheduleTime', {
    startTime,
    endTime,
  })
}

// 批量提示 config
const dialogFormConfig = (number, text) => {
  return {
    form: {
      layout: { // 表单布局 左侧和右侧比例
        label: 0,
        control: 24
      }
    },
    items: [
      {
        label: '',
        name: 'text',
        render: () => {
          return(
            <div>
              <div className={Sty.dialogMb}>已批量选中{number}个商品，确定批量{text}？</div>                                  
            </div>
          )
        },
      }

    ],
  }
}

// 排期时间 config
export function dialogFormSetTimeConfig(count) {
  return {
    form: {
      layout: { // 表单布局 左侧和右侧比例
        label: 0,
        control: 24
      }
    },
    items: [
      {
        label: '',
        name: 'scheduleTime',
        // 初始化数据 相当于了此Item的状态值N
        value: {
          startTime: '',
          endTime: ''
        },
        render: (value, leFormCore) => {
          return (
            <div>
              {
                count?<div>已批量选中{count}个商品，确定批量排期？</div>:null
              }
              <RangePicker
                placeholder={['开始时间','结束时间']}
                onChange={e => changeTime(e,leFormCore)}
                className='scheduleRange'
                showTime={{
                  hideDisabledOptions: true,
                  defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                }}
                format="YYYY-MM-DD HH:mm:ss"
              />
            </div>
          )
        },
      },
    ],
  }
} 

// 设置分组config
export function dialogFormJoinGroupConfig(groupName, number, text) {

  const groupNamesData = []

  if (groupName.length>0) {
    groupName.forEach(item => {
      groupNamesData.push({
        label: item.name,
        value: item.id
      })
    })
  }

  return {
    form: {
      layout: { // 表单布局 左侧和右侧比例
        label: 0,
        control: 24
      }
    },
    items: [
      {
        label: '',
        name: 'text',
        render: () => {
          return(
            <div>
              <div>已批量选中{number}个商品，确定批量{text}？</div>                            
            </div>
          )
        },
      },
      {
        label: '选择分组',
        name: 'id',
        component: 'Select',
        value: '',
        props: {
          placeholder: '请选择支持的分组',
          options: groupNamesData,
          showSearch: true,
          maxTagCount: 1,
          optionFilterProp: 'children',
          filterOption: filterData
        },
        // val 表单值集合 core 表单核心 当values改变的时候，when就会去判断是否命中，如果命中就会重新渲染这部分 
        when: (val) => {
          return val.type !== 3
        }
      },
      {
        name: 'message',
        component: 'Item',
        render: () => {
          return(
            <div>
              <div className='globalRed'>仅仅支持搜索在该城市投放的分组</div>                            
            </div>
          )
        },
      },

    ],
  }
}

// 设置排序值config
export function  dialogFormSetGroupConfig(){
  return {
    form: {
      layout: { // 表单布局 左侧和右侧比例
        label: 6,
        control: 18
      }
    },
    items: [
      {
        label: '排序值',
        name: 'sortValue',
        component: 'Input',
        rules: {
          pattern: Reg.Num,
          message: '排序值,请输入数字'
        },
        props: {
          placeholder: '请输入排序值'
        },
      }

    ],
  }
}

// 批量回退等操作config
export function dialogFormTextConfig(text) {
  return {
    form: {
      layout: { // 表单布局 左侧和右侧比例
        label: 6,
        control: 14
      }
    },
    items: [
      {
        name: 'text',
        component: 'Item',        
        render: () => {
          return (
            <div>
              <div>您确定将该商品{text}吗？</div>
              {
                text === '回退' ? <div className='globalRed'>商品将回退到审核通过未排期列表中。</div> : null
              }
            </div> 
          )
        },
      },
    ],
  }
}

// 批量回退
export function allBackoff(err, values, formCore, listCore){
  const channelProductIdList = listCore.getSelectedRowKeys()
  const count = channelProductIdList.length

  if (!count) {
    message.warning('请至少勾选一项！')
    return
  }

  LeDialog.show(
    {
      title: '批量回退',
      width: '400px',
      content () {
        return <LeForm {...dialogFormConfig(count)} />
      },
      onOk: ( suc ) => {
        backOff({ 
          channelProductIdList, 
        }).then(res => {
          if (!res) return
          // 关闭弹窗
          
          suc()
          listCore.refresh();
        })
      }
    }
  )
}

// 单个回退
export function goBack (saleGoodsId) {
  LeDialog.show(
    {
      title: '回退',
      width: '400px',
      content () {
        return <LeForm {...dialogFormTextConfig('回退')} />
      },
      onOk: (values, suc) => {
        const channelProductIdList = []
        channelProductIdList.push(saleGoodsId)

        backOff({ 
          channelProductIdList, 
        }).then(res => {
          if (!res) return
          // 关闭弹窗
          
          suc()
          // TODO: 刷新列表 拿不到leList
          // leList.refresh();
        })

        suc()
      }
    }
  )
}

// 批量排期
export function allSetSchedule(err, values, formCore, listCore) {
  const productIdList = listCore.getSelectedRowKeys()
  const count = productIdList.length

  if (!count) {
    message.warning('请至少勾选一项！')
    return
  }

  LeDialog.show(
    {
      title: '批量排期',
      width: '500px',
      content () {
        return <LeForm {...dialogFormSetTimeConfig(count)} />
      },
      onOk: (value, suc) => {
        const { startTime, endTime } = value.scheduleTime

        addOrUpdate({ startTime, endTime, productIdList }).then(res => {
          if (!res) return
          // 关闭弹窗
          suc()
          listCore.refresh();
        })

      }
    }
  )
}

// 单个排期
export function goSetTime(saleGoodsId) {
  LeDialog.show(
    {
      title: '设置活动时间',
      width: '600px',
      content () {
        return <LeForm {...dialogFormSetTimeConfig()} />
      },
      onOk: (values, suc) => {
        const { startTime, endTime } = values.scheduleTime
        const productIdList = []
        productIdList.push(saleGoodsId)
        addOrUpdate({ startTime, endTime, productIdList }).then(res => {
          if (!res) return
          // 关闭弹窗
          
          suc()
          // TODO: 刷新列表 拿不到leList
          // leList.refresh();
        })
      }
    }
  )

}

// 加入分组
export function joinGroup(err, values, formCore, listCore) {
  const productIds = listCore.getSelectedRowKeys()
  const count = productIds.length
  const cityCode = listCore.filterCore.getValue('cityCode')

  if (!count) {
    message.warning('请至少勾选一项！')
    return
  }

  if (!cityCode) {
    message.warning('加入分组前，请先选择一个城市！')
    return
  }

  getProductGroupCombo({cityCode}).then(res => {
    if (!res) return
    const groupNames = [
      ...res
    ]
    LeDialog.show(
      {
        title: '加入分组',
        width: '500px',
        content () {
          return <LeForm {...dialogFormJoinGroupConfig(groupNames, count,'加入分组')} />
        },
        onOk: (value, suc) => {
          // 加入分组接口
          const { id } = value
          addProductToProductGroup({ 
            productGroupId: id, 
            productIds,
          }).then(resData => {
            if (!resData) return
            // 关闭弹窗
            suc()
            // listCore.refresh();
          })
  
        }
      }
    )

  })

  
}

// 单个设置排序值
export function setGroupValue(saleGoodsId) {
  LeDialog.show(
    {
      title: '设置排序值',
      width: '600px',
      content () {
        return <LeForm {...dialogFormSetGroupConfig()} />
      },
      onOk: (values, suc) => {
        const { sortValue } = values
        
        updateSortNumber({ 
          channelProductId: saleGoodsId, 
          sortNumber: Number(sortValue)
        }).then(res => {
          if (!res) return
          // 关闭弹窗
          
          suc()
          // TODO: 刷新列表 拿不到leList
          // leList.refresh();
        })
      }
    }
  )
}

// 单个撤销
export function goRevoke(saleGoodsId) {
  LeDialog.show(
    {
      title: '撤销推广',
      width: '400px',
      content () {
        return <LeForm {...dialogFormTextConfig('撤销推广')} />
      },
      onOk: (values, suc) => {

        const channelProductIdList = []
        channelProductIdList.push(saleGoodsId)

        revokeProductSpeard({ 
          channelProductIdList, 
        }).then(res => {
          if (!res) return
          // 关闭弹窗
          
          suc()
          // TODO: 刷新列表 单个数据操作拿不到leList 
          // leList.refresh();
        })
      }
    }
  )
}

// 批量撤销
export function allRevoke(err, values, formCore, listCore) {
  const channelProductIdList = listCore.getSelectedRowKeys()
  const count = channelProductIdList.length
  if (!count) {
    message.warning('请至少勾选一项！')
    return
  }

  LeDialog.show(
    {
      title: '撤销推广',
      width: '400px',
      content () {
        return <LeForm {...dialogFormTextConfig('撤销推广')} />
      },
      onOk: (values, suc) => {
        revokeProductSpeard({ 
          channelProductIdList,
        }).then(res => {
          if (!res) return
          // 关闭弹窗
          
          suc()
          // TODO: 刷新列表 单个数据操作拿不到leList 
          listCore.refresh();
        })
      }
    }
  )
}


// -------------------- 总部排期相关 -----------------

// 审核config
const examineFormConfig = (count) => {
  return {
    form: {
      layout: { // 表单布局 左侧和右侧比例
        label: 0,
        control: 24
      }
    },
    items: [
      {
        label: '',
        name: 'text',
        render: () => {
          return(
            <div>
              {
                count ?
                  <div className={Sty.dialogMb}>已批量选中{count}个商品，确定对商品进行以下审核？</div>
                :
                  <div className={Sty.dialogMb}>确定对商品进行以下审核？</div>
              }
            </div>
          )
        },
      },
      {
        label: '',
        name: 'chooseType',
        component: 'RadioGroup',
        follow: true,
        props:{
          options:[
            {
              label:'通过',
              value:2,
            },
            {
              label:'拒绝',
              value:3,
            }
          ]
        }
      },
      {
        label:'',
        name: 'rejectReason',
        component: 'Input',
        className: Sty.rejectReason,
        props:{
          placeholder: '请输入拒绝原因，不超过20字',
          maxLength: 20,
        },
        // when true false 控制隐藏显示此组件
        when: (val) => {
          return val.chooseType === 1
        }
      }
    ],
  }
}

// 总部批量撤销config
const revokeFormConfig = (count) => {

  return {
    form: {
      layout: { // 表单布局 左侧和右侧比例
        label: 0,
        control: 24
      }
    },
    items: [
      {
        label: '',
        name: 'text',
        render: () => {
          return(
            <div>
              <div className={Sty.dialogMb}>已批量选中{count}个商品，确定批量撤销推广？</div>
              <div className='globalRed'>总部撤销，商品将回到商家后台等待推广列表中，需重新推广。</div> 
            </div>
          )
        },
      },
    ],
  }
}

// 总部批量回退config
const alladminBackFormConfig = (count) => {
  return {
    form: {
      layout: { // 表单布局 左侧和右侧比例
        label: 0,
        control: 24
      }
    },
    items: [
      {
        label: '',
        name: 'tags',
        render: () => {
          return(
            <div>
              <div className={Sty.dialogMb}>已批量选中{count}个商品，确定批量回退？</div>
              <div className='globalRed'>总部强制回退到分公司未排期列表中</div> 
            </div>
          )
        },
      },
    ],
  }
}

// 单个审核
export function goExamine(saleGoodsId) {
  LeDialog.show(
    {
      title: '审核',
      width: '600px',
      content () {
        return <LeForm {...examineFormConfig()} />
      },
      onOk: (values, suc) => {
        const { chooseType } = values
        const comment = values.rejectReason ? values.rejectReason : ''
        const channelProductIds = []
        channelProductIds.push(saleGoodsId)

        setProductReviewStatus({ 
          channelProductIds, 
          status: chooseType,
          comment
        }).then(res => {
          if (!res) return
          // 关闭弹窗
          
          suc()
          // TODO: 刷新列表 单个数据操作拿不到leList 
          // leList.refresh();
        })

      }
    }
  )
}

// 批量审核
export function goallExamine(err, values, formCore, listCore) {
  const channelProductIds = listCore.getSelectedRowKeys()
  const count = channelProductIds.length

  if (!count) {
    message.warning('请至少勾选一项！')
    return
  }

  LeDialog.show(
    {
      title: '批量审核',
      width: '600px',
      content () {
        return <LeForm {...examineFormConfig(count)} />
      },
      onOk: (value, suc) => {

        const { chooseType } = value
        const comment = value.rejectReason ? value.rejectReason : ''

        setProductReviewStatus({ 
          channelProductIds, 
          status: chooseType,
          comment
        }).then(res => {
          if (!res) return
          // 关闭弹窗
          suc()
          listCore.refresh();
        })
      }
    }
  )
}

// 总部单个撤销
export function goadminRevoke(saleGoodsId) {
  LeDialog.show(
    {
      title: '撤销推广',
      width: '400px',
      content () {
        return <LeForm {...dialogFormTextConfig('撤销推广')} />
      },
      onOk: (values, suc) => {

        const channelProductIdList = []
        channelProductIdList.push(saleGoodsId)

        revokeProductPromotion({
          channelProductIdList, 
        }).then(res => {
          if (!res) return
          // 关闭弹窗
          
          suc()
          // TODO: 刷新列表 单个数据操作拿不到leList 
          // leList.refresh();
        })
      }
    }
  )
}

// 总部批量撤销
export function alladminRevoke(err, values, formCore, listCore) {
  const channelProductIdList = listCore.getSelectedRowKeys()
  const count = channelProductIdList.length
  if (!count) {
    message.warning('请至少勾选一项！')
    return
  }

  LeDialog.show(
    {
      title: '撤销推广',
      width: '400px',
      content () {
        return <LeForm {...revokeFormConfig('撤销推广')} />
      },
      onOk: (values, suc) => {
        revokeProductPromotion({ 
          channelProductIdList,
        }).then(res => {
          if (!res) return
          // 关闭弹窗
          
          suc()
          // TODO: 刷新列表 单个数据操作拿不到leList 
          listCore.refresh();
        })
      }
    }
  )
}

// 总部单个回退
export function goadminBack (saleGoodsId) {
  LeDialog.show(
    {
      title: '回退',
      width: '400px',
      content () {
        return <LeForm {...dialogFormTextConfig('回退')} />
      },
      onOk: (values, suc) => {
        const channelProductIdList = []
        channelProductIdList.push(saleGoodsId)

        forceBackProductList({ 
          channelProductIdList, 
        }).then(res => {
          if (!res) return
          // 关闭弹窗
          
          suc()
          // TODO: 刷新列表 拿不到leList
          // leList.refresh();
        })

        suc()
      }
    }
  )
}

// 总部批量回退
export function alladminBack(err, values, formCore, listCore){
  const channelProductIdList = listCore.getSelectedRowKeys()
  const count = channelProductIdList.length

  if (!count) {
    message.warning('请至少勾选一项！')
    return
  }

  LeDialog.show(
    {
      title: '批量回退',
      width: '400px',
      content () {
        return <LeForm {...alladminBackFormConfig(count)} />
      },
      onOk: ( suc ) => {
        forceBackProductList({ 
          channelProductIdList, 
        }).then(res => {
          if (!res) return
          // 关闭弹窗
          
          suc()
          listCore.refresh();
        })
      }
    }
  )
}
