import Ember from 'ember';
/**
* Controller for the newpatient page
* This posts a request to the back end for adding a new-patient
* @class new-patient controller
*/
export default Ember.Controller.extend({
	ajax: Ember.inject.service(),
	//queryParams: ['clientID'],
	session: Ember.inject.service(),
	actions: 
	{


		/**
	* Controller for the submitnewpatient
	* THis method does a post on the back end to create a new patient
	* @method submitNewPatient()
	*/

		submitNewPatient()
		{
			var self = this;
			var value= document.getElementById('value');
			console.log(this.get('l_Name'));
            var val = value.options[value.selectedIndex].text;
			let ajaxPost = this.get('ajax').request('/api/patients',
			{
				method: 'POST',
				type: 'application/json',
				data: { patient:
					{

					client: this.get('c_ID'),
					species: 	this.get('patientSpecies'),
					first_name: this.get('patientFirstName'),
					last_name:  this.get('l_Name'),
					dateOfBirth: 		JSON.stringify(formatDate(document.getElementById('patientAge').value)),
					colour: 	this.get('patientColor'),
					tattoo: 	this.get('patientTatoo'),
					microchip: 	this.get('patientMicrochip'),
					sex: 	val
				}
			}, 
		
			});
			ajaxPost.then(function(data){
				self.transitionToRoute('search-patient');
			},
			function(response){
				if (response === false){
					if (self.get('session.isAuthenticated')){
						self.get('session').invalidate();
					}
				self.transitionToRoute('/login');
			}
			else{
                showAlert(response.errors[0].title, false, "failure");
                    }
			});
		return ajaxPost;
	}
}
	
});

 /** 
		* used to format the date to we will send in request
        * converts from format in datepicker to unix time in seconds
		* @method   formatDate
        * @param {date} date the date to be formatted
		*/   

function formatDate(date){
  var half = new Date(date);
  var formatted = Math.floor(half.getTime() / 1000);
  return(formatted);
}


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