import Ember from 'ember';

export default Ember.Route.extend({
    ajax: Ember.inject.service(),
	model() {
		let ajaxGet=this.get('ajax').request('/api/contact/1'
			).then(function(data){
				console.log("status is " + JSON.stringify(data));
			},
			function(data){
				console.log("status is " + JSON.stringify(data));
			});
		return [ajaxGet];
	},
});
