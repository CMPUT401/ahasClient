import Ember from 'ember';


/**
* Controller for client-info
* @class EditContactController
*/

export default Ember.Controller.extend({
    ajax: Ember.inject.service(),
    actions:{
        /** 
		* handles action called when user changes the option selected in the dropdown
		* if option is Laboratory only display name input, else display both first and last name inputs
		* @method showLastName
		*/
      showLastName: function(){
        var type= document.getElementById('type');
        var typeval = type.options[type.selectedIndex].text;

        if (typeval === "Laboratory" ){
        this.set('model.laboratory', true);
        this.set('model.veterinarian', false);
        this.set('model.volunteer', false);
        this.set('model.technician', false);
        }
        else if(typeval === "Veterinarian") {
          this.set('model.laboratory', false);
          this.set('model.veterinarian', true);
          this.set('model.volunteer', false);
          this.set('model.technician', false);
        }
         else if(typeval === "Volunteer") {
          this.set('model.laboratory', false);
          this.set('model.veterinarian', false);
          this.set('model.volunteer', true);
          this.set('model.technician', false);
        }
         else {
          this.set('model.laboratory', false);
          this.set('model.veterinarian', false);
          this.set('model.volunteer', false);
          this.set('model.technician', true);
        }
  
    },
    /** 
		* handles action called when user clicks done-edit-button
        * sends a put request to the server with all values of input elements on this page
		* redirects to the view-contact page for that contact upon success
        * upon failure it displays error message
		* @method  doneEditContact
		* @param {int} id The id of the contact
		*/
    doneEditContact: function(id) {

    var type= document.getElementById('type');
    var typeval = type.options[type.selectedIndex].text;
    var self = this;

   

    if (typeval === "Laboratory"){
        var last_name = "labtype";
    }
    else{
        var last_name = document.getElementById('last_name').value;
    }
    
    var checked = checkInputs(self, typeval);

    if(checked){


    var user = this.get('ajax').put('/api/contacts/' + id, {
        type: 'application/json',
        data: { contact: {
          first_name: document.getElementById('first_name').value,
          last_name: last_name,
          addresseLine1: document.getElementById('addressLine1').value,
          addressLine2: document.getElementById('addressLine2').value,
          addressLine3: document.getElementById('addressLine3').value,
          email: document.getElementById('emailContact').value,
          phone_number: document.getElementById('phoneNumber').value,
          fax_number: document.getElementById('faxNumber').value,
          contact_type: typeval
        }
    }
    });
     user.then(function(response){
    
            if(response.success){
              
                self.transitionToRoute('/view-contact/'+ id);
            }
        //this is error from server condition
        }, function(response) {
            showAlert(response.errors[0].title, false, "failure");
					if (response === false){
						if (self.get('session.isAuthenticated')){
							self.get('session').invalidate();
							}
						self.transitionToRoute('/login');
					}
				});
    }

        },
         /** 
		* handles action called when user clicks delete-contact-button
        * sends a put request to the server to delete the contact that we are currently on
		* @method  deleteContact
		* @param {int} id The id of the contact to delete
		*/
    deleteContact: function(id) {

    var self = this;

    var user = this.get('ajax').delete('/api/contacts/' + id, {
    
     });
     user.then(function(response){
    
            if(response.success){
            
                self.transitionToRoute('/search-contact');
            }

        //this is error from server condition
        }, function(response) {
            showAlert(response.errors[0].title, false, "failure");
					if (response === false){
						if (self.get('session.isAuthenticated')){
							self.get('session').invalidate();
							}
						self.transitionToRoute('/login');
					}
				});

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
            Ember.$('#alert_placeholder_'+ divID).html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span  id="statusGood">'+message+'</span></div>');
        }
        else{
             Ember.$('#alert_placeholder_'+divID).html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">'+message+'</span></div>');
        }
          Ember.$('html,body').scrollTop(0);
 }

 /**
* checks if the required inputs are present, if they are undefined we show alerts about this
* else if they are all valid we return true
* @method checkInputs
* @param {object} self the controller
* @param {string} type the type of contact, want slightly diff display for labs
*/

function checkInputs(self, type){
    var firstName = ( document.getElementById('first_name').value !=="") ;
    var phoneNumber = testPhoneNumber(document.getElementById('phoneNumber').value,  "phoneNumber") ;
    var email= testEmail( document.getElementById('emailContact').value, "email" );
    var addressLine1 = ( document.getElementById('addressLine1').value !== "");
    var addressLine3 =( document.getElementById('addressLine3').value !== "") ;

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