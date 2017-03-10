import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    ajax: Ember.inject.service(),
	model(params) {
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/contacts/' + params.contact_id
			).then(function(data){
				//console.log(data, data.success, data.contacts);
				Ember.run(function() {
       			 resolve({ 
						   first_name: JSON.stringify(data.contact.first_name).replace(/\"/g, ""),
						   last_name: JSON.stringify(data.contact.last_name).replace(/\"/g, ""),
						   phone_number: JSON.stringify(data.contact.phone_number).replace(/\"/g, ""),
						   email: JSON.stringify(data.contact.email).replace(/\"/g, ""),
						   fax_number: JSON.stringify(data.contact.fax_number).replace(/\"/g, ""),
						   address: JSON.stringify(data.contact.address).replace(/\"/g, "")
				
				});
    		  });
			
			},
			function(data){
				if (data === false){
				self.transitionTo('/unauthorized');
				console.log("status is " + JSON.stringify(data));
				}
		}));
		return(ajaxGet);
	},
	
});
