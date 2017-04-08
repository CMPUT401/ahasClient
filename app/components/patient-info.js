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
					data.patient = fixNulls(data.patient);
					Ember.run(function(){
						resolve({
						 
						});
                          self.set('first_name', JSON.stringify(data.patient.first_name).replace(/\"/g, ""));
                          self.set('last_name', JSON.stringify(data.patient.last_name).replace(/\"/g, ""));
                          self.set('species', JSON.stringify(data.patient.species).replace(/\"/g, ""));
						  self.set('dateOfBirth', parseDate(new Date(data.patient.dateOfBirth * 1000)));
                          self.set('colour', JSON.stringify(data.patient.colour).replace(/\"/g, ""));
                          self.set('tattoo', JSON.stringify(data.patient.tattoo).replace(/\"/g, ""));
                          self.set('microchip', JSON.stringify(data.patient.microchip).replace(/\"/g, ""));
                          self.set('sex', JSON.stringify(data.patient.sex).replace(/\"/g, ""));
					});
				},
				function(data){
							
				})
		);
	}
});

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
        var whole = days[day] +" "+ months[month] +" " + date.getDate().toString() +", "+ year.toString();
        return(whole);
}