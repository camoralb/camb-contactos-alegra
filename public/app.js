Ext.application({
  name: 'App',
  controllers: ['ContactsController'],
  launch: function() {
    Ext.widget('contactslist', {
      width: '100%',
      height: 600,
      renderTo: document.body
    });
  }
});
