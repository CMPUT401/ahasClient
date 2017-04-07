import Ember from 'ember';


import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'; 
export default Ember.Route.extend(AuthenticatedRouteMixin,{
	
	ajax: Ember.inject.service(),
	model() {
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/schedules'
			).then(function(data){
				Ember.run.later(function() {
       			 resolve({ events: convertUnix(data.schedules)
				});
				//this.get('ajax').request('/api/client/1');

    		  });
				console.log(data);
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
	
	
	//weee splitter
	/*
  	model: function() {
    return {
      events: Ember.A([
        {title: "Hackathon \n ayelmao \n ayelmao2", start: Date.now()},
      ])
    };
  }*/
});

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

function parseDate(date){
        var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        var months = ["January","February","March","April","May","June","July", "August", "September", "October", "November", "December"];
        var day = date.getDay() ;
        var month = date.getMonth()  ;
        var year = date.getFullYear();
        var hours = date.getHours();
        var mins = (date.getMinutes()<10?'0':'') + date.getMinutes();
        var whole = months[month] +" "+ days[day] +" "+ year.toString() + " "+ hours.toString() + ":" + mins.toString();
        return(whole);
}