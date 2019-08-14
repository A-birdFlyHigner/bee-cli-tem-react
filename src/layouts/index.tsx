import React, { Suspense, Component, Fragment } from 'react'
import { Layout } from 'antd'
import DocumentTitle from 'react-document-title'
// import Footer from './Footer';
import Header from './components/Header'
import PageLoading from '@components/PageLoading'
// import SiderMenu from '@components/SiderMenu';
// import getPageTitle from '@/utils/getPageTitle';

export default class LayoutView extends Component {
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
