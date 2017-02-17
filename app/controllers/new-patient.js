import Ember from 'ember';

export default Ember.Controller.extend({
	ajax: Ember.inject.service(),
	actions: 
	{
		submitNewPatient()
		{
			self = this;
			let ajaxPost=this.get('ajax').post('/api/patients',
			{
				type: 'application/json',
				data: {patient:
					{
					client: "1",
					species: 	this.get('patientSpecies'),
					name: 		this.get('patientName'),
					age: 		this.get('patientAge'),
					colour: 	this.get('patientColor'),
					tattoo: 	this.get('patientTatoo'),
					microchip: 	this.get('patientMicrochip'),
					gender: 	this.get('patientGender'),
					reproductive_status: 	this.get('patientStatus')
					//what: "is",
					//this: "huh?"
				}},
			}).then(function(data){
				console.log("status is " + JSON.stringify(data));
				self.transitionToRoute('login');
			},
			function(data){
				console.log("status is " + JSON.stringify(data));
			});
		return ajaxPost;
		}
	}
});