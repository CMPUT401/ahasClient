import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
export default Ember.Route.extend(AuthenticatedRouteMixin,
	{
	session: Ember.inject.service(),
    ajax: Ember.inject.service(),
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
       			 		   first_name: JSON.stringify(data.patient.first_name).replace(/\"/g, ""),
						   last_name: JSON.stringify(data.patient.last_name).replace(/\"/g, ""),
						   species: JSON.stringify(data.patient.species).replace(/\"/g, ""),
						   age: parseDate(new Date(data.patient.dateOfBirth * 1000)),
						   colour: JSON.stringify(data.patient.colour).replace(/\"/g, ""),
						   tattoo: JSON.stringify(data.patient.tattoo).replace(/\"/g, ""),
						   microchip: JSON.stringify(data.patient.microchip).replace(/\"/g, ""),
						   client_id: JSON.stringify(data.patient.client_id).replace(/\"/g, ""),
						   		male: checkMale(JSON.stringify(data.patient.sex).replace(/\"/g, "")),
						   		maleN: checkMaleN(JSON.stringify(data.patient.sex).replace(/\"/g, "")),
						   		female: checkFeMale(JSON.stringify(data.patient.sex).replace(/\"/g, "")),
						   		femaleS: checkFeMaleS(JSON.stringify(data.patient.sex).replace(/\"/g, "")),
						   		unknown: checkUnknown(JSON.stringify(data.patient.sex).replace(/\"/g, "")),

						});
				//this.get('ajax').request('/api/client/1');

    		  });
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
*this method parses the date and yields back the day/month/year in that format
*@class parseDate
*/

function parseDate(date){
		if (date === ""){
			return("");
		}
        //var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        var months = ["January","February","March","April","May","June","July", "August", "September", "October", "November", "December"];
        var day = date.getDay() ;
        var month = date.getMonth()  ;
        var year = date.getFullYear();
        var hours = date.getHours();
        var mins = (date.getMinutes()<10?'0':'') + date.getMinutes();
        var whole = day.toString() +"/"+ month.toString() +"/" + year.toString();
        return(whole);
}

 /** 
 * Used for the initial setting of the dropdown in edit patient route so that it loads
 * correct type for what the gender is
 * Checks if the gender type is Male , if so return true
 * @method checkMale
 * @param {string} gender male type string from the gender json object
 */

function checkMale(gender){

    if(gender === 'Male'){

        return(true);

    }
    return(false);

}

 /** 
 * Used for the initial setting of the dropdown in edit patient route so that it loads
 * correct type for what the gender is
 * Checks if the gender type is Male , if so return true
 * @method checkMale
 * @param {string} gender male type string from the gender json object
 */

function checkMaleN(gender){

    if(gender === 'Male Neutered'){

        return(true);

    }
    return(false);

}

 /** 
 * Used for the initial setting of the dropdown in edit patient route so that it loads
 * correct type for what the gender is
 * Checks if the gender type is Male , if so return true
 * @method checkMale
 * @param {string} gender male type string from the gender json object
 */
function checkFeMale(gender){

    if(gender === 'Female'){

        return(true);

    }
    return(false);

}

 /** 
 * Used for the initial setting of the dropdown in edit patient route so that it loads
 * correct type for what the gender is
 * Checks if the gender type is Male , if so return true
 * @method checkMale
 * @param {string} gender male type string from the gender json object
 */
function checkFeMaleS(gender){

    if(gender === 'Female Spayed'){

        return(true);

    }
    return(false);

}


 /** 
 * Used for the initial setting of the dropdown in edit patient route so that it loads
 * correct type for what the gender is
 * Checks if the gender type is Male , if so return true
 * @method checkMale
 * @param {string} gender male type string from the gender json object
 */
function checkUnknown(gender){

    if(gender === 'Unknown'){

        return(true);

    }
    return(false);

}


