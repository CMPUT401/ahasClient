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
    
    var user = this.get('ajax').put('/api/contacts/' + id, {
        type: 'application/json',
        data: { contact: {
          first_name: document.getElementById('first_name').value,
          last_name: document.getElementById('last_name').value,
          address: document.getElementById('address').value,
          email: document.getElementById('email').value,
          phone_number: document.getElementById('phoneNumber').value,
          fax_number: document.getElementById('faxNumber').value,
          contact_type: typeval
        }
    }
    });
     user.then(function(response){
    
            if(response.success){
              
                showAlert("Record updated", true);
                self.transitionToRoute('/view-contact/'+ id);
            }
        //this is error from server condition
        }, function(response) {
            showAlert("Could not update", false);
            console.log("status is " + JSON.stringify(response));
					if (response === false){
						if (self.get('session.isAuthenticated')){
							self.get('session').invalidate();
							}
						self.transitionToRoute('/login');
					}
				});

        },
     }
});


 /** 
		* used to provide feedback to user on success condition as well as fail condition
        * only displayed very briefly on success condition however before transition
		* @method  showAlert
		* @param {string} message The message to display in the alert
        * @param {boolean} bool Determines if this is a warning alert or confirmation alert
		*/
function showAlert(message, bool) {
        if(bool){
            Ember.$('#alert_placeholder').html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span  id="statusGood">'+message+'</span></div>');
        }
        else{
             Ember.$('#alert_placeholder').html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">'+message+'</span></div>');
        }
 }