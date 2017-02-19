import Ember from 'ember';

export default Ember.Controller.extend({
	ajax: Ember.inject.service(),
	session: Ember.inject.service(),
	actions: 
	{
		submitNewPatient()
		{
			//var theController = config.App.application.create();
			//console.log("is this defined", application)
			//var authorizer = 'authorizer:custom';
			//var jwt = this.get('session.token'); 

			//this.get('session').authorize(authorizer,  (headerName, headerValue) => {
				let ajaxPost = this.get('ajax').request('/api/patients',
			{
				method: 'POST',
				type: 'application/json',
				data: { patient:
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
				
				}
			}, 
		
			});
			ajaxPost.then(function(data){
				console.log("status is " + JSON.stringify(data));
				self.transitionToRoute('login');
			},
			function(data){
				console.log("status is " + JSON.stringify(data));
			});
		return ajaxPost;
	},
		setHeader(request){
		var authorizer = 'authorizer:custom';
		var jwt = this.get('session.token'); //ember_simple_auth-session'); 
		//console.log('our jwt', jwt);
	  this.get('session').authorize(authorizer, request);
	}
}
	
});