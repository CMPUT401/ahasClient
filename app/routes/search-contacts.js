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
       			 resolve({ 
						  

						  contactsVolunteer: deserialAttributesVolunteer(data.contacts),
						  contactsFilteredVolunteer: deserialAttributesVolunteer(data.contacts),
						  contactsVeterinarian: deserialAttributesVeterinarian(data.contacts),
						  contactsFilteredVeterinarian: deserialAttributesVeterinarian(data.contacts),
						  contactsLaboratory: deserialAttributesLaboratory(data.contacts),
						  contactsFilteredLaboratory: deserialAttributesLaboratory(data.contacts)

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


function deserialAttributesVolunteer(contacts){
	var deserial = [];
	for(var i = 0; i < contacts.length; i++) {

		if(contacts[i].contact_type === 'Volunteer'){
		var contact= contacts[i];
		contact.id = JSON.stringify(contacts[i].id);
		contact.first_name = JSON.stringify(contacts[i].first_name).replace(/\"/g, "");
		contact.last_name = JSON.stringify(contacts[i].last_name).replace(/\"/g, "");
		contact.contact_type = JSON.stringify(contacts[i].contact_type).replace(/\"/g, "");
		deserial.push(contact);
	}
  }
	return(deserial);
}

function deserialAttributesVeterinarian(contacts){
	var deserial = [];
	for(var i = 0; i < contacts.length; i++) {
		
	if(contacts[i].contact_type === 'Veterinarian'){
		var contact= contacts[i];
		contact.id = JSON.stringify(contacts[i].id);
		contact.first_name = JSON.stringify(contacts[i].first_name).replace(/\"/g, "");
		contact.last_name = JSON.stringify(contacts[i].last_name).replace(/\"/g, "");
		contact.contact_type = JSON.stringify(contacts[i].contact_type).replace(/\"/g, "");
		deserial.push(contact);
		}
	}
	
	return(deserial);
}

function deserialAttributesLaboratory(contacts){
	var deserial = [];
	for(var i = 0; i < contacts.length; i++) {

		if(contacts[i].contact_type === 'Laboratory'){
		var contact= contacts[i];
		contact.id = JSON.stringify(contacts[i].id);
		contact.first_name = JSON.stringify(contacts[i].first_name).replace(/\"/g, "");
		contact.last_name = JSON.stringify(contacts[i].last_name).replace(/\"/g, "");
		contact.contact_type = JSON.stringify(contacts[i].contact_type).replace(/\"/g, "");
		deserial.push(contact);
	}
  }
	return(deserial);
}