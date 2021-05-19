import React from 'react'

import Page from 'components/pages/Page'
import Container from 'components/atoms/Container'
import UsersList from 'components/admin/UsersList'
import Input from 'components/atoms/Input'
import * as api from 'api'

import * as $ from './index.style'


const isEmail = (val) => val.includes('@') && val.includes('.')

const createDebounce = (delay) => {
  let timer = null

  return function (fn) {
    const args = arguments

    clearTimeout(timer);

    if(fn) {
      timer = setTimeout(() => fn(args), delay);
    }
  };
}


const Header = ({filterValue, onFilterChange}) => (
  <div className={$.header}>
    <div>UsersList</div>
    <div>
      <Input sm value={filterValue} onChange={({target}) => onFilterChange(target.value)} dark/>
    </div>
  </div>
)

class UsersPage extends React.Component{

  constructor(props) {
    super(props)

    this.state = {filterValue: '', filterUserId: null}

    this._debounce = createDebounce(300)
  }

  render () {
    const {filterValue, filterUserId} = this.state

    return (
      <Page>
        <Container headerRender={() => <Header filterValue={filterValue} onFilterChange={this._onFilterValueChange}/>}>
          <UsersList filterUserId={filterUserId} filter={filterUserId ? '' : filterValue}/>
        </Container>
      </Page>
    )
  }

  _onFilterValueChange = (filterValue) => {
    this.setState({filterValue})

    this._debounce(() => {
      if(isEmail(filterValue)) {
        api.getUserIdByEmail(filterValue).then((userId) => this.setState({filterUserId: userId || 'unknown'}))
      } else {
        this.setState({filterUserId: null})
      }
    })
  }
}
export default UsersPage
