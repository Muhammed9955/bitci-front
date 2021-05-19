import React from 'react'
import {cx} from 'react-emotion'

import Button from 'components/atoms/Button'
import deleteIco from 'img/dashboard-icons/times@2x.png'

import * as $ from './index.style'


class FileSelect extends React.Component {
  constructor(props) {
    super(props)

    this._inputFile = null

    this.state = {
      files: [],
    }
  }

  render() {
    const {children, multiple, title} = this.props
    const {files} = this.state

    return (
      <div className={cx($.fileSelect, multiple && $.multiple)}>
        {files.length ? (
          <div className={$.list}>
            {files.map(this._renderFile)}
          </div>
        ) : (
          <span className={$.tip}>{title || `Select file${multiple ? 's' : ''}`}</span>
        )}

        <div className={$.actions}>
          <Button onClick={this._onBrowseClick} sm lightCyan>Browse</Button>
          {children}
        </div>

        <input ref={(el) => (this._inputFile = el)} className={$.inputFile} onChange={this._onFilesSelect}
               type="file" multiple={multiple} accept={this._getAcceptProp()}/>
      </div>
    )
  }

  _getAcceptProp = () => {
    const {images} = this.props
    let accepts = []

    if(images) accepts = accepts.concat('image/*')

    return accepts.join(',')
  }

  _renderFile = ({name}, index) => (
    <div className={$.file} key={index}>
      <span>{name}</span>
      <img src={deleteIco} onClick={() => this._deleteFile(index)}/>
    </div>
  )

  _onBrowseClick = () => (
    this._inputFile.click()
  )

  _onFilesSelect = (event) => {
    event.persist()

    const {onChange, multiple} = this.props

    const {files} = this.state
    const selectedFiles = Array.from(event.target.files)

    if(multiple) {
      // only unique names
      const toMapByName = (res, file) => {
        res[file.name] = file
        return res
      }
      const filesMap = files.reduce(toMapByName, {})
      const selectedFilesMap = selectedFiles.reduce(toMapByName, {})
      const newFiles = Object.values({...filesMap, ...selectedFilesMap})

      this.setState({files: newFiles}, () => onChange && onChange(this.state.files))
    } else {
      this.setState({files: selectedFiles}, () => onChange && onChange(this.state.files[0]))
    }
  }

  _deleteFile = (index) => {
    this.setState(({files}) => ({
      files: files.slice(0, index).concat(files.slice(index + 1))
    }), () => {
      const {onChange, multiple} = this.props
      const {files} = this.state

      onChange && (multiple ? onChange(files) : onChange(files[0]))
    })
  }
}

export default FileSelect