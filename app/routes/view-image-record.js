import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({
	session: Ember.inject.service(),
	ajax: Ember.inject.service(),
	model(param){
		var self = this;
		//ajax get request to populate field
		var ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request('/api/patients/' + param.patientID + "/images/" + param.imageID
			).then(function(data){
				console.log("data is " + JSON.stringify(data));
				Ember.run(function() {
				resolve({
					name: deserialName(data.image),
					data: deserialData(data.image),
					date: deserialDate(data.image)
				});
			  });
			
			},
			function(data){
				if (data === false){
					if (self.get('session.isAuthenticated')){
					self.get('session').invalidate();
					}
				self.transitionTo('/login');
					console.log("status is " + JSON.stringify(data));
				}
		}));
		return ajaxGet;
	}
});

function deserialName(img){
	var name = img.name;
	if(name != null){
		return JSON.stringify(name).replace(/\"/g, "");
	}else{
		return " ";
	}
}

function deserialData(img){
	var data = img.data;
	if(data != null){
		return JSON.stringify(data).replace(/\"/g, "");
	}else{
		return " ";
	}
}

function deserialDate(img){
	var unixDate = img.date;
	if(unixDate != null){
		var date = new Date(JSON.stringify(unixDate)*1000); 
		return  date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
	}else{
		return " ";
	}
}
