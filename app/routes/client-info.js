import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin , {
	// TODO: load from /api/client/{id}
	session: Ember.inject.service(),
	ajax: Ember.inject.service(),
	model(param) {
		var self = this;
		// console.log("param is " + param.clientID);
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/client/' + param.clientID
			).then(function(data){
				console.log("data is " + JSON.stringify(data));
				Ember.run(function() {
				resolve({
					firstName: deserialFirstName(data.client),
					lastName: deserialLastName(data.client),
					phoneNumber: deserialPhoneNumber(data.client),
					email: deserialPhoneNumber(data.client),
					address: deserialAddress(data.client),

					licos: deserialLICOS(data.client),
					aish: deserialAISH(data.client),
					socialAssistance: deserialSA(data.client),
					
					created_at: deserialCreateAt(data.client),
					updated_at: deserialUpdatedAt(data.client),
					notes: deserialNotes(data.client),

					alternativeContactFirstName: deserialAltFirstName(data.client),
					alternativeContactLastName: deserialAltLastName(data.client),
					alternativeContactPhoneNumber: deserialAltPhoneNumber(data.client),
					alternativeContact2ndPhone: deserialAlt2ndPhone(data.client),
					alternativeContactAddress: deserialAltAddress(data.client),
					alternativeContactEmail: deserialAltEmail(data.client),

					clientID: deserialClientId(data.client),
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
					console.log("status is " + JSON.stringify(data));
				}
		}));
		return ajaxGet;
	},
});
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

function deserialFirstName(client){
	var fName = JSON.stringify(client.firstName);
	if(fName != null){
		return fName.replace(/\"/g, "");
	}else{
		return "";
	}
}

function deserialLastName(client){
	var lName = JSON.stringify(client.lastName);
	if(lName != null){
		return lName.replace(/\"/g, "");
	}else{
		return "";
	}
}

function deserialPhoneNumber(client){
	var phoneNumber = JSON.stringify(client.phoneNumber);
	if(phoneNumber != null){
		return phoneNumber.replace(/\"/g, "");
	}else{
		return "";
	}
}

function deserialEmail(client){
	var email = JSON.stringify(client.email);
	if(email != null){
		return email.replace(/\"/g, "");
	}else{
		return "";
	}
}

function deserialAddress(client){
	var address = JSON.stringify(client.address);
	if(address != null){
		return address.replace(/\\n/g, " <br> " ).replace(/\"/g, "");
	}else{
		return "";
	}
}

function deserialLICOS(client){
	var lico = JSON.stringify(client.licos).replace(/\"/g, "");
	if(lico != null){
		console.log("licos is not null");
		return lico;
	} else{
		console.log("lico is null");
		return "";
	}
}

function deserialAISH(client){
	var aish = JSON.stringify(client.aish);
	if(aish != null){
		return aish.replace(/\"/g, "");
	} else{
		return "";
	}
}

function deserialSA(client){
	var socialAssistance = JSON.stringify(client.socialAssistance);
	if(socialAssistance != null){
		return socialAssistance.replace(/\"/g, "");
	} else{
		return "";
	}
}

function deserialCreateAt(client){
	var createdAt = JSON.stringify(client.created_at);
	if(createdAt != null){
		return createdAt.replace(/\"/g, "").slice(0,10);
	} else{
		return "";
	}
}

function deserialUpdatedAt(client){
	var updatedAt = JSON.stringify(client.updated_at);
	if(updatedAt != null){
		return updatedAt.replace(/\"/g, "").slice(0,10);
	} else{
		return "";
	}
}

function deserialNotes(client){
	var notes = JSON.stringify(client.notes);
	if(notes != null){
		return notes.replace(/\"/g, "");
	} else{
		return "";
	}
}

function deserialAltFirstName(client){
	var altFName = JSON.stringify(client.alternativeContactFirstName);
	if(altFName != null){
		return altFName.replace(/\"/g, "");
	} else{
		return "";
	}
}

function deserialAltLastName(client){
	var altLName = JSON.stringify(client.alternativeContactLastName)
	if(altLName != null){
		return altLName.replace(/\"/g, "");
	} else{
		return "";
	}
}

function deserialAltPhoneNumber(client){
	var altPhoneNumber = JSON.stringify(client.alternativeContactPhoneNumber)
	if(altPhoneNumber != null){
		return altPhoneNumber.replace(/\"/g, "");
	} else{
		return "";
	}
}

function deserialAlt2ndPhone(client){
	var altPhone = JSON.stringify(client.alternativeContact2ndPhone);
	if(altPhone != null){
		return altPhone.replace(/\"/g, "");
	} else{
		return "";
	}
}

function deserialAltAddress(client){
	var altAddress = JSON.stringify(client.alternativeContactAddress);
	if(altAddress != null){
		return altAddress.replace(/\\n/g, " <br> " ).replace(/\"/g, "");
	} else{
		return "";
	}
}

function deserialAltEmail(client){
	var altEmail = JSON.stringify(client.alternativeContactEmail);
	if(altEmail != null){
		return altEmail.replace(/\"/g, "");
	} else{
		return "";
	}
}

function deserialClientId(client){
	var clientId = JSON.stringify(client.id)
	if(clientId != null){
		return clientId.replace(/\"/g, "");
	} else{
		return "";
	}
}

// function deserialClient(client){
// 	var deserial;
// 	//only one client to deserial
// 	client.firstName = .replace(/\"/g, "");
// 	client.lastName = .replace(/\"/g, "");
// 	client.phoneNumber = .replace(/\"/g, "");
// 	client.email = .replace(/\"/g, "");
// 	client.address = .replace(/\"/g, "");

// 	client.licos = .replace(/\"/g, "");
// 	client.aish = .replace(/\"/g, "");
// 	client.socialAssistance = .replace(/\"/g, "");
// 	client.pets = JSON.stringify(client.pets).replace(/\"/g, "");
	
// 	client.created_at = .replace(/\"/g, "").slice(0, 10);
// 	client.updated_at = .replace(/\"/g, "").slice(0, 10);
// 	client.notes = .replace(/\"/g, "").replace(/\\n/g, ' <br> ' );

// 	client.alternativeContactFirstName = .replace(/\"/g, "");
// 	client.alternativeContactLastName = .replace(/\"/g, "");
// 	client.alternativeContactPhoneNumber = .replace(/\"/g, "");
// 	client.alternativeContact2ndPhone = .replace(/\"/g, "");
// 	client.alternativeContactAddress = .replace(/\"/g, "");
// 	client.alternativeContactEmail = .replace(/\"/g, "");

// 	client.clientID = .replace(/\"/g, "");
// 	client.patients = deserialAttributes(data.client.patients);

// 	return client;
// }
