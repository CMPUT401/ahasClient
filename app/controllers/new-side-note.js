import Ember from 'ember';

export default Ember.Controller.extend({
	
	//currently commented out because backend isn't implemented
	ajax: Ember.inject.service(),
	session: Ember.inject.service(),
	actions: 
	{
		submitNewNote()
		{
			var self = this;
				let ajaxPost = this.get('ajax').request('/api/patients/1/medical_records/1/notes',
			{
				method: 'POST',
				type: 'application/json',
				data: { note:
					{
					medical_record_id: "1",
					body: 	this.get('medNotes'),
					initials: 		this.get('medSignature'),
					is_alert: document.getElementById('isAlert').checked
				
				}
			
			}, 
		
			});
			ajaxPost.then(function(data){
				console.log("status is " + data);
				self.transitionTo('/api/patients/1/medical_records/1');
			},
			function(response){
				if (response === false){
					if (self.get('session.isAuthenticated')){
						self.get('session').invalidate();
					}
				self.transitionTo('/login');
			}
			});
		return ajaxPost;
	}
}
	
});