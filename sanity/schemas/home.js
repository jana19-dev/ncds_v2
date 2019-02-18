const home = {
  title: 'Home Images',
  name: 'home',
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
      validation: Rule => Rule.required().unique().custom((images, { document }) => {
        if (document.name === 'nainativu') {
          return images && images.length === 8 ? true : 'Must upload exactly 8 images'
        } else {
          return images && images.length === 4 ? true : 'Must upload exactly 4 images'
        }
      })
    }
  ]
}

export default home
