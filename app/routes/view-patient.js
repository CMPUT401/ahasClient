import Ember from 'ember';

export default Ember.Route.extend({

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

});
