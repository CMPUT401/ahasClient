import Ember from 'ember';

export default Ember.Route.extend({
    model() { 

        var model = JSON.parse(localStorage.getItem("contact"));

        return{

         id: model.id,
         first_name: model.first_name,
		 last_name: model.last_name,
		 phone_number: model.phone_number,
		 email: model.email,
		 fax_number: model.fax_number,
		 address: model.address,
         type: model.type
    };

    }
});
