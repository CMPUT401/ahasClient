import Ember from 'ember';

export default Ember.Route.extend({
	model(param){
		console.log(param.IDs[0]);
		console.log(param.IDs[1]);

	}
});
