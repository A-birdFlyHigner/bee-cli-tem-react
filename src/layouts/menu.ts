/*
 * @Title: 标题
 * @Descripttion: 文件头部描述
 * @Author: 太一
 * @Date: 2019-08-15 20:40:41
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-16 18:28:54
 */
const menuData = [
  {
    name: '投放中心',
    icon: 'pay-circle',
    path: 'delivery',
    children: [
      {
        name: '页面列表',
        path: 'pageList'
      },
      {
        name: '资源位列表',
        path: 'resourcesList'
      },
      {
        name: '投放列表',
        path: 'throwList'
      },
      {
        name: '运营位列表',
        path: 'operatingList'
      },
      {
        name: '选品列表',
        path: 'selectionList'
      }
    ]
  }
]
export default menuData
