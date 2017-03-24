import Ember from 'ember';

/**
* controller for the radiography-history component. Make AJAX get request on init
* @class RadiographyHistoryComponentController
*/
export default Ember.Component.extend({
	isVisible: false,
	patientId: 0,
	ajax: Ember.inject.service(),
	radiographyList: [],
	router: Ember.inject.service('-routing'),
	actions: {
		/**
		* Redirects to the radiography upload page when user clicks on the Upload Lab Result button
		* @method uploadResult
		*/
		uploadResult: function(){
			this.get('router').transitionTo('radiography-upload', [this.patientId]);
		},
		/**
		* Redirects to the radiography page when the user clicks on it in the list
		* @param {int} radiographyID The ID of the radiography that has been clicked
		* @method viewEntry
		*/
		viewEntry: function(radiographyID){
			console.log('view radiograph ' + radiographyID);
			// TODO transition to lab result
			this.get('router').transitionTo('view-image-record', [this.patientId, radiographyID]);
		}
	},
	init(){
		this._super(...arguments);
		console.log("calling ajax for lab results list");
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
			this.get('ajax').request('api/patients/' + this.patientId + '/images'
				).then(function(data){
					console.log("data is" + JSON.stringify(data));
					Ember.run(function(){
						resolve({
							// radiographs: deserialAttributes(data.images)
						});
						// console.log(deserialAttributes(data.medical_records));
						self.set('radiographyList', deserialAttributes(data.images));
					});
				},
				function(data){
					if (data === false){
						// self.transitionTo('/unauthorized');
						// self.get('router').transitionTo('unauthorized'); //not sure if this works
						console.log("status is " + JSON.stringify(data));
					}		
				})
		);
	}
});

/**
* deserializes the radiographs after they have been received by the AJAX request. 
* Filters picture_type for radiograph. Also formats dates
* @param {object} radiograph the JSON object received
* @method deserialAttributes
*/
function deserialAttributes(radiograph){
	var deserial = [];
	for(var i = 0; i < radiograph.length; i++) {
		var entry = radiograph[i];
		if(entry.picture_type.toLowerCase() === "radiograph"){
			// console.log("is lab result")
			entry.imageId = JSON.stringify(radiograph[i].id).replace(/\"/g, "");
			if(JSON.stringify(radiograph[i].file_name) != null){
				entry.name = JSON.stringify(radiograph[i].name).replace(/\"/g, "");
			} 
			if(JSON.stringify(radiograph[i].date) != null){
				var date = new Date(JSON.stringify(radiograph[i].date)*1000);
				entry.date = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
			}
			deserial.push(entry);
		}
	}
	return(deserial);
}