import React from 'react'
import {Route, Switch} from 'react-router-dom'

import UsersPage from 'components/admin/UsersPage'
import UserDetailsPage from 'components/admin/UserDetailsPage'
import AdminMainPage from 'components/admin/AdminMainPage'
import DepositsPage from 'components/admin/DepositsPage'
import paths from 'utils/paths'


const Admin = () => (
  <Switch>
    <Route path={paths.ADMIN_USERS_DETAILS} component={UserDetailsPage}/>
    <Route path={paths.ADMIN_USERS} component={UsersPage}/>
    <Route path={paths.ADMIN_DEPOSITS} component={DepositsPage}/>

    <AdminMainPage/>
  </Switch>
)

export default Admin
