import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin , {
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
					email: deserialEmail(data.client),
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
	var fName = client.firstName;
	if(fName != null){
		return JSON.stringify(fName).replace(/\"/g, "");
	}else{
		return "";
	}
}

function deserialLastName(client){
	var lName = client.lastName;
	if(lName != null){
		return JSON.stringify(lName).replace(/\"/g, "");
	}else{
		return "";
	}
}

function deserialPhoneNumber(client){
	var phoneNumber = client.phoneNumber;
	if(phoneNumber != null){
		return JSON.stringify(phoneNumber).replace(/\"/g, "");
	}else{
		return "";
	}
}

function deserialEmail(client){
	var email = client.email;
	if(email != null){
		return JSON.stringify(email).replace(/\"/g, "");
	}else{
		return "";
	}
}

function deserialAddress(client){
	var address = client.address;
	if(address != null){
		return JSON.stringify(address).replace(/\\n/g, " <br> " ).replace(/\"/g, "");
	}else{
		return "";
	}
}

function deserialLICOS(client){
	var lico = client.licos;
	if(lico != null){
		return JSON.stringify(lico).replace(/\"/g, "");
	} else{
		return "";
	}
}

function deserialAISH(client){
	var aish = client.aish;
	if(aish != null){
		return JSON.stringify(aish).replace(/\"/g, "");
	} else{
		return "";
	}
}

function deserialSA(client){
	var socialAssistance = client.socialAssistance;
	if(socialAssistance != null){
		return JSON.stringify(socialAssistance).replace(/\"/g, "");
	} else{
		return "";
	}
}

function deserialCreateAt(client){
	var createdAt = client.created_at;
	if(createdAt != null){
		return JSON.stringify(createdAt).replace(/\"/g, "").slice(0,10);
	} else{
		return "";
	}
}

function deserialUpdatedAt(client){
	var updatedAt = client.updated_at;
	if(updatedAt != null){
		return JSON.stringify(updatedAt).replace(/\"/g, "").slice(0,10);
	} else{
		return "";
	}
}

function deserialNotes(client){
	var notes = client.notes;
	if(notes != null){
		return JSON.stringify(notes).replace(/\"/g, "");
	} else{
		return "";
	}
}

function deserialAltFirstName(client){
	var altFName = client.alternativeContactFirstName;
	if(altFName != null){
		return JSON.stringify(altFName).replace(/\"/g, "");
	} else{
		return "";
	}
}

function deserialAltLastName(client){
	var altLName = client.alternativeContactLastName;
	if(altLName != null){
		return JSON.stringify(altLName).replace(/\"/g, "");
	} else{
		return "";
	}
}

function deserialAltPhoneNumber(client){
	var altPhoneNumber = client.alternativeContactPhoneNumber;
	if(altPhoneNumber != null){
		return JSON.stringify(altPhoneNumber).replace(/\"/g, "");
	} else{
		return "";
	}
}

function deserialAlt2ndPhone(client){
	var altPhone = client.alternativeContact2ndPhone;
	if(altPhone != null){
		return JSON.stringify(altPhone).replace(/\"/g, "");
	} else{
		return "";
	}
}

function deserialAltAddress(client){
	var altAddress = client.alternativeContactAddress;
	if(altAddress != null){
		return JSON.stringify(altAddress).replace(/\\n/g, " <br> " ).replace(/\"/g, "");
	} else{
		return "";
	}
}

function deserialAltEmail(client){
	var altEmail = client.alternativeContactEmail;
	if(altEmail != null){
		return JSON.stringify(altEmail).replace(/\"/g, "");
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


