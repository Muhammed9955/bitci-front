import React from 'react'
import ReactPaginate from 'react-paginate'
import cs from 'classnames'

import * as $ from './paginator.style'


const Paginator = ({page, onPageChange, pages}) => (
  <ReactPaginate forcePage={page}
                 previousLabel={"PREV"}
                 nextLabel={"NEXT"}
                 pageCount={pages}
                 marginPagesDisplayed={1}
                 pageRangeDisplayed={5}
                 onPageChange={({selected}) => onPageChange(selected)}
                 containerClassName={$.paginator}
                 breakClassName={$.page}
                 pageClassName={$.page}
                 pageLinkClassName={$.btn}
                 nextLinkClassName={cs($.btn, $.nextBtn)}
                 previousLinkClassName={cs($.btn, $.prevBtn)}
                 disabledClassName={$.disabled}
                 activeClassName={$.active}/>
)

export default Paginator