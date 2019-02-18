const gallery = {
  title: 'Galleries',
  name: 'gallery',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Date',
      name: 'date',
      type: 'date',
      default: Date.now(),
      options: {
        dateFormat: 'YYYY-MM-DD'
      },
      validation: Rule => Rule.required()
    },
    // {
    //   title: 'Type',
    //   name: 'type',
    //   type: 'string',
    //   options: {
    //     list: [
    //       { title: 'Nainativu', value: 'Nainativu' },
    //       { title: 'Events', value: 'Events' },
    //       { title: 'Theepam', value: 'Theepam' },
    //       { title: 'Muthiyor', value: 'Muthiyor' },
    //       { title: 'Ondrukoodal', value: 'Ondrukoodal' }
    //     ],
    //     layout: 'radio'
    //   }
    // },
    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [{
        type: 'reference',
        to: {
          type: 'galleryTag'
        }
      }],
      validation: Rule => Rule.unique().error('Cannot have duplicate tags')
    },
    {
      title: 'Description',
      name: 'description',
      type: 'array',
      of: [{
        type: 'block'
      }]
    },
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      options: {
        layout: 'grid'
      },
      of: [{
        type: 'image',
        fields: [
          {
            title: 'Caption',
            name: 'caption',
            type: 'string',
            options: {
              isHighlighted: true
            }
          }
        ],
        options: {
          hotspot: true
        }
      }],
      validation: Rule => Rule.unique().error('Cannot have duplicate images')
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date'
    }
  },
  orderings: [
    {
      title: 'Date',
      name: 'date',
      by: [
        { field: 'date', direction: 'desc' }
      ]
    }
  ]
}

export default gallery
