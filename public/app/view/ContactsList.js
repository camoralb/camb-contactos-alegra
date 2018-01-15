Ext.define('App.view.ContactsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.contactslist',
    title: 'Lista de Contactos - Alegra',
    store: 'Contacts',
    id: 'camb-grid',
    initComponent: function () {
        this.tbar = [{
                text: 'Nuevo Contacto',
                action: 'add',
                iconCls: 'icon-add'
            },
            '-'
        ];
        this.columns = [{
                header: 'Nombres',
                dataIndex: 'name',
                flex: 2
            }, {
                header: 'Indentificación',
                dataIndex: 'identification'
            }, {
                header: 'Teléfono 1',
                dataIndex: 'phonePrimary',
                flex: 1
            }, {
                header: 'Email',
                dataIndex: 'email',
                flex: 1
            }, {
                header: 'Observaciones',
                dataIndex: 'observations',
                flex: 2
            },

            //////////////////////////////////ACTION COLUMN/////////////////////////
            {
                xtype: 'actioncolumn',
                text: 'Acciones',
                flex: 1,
                align: 'center',
                //width:50,
                items: [{
                        icon: 'resources/images/zoom_in.png',
                        tooltip: 'Ver detalles',
                        handler: function (view, rowIndex, colIndex, item, e,
                                record, row) {
                            this.fireEvent('itemClick', view, rowIndex, colIndex,
                                    item, e, record, row, 'view');
                        }
                    }, {
                        icon: 'resources/images/pencil.png',
                        tooltip: 'Editar',
                        handler: function (view, rowIndex, colIndex, item, e,
                                record, row) {
                            this.fireEvent('itemClick', view, rowIndex, colIndex,
                                    item, e, record, row, 'edit');
                        }
                    }, {
                        icon: 'resources/images/delete.png',
                        tooltip: 'Eliminar',
                        handler: function (grid, rowIndex, colIndex) {



                            var rec = grid.getStore().getAt(rowIndex);
                            var store = grid.getStore();


                            Ext.Msg.confirm(
                                    'Eliminar contacto',
                                    '¿Está seguro que desea eliminar al contacto <b>' +
                                    rec.get('name') + '</b>? ',
                                    function (button) {
                                        if (button == 'yes') {
                                            //grid.store.remove(rs[0]);
                                            var contact = rec.getData();
                                            var myMask = new Ext.LoadMask(Ext.getBody(), {msg: "Eliminando el contacto, por favor espere..."});
                                            myMask.show();
                                            Ext.Ajax.request({
                                                url: 'contact/delete',
                                                method: 'POST',
                                                jsonData: contact,
                                                success: function (
                                                        response) {
                                                    var grid =
                                                            Ext.ComponentQuery
                                                            .query(
                                                                    'contactslist'
                                                                    )[0];
                                                    grid.getStore()
                                                            .load();
                                                    //Enviar mensaje de eliminado
                                                    myMask.hide();
                                                    Ext.MessageBox.alert('Eliminado con éxito', 'Se ha eliminado el contacto con éxito.'
                                                            );
                                                },
                                                failure: function (result, request) {
                                                    myMask.hide();
                                                    Ext.MessageBox.alert('Error',
                                                            'Hemos tenido un error tratando de eliminar el contacto. '+result.responseText.message
                                                            );
                                                }
                                            });
                                        }
                                    });
                        }
                    }]
            },
                    //////////////////////////////////////////////FIN ACTION COLUMN
        ];
        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: 'Contacts',
            displayInfo: true,
            displayMsg: 'Mostrando contactos {0} - {1} de {2}',
            emptyMsg: "No hay contactos registrados",
            inputItemWidth: 35,
            items: [
                '-',
            ]
        });
        this.callParent(arguments);
    }
});
