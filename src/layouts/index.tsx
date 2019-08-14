import React, { Suspense, Component, Fragment } from 'react'
import { Layout } from 'antd'
import DocumentTitle from 'react-document-title'
// import Footer from './Footer';
import Header from './components/Header'
import PageLoading from '@components/PageLoading'
import { hot } from 'react-hot-loader'
// import SiderMenu from '@components/SiderMenu';
// import getPageTitle from '@/utils/getPageTitle';

class LayoutView extends Component {
  render() {
    return (
      <Fragment>
        <DocumentTitle title="89898">
          <Layout>
            <Header />
          </Layout>
        </DocumentTitle>
        <Suspense fallback={<PageLoading />} />
      </Fragment>
    )
  }
}
export default hot(module)(LayoutView)
