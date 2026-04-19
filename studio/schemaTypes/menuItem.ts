export default {
    name: 'menuItem',
    title: 'Menu Item',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'object',
        fields: [
          { name: 'en', title: 'English Name', type: 'string' },
          { name: 'am', title: 'Amharic Name', type: 'string' }
        ]
      },
      {
        name: 'description',
        title: 'Description',
        type: 'object',
        fields: [
          { name: 'en', title: 'English Description', type: 'text' },
          { name: 'am', title: 'Amharic Description', type: 'text' }
        ]
      },
      { name: 'price', title: 'Price (ETB)', type: 'number' },
      {
        name: 'category',
        title: 'Category',
        type: 'object',
        fields: [
          { name: 'en', title: 'English Category', type: 'string' },
          { name: 'am', title: 'Amharic Category', type: 'string' }
        ]
      },
      { name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } },
      { name: 'isSpecial', title: 'Is Special/Featured?', type: 'boolean', initialValue: false },
      { name: 'rating', title: 'Rating', type: 'number', initialValue: 5.0 },
      {
        name: 'tags',
        title: 'Tags',
        type: 'object',
        fields: [
          { name: 'en', title: 'English Tags', type: 'array', of: [{ type: 'string' }] },
          { name: 'am', title: 'Amharic Tags', type: 'array', of: [{ type: 'string' }] }
        ]
      }
    ]
  }