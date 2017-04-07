import Ember from 'ember';

/**
* Controller for the patient-picture component
* @class PatientPictureComponentController
*/
export default Ember.Component.extend({
	isVisible: true,
	patientId:0 ,
	ajax: Ember.inject.service(),
	//picture: [],
	router: Ember.inject.service('-routing'),
	/**
	* Controller for the patient-picture component when it first loads into the component
	* It gets the data and tries to display it in the HBS
	* @method init
	*/
	init(){
		this._super(...arguments);
		var self = this;
		if (this.modelID.imageid === ""){
			return;
		}
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
			this.get('ajax').request('api/patients/' + this.patientId+ '/images/' + this.modelID.imageid
				).then(function(data){
				
					Ember.run(function(){
						resolve({
							//picture :JSON.stringify(data.image.data).replace(/\"/g, "")
						});
						//console.log(JSON.stringify(data.image.data).replace(/\"/g, ""));
						//var picture = JSON.stringify(data.image.data).replace(/\"/g, "");
						self.set('picture', JSON.stringify(data.image.data).replace(/\"/g, ""));
						//console.log(picture);
					});
				},
				function(data){
					if (data === false){
						// self.transitionTo('/unauthorized');
						// self.get('router').transitionTo('unauthorized'); //not sure if this works
						//console.log("status is " + JSON.stringify(data));
					}		
				})
		);
		return(ajaxGet);
	}  
});