import Ember from 'ember';

/**
* controller for the paitent component. Make AJAX get request on init
* @class PatientComponentController
*/
export default Ember.Component.extend({
	patientId:0 ,
	ajax: Ember.inject.service(),
	actions:{
		
	},
	init(){
		this._super(...arguments);
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
			this.get('ajax').request('api/patients/' + this.patientID
				).then(function(data){
					console.log("data is" + JSON.stringify(data));
					Ember.run(function(){
						resolve({
						 
						});
                          self.set('first_name', JSON.stringify(data.patient.first_name).replace(/\"/g, ""));
                          self.set('last_name', JSON.stringify(data.patient.last_name).replace(/\"/g, ""));
                          self.set('species', JSON.stringify(data.patient.species).replace(/\"/g, ""));
                          self.set('age', JSON.stringify(data.patient.age).replace(/\"/g, ""));
                          self.set('colour', JSON.stringify(data.patient.colour).replace(/\"/g, ""));
                          self.set('tattoo', JSON.stringify(data.patient.tattoo).replace(/\"/g, ""));
                          self.set('microchip', JSON.stringify(data.patient.microchip).replace(/\"/g, ""));
                          self.set('status', JSON.stringify(data.patient.reproductive_status).replace(/\"/g, ""));
                          self.set('gender', JSON.stringify(data.patient.gender).replace(/\"/g, ""));
					});
				},
				function(data){
					if (data === false){
						console.log("status is " + JSON.stringify(data));
					}		
				})
		);
	}
});
