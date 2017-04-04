import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

/**
* Route for search contact
* @class SearchContactRoute
*/

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
						  
						  //we keep two copies of each array as attributes of the model here
						  //this is so that we can filter in search and results will be in one array
						  //while the other array always contains all
						  contactsVolunteer: deserialAttributesVolunteer(data.contacts),
						  contactsFilteredVolunteer: deserialAttributesVolunteer(data.contacts),
						  contactsVeterinarian: deserialAttributesVeterinarian(data.contacts),
						  contactsFilteredVeterinarian: deserialAttributesVeterinarian(data.contacts),
						  contactsLaboratory: deserialAttributesLaboratory(data.contacts),
						  contactsFilteredLaboratory: deserialAttributesLaboratory(data.contacts),
						  contactsTechnician: deserialAttributesTechnician(data.contacts),
						  contactsFilteredTechnician: deserialAttributesTechnician(data.contacts), 
						  admin: checkAdmin(localStorage.getItem('role'))

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
		
	}
	
});

/**  
  * iterates through the array of contacts and sorts into types
  * assigns the inner attributes of a contact to the inner attributes of the object that is
  * created so that the list of objects can be accessed in the route
  * @method deserialAttributesVolunteer
  * @param {array} contacts
  */ 


function deserialAttributesVolunteer(contacts){
	var deserial = [];
	for(var i = 0; i < contacts.length; i++) {

		if(contacts[i].contact_type === 'Volunteer'){
		var contact= contacts[i];
		contact.id = contacts[i].id;
		contact.first_name = JSON.stringify(contacts[i].first_name).replace(/\"/g, "");
		contact.last_name = JSON.stringify(contacts[i].last_name).replace(/\"/g, "");
		contact.contact_type = JSON.stringify(contacts[i].contact_type).replace(/\"/g, "");
		deserial.push(contact);
	}
  }
	return(deserial);
}

/**  
  * iterates through the array of contacts and sorts into types
  * assigns the inner attributes of a contact to the inner attributes of the object that is
  * created so that the list of objects can be accessed in the route
  * @method deserialAttributesVeterinarian
  * @param {array} contacts
  */ 

function deserialAttributesVeterinarian(contacts){
	var deserial = [];
	for(var i = 0; i < contacts.length; i++) {
		
	if(contacts[i].contact_type === 'Veterinarian'){
		var contact= contacts[i];
		contact.id = contacts[i].id;
		contact.first_name = JSON.stringify(contacts[i].first_name).replace(/\"/g, "");
		contact.last_name = JSON.stringify(contacts[i].last_name).replace(/\"/g, "");
		contact.contact_type = JSON.stringify(contacts[i].contact_type).replace(/\"/g, "");
		deserial.push(contact);
		}
	}
	
	return(deserial);
}

/**  
  * iterates through the array of contacts and sorts into types
  * assigns the inner attributes of a contact to the inner attributes of the object that is
  * created so that the list of objects can be accessed in the route
  * @method deserialAttributesLaboratory
  * @param {array} contacts
  */ 

function deserialAttributesLaboratory(contacts){
	var deserial = [];
	for(var i = 0; i < contacts.length; i++) {

		if(contacts[i].contact_type === 'Laboratory'){
		var contact= contacts[i];
		contact.id = contacts[i].id;
		contact.first_name = JSON.stringify(contacts[i].first_name).replace(/\"/g, "");
		contact.last_name = "";
		contact.contact_type = JSON.stringify(contacts[i].contact_type).replace(/\"/g, "");
		deserial.push(contact);
	}
  }
	return(deserial);
}

/**  
  * iterates through the array of contacts and sorts into types
  * assigns the inner attributes of a contact to the inner attributes of the object that is
  * created so that the list of objects can be accessed in the route
  * @method deserialAttributesTechnician
  * @param {array} contacts
  */ 

function deserialAttributesTechnician(contacts){
	var deserial = [];
	for(var i = 0; i < contacts.length; i++) {

		if(contacts[i].contact_type === 'Technician'){
		var contact= contacts[i];
		contact.id = contacts[i].id;
		contact.first_name = JSON.stringify(contacts[i].first_name).replace(/\"/g, "");
		contact.last_name = JSON.stringify(contacts[i].last_name).replace(/\"/g, "");
		contact.contact_type = JSON.stringify(contacts[i].contact_type).replace(/\"/g, "");
		deserial.push(contact);
	}
  }
	return(deserial);
}

/**  
  * checks if the role is Admin, and returns true if so , this bool used to allow a button to either appear or not
  * @method checkAdmin
  * @param {String} role the role of the user, fetched from the local storage
  */ 

function checkAdmin(role){
	if (role ==='Admin'){
		return(true);
	}
	return(false);
}