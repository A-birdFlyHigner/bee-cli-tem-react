import React from 'react'
import { LeDialog, LeForm } from '@lib/lepage'
import { Select } from 'antd'
const Option = Select.Option
import { dialogFormJoinGroupConfig } from '../../common/commonConfig.js'

import * as Sty from '../index.less'

const batchBackList = (err, values, formCore, listCore) => {
  LeDialog.show(
    {
      title: '批量回退',
      width: '500px',
      content () {
        return <LeForm {...dialogFormConfig(88,'批量回退')} />
      },
      onOk: (values, suc, core) => {
        suc()
      }
    }
  )
}

const batchScheduleList = (err, values, formCore, listCore) => {
  LeDialog.show(
    {
      title: '批量排期',
      width: '500px',
      content () {
        return <LeForm {...dialogFormConfig(80,'批量排期')} />
      },
      onOk: (values, suc, core) => {
        suc()
      }
    }
  )
}

const joinGroup = (err, values, formCore, listCore) => {
  LeDialog.show(
    {
      title: '加入分组',
      width: '500px',
      content () {
        return <LeForm {...dialogFormJoinGroupConfig(8,'加入分组')} />
      },
      onOk: (values, suc, core) => {
        suc()
      }
    }
  )
}

const dialogFormConfig =  (number, text) => {
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

export default {
  form: {
    inline: true,
  },
  buttons: [
    {
      inline: true,
      props: {
        type: 'primary',
        children: '批量回退',
        onClick: batchBackList
      }
    },
    {
      inline: true,
      props: {
        type: 'primary',
        children: '批量排期',
        onClick: batchScheduleList
      }
    },
    {
      inline: true,
      props: {
        type: 'primary',
        children: '加入分组',
        onClick: joinGroup
      }
    }

  ],
}
