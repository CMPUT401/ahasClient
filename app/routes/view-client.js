import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

/**
* Route for view client. Makes a get request for a client when loaded. 
* @class ViewClientRoute
*/
export default Ember.Route.extend(AuthenticatedRouteMixin , {
	session: Ember.inject.service(),
	ajax: Ember.inject.service(),
	model(param) {
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/client/' + param.clientID
			).then(function(data){
				Ember.run(function() {
				resolve({
					firstName: deserialAttribute(data.client.firstName),
					lastName: deserialAttribute(data.client.lastName),
					phoneNumber: deserialAttribute(data.client.phoneNumber),
					email: deserialAttribute(data.client.email),
					addressLine1: deserialAttribute(data.client.addressLine1),
					addressLine2: deserialAttribute(data.client.addressLine2),
					addressLine3: deserialAttribute(data.client.addressLine3),

					licos: deserialAttribute(data.client.licos),
					aish: deserialAttribute(data.client.aish),
					socialAssistance: deserialAttribute(data.client.socialAssistance),
					
					created_at: deserialCreateAt(data.client),
					updated_at: deserialUpdatedAt(data.client),
					notes: deserialNotes(data.client),

					alternativeContactFirstName: deserialAttribute(data.client.alternativeContactFirstName),
					alternativeContactLastName: deserialAttribute(data.client.alternativeContactLastName),
					alternativeContactPhoneNumber: deserialAttribute(data.client.alternativeContactPhoneNumber),
					alternativeContact2ndPhone: deserialAttribute(data.client.alternativeContact2ndPhone),
					alternativeContactAddressLine1: deserialAttribute(data.client.alternativeContactAddressLine1),
					alternativeContactAddressLine2: deserialAttribute(data.client.alternativeContactAddressLine2),
					alternativeContactAddressLine3: deserialAttribute(data.client.alternativeContactAddressLine3),
					alternativeContactEmail: deserialAttribute(data.client.alternativeContactEmail),

					clientID: deserialAttribute(data.client.id),
					patients: deserialPatients(data.client.patients)
				});
			  });
			
			},
			function(data){
				if (data === false){
					if (self.get('session.isAuthenticated')){
					self.get('session').invalidate();
					}
				self.transitionTo('/login');
				}
		}));
		return ajaxGet;
	},
});

/**
* deserializes the patient attribute in the JSON object and converts it to an array of strings.
* @method deserialPatients
* @param {object} patients patient attribute from the JSON. example: data.client.patients
*/
function deserialPatients(patients){
	var deserial = [];
	for(var i = 0; i < patients.length; i++) {
		var patient = patients[i];
		patient.id = JSON.stringify(patients[i].id).replace(/\"/g, "");
		patient.firstName = JSON.stringify(patients[i].first_name).replace(/\"/g, "");
		patient.lastName = JSON.stringify(patients[i].last_name).replace(/\"/g, "");
		
		deserial.push(patient);

	}
	return(deserial);
}

/**
* deserializes an attribute in the JSON object and converts it to a string.
* @method deserialAttribute
* @param {object} attribute An attribute attribute from the JSON.
*/
function deserialAttribute(attribute){
	if(attribute != null){
		return JSON.stringify(attribute).replace(/\"/g, "");
	}else{
		return "";
	}
}

/**
* deserializes the created_at attribute in the JSON object and converts it to a string.
* @method deserialCreateAt
* @param {object} client. the client JSON object
*/
function deserialCreateAt(client){
	var createdAt = client.created_at;
	if(createdAt != null){
		return JSON.stringify(createdAt).replace(/\"/g, "").slice(0,10);
	} else{
		return "";
	}
}

/**
* deserializes the updated_at attribute in the JSON object and converts it to a string.
* @method deserialUpdatedAt
* @param {object} client. the client JSON object
*/
function deserialUpdatedAt(client){
	var updatedAt = client.updated_at;
	if(updatedAt != null){
		return JSON.stringify(updatedAt).replace(/\"/g, "").slice(0,10);
	} else{
		return "";
	}
}

/**
* deserializes the notes attribute in the JSON object and converts it to a string.
* @method deserialNotes
* @param {object} client. the client JSON object
*/
function deserialNotes(client){
	var notes = client.notes;
	if(notes != null){
		return JSON.stringify(notes).replace(/\\n/g, " <br> " ).replace(/\"/g, "");
	} else{
		return "";
	}
}




function deserialAltAddress(addr){
	if(addr != null){
		return JSON.stringify(addr).replace(/\\n/g, " <br> " ).replace(/\"/g, "");
	} else{
		return "";
	}
}


function deserialClientId(client){
	var clientId = client.id;
	if(clientId != null){
		return JSON.stringify(clientId).replace(/\"/g, "");
	} else{
		return "";
	}
}


