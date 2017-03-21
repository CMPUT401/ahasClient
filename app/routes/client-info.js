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
					firstName: JSON.stringify(data.client.firstName).replace(/\"/g, ""),
					lastName: JSON.stringify(data.client.lastName).replace(/\"/g, ""),
					phoneNumber: JSON.stringify(data.client.phoneNumber).replace(/\"/g, ""),
					email: JSON.stringify(data.client.email).replace(/\"/g, ""),
					address: JSON.stringify(data.client.address).replace(/\\n/g, " <br> " ).replace(/\"/g, ""),

					licos: JSON.stringify(data.client.licos).replace(/\"/g, ""),
					aish: JSON.stringify(data.client.aish).replace(/\"/g, ""),
					socialAssistance: JSON.stringify(data.client.socialAssistance).replace(/\"/g, ""),
					pets: JSON.stringify(data.client.pets).replace(/\"/g, ""),
					
					created_at: JSON.stringify(data.client.created_at).replace(/\"/g, "").slice(0, 10),
					updated_at: JSON.stringify(data.client.updated_at).replace(/\"/g, "").slice(0, 10),
					notes: JSON.stringify(data.client.notes).replace(/\"/g, "").replace(/\\n/g, ' <br> ' ),

					alternativeContactFirstName: JSON.stringify(
						data.client.alternativeContactFirstName).replace(/\"/g, ""),
					alternativeContactLastName: JSON.stringify(
						data.client.alternativeContactLastName).replace(/\"/g, ""),
					alternativeContactPhoneNumber: JSON.stringify(
						data.client.alternativeContactPhoneNumber).replace(/\"/g, ""),
					alternativeContact2ndPhone: JSON.stringify(
						data.client.alternativeContact2ndPhone).replace(/\"/g, ""),
					alternativeContactAddress: JSON.stringify(
						data.client.alternativeContactAddress).replace(/\\n/g, " <br> " ).replace(/\"/g, ""),
					alternativeContactEmail: JSON.stringify(
							data.client.alternativeContactEmail).replace(/\"/g, ""),

					clientID: JSON.stringify(data.client.id).replace(/\"/g, ""),
					patients: deserialAttributes(data.client.patients)
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
	var lico = JSON.stringify(client.licos);
	if(lico != null){
		return lico.replace(/\"/g, "");
	} else{
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
	var clientId = JSON.stringify(data.client.id)
	if(clientId != null){
		return clientId.replace(/\"/g, "");
	} else{
		return "";
	}
}

function deserialClient(client){
	var deserial;
	//only one client to deserial
	client.firstName = .replace(/\"/g, "");
	client.lastName = .replace(/\"/g, "");
	client.phoneNumber = .replace(/\"/g, "");
	client.email = .replace(/\"/g, "");
	client.address = .replace(/\"/g, "");

	client.licos = .replace(/\"/g, "");
	client.aish = .replace(/\"/g, "");
	client.socialAssistance = .replace(/\"/g, "");
	client.pets = JSON.stringify(client.pets).replace(/\"/g, "");
	
	client.created_at = .replace(/\"/g, "").slice(0, 10);
	client.updated_at = .replace(/\"/g, "").slice(0, 10);
	client.notes = .replace(/\"/g, "").replace(/\\n/g, ' <br> ' );

	client.alternativeContactFirstName = .replace(/\"/g, "");
	client.alternativeContactLastName = .replace(/\"/g, "");
	client.alternativeContactPhoneNumber = .replace(/\"/g, "");
	client.alternativeContact2ndPhone = .replace(/\"/g, "");
	client.alternativeContactAddress = .replace(/\"/g, "");
	client.alternativeContactEmail = .replace(/\"/g, "");

	client.clientID = .replace(/\"/g, "");
	client.patients = deserialAttributes(data.client.patients);

	return client;
}
