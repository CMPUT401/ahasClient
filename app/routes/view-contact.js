import Ember from 'ember';

export default Ember.Route.extend({
    ajax: Ember.inject.service(),
	model(params) {
		let ajaxGet=this.get('ajax').request('/api/contact/'+ params.contact_id
			).then(function(data){
				console.log("status is " + JSON.stringify(data));
			},
			function(data){
				console.log("status is " + JSON.stringify(data));
			});
		return [ajaxGet];
	},
});
