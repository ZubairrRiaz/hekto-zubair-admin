export const customerDetails = {
  name: 'customer',
  type: 'document',
  title: 'Customer',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email'
    },
    {
      name: 'phone',
      type: 'string',
      title: 'Phone'
    },
    {
      name: 'city',
      type: 'string',
      title: 'City'
    },
    {
      name: 'address1',
      type: 'string',
      title: 'Address 1'
    },
    {
      name: 'address2',
      type: 'string',
      title: 'Address 2'
    },
    {
      name: 'items',
      type: 'array',
      title: 'Items',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Item Name'
            },
            {
              name: 'id',
              type: 'string',
              title: 'Item ID'
            },
            {
              name: 'description',
              type: 'text',
              title: 'Item Description'
            },
            {
              name: 'price',
              type: 'number',
              title: 'Item Price'
            },
          ]
        }

      ]
    }
  ]
  };

  