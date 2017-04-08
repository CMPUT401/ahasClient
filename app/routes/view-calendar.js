import Ember from 'ember';


import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'; 
export default Ember.Route.extend(AuthenticatedRouteMixin,{
	
	ajax: Ember.inject.service(),
	        /**
    *model of the calendar route, assigns stuff from the get to the calendar
    *@class model
    */
	model() {
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/schedules'
			).then(function(data){
				Ember.run.later(function() {
       			 resolve({ 
								events: convertUnix(data.schedules)
				});
		

    		  });
		
			},
			function(data){
			if (data === false){
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
*this method converts the unix time into data usable by calendar
*@class convertUnix
*/


function convertUnix(schedules){
	var newsched = [];
	for(var i = 0; i < schedules.length; i++) {
		var schedule = schedules[i];
		schedule.start = new Date(schedules[i].appointmentStartDate* 1000);
		schedule.title = schedules[i].patientFirstName +" "+ schedules[i].patientLastName;
		newsched.push(schedule);
	}
	return (newsched);
}
