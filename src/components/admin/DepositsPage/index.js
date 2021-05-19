import React from 'react'

import Page from 'components/pages/Page'
import Container from 'components/atoms/Container'
import AllDepositsList from 'components/admin/AllDepositsList'

const DepositsPage = () => (
  <Page>
    <Container >
      <AllDepositsList/>
    </Container>
  </Page>
)

export default DepositsPage