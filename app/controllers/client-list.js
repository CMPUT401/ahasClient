import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		filterClientName(param) {
			if (param !== '') {
				return this.get('store').querry('client', {name:param});
			} else {
				return this.get('store').findAll('client');
			}
		}
	}
});
