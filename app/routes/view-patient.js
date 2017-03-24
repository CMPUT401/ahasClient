import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
//import RSVP from 'rsvp';

export default Ember.Route.extend(AuthenticatedRouteMixin,

	{
	session: Ember.inject.service(),
    ajax: Ember.inject.service(),
	model(param) {
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/patients/' + param.patientID
			).then(function(data){
				Ember.run.later(function() 
					{
       			 resolve({ id: JSON.stringify(data.patient.id).replace(/\"/g, ""),
       			 			alerts: concatAlerts(data.generalAlerts,data.medicationAlerts),
						   first_name: JSON.stringify(data.patient.first_name).replace(/\"/g, ""),
						   last_name: JSON.stringify(data.patient.last_name).replace(/\"/g, ""),
						   species: JSON.stringify(data.patient.species).replace(/\"/g, ""),
						   age: JSON.stringify(data.patient.age).replace(/\"/g, ""),
						   colour: JSON.stringify(data.patient.colour).replace(/\"/g, ""),
						   tattoo: JSON.stringify(data.patient.tattoo).replace(/\"/g, ""),
						   microchip: JSON.stringify(data.patient.microchip).replace(/\"/g, ""),
						   status: JSON.stringify(data.patient.reproductive_status).replace(/\"/g, ""),
						   client_id: JSON.stringify(data.patient.client_id).replace(/\"/g, ""),
						   gender: JSON.stringify(data.patient.gender).replace(/\"/g, ""),
						   firstName: JSON.stringify(data.patient.client.firstName).replace(/\"/g, ""),
							lastName: JSON.stringify(data.patient.client.lastName).replace(/\"/g, ""),
							address: JSON.stringify(data.patient.client.address).replace(/\"/g, "").replace(/\\n/g, " <br> "),
							phoneNumber: JSON.stringify(data.patient.client.phoneNumber).replace(/\"/g, ""),
							email: JSON.stringify(data.patient.client.email).replace(/\"/g, ""),
							licos: JSON.stringify(data.patient.client.licos).replace(/\"/g, ""),
							aish: JSON.stringify(data.patient.client.aish).replace(/\"/g, ""),
							socialAssistance: JSON.stringify(data.patient.client.socialAssistance).replace(/\"/g, ""),
							notes: JSON.stringify(data.patient.client.notes).replace(/\"/g, "").replace(/\\n/g, " <br> "),
							alternativeContactFirstName: JSON.stringify(data.patient.client.alternativeContactFirstName).replace(/\"/g, ""),
							alternativeContactEmail: JSON.stringify(data.patient.client.alternativeContactEmail).replace(/\"/g, ""),
							alternativeContactLastName: JSON.stringify(data.patient.client.alternativeContactLastName).replace(/\"/g, ""),
							alternativeContactPhoneNumber:JSON.stringify(data.patient.client.alternativeContactPhoneNumber).replace(/\"/g, ""),
							alternativeContact2ndPhone: JSON.stringify(data.patient.client.alternativeContact2ndPhone).replace(/\"/g, ""),
							alternativeContactAddress: JSON.stringify(data.patient.client.alternativeContactAddress).replace(/\"/g, "").replace(/\\n/g, " <br> ")
						});
				console.log("we getdont here");
				//this.get('ajax').request('/api/client/1');

    		  });
				console.log("status is " + JSON.stringify(data));
				console.log("here" + JSON.stringify(data.patient.medicationAlerts))
				//var self = this;
			},
			function(response){
				if (response === false){
					if (self.get('session.isAuthenticated')){
						self.get('session').invalidate();
					}
					self.transitionTo('/login');
            	}
		}));
		return(ajaxGet);

	},
	

});

function concatAlerts(general,medical){
	var both = [];
	for(var i = 0; i < general.length; i++) {
		var alert = general[i];
		alert.id = alert.id;
		alert.body = alert.body;
		alert.end = "Forever";
		both.push(alert);
	}
	for(var i = 0; i < medical.length; i++) {
		var alert = medical[i];
		alert.id = alert.id;
		alert.body = alert.name;
		alert.end = format(alert.reminder);
		both.push(alert);
	}
	return(both);
}

function format(date){
    var partialDate = new Date(date * 1000);
    var day = (partialDate.getDate()<10?'0':'' )+ partialDate.getDate();
    var month = (partialDate.getMonth()<10?'0':'' )+ (partialDate.getMonth()+1);
    return(month+"/"+ day +"/"+partialDate.getFullYear());
}