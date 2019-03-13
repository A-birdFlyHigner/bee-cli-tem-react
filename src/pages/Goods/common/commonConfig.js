
import Reg from '@/utils/reg'
import { DatePicker } from 'antd'
import moment from 'moment'
import React from 'react'

const { RangePicker } = DatePicker

const disabledDate = (current) => {
  return current && current < moment().endOf('day')
}

const changeTime = (e, leFormCore) => {
  const startTime = moment(e[0]._d).format('YYYY-MM-DD HH:mm:ss')
  const endTime = moment(e[1]._d).format('YYYY-MM-DD HH:mm:ss')

  leFormCore.setValue('scheduleTime', {
    startTime,
    endTime,
  })
}

export function dialogFormSetTimeConfig() {
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
            <RangePicker
              disabledDate={disabledDate}
              placeholder={['开始时间','结束时间']}
              onChange={e => changeTime(e,leFormCore)}
              showTime={{
                hideDisabledOptions: true,
                defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
              }}
              format="YYYY-MM-DD HH:mm:ss"
            />
          )
        },
      },
    ],
  }
} 

export function dialogFormJoinGroupConfig(number, text) {
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
        name: 'grounp',
        component: 'Select',
        props: {
          placeholder: '请选择支持的分组',
          options: [{
            label: '分组1',
            value: 1,
          }, {
            label: '分组2',
            value: 2
          }, {
            label: '分组3',
            value: 3
          }]
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
              <div clssName='globalRed'>仅仅支持搜索在该城市投放的分组</div>                            
            </div>
          )
        },
      },

    ],
  }
}

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
        label: '',
        name: 'text',
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