const message = {
  title: 'Contact Messages',
  name: 'message',
  type: 'document',
  readOnly: true,
  fields: [
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
    {
      title: 'Type',
      name: 'type',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'From',
      name: 'from',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Email',
      name: 'email',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Phone',
      name: 'phone',
      type: 'string'
    },
    {
      title: 'Subject',
      name: 'subject',
      type: 'string'
    },
    {
      title: 'Message',
      name: 'message',
      type: 'text'
    }
  ]
}

export default message
