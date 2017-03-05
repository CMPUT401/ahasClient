import Ember from 'ember';

export default Ember.Controller.extend({
    ajax: Ember.inject.service(),
    actions:{
     doneEditContact: function(model) {

    var type= document.getElementById('type');
    var typeval = type.options[type.selectedIndex].text;
    var self = this;
    
    var user = this.get('ajax').put('/api/contacts/' + model.id, {
        type: 'application/json',
        data: { contact: {
          first_name: this.get('first_name'),
          last_name: this.get('last_name'),
          address: this.get('address'),
          email: this.get('email'),
          phone_number: this.get('phoneNumber'),
          fax_number: this.get('faxNumber'),
          contact_type: typeval
        }
    }
    });
     }
  }
});
