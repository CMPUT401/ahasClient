import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

	session: Ember.inject.service(),
    ajax: Ember.inject.service(),
	model(params) {
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/contacts/' + params.contact_id
			).then(function(data){
				console.log(JSON.stringify(data));
				Ember.run(function() {
       			 resolve({ 
						   contact_type:  JSON.stringify(data.contact.contact_type).replace(/\"/g, ""),
						   first_name: JSON.stringify(data.contact.first_name).replace(/\"/g, ""),
						   last_name: checkType(data.contact.contact_type, JSON.stringify(data.contact.last_name).replace(/\"/g, "")),
						   phone_number: JSON.stringify(data.contact.phone_number).replace(/\"/g, ""),
						   email: JSON.stringify(data.contact.email).replace(/\"/g, ""),
						   fax_number: JSON.stringify(data.contact.fax_number).replace(/\"/g, ""),
						   address: JSON.stringify(data.contact.address).replace(/\"/g, ""),
						   id: JSON.stringify(data.contact.id).replace(/\"/g, ""),
						   type: JSON.stringify(data.contact.contact_type).replace(/\"/g, "")
				
				});
    		  });
			
			},
			function(response){
				if (response === false){
					if (self.get('session.isAuthenticated')){
						self.get('session').invalidate();
					}
				self.transitionTo('/login');
			}
		}));
		return(ajaxGet);
	},
	
});

function checkType(type, lastname){

	if (type === "Laboratory"){
		return("");
	}
	return(lastname);

}