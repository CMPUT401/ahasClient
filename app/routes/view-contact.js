import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

/**
* Route for view contact
* @class ViewContactRoute
*/

export default Ember.Route.extend(AuthenticatedRouteMixin, {

	session: Ember.inject.service(),
    ajax: Ember.inject.service(),
	model(params) {
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/contacts/' + params.contact_id
			).then(function(data){
				data.contact = fixNulls(data.contact);
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
						   type: JSON.stringify(data.contact.contact_type).replace(/\"/g, ""), 
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
	},
	
});

/**  
  * checks to see what type of contact this is, since Laboratory type will not have a last name
  * we need to return an empty string if we find this type
  * this is because we store contacts generically and even Laboratory type store a lastname
  * we just dont want to display a null or whatever may be stored in that attribute
  * @method checkType
  * @param {string} type is the type of contact of this specific contact
  * @param {string} lastname is the lastname of the contact
  */ 

function checkType(type, lastname){

	if (type === "Laboratory"){
		return("");
	}
	return(lastname);

}

/** 
 * Used to remove nulls in returned object from server for formatting purposes
 * if it finds nulls it replaces them with empty string
 * @method fixNulls
 * @param {object} data json object which is returned from request
 */

function fixNulls(data){
	var fixed = {};

	for(var key in data){
		if(data[key] === null || data[key] === undefined || data[key] === 'null'){
			fixed[key] = '';
		}
		else{
			fixed[key] = data[key];
		}
	}

	return fixed;
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