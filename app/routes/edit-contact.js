import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

/**
* Route for Edit contact
* @class EditContactRoute
*/

export default Ember.Route.extend(AuthenticatedRouteMixin , {
     ajax: Ember.inject.service(),
       model(params) {
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/contacts/' + params.contact_id
			).then(function(data){
                data.contact = fixNulls(data.contact);
				Ember.run(function() {
       			 resolve({ 
						   first_name: JSON.stringify(data.contact.first_name).replace(/\"/g, ""),
						   last_name: checkType(data.contact.contact_type, JSON.stringify(data.contact.last_name).replace(/\"/g, "")),
						   phone_number: JSON.stringify(data.contact.phone_number).replace(/\"/g, ""),
						   email: JSON.stringify(data.contact.email).replace(/\"/g, ""),
						   fax_number: JSON.stringify(data.contact.fax_number).replace(/\"/g, ""),
						   address: JSON.stringify(data.contact.address).replace(/\"/g, ""),
						   id: JSON.stringify(data.contact.id).replace(/\"/g, ""),
                           veterinarian: checkVeterinarian(JSON.stringify(data.contact.contact_type).replace(/\"/g, "")),
                           volunteer: checkVolunteer(JSON.stringify(data.contact.contact_type).replace(/\"/g, "")),
                           laboratory: checkLaboratory(JSON.stringify(data.contact.contact_type).replace(/\"/g, "")),
                           technician: checkTechnician(JSON.stringify(data.contact.contact_type).replace(/\"/g, ""))				
				});
    		  });
			
			},
			
			function(response){
				//this condition is reached if the login session has expired
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
 * Used for the initial setting of the dropdown in edit contact route so that it loads
 * correct type for what the contact is
 * Checks if the contact type is Veterinarian , if so return true
 * @method checkVeterinarian
 * @param {string} contact contact type string from the contact json object
 */

function checkVeterinarian(contact){

    if(contact === 'Veterinarian'){

        return(true);

    }
    return(false);

}

 /** 
 * Used for the initial setting of the dropdown in edit contact route so that it loads
 * correct type for what the contact is
 * Checks if the contact type is Volunteer , if so return true
 * @method checkVolunteer
 * @param {string} contact contact type string from the contact json object
 */

function checkVolunteer(contact){

    if(contact === 'Volunteer'){

        return(true);

    }
    return(false);

}

 /** 
 * Used for the initial setting of the dropdown in edit contact route so that it loads
 * correct type for what the contact is
 * Checks if the contact type is Laboratory , if so return true
 * @method checkLaboratory
 * @param {string} contact contact type string from the contact json object
 */

function checkLaboratory(contact){

    if(contact === 'Laboratory'){

        return(true);

    }
    return(false);

}

 /** 
 * Used for the initial setting of the dropdown in edit contact route so that it loads
 * correct type for what the contact is
 * Checks if the contact type is Technician, if so return true
 * @method checkTechnician
 * @param {string} contact contact type string from the contact json object
 */

function checkTechnician(contact){

    if(contact === 'Technician'){

        return(true);

    }
    return(false);

}

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