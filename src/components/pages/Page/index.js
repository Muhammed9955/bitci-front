import React from 'react'
import {connect} from 'react-redux'

import * as $ from './index.style'


const Page = ({children, loading}) => (
  !loading && (
    <div className={$.page}>
      {children}
    </div>
  )
)

const mapStateToProps = ({app}) => ({
  loading: app.loading,
})

export default connect(mapStateToProps)(Page)
