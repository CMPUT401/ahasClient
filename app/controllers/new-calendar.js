import Ember from 'ember';

export default Ember.Controller.extend({
	ajax: Ember.inject.service(),
	session: Ember.inject.service(),
	actions: 
	{
		submitNewCalendar()
		{
			var self = this;
			let ajaxPost = this.get('ajax').request('/api/patients',
			{
				method: 'POST',
				type: 'application/json',
				data: { patient:
					{
					appointmentDate: 	this.get('appointmentStart'),
					duration: 			this.get('appointmentEnd'),
					clientId: 			"1",
					reason: 			this.get('appointmentReason'),
					notes: 				this.get('appointmentNote'),
					location: 			this.get('appointmentLocation')
				}
			
			}, 
		
			});
			ajaxPost.then(function(data){
				console.log("status is " + JSON.stringify(data));
			},
			function(data){
				if (data === false){
					if (self.get('session.isAuthenticated')){
						self.get('session').invalidate();
							}
					self.transitionToRoute('/unauthorized');
				}
			});
		return ajaxPost;
	}
}
	
});