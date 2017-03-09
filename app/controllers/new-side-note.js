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
					body: 	this.get('medNote'),
					initials: 		this.get('medSignature')
				
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