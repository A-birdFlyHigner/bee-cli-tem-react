/*
 * @Title: 标题
 * @Descripttion: 文件头部描述
 * @Author: 太一
 * @Date: 2019-08-17 10:35:24
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-17 10:40:45
 */

export default {
  form: {
    inline: true
  },
  items: [
    {
      component: 'Button',
      props: {
        type: 'primary',
        children: '新增采购单'
      }
    }
  ],
  buttons: [
    {
      inline: true,
      props: {
        type: 'danger',
        children: '新增出库单',
        onClick(err, values, leForm, leList) {}
      }
    }
  ]
}
