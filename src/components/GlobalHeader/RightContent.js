import React, { PureComponent } from 'react';
import { FormattedMessage } from 'umi/locale';
import { LeDialog, LeForm } from '@lib/lepage'
import { Spin, Menu, Icon, Tooltip, message } from 'antd';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import changePwdConf from './config/changePwd'
import Reg from '@/utils/reg'
import Md5 from 'js-md5'
import {branchComUpdatePassword, shopUpdateAccountPassword } from '@/services/common'
// import router from 'umi/router';

export default class GlobalHeaderRight extends PureComponent {

  componentWillMount () {
    let isAdmin
    let oldProduct = '/#/'
    const userInfo = JSON.parse(sessionStorage.getItem('HQBSFORSHOP') || '{}')
    switch (ADMIN_TYPE) {
      case 'ADMIN':
      oldProduct = `${oldProduct}`
      isAdmin = false
      break;
    
      case 'BRANCH':
      oldProduct = `${oldProduct}branchCom`
      isAdmin = false
      break;
    
      case 'SUPPLIER':
      oldProduct = `${oldProduct}shop`
      isAdmin = false
      break;
      default: 
    }
    this.setState({
      userInfo,
      oldProduct,
      isAdmin
    })
  }

  onMenuClick = (info) => {
    const {key} = info
    const {location} = window
    if (key === 'logout') {
      if (ADMIN_TYPE !== 'ADMIN'){
        sessionStorage.removeItem('HQBSFORSHOP')
        location.href = '/#/login'
      } else {
        sessionStorage.clear()
        location.href = '/api/login/logout'
      }
    } 
    else if (key === 'editPwd') {
      const onOk = async (values, ok) => {
        const {password, confirmPassword} = values
        if (!password) return message.warning('请输入新密码,6-12位字母或数字且区分大小写')
        if (!Reg.passowdExp.test(password)) return message.warning('新密码格式错误,6-12位字母或数字且区分大小写')
        if (!confirmPassword) return message.warning('请输入确认密码，与新密码一致')
        if (password !== confirmPassword) return message.warning('新密码和确认密码不一致')
        const params = {
          password: Md5(password),
          confirmPassword: Md5(confirmPassword),
        }
        let res
        if (ADMIN_TYPE === 'BRANCH') {
          res = await branchComUpdatePassword(params)
        } 
        else if (ADMIN_TYPE === 'SUPPLIER') {
          res = await shopUpdateAccountPassword(params)
        } else {
          return message.warning('请求有误，请联系平台客服')
        }
        if (!res) return false
        message.success('修改成功，请用新密码登录')
        sessionStorage.removeItem('HQBSFORSHOP')
        location.href = '/#/login'
        ok()
        return true
      }
      LeDialog.show({
        title: '修改密码',
        content: <LeForm {...changePwdConf} />,
        onOk
      })
    }
  };

  render() {
    const {userInfo = {}, oldProduct = '', isAdmin = true} = this.state
    const {userName = ''} = userInfo
    const {
      theme,
    } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {isAdmin ? null : 
        <Menu.Item key="editPwd">
          <Icon type="setting" />
          <FormattedMessage id="menu.account.settings" defaultMessage="修改密码" />
        </Menu.Item>}
        {isAdmin ? null : <Menu.Divider />}
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="退出" />
        </Menu.Item>
      </Menu>
    );
    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>
        <Tooltip title='老后台链接'>
          <a
            target="_blank"
            href={oldProduct}
            className={styles.action}
          >
            老后台链接
          </a>
        </Tooltip>
        {userName ? (
          <HeaderDropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <span className={styles.name}>{userName}</span>
            </span>
          </HeaderDropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
      </div>
    );
  }
}
