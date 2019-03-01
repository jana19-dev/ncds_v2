import RichTextEditor from '../components/RichTextEditor'

const event = {
  title: 'Events',
  name: 'event',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'URL Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title'
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'Start Time',
      name: 'startTime',
      type: 'datetime',
      default: Date.now(),
      options: {
        timeStep: 30,
        timeFormat: 'LT'
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'End Time',
      name: 'endTime',
      type: 'datetime',
      default: Date.now(),
      options: {
        timeStep: 30,
        timeFormat: 'LT'
      },
      validation: Rule => Rule.required()
    },
    {
      type: 'string',
      name: 'description',
      inputComponent: RichTextEditor
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'startTime',
      media: 'image'
    }
  },
  orderings: [
    {
      title: 'Start Time',
      name: 'startTime',
      by: [
        { field: 'startTime', direction: 'asc' }
      ]
    }
  ]
}

export default event
