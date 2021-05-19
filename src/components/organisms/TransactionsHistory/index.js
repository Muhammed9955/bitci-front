import React from 'react'
import {connect} from 'react-redux'
import {getTranslate} from 'react-localize-redux'

import Container from 'components/atoms/Container'
import Link from 'components/atoms/Link'
import Button from 'components/atoms/Button'
import doneIco from 'img/dashboard-icons/done.svg'
import docIco from 'img/dashboard-icons/xls.svg'
import {exportArrayAsCSV} from 'store/state/app/actions'
import {formatDate} from 'utils/date'

import * as $ from './index.style'



class TransactionsHistory extends React.Component {
  render () {
    const {history, l} = this.props

    return (
      <Container className={$.transactionsHistory} headerRender={this._headerRender}>
        <div className={$.lines}>
          {history.map(this._lineRender)}
        </div>
        <div className={$.noMore}>
          <span className={$.stripe}/>
          <span>{l('noMore')}</span>
          <span className={$.stripe}/>
        </div>
      </Container>
    )
  }

  _headerRender = () => {
    const {title, exportTitle, onExportClick} = this.props

    return (
      <div className={$.header}>
        <span className={$.title}>{title}</span>
        <Link sm color='gray' underline className={$.exportHistory} onClick={onExportClick}>
          {exportTitle}
          <img src={docIco}/>
        </Link>
      </div>
    )
  }

  _lineRender = ({amount, block, currency, date, hash}) => {
    const {l} = this.props

    return (
      <div className={$.line} key={block}>
        <div className={$.icoContainer}>
          <img src={doneIco}/>
        </div>

        <div className={$.statusDate}>
          <span>{l('statuses.completed')}</span>
          <span>{formatDate(new Date(date))}</span>
        </div>

        <div className={$.currency}>{currency}</div>

        <div className={$.amount}>{amount}</div>

        <div className={$.addressTxid}>
          <span>{l('address')}: {hash}</span>
          <span>{l('txid')}: {block}</span>
        </div>

        <div className={$.actions}>
          <Button sm gray>{l('check')}</Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({locale}) => ({
  l: (key) => getTranslate(locale)('transactionsHistory.' + key),
})

const mapDispatchToProps = (dispatch, {title, history}) => ({
  onExportClick: () => dispatch(exportArrayAsCSV(`${title}.csv`, history)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsHistory)