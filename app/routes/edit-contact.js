import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin , {
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
