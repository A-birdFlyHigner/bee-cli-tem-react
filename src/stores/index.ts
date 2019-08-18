/*
 * @Title: 标题
 * @Descripttion: 文件头部描述
 * @Author: 太一
 * @Date: 2019-08-13 16:06:16
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-18 19:00:29
 */

import { observable, action } from 'mobx'

class globalStore {
  @observable userName = '鲁班'
  @observable menu = []

  @action
  setUserName = (userName: string) => {
    this.userName = userName
  }
  @action
  setMenu = (menu: any[]) => {
    this.menu = menu
  }
}
export default { globalStore: new globalStore() }
