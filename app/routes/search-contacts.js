import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,
	{
    session: Ember.inject.service(),
    ajax: Ember.inject.service(),
	model() {
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/contacts'
			).then(function(data){
				Ember.run(function() {
					console.log(JSON.stringify(data), JSON.stringify(data.contacts));
       			 resolve({ 
						  

						  contacts: deserialAttributes(data.contacts),

				});
    		  });
			
			},
			function(response){
				if (response === false){
					if (self.get('session.isAuthenticated')){
						self.get('session').invalidate();
							}
					self.transitionTo('/unauthorized');
            }
		}));
	return(ajaxGet);
		
	}
	
});


function deserialAttributes(contacts){
	var deserial = [];
	for(var i = 0; i < contacts.length; i++) {

		var contact= contacts[i];
		contact.id = JSON.stringify(contacts[i].id);
		contact.first_name = JSON.stringify(contacts[i].first_name).replace(/\"/g, "");
		contact.last_name = JSON.stringify(contacts[i].last_name).replace(/\"/g, "");
		deserial.push(contact);

	}
	return(deserial);
}