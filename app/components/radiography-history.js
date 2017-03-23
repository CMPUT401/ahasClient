import Ember from 'ember';

export default Ember.Component.extend({
	isVisible: false,
	patientId: 0,
	ajax: Ember.inject.service(),
	radiographyList: [],
	router: Ember.inject.service('-routing'),
	actions: {
		uploadResult: function(){
			// console.log("making a new medical history entry");
			this.get('router').transitionTo('radiography-upload', [this.patientId]);
		},
		viewEntry: function(radiographyID){
			console.log('view radiograph ' + radiographyID);
			// TODO transition to lab result
			//this.get('router').transitionTo('view-image-record', [this.patientId, labResultID]);
		}
	},

});
