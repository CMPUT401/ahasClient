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
					age: 		this.get('patientAge'),
					colour: 	this.get('patientColor'),
					tattoo: 	this.get('patientTatoo'),
					microchip: 	this.get('patientMicrochip'),
					gender: 	this.get('patientGender'),
					reproductive_status: 	this.get('patientStatus')
				
				}
			
			}, 
		
			});
			ajaxPost.then(function(data){
				//console.log(this.c_ID);
				console.log("status is " + JSON.stringify(data));
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