import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import {
  home,
  contribution,
  publication,
  gallery,
  galleryTag,
  event,
  obituary,
  info,
  message
} from './'

export default createSchema({
  name: 'default',
  types: [
    ...schemaTypes,
    home,
    contribution,
    publication,
    gallery,
    galleryTag,
    event,
    obituary,
    info,
    message
  ]
})
