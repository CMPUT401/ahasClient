import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	session: Ember.inject.service(),
    ajax: Ember.inject.service(),
        /**
    *model of the appointment route, assigns stuff from the get to the appointment
    *@class model
    */
	model(params) {
		//console.log(this.get("a_ID"));
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/schedules/' + params.appointmentid
			).then(function(data){
				data.schedule = FixNulls(data.schedule);
				//console.log(data);
				//console.log(data, data.success, data.contacts);
				Ember.run(function() {
       			 resolve({ 
       			 			id: JSON.stringify(data.schedule.id).replace(/\"/g, ""),
						   start: parseDate(new Date(data.schedule.appointmentStartDate * 1000)),
						   reason: JSON.stringify(data.schedule.reason).replace(/\"/g, ""),
						   notes: JSON.stringify(data.schedule.notes).replace(/\"/g, ""),
						   location: JSON.stringify(data.schedule.location).replace(/\"/g, ""),
						   end: JSON.stringify(data.schedule.duration).replace(/\"/g,"")

				
				});
    		  });
			
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
*this method parses the date and yields back the day/month/year in that format
*@class parseDate
*/
function parseDate(date){
        var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        var months = ["January","February","March","April","May","June","July", "August", "September", "October", "November", "December"];
        var day = date.getDay() ;
        var dayday = date.getDate();
        var month = date.getMonth()  ;
        var year = date.getFullYear();
        var hours = date.getHours();
        var mins = (date.getMinutes()<10?'0':'') + date.getMinutes();
        var whole = days[day]+ " " + dayday +" "+ months[month] +" "+ year.toString() + " "+ hours.toString() + ":" + mins.toString();
        return(whole);
}
/**
*this method check for any nulls in the data and replaces it with blanks
*@class FixNulls
*/

function FixNulls(data){
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
