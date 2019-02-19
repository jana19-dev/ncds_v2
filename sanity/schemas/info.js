import RichTextEditor from '../components/RichTextEditor'

const info = {
  title: 'Information',
  name: 'info',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      hidden: true,
      validation: Rule => Rule.required()
    },
    {
      type: 'string',
      name: 'description',
      inputComponent: RichTextEditor
    }
  ]
}

export default info
