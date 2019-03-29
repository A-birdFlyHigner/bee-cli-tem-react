import React, { Suspense } from 'react';
import router from 'umi/router';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import Media from 'react-media';
import logo from '../assets/logo.svg';
import Footer from './Footer';
import Header from './Header';
import Context from './MenuContext';
import PageLoading from '@/components/PageLoading';
import SiderMenu from '@/components/SiderMenu';
import getPageTitle from '@/utils/getPageTitle';
import styles from './BasicLayout.less';
import {getUserInfoNew} from '@/services/user';
import { iconOption } from '@/defaultSettings'

// lazy load SettingDrawer
const SettingDrawer = React.lazy(() => import('@/components/SettingDrawer'));

const { Content } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

class BasicLayout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      menuList: []
    }
  }

  componentDidMount = async () => {
    const {
      dispatch,
      route: { routes, authority },
    } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type: 'setting/getSetting',
    });
    dispatch({
      type: 'menu/getMenuData',
      payload: { routes, authority },
    });
    if (ADMIN_TYPE === 'ADMIN') {
      const res = await getUserInfoNew() || {}
      const { menuList = [] } = res
      const newMenu = menuList.find(item => {
        return item.url === '/leadmin' && item.pid === 0
      })
      this.setState({
        menuList,
        newPid: newMenu ? newMenu.id : ''
      })
    }
  }

  componentWillUnmount () {
    this.setState = () => {
      return null
    }
  }

  getContext() {
    const { location, breadcrumbNameMap } = this.props;
    return {
      location,
      breadcrumbNameMap,
    };
  }

  getLayoutStyle = () => {
    const { fixSiderbar, isMobile, collapsed, layout } = this.props;
    if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '224px',
      };
    }
    return null;
  };

  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };

  renderSettingDrawer = () => {
    // Do not render SettingDrawer in production
    // unless it is deployed in preview.pro.ant.design as demo
    if (process.env.NODE_ENV === 'production' && APP_TYPE !== 'site') {
      return null;
    }
    return <SettingDrawer />;
  };

  makeMenuList = (list, pid) => {
    const { newPid } = this.state
    const result = list.filter(item => {
      return item.pid === pid
    }).map(item => {
      const opt = {
        id: item.id,
        name: item.name,
        path: item.url === '/' ? String(item.id) : item.url,
        children: this.makeMenuList(list, item.id)
      }
      if (pid === newPid) {
        opt.icon = iconOption[opt.name] || 'icon-yujiazai'
      }
      return opt
    })
    return result
  }

  getMenuItem = (menuData) => {
    let route = ''
    if (menuData.length) {
      if (menuData[0].children && menuData[0].children.length) {
        route = this.getMenuItem(menuData[0].children)
      } else {
        route = menuData[0].path
      }
    }
    return route
  }
  
  render() {
    const {
      navTheme,
      layout: PropsLayout,
      children,
      location: { pathname },
      isMobile,
      menuData: defaultMenuData,
      breadcrumbNameMap,
      fixedHeader,
    } = this.props;
    let menuData = defaultMenuData
    if (ADMIN_TYPE === 'ADMIN') {
      const { menuList = [], newPid } = this.state
      if (newPid) {
        menuData = this.makeMenuList(menuList, newPid)
        const {location} = window
        if (location.hash === '#/') {
          const path = this.getMenuItem(menuData)
          router.push(path)
        }
      } else {
        menuData = []
      }
    } else {
      menuData = menuData.map(item => {
        return {
          ...item,
          icon: iconOption[item.name] || 'icon-yujiazai'
        }
      })
    }
    const isTop = PropsLayout === 'topmenu';
    const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};
    const layout = (
      <Layout>
        {isTop && !isMobile ? null : (
          <SiderMenu
            logo={logo}
            theme={navTheme}
            onCollapse={this.handleMenuCollapse}
            isMobile={isMobile}
            {...this.props}
            menuData={menuData}
          />
        )}
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: '100vh',
          }}
        >
          <Header
            menuData={menuData}
            handleMenuCollapse={this.handleMenuCollapse}
            logo={logo}
            isMobile={isMobile}
            {...this.props}
          />
          <div className={styles.pageTitle}>
            <span>{ getPageTitle(pathname, breadcrumbNameMap).split(' - ')[0] }</span>
          </div>
          <Content className={styles.content} style={contentStyle}>
            {children}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
    return (
      <React.Fragment>
        <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider value={this.getContext()}>
                <div className={classNames(params)}>{layout}</div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
        <Suspense fallback={<PageLoading />}>{this.renderSettingDrawer()}</Suspense>
      </React.Fragment>
    );
  }
}

export default connect(({ global, setting, menu: menuModel }) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
  ...setting,
}))(props => (
  <Media query="(max-width: 599px)">
    {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
  </Media>
));
