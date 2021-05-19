import React from 'react'

import Page from 'components/pages/Page'
import Container from 'components/atoms/Container'
import Link from 'components/atoms/Link'
import paths from 'utils/paths'

import * as $ from './index.style'


const AdminMainPage = () => (
  <Page>
    <Container>
      <div className={$.links}>
        <Link to={paths.ADMIN_USERS}>Users</Link>
        <Link to={paths.ADMIN_DEPOSITS}>Deposits</Link>
      </div>
    </Container>
  </Page>
)

export default AdminMainPage