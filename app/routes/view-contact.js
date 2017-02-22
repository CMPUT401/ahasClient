import Ember from 'ember';

export default Ember.Route.extend({
    ajax: Ember.inject.service(),
	model(params) {
		console.log("what are params at the moment", params);
		console.log("can we just get it", params.contact_id );
		let ajaxGet=this.get('ajax').request('/api/contact/' + params.contact_id
			).then(function(data){
				console.log("status is " + JSON.stringify(data));
			},
			function(data){
				console.log("status is " + JSON.stringify(data));
			});
		return [ajaxGet];
		}
});
