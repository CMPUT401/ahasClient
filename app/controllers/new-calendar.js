import Ember from 'ember';

export default Ember.Controller.extend({
	ajax: Ember.inject.service(),
	session: Ember.inject.service(),
	actions: 
	{
		submitNewCalendar()
		{
			var self = this;
			let ajaxPost = this.get('ajax').request('/api/schedules',
			{
				method: 'POST',
				type: 'application/json',
				data: { schedule:
					{
					appointmentStartDate: 	this.get('appointmentStart'),
					clientId: 				"1",
					reason: 				this.get('appointmentReason'),
					notes: 					this.get('appointmentNote'),
					location: 				this.get('appointmentLocation'),
					appointmentEndDate: 	this.get('appointmentEnd')
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