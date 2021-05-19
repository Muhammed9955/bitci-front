import React from 'react'
import {connect} from 'react-redux'

import Dropdown from 'components/atoms/Dropdown'
import * as api from 'api'
import {getUser} from 'store/state/admin/selectors'
import {ID_VERIF_STATUSES} from 'utils/constants'
import {changeUserIdVerif} from 'store/state/admin/actions'

import * as $ from './index.style'


const STATUSES = [
  'Pending',
  'Unverified',
  'Verified',
]

class UserUploadedDocs extends React.Component {
  state = {docs: []}

  componentDidMount() {
    const {userId} = this.props

    api.getUploadedDocsByUser(userId).then((docs) => this.setState({docs}))
  }

  render() {
    const {docs} = this.state
    const {status} = this.props

    const documents = docs.length === 0
      ? <div className={$.noDocs}>No Uploaded Docs...</div>
      : (
        <div className={$.docs}>
          {docs.map(({name, downloadUrl}) => (
            <a key={name} href={downloadUrl} className={$.doc} download>
              <span className={$.name}>{name}</span>
              <img className={$.img} src={downloadUrl}/>
            </a>
          ))}
        </div>
      )

    return (
      <div className={$.userUploadedDocs}>
        {documents}
        <div className={$.actions}>
          <Dropdown values={STATUSES} value={status} onChange={this._onStatusChange} label={'ID Verified status'}/>
        </div>
      </div>
    )
  }

  _onStatusChange = (status) => {
    const {changeStatus} = this.props

    changeStatus(status)
  }
}

const mapStateToProps = ({admin}, {userId}) => {
  const user = getUser(admin, userId)

  return {
    status: user ? user.idVerified : ID_VERIF_STATUSES.UNVERIFIED,
  }
}

const mapDispatchToProps = (dispatch, {userId}) => ({
  changeStatus: (status) => dispatch(changeUserIdVerif(userId, status)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserUploadedDocs)