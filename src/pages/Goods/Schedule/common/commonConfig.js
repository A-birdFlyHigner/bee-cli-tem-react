
import Reg from '@/utils/reg'
import { DatePicker } from 'antd'
import moment from 'moment'

const { RangePicker } = DatePicker

const disabledDate = (current) => {
  return current && current < moment().endOf('day')
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
        name: 'text',
        render: (values, core) => {
          return (
            <RangePicker
              disabledDate={disabledDate}
              placeholder={['开始时间','结束时间']}
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
            <div>已批量选中{number}个商品，确定批量{text}？</div>                                
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
            <div>您确定{text}吗？</div>
          )
        },
      },
    ],
  }
}
