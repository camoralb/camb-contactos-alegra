Ext.define('App.view.ContactForm', {
  extend: 'Ext.window.Window',
  alias: 'widget.contactform',
  title: 'Nuevo Contacto',
  icon: 'resources/images/user_add.png',
  width: 650,
  layout: 'fit',
  resizable: false,
  closeAction: 'hide',
  modal: true,
  config: {
    recordIndex: 0,
    action: ''
  },
  items: [{
    layout: 'column',
    xtype: 'form',
    padding: '5 5 0 5',
    border: false,
    style: 'background-color: #fff;',
    fieldDefaults: {
      anchor: '100%',
      labelAlign: 'right',
      allowBlank: false,
      combineErrors: true,
      msgTarget: 'side',
    },
    items: [{
      columnWidth: 0.5,
      border: false,
      items: [{
        xtype: 'textfield',
        name: 'id',
        fieldLabel: 'id',
        hidden: true,
      }, {
        xtype: 'textfield',
        name: 'name',
        fieldLabel: 'Nombre*',
      }, {
        xtype: 'textfield',
        name: 'identification',
        fieldLabel: 'Identificación',
        allowBlank: true,
      }, {
        xtype: 'textfield',
        name: 'address',
        fieldLabel: 'Dirección',
        allowBlank: true,
      }, {
        xtype: 'textfield',
        name: 'city',
        fieldLabel: 'Ciudad',
        allowBlank: true,
      }, {
        xtype: 'textfield',
        vtype: 'email',
        name: 'email',
        fieldLabel: 'Email',
        allowBlank: true,
      }, {
        xtype: 'textfield',
        name: 'phonePrimary',
        fieldLabel: 'Tel\u00E9fono 1',
        allowBlank: true,
      }, {
        xtype: 'textfield',
        name: 'phoneSecondary',
        fieldLabel: 'Tel\u00E9fono 2',
        allowBlank: true,
      }, {
        xtype: 'textfield',
        name: 'fax',
        fieldLabel: 'Fax',
        allowBlank: true,
      }, {
        xtype: 'textfield',
        name: 'mobile',
        fieldLabel: 'Celular',
        allowBlank: true,
      }]
    }, {
      columnWidth: 0.5,
      border: false,
      items: [{
        xtype: 'combobox',
        name: 'priceList',
        fieldLabel: 'Lista de precios',
        emptyText: 'Ninguna',
        editable: false,
        store: new Ext.data.SimpleStore({
          data: [
            [0, 'Ninguna'],
            [1, 'General']
          ],
          fields: ['value', 'text'],
        }),
        valueField: 'value',
        displayField: 'text',
        allowBlank: true,
      }, {
        xtype: 'combobox',
        name: 'seller',
        fieldLabel: 'Vendedor',
        emptyText: 'Ninguno',
        editable: false,
        store: new Ext.data.SimpleStore({
          data: [
            [0, 'Ninguno']
          ],
          fields: ['value', 'text'],
        }),
        valueField: 'value',
        displayField: 'text',
        allowBlank: true,
      }, {
        xtype: 'combobox',
        name: 'term',
        fieldLabel: 'Términos de pago',
        emptyText: 'Vencimiento manual',
        editable: false,
        store: new Ext.data.SimpleStore({
          data: [
            [0, 'Vencimiento manual'],
            [1, 'De contado'],
            [2, '8 días'],
            [3, '15 días'],
            [4, '30 días'],
            [5, '60 días'],
          ],
          fields: ['value', 'text'],
        }),
        valueField: 'value',
        displayField: 'text',
        allowBlank: true,
      }, {
        xtype: 'checkboxfield',
        name: 'isClient',
        itemId: 'Client',
        fieldLabel: 'Cliente',
      }, {
        xtype: 'checkboxfield',
        name: 'isProvider',
        itemId: 'Provider',
        fieldLabel: 'Proveedor',
      }, {
        xtype: 'textareafield',
        name: 'observations',
        fieldLabel: 'Observaciones',
        allowBlank: true,
      }, {
        xtype: 'label',
        //name: 'observations',
        html: 'Los campos con <span style="color:red;">*</span> son obligatorios.',
      }],
    }],
  }],
  buttons: [{
    icon: 'resources/images/disk.png',
    text: 'Guardar',
    id: 'btnSaveForm', //So i can disable if view mode
    action: 'add'
  }, {
    icon: 'resources/images/style_delete.png',
    text: 'Limpiar',
    id: 'btnResetForm', //So i can disable if view mode
    handler: function() {
      this.up('window').down('form').getForm().reset();
    }
  }, {
    text: 'Cerrar',
    icon: 'resources/images/door_in.png',
    handler: function() {
      this.up('window').close();
    }
  }]
});
