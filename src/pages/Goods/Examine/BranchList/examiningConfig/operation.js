import React from 'react'
import { message } from 'antd'
import { LeDialog, LeForm } from '@lib/lepage'
import * as Sty from '../index.less'

const dialogFormConfig = (count) => {
  return {
    settings: {
      
    },
    form: {
      layout: { // 表单布局 左侧和右侧比例
        label: 0,
        control: 24
      }
    },
    items: [
      {
        label: `已选中${count}个商品,请输入拒绝原因`,
        name: 'rejectReason',
        component: 'Input',
        follow: false,
        className: Sty.rejectReason,
        props:{
          placeholder: '请输入拒绝原因，不超过20字',
          maxLength: 20,
        }
      },
    ],
  }
}

const setBranchList = (err, values, formCore, listCore) => {
  const productIds = listCore.getSelectedRowKeys()
  const count = productIds.length

  if (!count) {
    message.warning('请至少勾选一项！')
    return
  }

  LeDialog.show(
    {
      title: '批量拒绝',
      width: '600px',
      content () {
        return <LeForm {...dialogFormConfig(count)} />
      },
      onOk: () => {
        // return new Promise(async (resolve, reject) => {
        //   await sleep(1500);
        //   resolve();
        //   hide();
        //   leList.refresh();
        // });
      },
    }
  )
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
        children: '批量拒绝',
        onClick: setBranchList
      }
    }
  ]
}
