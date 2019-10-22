import React, { ReactNode } from 'react'
import './style.less'

const PageTitle = (props: { children: ReactNode }) => {
  return <div className="pageTitle">{props.children}</div>
}

export default PageTitle
