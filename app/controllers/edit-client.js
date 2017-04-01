import Ember from 'ember';

/**
* Controller for edit-client
* @class EditClientController
*/
export default Ember.Controller.extend({
	session: Ember.inject.service(),
	ajax: Ember.inject.service(),
	clientId: 0,
	actions:{
		/**
		* makes an ajax PUT request to save the client info
		* @param {object} the model from the page
		* @method saveClient
		*/
		saveClient: function(client){
			//disable button
			document.getElementById("create-client-button").disabled = true; 
			this.clientId = client.clientID;
			//make ajax put request

			var self = this;
			if(checkInputs(client)){
				let ajaxPut = this.get('ajax').put('api/client/' + this.clientId, {
					type: 'application/json',
					data: {client: {
						firstName: client.firstName,
						lastName: client.lastName,
						address: client.address,
						phoneNumber: client.phoneNumber,
						email: client.email,
						licos: client.licos,
						aish: client.aish,
						socialAssistance: client.socialAssistance,
						pets: "",
						created_at: client.created_at,
						updated_at: new Date(),
						alternativeContactFirstName: client.alternativeContactFirstName,
						alternativeContactLastName: client.alternativeContactLastName,
						alternativeContactPhoneNumber: client.alternativeContactPhoneNumber,
						alternativeContactAddress: client.alternativeContactAddress,
						notes: client.notes,
						alternativeContact2ndPhone: client.alternativeContact2ndPhone,
						alternativeContactEmail: client.alternativeContactEmail,
						patients: client.patients
					}},
				}).then(function(data){
					self.transitionToRoute('/view-client/' + self.clientId);
				},function(response){
					document.getElementById("create-client-button").disabled = false;
					if (response === false){
						if (self.get('session.isAuthenticated')){
							self.get('session').invalidate();
						}
						clearFields(self);
						self.transitionToRoute('/login');
					}
				});
				return ajaxPut;
			}
			
		}
	}
});

/** 
* used to provide feedback to user on success condition as well as fail condition
* only displayed very briefly on success condition however before transition
* @method  showAlert
* @param {string} message The message to display in the alert
* @param {boolean} isGood Determines if this is a warning alert or confirmation alert. true for good, false for bad
*/   

function showAlert(message, isGood, divID) {
    if(isGood){
        Ember.$('#alert_placeholder_' + divID).html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span  id="statusGood">'+message+'</span></div>');
    }
    else{
         Ember.$('#alert_placeholder_' + divID).html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">'+message+'</span></div>');
    }
}

function checkInputs(model){

    var validEmail = testEmail(model.email, "clientEmail");
    var validAltEmail = testEmail(model.alternativeContactEmail, "altEmail");
    return validEmail && validAltEmail;
}

function testEmail(email, divID){
	var emailRegEx =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(emailRegEx.test(email) || email===undefined || email===""){
		console.log(email +" is valid");
		return true;
	} else{
		console.log(email +" is invalid");
		showAlert("Invalid email address", false, divID);
		return false;
	}
}
