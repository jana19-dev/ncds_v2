import React from 'react'
import PropTypes from 'prop-types'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css?raw'

import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event'

const textEditorModules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    [{
      'color': [
        'rgb(0, 0, 0)', 'rgb(230, 0, 0)', 'rgb(255, 153, 0)', 'rgb(255, 255,   0)',
        'rgb(0, 138, 0)', 'rgb(0, 102, 204)', 'rgb(153,  51, 255)', 'rgb(255, 255, 255)',
        'rgb(250, 204, 204)', 'rgb(255, 235, 204)', 'rgb(255, 255, 204)', 'rgb(204, 232, 204)',
        'rgb(204, 224, 245)', 'rgb(235, 214, 255)', 'rgb(187, 187, 187)', 'rgb(240, 102, 102)',
        'rgb(255, 194, 102)', 'rgb(255, 255, 102)', 'rgb(102, 185, 102)', 'rgb(102, 163, 224)',
        'rgb(194, 133, 255)', 'rgb(136, 136, 136)', 'rgb(161, 0, 0)', 'rgb(178, 107, 0)',
        'rgb(178, 178, 0)', 'rgb(0, 97, 0)', 'rgb(0, 71, 178)', 'rgb(107, 36, 178)',
        'rgb( 68, 68, 68)', 'rgb(92, 0, 0)', 'rgb(102, 61, 0)', 'rgb(102, 102, 0)',
        'rgb(0, 55, 0)', 'rgb(0, 41, 102)', 'rgb( 61, 20, 10)'
      ]
    }],
    ['clean']
  ],
  clipboard: {
    matchVisual: false
  }
}

const textEditorFormats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color'
]

const createPatchFrom = value => PatchEvent.from(set(value))

export default class RichTextEditor extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
  };

  // this is called by the form builder whenever this input should receive focus
  focus () {
    this._inputElement.focus()
  }

  handleChange = (value) => {
    if (value === '<p><br></p>' || value === '<p></p>') value = ''
    this.props.onChange(createPatchFrom(value))
  }

  render () {
    const { type, value = '' } = this.props
    const { title } = type

    return (
      <div>
        <div style={{
          fontSize: '1.25rem',
          marginBottom: '0.5rem',
          fontWeight: 400
        }}>
          {title}
        </div>
        <ReactQuill
          defaultValue={value}
          onChange={this.handleChange}
          modules={textEditorModules}
          formats={textEditorFormats}
          ref={element => this._inputElement = element}
        />
      </div>
    )
  }
}
