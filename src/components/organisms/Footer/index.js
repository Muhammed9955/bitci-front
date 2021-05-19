import React from 'react'
import {connect} from 'react-redux'
import {getTranslate} from 'react-localize-redux'


const Footer = ({l}) => (
  <footer className="dashboard-footer">
    <div className="container-fluid">
      <p>© {l('copyright', {year: 2018})}</p>
      <ul>
        <li><a href="/home.html">{l('home')}</a></li>
        <li><a href="https://support.com" target="_blank">{l('support')}</a></li>
      </ul>
    </div>
  </footer>
)

const mapStateToProps = ({locale}) => ({
  l: (key, params) => getTranslate(locale)('footer.' + key, params),
})

export default connect(mapStateToProps)(Footer)