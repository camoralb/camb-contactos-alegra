Ext.define('App.store.Contacts', {
  extend: 'Ext.data.Store',
  storeId: 'contactStore',
  model: 'App.model.Contact',
  fields: [
        'id',
        'name',
        'identification',
        'address',
        'city',
        'email',
        'phonePrimary',
        'phoneSecondary',
        'fax',
        'mobile',
        'priceList',
        'seller',
        'isClient',
        'isProvider',
        'type',
        'observations',
  ],
  proxy: {
    type: 'rest',
    url: 'contact',
    reader: {
      type: 'json',
      root: 'data'
    },
    writer: {
      type: 'json',
      root: 'data'
    },
  },
  autoLoad: true
});
