import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
//import RSVP from 'rsvp';

export default Ember.Route.extend(AuthenticatedRouteMixin,

	{
	session: Ember.inject.service(),
    ajax: Ember.inject.service(),
            /**
    *model of the patient view route, assigns stuff from the get to the patient
    *@class model
    */
	model(param) {
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/patients/' + param.patientID
			).then(function(data){
				data.patient = fixNulls(data.patient);
				data.patient.client = fixNulls(data.patient.client);
				Ember.run.later(function() 
					{
       			 resolve({ id: JSON.stringify(data.patient.id).replace(/\"/g, ""),
       			 		   imageid: JSON.stringify(data.patient.portrait_id).replace(/\"/g, ""),
       			 		   alerts: concatAlerts(data.generalAlerts,data.medicationAlerts),
						   first_name: JSON.stringify(data.patient.first_name).replace(/\"/g, ""),
						   last_name: JSON.stringify(data.patient.last_name).replace(/\"/g, ""),
						   species: JSON.stringify(data.patient.species).replace(/\"/g, ""),
						   age: parseDate(new Date(data.patient.dateOfBirth * 1000)),
						   colour: JSON.stringify(data.patient.colour).replace(/\"/g, ""),
						   tattoo: JSON.stringify(data.patient.tattoo).replace(/\"/g, ""),
						   microchip: JSON.stringify(data.patient.microchip).replace(/\"/g, ""),
						   client_id: JSON.stringify(data.patient.client_id).replace(/\"/g, ""),
						   gender: JSON.stringify(data.patient.sex).replace(/\"/g, ""),
						   firstName: JSON.stringify(data.patient.client.firstName).replace(/\"/g, ""),
						   lastName: JSON.stringify(data.patient.client.lastName).replace(/\"/g, ""),
						   address: JSON.stringify(data.patient.client.addressLine1).replace(/\"/g, "").replace(/\\n/g, " <br> ")
						   +"<br>"+JSON.stringify(data.patient.client.addressLine2).replace(/\"/g, "").replace(/\\n/g, " <br> ")
						   +"<br>"+JSON.stringify(data.patient.client.addressLine3).replace(/\"/g, "").replace(/\\n/g, " <br> "),
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
						   alternativeContactAddress: JSON.stringify(data.patient.client.alternativeContactAddressLine1).replace(/\"/g, "").replace(/\\n/g, " <br> ")
						});
				//this.get('ajax').request('/api/client/1');

    		  });
				//var self = this;
				//console.log(data);
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
/**
*this method adds the two alerts together and makes changes to the body of the alert so it displays what we want
*@class concatAlerts
*/
function concatAlerts(general,medical){
	var both = [];
	for(var i = 0; i < general.length; i++) {
		var alert = general[i];
		alert.id = alert.id;
		alert.body = 'By '+alert.initials + ': ' +alert.body;
		alert.end = "Forever";
		both.push(alert);
	}
	for(var j = 0; j < medical.length; j++) {
		var alert = medical[j];
		alert.id = alert.id;
		alert.body = alert.name;
		alert.end = format(alert.reminder);
		both.push(alert);
	}
	return(both);
}

/**
*this method formats the date and returns it properly in the view patient
*@class Format
*/
function format(date){
    var partialDate = new Date(date * 1000);
    var day = (partialDate.getDate()<10?'0':'' )+ partialDate.getDate();
    var month = (partialDate.getMonth()<10?'0':'' )+ (partialDate.getMonth()+1);
    return(month+"/"+ day +"/"+partialDate.getFullYear());
}

/**
*this method check for any nulls in the data and replaces it with blanks
*@class FixNulls
*/
function fixNulls(data){
	var fixed = {};

	for(var key in data){
		if(data[key] === null || data[key] === undefined || data[key] === 'null'){
			fixed[key] = '';
		}
		else{
			fixed[key] = data[key];
		}
	}

	return fixed;
}

/**  
  * returns new Date parsed in a nice way to display at the top of the medical record
  * format example: Monday January 21, 2017 5:12
  * where time is in twenty four hour clock
  * @method parseDate
  * @param {Date} date to parse
  */ 

function parseDate(date){
		if (date === ""){
			return("");
		}
        var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        var months = ["January","February","March","April","May","June","July", "August", "September", "October", "November", "December"];
        var day = date.getDay() ;
        var month = date.getMonth()  ;
        var year = date.getFullYear();
        var hours = date.getHours();
        var mins = (date.getMinutes()<10?'0':'') + date.getMinutes();
        var whole = days[day] +" "+ months[month] +" " + date.getDate().toString() +", "+ year.toString() + " "+ hours.toString() + ":" + mins.toString();
        return(whole);
}