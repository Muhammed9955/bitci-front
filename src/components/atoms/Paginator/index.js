import React from 'react'
import ReactPaginate from 'react-paginate'
import cs from 'classnames'

import * as $ from './index.style'


class Paginator extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 0
    }
  }

  render() {
    const {page} = this.state
    const {render, data, className = '', perPage = 14} = this.props

    const pageCount = Math.ceil(data.length / perPage)
    const cutData = data.slice(page * perPage, (page + 1) * perPage)

    return (
      <div className={className}>

        {render(cutData)}

        <ReactPaginate previousLabel={"PREV"}
                       nextLabel={"NEXT"}
                       pageCount={pageCount}
                       marginPagesDisplayed={1}
                       pageRangeDisplayed={5}
                       onPageChange={this._onPageChange}
                       containerClassName={$.paginator}
                       breakClassName={$.page}
                       pageClassName={$.page}
                       pageLinkClassName={$.btn}
                       nextLinkClassName={cs($.btn, $.nextBtn)}
                       previousLinkClassName={cs($.btn, $.prevBtn)}
                       disabledClassName={$.disabled}
                       activeClassName={$.active}/>
      </div>
    )
  }

  _onPageChange = ({selected}) => {
    this.setState({
      page: selected,
    })

    const {onPageChange} = this.props

    onPageChange && onPageChange(selected)
  }
}

export default Paginator