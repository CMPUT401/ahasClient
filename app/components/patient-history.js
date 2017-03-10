import Ember from 'ember';

export default Ember.Component.extend({
	isVisible: true,
	patientId: 0,
	name: "",
	actions:{
		newEntry: function(){
			console.log("making a new medical history entry");
		},
		toggleVisibility: function(){
			// console.log("show chrono, the id is " + patientId);
			if(this.get('isVisible')){
				this.set('isVisible', false);
			} else {
				this.set('isVisible', true);
			}
		}.observes('isVisible')
	},
	init(){
		this._super(...arguments);
		console.log("calling ajax");
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
			this.get('ajax').request('api/patients/' + patientId + '/medical_records'
				).then(function(data){
					console.log("data is" + JSON.stringify);
				},
				function(data){
					if (data === false){
						// self.transitionTo('/unauthorized');
						console.log("status is " + JSON.stringify(data));
					}		
				})
		);
	}
});
