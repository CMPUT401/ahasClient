import Ember from 'ember';


import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'; 
export default Ember.Route.extend(AuthenticatedRouteMixin,{
	/*
	ajax: Ember.inject.service(),
	model() {
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/schedules'
			).then(function(data){
				Ember.run.later(function() {
       			 resolve({ events: data.schedules,
				});
				console.log("we getdont here");
				//this.get('ajax').request('/api/client/1');

    		  });
                console.log("status is " + JSON.stringify(data));
				//console.log("status is " + JSON.stringify(data.patient.name));
			},
			function(data){
				if (data === false){
				self.transitionTo('/unauthorized');
				console.log("status is " + JSON.stringify(data));
				}
		}));
		return(ajaxGet);

	},
	*/
	
	//weee splitter
	
  	model: function() {
    return {
      events: Ember.A([
        {title: "Hackathon \n ayelmao \n ayelmao2", start: Date.now()},
      ])
    };
  }
});