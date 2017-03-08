import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		filterClientName(param) {
			if (param !== '') {
				var queryResult = this.get('store').query('client-list', {firstName:param});
				console.log("query result is " + queryResult);
				return queryResult;
			} else {
				return this.get('store').findAll('client-list');
			}
		}
	}
});
