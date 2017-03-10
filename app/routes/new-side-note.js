import Ember from 'ember';
//import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({
	model(param){
		console.log(param.IDs[0]);
		console.log(param.IDs[1]);

	}
});
