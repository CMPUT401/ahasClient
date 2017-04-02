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
			
			this.clientId = client.clientID;
			//make ajax put request

			var self = this;
			if(checkInputs(client)){
				//disable button
				document.getElementById("create-client-button").disabled = true; 
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
* @param {string} divID a partial name to the div id in which the allert is displayed. the div id is alert_placeholder_'divID'
*/   
function showAlert(message, isGood, divID) {
    if(isGood){
        Ember.$('#alert_placeholder_' + divID).html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span  id="statusGood">'+message+'</span></div>');
    }
    else{
         Ember.$('#alert_placeholder_' + divID).html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">'+message+'</span></div>');
    }
}

/**
* validates the client's first and last names, email and phone. validates the alt contact phone numbers and email. returns true if they are valid
* @method checkInputs
* @param {object} self the controller
*/
function checkInputs(model){

	var validFirstName = testName(model.firstName, "firstName");
	var validLastName = testName(model.lastName, "lastName");
    var validEmail = testEmail(model.email, "clientEmail");
    var validAltEmail = testEmail(model.alternativeContactEmail, "altEmail");
    var validClientPhone = testPhoneNumber(model.phoneNumber, "clientPhone");
    var validAltPrimaryPhone = testPhoneNumber(model.alternativeContactPhoneNumber, "altPrimaryPhone");
    var validAltSecondaryPhone = testPhoneNumber(model.alternativeContact2ndPhone, "altSecondaryPhone");
    return validEmail && validAltEmail && validFirstName && validLastName && validClientPhone &&
    		validAltPrimaryPhone && validAltSecondaryPhone;
}

/**
* Checks that a name is valid. shows alert and return false if it is blank, tre otherwise
* @method testName
* @param {string} name The name to be tested
* @param {string} divID a partial name to the div id in which the allert is displayed. the div id is alert_placeholder_'divID'
*/
function testName(name, divID){
	if(name === undefined || name === ""){
		showAlert("Name cannot be blank", false, divID);
		return false;
	}else{
		return true;
	}
}

/**
* Checks that an email is valid. returns true if it is of an email format, displays an alert and returns false otherwise
* @method testEmail
* @param {string} name The email to be tested
* @param {string} divID a partial name to the div id in which the allert is displayed. the div id is alert_placeholder_'divID'
*/
function testEmail(email, divID){
	var emailRegEx =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(emailRegEx.test(email) || (email === undefined) ||( email === "")){
		return true;
	} else{
		showAlert("Invalid email address", false, divID);
		return false;
	}
}

/**
* Checks that an phone number is valid. returns true if it is of an format xxx-xxx-xxxx, or xxx.xxx.xxxx or xxx xxx xxxx, displays an alert and returns false otherwise
* @method testPhoneNumber
* @param {string} name The phone number to be tested
* @param {string} divID a partial name to the div id in which the allert is displayed. the div id is alert_placeholder_'divID'
*/
function testPhoneNumber(phone, divID){

	//of format xxx-xxx-xxxx, or xxx.xxx.xxxx or xxx xxx xxxx
	var phoneRegEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	if(phoneRegEx.test(phone) || (phone === undefined) || (phone === "")){
		return true;
	} else{
		showAlert("Phone number must be of format xxx-xxx-xxxx, or xxx.xxx.xxxx or xxx xxx xxxx",
		 false, divID);
		return false;
	}
}
