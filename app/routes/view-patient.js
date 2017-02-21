import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RSVP from 'rsvp';

export default Ember.Route.extend(AuthenticatedRouteMixin,{

	/*ajax: Ember.inject.service(),
	model() {
		//var self = this;
		console.log("heh");
		return new RSVP.Promise(function(resolve) {
			console.log('heh2');
			var self = this;
			Ember.run.later(function() {
				
				return[self.get('ajax').request('/api/patients/1')];
				//resolve({
				//	msg: 'hold'
					//this.get('ajax').request('/api/patients/1');
					/*
					var self = this;
					var ajaxGet = this.get('ajax').request('/api/patients/1'
						).then(function(data){
                			console.log("status is " + JSON.stringify(data));
							//return(data.patient); //need to find way to extract patient portion of request....
						},
						function(data){
							console.log("status is " + JSON.stringify(data));
						});
       				console.log("patient extracted", ajaxGet);
					return [ajaxGet];
				//});
			}, 3000);
		});
	},

	setupController(controller,model){
		console.log(model.msg);
	}

});*/



    ajax: Ember.inject.service(),
	model() {
		var self = this;
		var ajaxGet = this.get('ajax').request('/api/patients/1'
			).then(function(data){
                console.log("status is " + JSON.stringify(data));
				//return(data.patient); //need to find way to extract patient portion of request....
			},
			function(data){
				console.log("status is " + JSON.stringify(data));
			});
        console.log("patient extracted", ajaxGet);
		return [ajaxGet];
	},

	setupControler(controller,model){
		console.log(model.msg);
	}

});

