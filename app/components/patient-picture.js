import Ember from 'ember';

export default Ember.Component.extend({
	isVisible: false,
	patientId:0 ,
	ajax: Ember.inject.service(),
	//picture: [],
	router: Ember.inject.service('-routing'),
	init(){
		this._super(...arguments);
		console.log("calling ajax for medcation List");
		var self = this;
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
			this.get('ajax').request('api/patients/' + this.modelID.id + '/images/' + this.modelID.imageid
				).then(function(data){
					console.log("data is" + JSON.stringify(data));
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
						console.log("status is " + JSON.stringify(data));
						//console.log("status is " + JSON.stringify(data));
					}		
				})
		);
		//console.log(this.picture);
		return(ajaxGet);
	}  
});