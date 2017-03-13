import Ember from 'ember';

export default Ember.Controller.extend({

	/*ajax: Ember.inject.service(),
	model() {
		console.log("do we even get here");
		var self = this;
		let ajaxGet=this.get('ajax').get('/api/patients/1'
			).then(function(data){
				console.log("status is " + JSON.stringify(data));
			},
			function(data){
				console.log("status is " + JSON.stringify(data));
			});
		return [ajaxGet];
	},
	*/

});