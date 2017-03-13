import Ember from 'ember';

export default Ember.Controller.extend({
	ajax: Ember.inject.service(),
	//queryParams: ['clientID'],
	session: Ember.inject.service(),
	actions: 
	{
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
			},
			function(response){
				if (response === false){
					if (self.get('session.isAuthenticated')){
						self.get('session').invalidate();
					}
				self.transitionTo('/login');
			}
			});
		return ajaxPost;
	}
}
	
});