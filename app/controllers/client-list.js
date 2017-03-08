import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		filterClientName(param) {
			if (param !== '') {
				return this.get('store').querry('api/client', {name:param});
			} else {
				return this.get('store').findAll('api/client');
			}
		}
	}
});
