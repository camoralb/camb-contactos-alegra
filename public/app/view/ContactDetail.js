this.propGrid = Ext.create('Ext.grid.property.Grid', {
    xtype: 'propertygrid',
    flex: 1,
    sourceConfig: {
        id: {
            displayName: 'ID #'
        },
        name: {
            displayName: 'Nombres'
        },
        identification: {
            displayName: 'Identificación'
        },
        address: {
            displayName: 'Dirección'
        },
        city: {
            displayName: 'Ciudad'
        },
        email: {
            displayName: 'Email'
        },
        fax: {
            displayName: 'Fax'
        },
        mobile: {
            displayName: 'Teléfono Móvil'
        },
        phonePrimary: {
            displayName: 'Teléfono 1'
        },
        phoneSecondary: {
            displayName: 'Teléfono 2'
        },
        type: {
            displayName: 'Tipo'
        },
        observations: {
            displayName: 'Observaciones'
        },
        isClient: {
            displayName: '¿Es cliente?'
        },
        isProvider: {
            displayName: '¿Es Proveedor?'
        },
        seller: {
            displayName: 'Vendedor'
        }
    },
    listeners: {
        'beforeedit': {
            fn: function () {
                return false;
            }
        }// end beforeedit
    }, //end listeners,
});


Ext.define('App.view.ContactDetail', {
    extend: 'Ext.window.Window',
    alias: 'widget.contactdetail',
    /*layout: {
     type: 'vbox',
     align: 'stretch'
     },*/
    layout: 'fit',
    resizable: false,
    closeAction: 'hide',
    modal: true,
    title: 'Detalles de contacto',
    icon: 'resources/images/vcard.png',
    width: 400,
    height: 500,
    //y: 0,
    items: [
        this.propGrid
    ],

        buttons: [{
            
            text: 'Cerrar',
            icon: 'resources/images/door_in.png',
            handler: function() {
              this.up('window').close();
            }
          }]

});




