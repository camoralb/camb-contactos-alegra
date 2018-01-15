Ext.define('App.model.Contact', {
  extend: 'Ext.data.Model',
  fields: [{
    name: 'id',
    type: 'int'
  }, {
    name: 'name',
    type: 'string'
  }, {
    name: 'identification',
    type: 'string'
  }, {
    name: 'email',
    type: 'string'
  }, {
    name: 'phonePrimary',
    type: 'string'
  }, {
    name: 'observations',
    type: 'string'
  },{ 
    name: 'address', 
    mapping: 'address.address',
  },{ 
    name: 'city', 
    mapping: 'address.city',
  },{ 
    name: 'phoneSecondary', 
    type: 'string'
  },{ 
    name: 'fax', 
    type: 'string'
  },{ 
    name: 'mobile', 
    type: 'string'
  },{ 
    name: 'pricelist', 
    type: 'string'
  },{ 
    name: 'seller', 
    type: 'string'
  },{ 
    name: 'isClient', 
  },{ 
    name: 'isProvider', 
  },{ 
    name: 'type', 
  }
  ]
});