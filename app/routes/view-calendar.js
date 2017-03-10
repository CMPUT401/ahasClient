import Ember from 'ember';
<<<<<<< HEAD
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'; 
export default Ember.Route.extend(AuthenticatedRouteMixin,{
	/*
	ajax: Ember.inject.service(),
	model() {
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/patients/1'
			).then(function(data){
				Ember.run.later(function() {
       			 resolve({ id: JSON.stringify(data.patient.id).replace(/\"/g, ""),
						   name: JSON.stringify(data.patient.name).replace(/\"/g, ""),
						   species: JSON.stringify(data.patient.species).replace(/\"/g, ""),
						   age: JSON.stringify(data.patient.age).replace(/\"/g, ""),
						   colour: JSON.stringify(data.patient.colour).replace(/\"/g, ""),
						   tattoo: JSON.stringify(data.patient.tattoo).replace(/\"/g, ""),
						   microchip: JSON.stringify(data.patient.microchip).replace(/\"/g, ""),
						   status: JSON.stringify(data.patient.reproductive_status).replace(/\"/g, ""),
						   client_id: JSON.stringify(data.patient.client_id).replace(/\"/g, ""),
						   gender: JSON.stringify(data.patient.gender).replace(/\"/g, "")
				});
				console.log("we getdont here");
				//this.get('ajax').request('/api/client/1');
=======
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
 
export default Ember.Route.extend(AuthenticatedRouteMixin , {
    model: function() {
        return {
        	defaultView: 'agendaWeek',
            events: Ember.A([{
                title: 'Partayyyy',
                start: '2017-03-06T10:10:10',
                end: '2017-03-06T11:11:11'},
                {
                title: 'Dance',
                start: '2017-03-03T10:10:10',
                end: '2017-03-03T11:11:11'
>>>>>>> master

    		  });
                console.log("status is " + JSON.stringify(data));
				console.log("status is " + JSON.stringify(data.patient.name));
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