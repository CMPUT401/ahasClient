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
			console.log(JSON.stringify(formatDate(document.getElementById('patientAge').value)));
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
					last_name:  this.get('patientLastName'),
					dateOfBirth: 		JSON.stringify(formatDate(document.getElementById('patientAge').value)),
					colour: 	this.get('patientColor'),
					tattoo: 	this.get('patientTatoo'),
					microchip: 	this.get('patientMicrochip'),
					sex: 	val
				}
			}, 
		
			});
			ajaxPost.then(function(data){
				//console.log(this.c_ID);
				self.transitionToRoute('search-patient');
			},
			function(response){
				if (response === false){
					if (self.get('session.isAuthenticated')){
						self.get('session').invalidate();
					}
				self.transitionToRoute('/login');
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
