import Ember from 'ember';

export default Ember.Route.extend({
    ajax: Ember.inject.service(),
	model(params) {
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/contact/' + params.contact_id
			).then(function(data){
				Ember.run(function() {
       			 resolve({ 
						   name: JSON.stringify(data.contact.name).replace(/\"/g, ""),
						   phoneNumber: JSON.stringify(data.contact.phoneNumber).replace(/\"/g, ""),
						   email: JSON.stringify(data.contact.email).replace(/\"/g, ""),
						   faxNumber: JSON.stringify(data.contact.faxNumber).replace(/\"/g, ""),
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
