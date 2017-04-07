import Ember from 'ember';

/**
* Controller for create-contact
* @class CreateContactController
*/

export default Ember.Controller.extend({
    session: Ember.inject.service(),
    ajax: Ember.inject.service(),
    actions: {
 /** 
		* handles action called when user changes the option selected in the dropdown
		* if option is Laboratory only display name input, else display both first and last name inputs
		* @method showLastName
		*/
    showLastName: function(){
        var type= document.getElementById('type');
        var typeval = type.options[type.selectedIndex].text;

        if (typeval == "Laboratory" ){
        this.set('model.laboratory', true);
        }
        else{
        this.set('model.laboratory', false);
        }
    },

     /** 
		* handles action called when user clicks create-contact-button
		* sends a post to server after doing some checks for input content
        * displays error message upon failure 
        * briefly displays confirmation upon success and then transitions to search-contacts
        * if input validation works and it gets to the request we disable the create button so that duplicate contacts
        * cannot be created
		* @method createContact
		*/

    createContact: function(){

    //this is to get the value in the dropdown specifically
    var type= document.getElementById('type');
    var typeval = type.options[type.selectedIndex].text;

    if (typeval === "Laboratory"){
        var last_name = "labtype";
    }
    else{
        var last_name = this.get('last_name');
    }
    var self = this;
 
    var checked = checkInputs(self, typeval);

    if(checked){

    document.getElementById("create-contact-button").disabled = true; 
  
    var user = this.get('ajax').post('/api/contacts', {
        type: 'application/json',
        data: { contact: {
          first_name: this.get('first_name'),
          last_name: last_name,
          addressLine1: this.get('addressLine1'),
          addressLine2: this.get('addressLine2'),
          addressLine3: this.get('addressLine3'),
          email: this.get('email'),
          phone_number: this.get('phoneNumber'),
          fax_number: this.get('faxNumber'),
          contact_type: typeval
        }
    }
    });

        user.then(function(response){
            if(response.success){
                clearFields(self);
                self.transitionToRoute('search-contact');    
            }
        //this is error from server condition
        }, function(response) {
            if (response === false){
					if (self.get('session.isAuthenticated')){
						self.get('session').invalidate();
					}
				self.transitionToRoute('/login');
			}
            else {
            showAlert(response.errors[0].title, false, "failure");
            document.getElementById("create-contact-button").disabled = false; 
            }
        });
}
    }
    }
});
   
 /** 
		* used to provide feedback to user on success condition as well as fail condition
        * only displayed very briefly on success condition however before transition
		* @method  showAlert
		* @param {string} message The message to display in the alert
        * @param {boolean} bool Determines if this is a warning alert or confirmation alert
        * @param {string} divID a partial name to the div id in which the allert is displayed. the div id is alert_placeholder_'divID'
		*/   

function showAlert(message, bool, divID) {
        if(bool){
            Ember.$('#alert_placeholder_'+divID).html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span  id="statusGood">'+message+'</span></div>');
        }
        else{
             Ember.$('#alert_placeholder_'+divID).html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">'+message+'</span></div>');
        }
        Ember.$('html,body').scrollTop(0);
 }

 /**
* clears the page's input fields
* @param {object} page the controller
* @method clearFields
*/
function clearFields(page){
	page.set('first_name', '');
	page.set('last_name', '');
	page.set('phoneNumber', '');
    page.set('faxNumber', '');
    page.set('email', '');
    page.set('address', '');
	
}

/**
* checks if the required inputs are present, if they are undefined we show alerts about this
* else if they are all valid we return true
* @method checkInputs
* @param {object} self the controller
* @param {string} type the type of contact, want slightly diff display for labs
*/

function checkInputs(self , type){
    var firstName = (self.get('first_name') !== undefined) ;
    var phoneNumber = testPhoneNumber(self.get('phoneNumber') , "phoneNumber");
    var email= testEmail( self.get('email') , "email") ;
    var addressLine1 = ( self.get('addressLine1') !== undefined);
    var addressLine3 = ( self.get('addressLine3') !== undefined) ;

     if (!firstName) {
         if(type === "Laboratory"){
        showAlert("Name cannot be blank", false, "firstName");
         }
         else{
        showAlert("First name cannot be blank", false, "firstName");
         }
    }

     if (!addressLine1){
        showAlert("Address Line 1 cannot be blank", false, "addressLine1");
    }
     if (!addressLine3){
        showAlert("City cannot be blank", false, "addressLine3");
    }

    return(firstName && phoneNumber && email && addressLine1 && addressLine3);
}

/**
* Checks that an email is valid. returns true if it is of an email format, displays an alert and returns false otherwise
* @method testEmail
* @param {string} name The email to be tested
* @param {string} divID a partial name to the div id in which the allert is displayed. the div id is alert_placeholder_'divID'
*/
function testEmail(email, divID){
	var emailRegEx =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(emailRegEx.test(email)){
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
	if(phoneRegEx.test(phone)){
		return true;
	} else{
		showAlert("Phone number must be of format xxx-xxx-xxxx, or xxx.xxx.xxxx or xxx xxx xxxx",
		 false, divID);
		return false;
	}
}