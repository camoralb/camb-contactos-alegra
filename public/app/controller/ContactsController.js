Ext.define('App.controller.ContactsController', {
    extend: 'Ext.app.Controller',
    stores: ['Contacts'],
    views: ['ContactsList', 'ContactForm', 'ContactDetail'],
    refs: [{
            ref: 'formWindow',
            xtype: 'contactform',
            selector: 'contactform',
            autoCreate: true
        }, {
            ref: 'detailWindow',
            xtype: 'contactdetail',
            selector: 'contactdetail',
            autoCreate: true
        }],
    init: function () {
        this.control({
            'contactslist > toolbar > button[action=add]': {
                click: this.showAddForm
            },
            'contactslist': {
                itemdblclick: this.onRowdblclick
            },
            'actioncolumn': {
                itemClick: this.onActionColumnItemClick
            },
            'contactform button[action=add]': {
                click: this.saveContact
            }
        });
    },

    onActionColumnItemClick: function (view, rowIndex, colIndex, item, e,
            record, row, action) {
        if (action == 'edit') {
            this.onRowdblclick(view, record, item, rowIndex);
        } else if (action == 'view') {
            this.onViewclick(view, record, item, rowIndex);
        }
    },

    onRowdblclick: function (me, record, item, index) {
        
        
        var data = record.getData();
        if (data.type.indexOf("provider")>=0 ){
            data.isProvider = "on";
        }
        if (data.type.indexOf("client")>=0 ){
            data.isClient = "on";
        }
        
        if (data.term != null){
            data.term = data.term.name;
        }
        //alert("Proveedor: "+data.type.indexOf("provider"));
        //alert(JSON.stringify(record.getData()));
        
        var win = this.getFormWindow();
        win.setTitle('Editar Contacto');
        win.setAction('edit');
        win.down('form').getForm().reset();
        win.setRecordIndex(index);
        win.down('form').getForm().setValues(data);
        win.show();
    },
    onViewclick: function (me, record, item, index) {
        var rec = me.getStore().getAt(index);
        var contact = rec.getData();
        var winDet = this.getDetailWindow();
        var grid = winDet.down('propertygrid');
        var myMask = new Ext.LoadMask(Ext.getBody(), {msg: "Cargando detalles, por favor espere..."});
        myMask.show();
        Ext.Ajax.request({
            url: 'contact' + '/?id=' + contact.id,
            method: 'GET',
            jsonData: contact.id,
            success: function (response) {
                //var src = Ext.decode(response.responseText[0]);
                var dt = JSON.parse(response.responseText);
                var data = {
                        'id': dt.id,
                        'name':  dt.name,
                        'identification':  dt.identification,
                        'address':  dt.address.address,
                        'city':  dt.address.city,
                        'email':  dt.email,
                        'phonePrimary':  dt.phonePrimary,
                        'phoneSecondary':  dt.phoneSecondary,
                        'fax':  dt.fax,
                        'mobile':  dt.mobile,
                        'priceList':  dt.priceList,
                        'seller':  dt.seller,
                        'term':  dt.term,
                        'isClient': (dt.type.indexOf('client') >=0) ? "Si" : "No",
                        'isProvider': (dt.type.indexOf('provider') >=0) ? "Si" : "No",
                        'observations': dt.observations, 
                };
                grid.setSource(data);
                myMask.hide();
                winDet.show();
            },
            failure: function (result, request) {
                myMask.hide();
                Ext.MessageBox.alert('Error al conectar al servidor',
                        'Hemos tenido un error tratando de conectar al servidor.'
                        );
            }
        });

    },
    showAddForm: function () {
        var win = this.getFormWindow();
        win.setTitle('Nuevo Contacto');
        win.setAction('add');
        win.down('form').getForm().reset();
        win.show();
    },
    saveContact: function () {
        var win = this.getFormWindow();
        var store = this.getContactsStore();
        var values = win.down('form').getValues();
        
        
        values.address = {"address":values.address, "city": values.city};
        var type = [];
        if (values.isClient == 'on'){
            type.push("client");
        }
        if (values.isProvider == 'on'){
            type.push("provider");
        }
        values.type = type;
        alert(JSON.stringify(values));

        //alert(JSON.stringify(values));

        if (values.name != '') {
            var action = win.getAction();
            //   var contact = Ext.create('App.model.Contact', values);
            var url = '';
            var method = '';
            if (action == 'edit') {
                url = 'contact/update';
                method = 'PUT';
            } else {
                url = 'contact/new';
                method = 'POST';
            }

            var myMask = new Ext.LoadMask(Ext.getBody(), {msg: "Estamos procesando su requerimiento..."});
            myMask.show();
            Ext.Ajax.request({
                url: url,
                method: method,
                //jsonData: {"data": [values]},
                jsonData: values,
                success: function (response) {
                    store.load();
                    myMask.hide();
                    Ext.MessageBox.alert('Contacto Guardado',
                            (action == 'edit') ? 'Se ha actualizado el contacto con éxito.' : 'Se ha creado el contacto con éxito.' );
                },
                failure: function (result, request) {
                    myMask.hide();
                    Ext.MessageBox.alert('Error',
                            'Hemos tenido un error tratando de conectar al servidor. '
                            );
                }
            });
            win.close();
        } else {
            Ext.MessageBox.alert('Debe llenar los campos obligatorios',
                    'El campo <span style="color:red;">"Nombre del contacto"</span> es obligatorio.'
                    );
        }
    }
});
