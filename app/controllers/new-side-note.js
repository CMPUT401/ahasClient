import Ember from 'ember';

export default Ember.Controller.extend({
	
	//currently commented out because backend isn't implemented
	ajax: Ember.inject.service(),
	session: Ember.inject.service(),
	actions: 
	{
		submitNewNote()
		{
			console.log(this.get('r_ID'));
			var self = this;
				let ajaxPost = this.get('ajax').request('/api/patients/'+this.get('p_ID')+'/medical_records/'+this.get('r_ID')+'/notes',
			{
				method: 'POST',
				type: 'application/json',
				data: { note:
					{
					medical_record_id: this.get('r_ID'),
					body: 	this.get('medNotes'),
					initials: 		this.get('medSignature'),
					is_alert: document.getElementById('isAlert').checked
				
				}
			
			}, 
		
			});
			ajaxPost.then(function(data){
				//console.log(this.c_ID);
				console.log("status is " + JSON.stringify(data));
				self.transitionToRoute('search-patient');
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