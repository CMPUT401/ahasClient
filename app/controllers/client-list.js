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
	},
	clients: function() {
        var model = this.get('model');
        var search = this.get('search');
        var current = 1;
        var clients = model.filter(function(item) {
            var reg = '.*'+search.toLowerCase()+'.*';
            var name = item.get('firstName').toLowerCase();
            if(name.match(reg) && current < 20) { 
                current++;
                return true; 
            }
        });
        return clients;
    }.property('search','model.length')
});
