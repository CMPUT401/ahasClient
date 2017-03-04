import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,
	{

    ajax: Ember.inject.service(),
	model() {
		var self = this;
		var ajaxGet = this.get('ajax').request('/api/patients/1'
			).then(function(data){
                console.log("status is " + JSON.stringify(data));
				//return(data.patient); //need to find way to extract patient portion of request....
			},
			function(data){
				if (data === false){
					if (self.get('session.isAuthenticated')){
						self.get('session').invalidate();
							}
				self.transitionTo('/unauthorized');
				console.log("status is " + JSON.stringify(data));
				}
			});
        console.log("patient extracted", ajaxGet);
		return [ajaxGet];
	},

});
