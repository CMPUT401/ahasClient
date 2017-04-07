import Ember from 'ember';

/**
* Controller for new-client
* @class NewClientController
*/
export default Ember.Controller.extend({
	session: Ember.inject.service(),
	ajax: Ember.inject.service(),
	actions: {
		/**
		* makes an ajax POST request to save the new client
		* @method submitNewClient
		*/
		submitNewClient: function(){
			
			//make asynch post request
			var self = this;
			checkInputs(self);
			if(checkInputs(self)){
				//disable button
				document.getElementById("create-client-button").disabled = true; 
				let ajaxPost = this.get('ajax').post('/api/client' , {
					type: 'application/json',
					data: {client: {
						firstName: this.get('clientFirstName'),
						lastName: this.get('clientLastName'),
						addressLine1: checkUndefined(this.get('clientAddressLine1')),
						addressLine2: checkUndefined(this.get('clientAddressLine2')),
						addressLine3: checkUndefined(this.get('clientAddressLine3')),
						phoneNumber: checkUndefined(this.get('clientPhone')),
						email: checkUndefined(this.get('clientEmail')),
						licos: checkUndefined(this.get('clientLICO')),
						aish: checkUndefined(this.get('clientAISH')),
						socialAssistance: checkUndefined(this.get('clientSA')),
						pets: "",
						created_at: new Date(),
						updated_at: "",
						alternativeContactFirstName: checkUndefined(this.get('alternativeFirstName')),
						alternativeContactLastName: checkUndefined(this.get('alternativeLastName')),
						alternativeContactPhoneNumber: checkUndefined(this.get('alternativePrimaryPhone')),
						alternativeContactAddressLine1: checkUndefined(this.get('alternativeAddressLine1')),
						alternativeContactAddressLine2: checkUndefined(this.get('alternativeAddressLine2')),
						alternativeContactAddressLine3: checkUndefined(this.get('alternativeAddressLine3')),
						notes: checkUndefined(this.get('clientNotes')),
						alternativeContact2ndPhone: checkUndefined(this.get('alternativeSecondaryPhone')),
						alternativeContactEmail: checkUndefined(this.get('alternativeEmail'))
					}}, 
				}).then(function(data){
						showAlert("Client created. ", true, "success");
						// TODO prevent user from going back into this page
						clearFields(self);
						self.transitionToRoute('search-client');
					},
					function(response){
						showAlert("Could not create. ", false, "failure");
						document.getElementById("create-client-button").disabled = false;
						if (response === false){
							if (self.get('session.isAuthenticated')){
								self.get('session').invalidate();
							}
							clearFields(self);
							self.transitionToRoute('/login');
						}
					});
				return ajaxPost;
			}
			
		}
	}
});

/**
* clears the page's input fields
* @param {object} page the controller
* @method clearFields
*/
function clearFields(page){
	page.set('clientFirstName', '');
	page.set('clientLastName', '');
	page.set('clientAddressLine1', '');
	page.set('clientAddressLine2', '');
	page.set('clientAddressLine3', '');
	page.set('clientPhone', '');
	page.set('clientEmail', '');
	page.set('clientLICO', '');
	page.set('clientAISH', '');
	page.set('clientAS', '');
	page.set('alternativeFirstName', '');
	page.set('alternativeLastName', '');
	page.set('alternativePrimaryPhone', '');
	page.set('alternativeAddressLine1', '');
	page.set('clientNotes', '');
	page.set('alternativeSecondaryPhone', '');
	page.set('alternativeEmail', '');
}


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
		Ember.$('html,body').scrollTop(0);
}

/**
* validates the client's first and last names, email and phone. validates the alt contact phone numbers and email. returns true if they are valid
* @method checkInputs
* @param {object} self the controller
*/
function checkInputs(self){
    var validFirstName = testName(self.get('clientFirstName'), "firstName",true);
	var validLastName = testName(self.get('clientLastName'), "lastName", false);
    var validEmail = testEmail(self.get('clientEmail'), "clientEmail");
    var validAltEmail = testEmail(self.get('alternativeEmail'), "altEmail");
    var validClientPhone = testPhoneNumber(self.get('clientPhone'), "clientPhone");
    var validAltPrimaryPhone = testPhoneNumber(self.get('alternativePrimaryPhone'), "altPrimaryPhone");
    var validAltSecondaryPhone = testPhoneNumber(self.get('alternativeSecondaryPhone'), "altSecondaryPhone");
    return validEmail && validAltEmail && validFirstName && validLastName && validClientPhone &&
    		validAltPrimaryPhone && validAltSecondaryPhone;
}

/**
* Checks that a name is valid. shows alert and return false if it is blank, tre otherwise
* @method testName
* @param {string} name The name to be tested
* @param {string} divID a partial name to the div id in which the allert is displayed. the div id is alert_placeholder_'divID'
* @param {boolean} isFirst true if the name in question is a first name, false if it is a last name 
*/
function testName(name, divID, isFirst){
	if(name === undefined || name === ""){
		if(isFirst){
			showAlert("First name cannot be blank", false, divID);
		}else{
			showAlert("Last name cannot be blank", false, divID);
		}
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
	if(emailRegEx.test(email) || email===undefined || email===""){
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


/**
* Checks that a value isn't undefined. if it is, return and empty string instead. 
* @method checkUndefined
* @param value  can be any value. main use is for calling this.get("id of input") in the controller. 
*/
function checkUndefined(value){
	if(value === undefined){
		return "";
	} else{
		return value;
	}
}