
import Reg from '@/utils/reg'
import { DatePicker, message } from 'antd'
import { LeDialog, LeForm } from '@lib/lepage'
import moment from 'moment'
import React from 'react'
import * as Sty from './index.less'
import { backOff, addOrUpdate, updateSortNumber, getProductGroupCombo, addProductToProductGroup, revokeProductSpeard } from '@/services/goods'

const { RangePicker } = DatePicker

// rangepicker的 时间禁用 
const disabledDate = (current) => {
  return current && current < moment().endOf('day')
}

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
                disabledDate={disabledDate}
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
