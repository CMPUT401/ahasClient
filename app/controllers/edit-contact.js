import Ember from 'ember';

export default Ember.Controller.extend({
    ajax: Ember.inject.service(),
    actions:{
      showLastName: function(){
        var type= document.getElementById('type');
        var typeval = type.options[type.selectedIndex].text;

        if (typeval == "Laboratory" ){
        this.set('model.laboratory', true);
        this.set('model.veterinarian', false);
        this.set('model.volunteer', false);
        this.set('model.technician', false);
        }
        else if(typeval == "Veterinarian") {
          this.set('model.laboratory', false);
          this.set('model.veterinarian', true);
          this.set('model.volunteer', false);
          this.set('model.technician', false);
        }
         else if(typeval == "Volunteer") {
          this.set('model.laboratory', false);
          this.set('model.veterinarian', false);
          this.set('model.volunteer', true);
          this.set('model.technician', false);
        }
         else {
          this.set('model.laboratory', false);
          this.set('model.veterinarian', false);
          this.set('model.volunteer', false);
          this.set('model.technician', true);
        }
  
    },
     doneEditContact: function(id) {

    var type= document.getElementById('type');
    var typeval = type.options[type.selectedIndex].text;
    var self = this;
    
    var user = this.get('ajax').put('/api/contacts/' + id, {
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
