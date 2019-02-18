const GalleryTag = {
  title: 'Gallery Tags',
  name: 'galleryTag',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required()
    }
  ]
}

export default GalleryTag
